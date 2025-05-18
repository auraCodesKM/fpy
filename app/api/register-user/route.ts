import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { firestoreAdmin, firebaseAdmin } from '@/lib/firebaseAdmin';
import { registerUserOnChain } from '@/lib/ethersService';

export async function POST(request: Request) {
  console.log('[API /register-user] Received POST request');
  try {
    const body = await request.json();
    const { uid, fusionPayId } = body;

    console.log(`[API /register-user] Processing UID: ${uid}, fusionPayId: ${fusionPayId}`);

    if (!uid || !fusionPayId) {
      console.log('[API /register-user] Missing uid or fusionPayId');
      return NextResponse.json({ error: 'Missing uid or fusionPayId' }, { status: 400 });
    }

    console.log('[API /register-user] Generating new Ethereum wallet...');
    const newWallet = ethers.Wallet.createRandom();
    const newUserAddress = newWallet.address;
    const newUserPrivateKey = newWallet.privateKey;
    console.log(`[API /register-user] New wallet generated: ${newUserAddress}`);

    console.log(`[API /register-user] Registering user on chain: ${fusionPayId}, ${newUserAddress}`);
    const registrationResult = await registerUserOnChain(fusionPayId, newUserAddress);
    console.log('[API /register-user] On-chain registration result:', registrationResult);

    if (!registrationResult.success) {
      console.error('[API /register-user] Blockchain registration failed:', registrationResult.error);
      return NextResponse.json(
        { 
          error: 'Blockchain registration failed',
          details: registrationResult.error ? JSON.parse(JSON.stringify(registrationResult.error, Object.getOwnPropertyNames(registrationResult.error))) : 'Unknown error'
        },
        { status: 500 }
      );
    }

    console.log('[API /register-user] Storing user details in Firestore...');
    const userDocRef = firestoreAdmin.collection('users').doc(uid);
    await userDocRef.set({
      blockchainAddress: newUserAddress,
      blockchainPrivateKey: newUserPrivateKey, 
      fusionPayId: fusionPayId, 
      onChainRegisteredAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    console.log('[API /register-user] User details stored/merged in Firestore successfully.');

    return NextResponse.json({ 
      message: 'User registered successfully on-chain and in Firestore.',
      blockchainAddress: newUserAddress,
      transactionHash: registrationResult.transactionHash
    }, { status: 201 });

  } catch (error: any) {
    console.error('[API /register-user] Critical error:', error);
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
