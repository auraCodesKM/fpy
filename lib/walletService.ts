// lib/walletService.ts
import { doc, updateDoc, arrayUnion, increment, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Transaction, UserData } from '../types';

/**
 * Add funds to a user's wallet and record the transaction
 */
export const addFundsToWallet = async (
  userId: string,
  amount: number,
  currency: 'USD' | 'INR' | 'EUR',
  transaction: Transaction
): Promise<UserData> => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Update the user's balance and add the transaction to recentTransactions
    await updateDoc(userRef, {
      [`balances.${currency}`]: increment(amount),
      recentTransactions: arrayUnion(transaction)
    });
    
    // Fetch the updated user data
    const updatedUserDoc = await getDoc(userRef);
    if (!updatedUserDoc.exists()) {
      throw new Error('User document not found after update');
    }
    
    // Return the updated user data
    return {
      uid: userId,
      ...updatedUserDoc.data()
    } as UserData;
  } catch (error) {
    console.error('Error adding funds to wallet:', error);
    throw error;
  }
};

/**
 * Get user's current wallet data
 */
export const getUserWalletData = async (userId: string): Promise<UserData> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User document not found');
    }
    
    return {
      uid: userId,
      ...userDoc.data()
    } as UserData;
  } catch (error) {
    console.error('Error fetching user wallet data:', error);
    throw error;
  }
};
