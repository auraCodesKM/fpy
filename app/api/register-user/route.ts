import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { firestoreAdmin, firebaseAdmin } from '@/lib/firebaseAdmin';
import { registerUserOnChain } from '@/lib/ethersService';

export async function POST(request: Request) {
  console.log('[API /register-user] Received POST request');
  let body: any; // Declare body here to be accessible in catch block
  try {
    body = await request.json();
    const { uid, fusionPayId } = body;

    console.log(`[API /register-user] Processing UID: ${uid}, fusionPayId: ${fusionPayId}`);

    if (!uid || !fusionPayId) {
      console.log('[API /register-user] Missing uid or fusionPayId');
      return NextResponse.json({ error: 'Missing uid or fusionPayId' }, { status: 400 });
    }

    const userDocRef = firestoreAdmin.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    let userBlockchainAddress: string;
    let userBlockchainPrivateKey: string | undefined = undefined; // Private key only if newly generated

    if (userDoc.exists && userDoc.data()?.blockchainAddress) {
      userBlockchainAddress = userDoc.data()?.blockchainAddress;
      console.log(`[API /register-user] Found existing blockchainAddress: ${userBlockchainAddress} for UID: ${uid}`);
      
      if (userDoc.data()?.onChainRegistered) {
        console.log(`[API /register-user] User ${uid} is already marked as onChainRegistered.`);
        return NextResponse.json({
          message: 'User is already registered and verified on-chain.',
          blockchainAddress: userBlockchainAddress,
          fusionPayId: userDoc.data()?.fusionPayId || fusionPayId, // send back fusionPayId
          alreadyRegistered: true // Add a flag for the frontend
        }, { status: 200 });
      }
    } else {
      console.log('[API /register-user] No existing blockchainAddress found or user document does not exist. Generating new Ethereum wallet...');
      const newWallet = ethers.Wallet.createRandom();
      userBlockchainAddress = newWallet.address;
      userBlockchainPrivateKey = newWallet.privateKey; // Only store private key if newly generated
      console.log(`[API /register-user] New wallet generated: ${userBlockchainAddress}`);
    }

    console.log(`[API /register-user] Attempting on-chain registration for: ${fusionPayId} with address: ${userBlockchainAddress}`);
    const registrationResult = await registerUserOnChain(fusionPayId, userBlockchainAddress);
    console.log('[API /register-user] On-chain registration result:', registrationResult);

    if (!registrationResult.success) {
      console.error('[API /register-user] Blockchain registration failed:', registrationResult.error);
      // Update Firestore with failure status if needed
      // Check if the error indicates the user is already registered - this shouldn't happen if the above check works,
      // but as a safeguard, we can prevent overwriting onChainRegistered to false.
      const isAlreadyRegisteredError = registrationResult.error && 
                                       typeof registrationResult.error === 'object' && 
                                       'reason' in registrationResult.error && 
                                       typeof registrationResult.error.reason === 'string' &&
                                       registrationResult.error.reason.includes('User ID already registered');

      if (isAlreadyRegisteredError) {
        // This case should ideally be caught by the check at the beginning.
        // If somehow reached, implies user was registered on-chain but not in Firestore.
        // We should then update Firestore to reflect the on-chain status.
        console.warn('[API /register-user] Blockchain reported user already registered, but Firestore did not reflect this. Updating Firestore.');
        await userDocRef.set({
          blockchainAddress: userBlockchainAddress, // We have this from earlier attempt
          fusionPayId: fusionPayId,
          onChainRegistered: true,
          onChainRegisteredAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
          onChainRegistrationAttemptFailed: firebaseAdmin.firestore.FieldValue.delete(),
          lastOnChainRegistrationError: firebaseAdmin.firestore.FieldValue.delete(),
        }, { merge: true });
        return NextResponse.json({
          message: 'User was already registered on-chain. Firestore updated.',
          blockchainAddress: userBlockchainAddress,
          transactionHash: null, // No new transaction
          alreadyRegistered: true
        }, { status: 200 });
      }

      await userDocRef.set({
        onChainRegistrationAttemptFailed: true,
        lastOnChainRegistrationError: registrationResult.error ? JSON.parse(JSON.stringify(registrationResult.error, Object.getOwnPropertyNames(registrationResult.error))) : 'Unknown error',
        lastOnChainRegistrationAttemptAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      return NextResponse.json(
        { 
          error: 'Blockchain registration failed',
          details: registrationResult.error ? JSON.parse(JSON.stringify(registrationResult.error, Object.getOwnPropertyNames(registrationResult.error))) : 'Unknown error'
        },
        { status: 500 }
      );
    }

    console.log('[API /register-user] Storing/updating user details in Firestore...');
    const firestoreUpdateData: any = {
      fusionPayId: fusionPayId, // Ensure fusionPayId is also set/updated
      blockchainAddress: userBlockchainAddress,
      onChainRegistered: true,
      onChainRegisteredAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      onChainRegistrationAttemptFailed: firebaseAdmin.firestore.FieldValue.delete(), // Remove failure flag on success
      lastOnChainRegistrationError: firebaseAdmin.firestore.FieldValue.delete(),   // Remove last error on success
    };

    if (userBlockchainPrivateKey) {
      firestoreUpdateData.blockchainPrivateKey = userBlockchainPrivateKey;
    }

    await userDocRef.set(firestoreUpdateData, { merge: true });
    console.log('[API /register-user] User details stored/merged in Firestore successfully.');

    return NextResponse.json({ 
      message: 'User registered successfully on-chain and in Firestore.',
      blockchainAddress: userBlockchainAddress,
      transactionHash: registrationResult.transactionHash
    }, { status: 201 });

  } catch (error: any) {
    console.error('[API /register-user] Critical error:', error);
    const userDocRefOnError = firestoreAdmin.collection('users').doc(body?.uid || 'unknown_uid_on_error');
    try {
        await userDocRefOnError.set({
            onChainRegistrationAttemptFailed: true,
            lastOnChainRegistrationError: `Critical API Error: ${error.message || JSON.stringify(error, Object.getOwnPropertyNames(error))}`,
            lastOnChainRegistrationAttemptAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    } catch (firestoreError) {
        console.error('[API /register-user] Failed to write error to Firestore:', firestoreError);
    }
    return NextResponse.json(
        { 
            error: 'Internal server error',
            details: error.message ? error.message : JSON.stringify(error, Object.getOwnPropertyNames(error))
        },
        { status: 500 }
    );
  }
}

export async function GET() {
  console.log('[API /register-user] Received GET request');
  return NextResponse.json({ message: 'This is the user registration endpoint. Use POST to register.' });
}
