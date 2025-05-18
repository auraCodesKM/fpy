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
      // If user is already onChainRegistered, we might choose to exit early or inform them.
      // For now, we proceed to allow re-triggering registration for robustness.
      if (userDoc.data()?.onChainRegistered) {
        console.log(`[API /register-user] User ${uid} already marked as onChainRegistered. Proceeding with registration attempt anyway.`);
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
