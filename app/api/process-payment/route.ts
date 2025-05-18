import { NextResponse } from 'next/server';
import { firestoreAdmin, firebaseAdmin } from '@/lib/firebaseAdmin';
import type { Transaction } from 'firebase-admin/firestore'; // Import Transaction type
import { processPaymentOnChain, type PaymentParams } from '@/lib/ethersService';
import { ethers, parseUnits } from 'ethers'; // Ethers v6 for parseUnits
import { nanoid } from 'nanoid'; // For generating unique transaction IDs

// Define the structure for the API request body
interface ProcessPaymentRequestBody {
  senderUid: string; // Firebase UID of the user sending the payment
  senderFusionPayId: string; 
  recipientFusionPayId: string;
  amountToSend: number | string; // Expected in smallest unit (e.g., cents)
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number | string; // Expected as a scaled integer
  feeAmount: number | string;    // Expected in smallest unit
}

export async function POST(request: Request) {
  const txId = nanoid(); // Unique ID for this specific transaction attempt
  let paymentDetails: ProcessPaymentRequestBody;

  try {
    paymentDetails = await request.json();
    const { 
      senderUid,
      senderFusionPayId,
      recipientFusionPayId,
      amountToSend, // Expected in smallest unit (e.g., cents)
      currencyFrom,
      currencyTo,
      exchangeRate, // Expected as a scaled integer (e.g., 1.08 USD/EUR as 10800 if scaled by 10000)
      feeAmount     // Expected in smallest unit (e.g., cents)
    } = paymentDetails;

    if (!senderUid || !senderFusionPayId || !recipientFusionPayId || amountToSend === undefined || !currencyFrom || !currencyTo || exchangeRate === undefined || feeAmount === undefined) {
      return NextResponse.json({ error: 'Missing required payment details' }, { status: 400 });
    }

    // 1. Create transaction document in Firestore with 'pending_onchain' status
    const transactionRef = firestoreAdmin.collection('transactions').doc(txId);
    const now = firebaseAdmin.firestore.FieldValue.serverTimestamp();
    
    await transactionRef.set({
      txId,
      senderUid,
      senderFusionPayId,
      recipientFusionPayId,
      amountToSend: amountToSend.toString(), // Store as string for precision
      currencyFrom,
      currencyTo,
      exchangeRate: exchangeRate.toString(),
      feeAmount: feeAmount.toString(),
      status: 'pending_onchain',
      createdAt: now,
      updatedAt: now,
    });

    // 2. Prepare parameters for the smart contract
    const contractParams: PaymentParams = {
      fromFusionPayId: senderFusionPayId,
      toFusionPayId: recipientFusionPayId,
      amount: BigInt(amountToSend),
      fromCurrency: currencyFrom,
      toCurrency: currencyTo,
      fxRate: BigInt(exchangeRate),       // Map from request's exchangeRate to contract's fxRate
      fxRoute: [currencyFrom, currencyTo] // Simple direct route, contract requires fxRoute.length > 0
      // Fee is NOT part of PaymentParams; it's calculated by the contract.
    };

    // 3. Call the smart contract
    const onChainResult = await processPaymentOnChain(txId, contractParams);

    if (!onChainResult.success) {
      await transactionRef.update({
        status: 'failed_onchain',
        onChainError: JSON.parse(JSON.stringify(onChainResult.error, Object.getOwnPropertyNames(onChainResult.error))),
        updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });
      return NextResponse.json({ error: 'Blockchain transaction failed', details: onChainResult.error, txId }, { status: 500 });
    }

    // 4. Update transaction document to 'completed'
    await transactionRef.update({
      status: 'completed',
      transactionHash: onChainResult.transactionHash,
      updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });

    // 5. Update balances in a Firestore transaction
    const db = firestoreAdmin;
    const scaleFactor = BigInt(10000); // Assuming 4 decimal places for exchangeRate scaling

    await db.runTransaction(async (t: Transaction) => { // Explicitly type 't'
      const senderDocRef = db.collection('users').doc(senderUid);
      const senderDoc = await t.get(senderDocRef);
      if (!senderDoc.exists) {
        throw new Error(`Sender with UID ${senderUid} not found.`);
      }

      // Find recipient by fusionPayId
      const recipientsQuery = db.collection('users').where('fusionPayId', '==', recipientFusionPayId).limit(1);
      const recipientQuerySnapshot = await t.get(recipientsQuery);
      if (recipientQuerySnapshot.empty) {
        throw new Error(`Recipient with FusionPayID ${recipientFusionPayId} not found.`);
      }
      const recipientDocRef = recipientQuerySnapshot.docs[0].ref;
      const recipientDoc = await t.get(recipientDocRef); // Already fetched via query snapshot, but good for consistency
      if (!recipientDoc.exists) { // Should not happen if query succeeded
        throw new Error(`Recipient with FusionPayID ${recipientFusionPayId} document somehow missing after query.`);
      }

      const amountToSendBigInt = BigInt(amountToSend);
      const feeAmountBigInt = BigInt(feeAmount);
      const exchangeRateBigInt = BigInt(exchangeRate);

      // Update sender's balance
      const senderCurrentBalance = BigInt(senderDoc.data()?.[`balances`]?.[currencyFrom] || 0);
      const newSenderBalance = senderCurrentBalance - amountToSendBigInt - feeAmountBigInt;
      t.update(senderDocRef, {
        [`balances.${currencyFrom}`]: newSenderBalance.toString(), // Store as string for precision
        updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
        // Potentially add to recentTransactions array here too
      });

      // Calculate amount received by recipient
      // amountReceived = (amountToSend * exchangeRate) / scaleFactor (adjust if currencyFrom and currencyTo are different)
      // If currencyFrom and currencyTo are the same, exchangeRate should be 1 (or 10000 if scaled)
      let amountReceivedBigInt: bigint;
      if (currencyFrom === currencyTo) {
        amountReceivedBigInt = amountToSendBigInt;
      } else {
        amountReceivedBigInt = (amountToSendBigInt * exchangeRateBigInt) / scaleFactor;
      }
      
      const recipientCurrentBalance = BigInt(recipientDoc.data()?.[`balances`]?.[currencyTo] || 0);
      const newRecipientBalance = recipientCurrentBalance + amountReceivedBigInt;
      t.update(recipientDocRef, {
        [`balances.${currencyTo}`]: newRecipientBalance.toString(),
        updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
        // Potentially add to recentTransactions array here too
      });
    });

    console.log(`Transaction ${txId} completed. Hash: ${onChainResult.transactionHash}`);
    return NextResponse.json({ 
      message: 'Payment processed successfully', 
      txId, 
      transactionHash: onChainResult.transactionHash 
    }, { status: 200 });

  } catch (error: any) {
    console.error(`Error in /api/process-payment for TxId ${txId}:`, error);
    if (txId && paymentDetails!) { // Check if paymentDetails was assigned
      // Update transaction to 'failed_internal' if an error occurred before/after blockchain interaction
      const transactionRef = firestoreAdmin.collection('transactions').doc(txId);
      await transactionRef.set({
        txId,
        senderUid: paymentDetails.senderUid,
        senderFusionPayId: paymentDetails.senderFusionPayId,
        recipientFusionPayId: paymentDetails.recipientFusionPayId,
        // ... other details ...
        status: 'failed_internal',
        internalError: error.message,
        updatedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true }); // Merge to avoid overwriting if partially set
    }
    return NextResponse.json({ error: 'Internal server error', details: error.message, txId }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API endpoint for processing payments. Use POST.' });
}
