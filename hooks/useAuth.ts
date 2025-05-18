// hooks/useAuth.ts
import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { User as FirebaseUser, signOut } from 'firebase/auth'; // Added signOut
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserData } from '../types'; // Removed Balances, Transaction as they are part of UserData

interface AuthState {
  user: UserData | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: Error | null;
  logout: () => Promise<void>; // Added logout function type
}

const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<Omit<AuthState, 'logout'>>({ // Omit logout for initial state
    user: null,
    firebaseUser: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setAuthState((prev) => ({ ...prev, firebaseUser, loading: true, error: null }));
        const userRef = doc(db, 'users', firebaseUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const existingData = userDoc.data() as UserData;
            const updateData: Record<string, any> = {
              lastLoginAt: serverTimestamp(),
            };
            if (firebaseUser.displayName && firebaseUser.displayName !== existingData.displayName) {
              updateData.displayName = firebaseUser.displayName;
            }
            if (firebaseUser.photoURL && firebaseUser.photoURL !== existingData.photoURL) {
              updateData.photoURL = firebaseUser.photoURL;
            }
            if (firebaseUser.email && firebaseUser.email !== existingData.email) {
              updateData.email = firebaseUser.email;
            }

            if (Object.keys(updateData).length > 1 || !existingData.lastLoginAt) { // ensure lastLoginAt is always updated if not present
              await updateDoc(userRef, updateData);
            }

            setAuthState((prev) => ({
              ...prev,
              user: {
                ...existingData, // Spread existing data first
                uid: firebaseUser.uid, // Ensure UID is correct
                email: firebaseUser.email || existingData.email, // Use fresh auth data or fallback
                displayName: firebaseUser.displayName || existingData.displayName,
                photoURL: firebaseUser.photoURL || existingData.photoURL,
                lastLoginAt: new Date(), // Client-side approximation for immediate use
              } as UserData,
              loading: false,
            }));
          } else {
            const username = firebaseUser.email?.split('@')[0] || firebaseUser.uid.substring(0,6);
            const newUser: Omit<UserData, 'uid' | 'email' | 'displayName' | 'createdAt' | 'photoURL' | 'lastLoginAt'> = {
              fusionPayId: `${username}@fusionpay`,
              balances: { USD: 0, EUR: 0, INR: 0 }, // Default balances
              recentTransactions: [], // Default empty transactions
            };
            await setDoc(userRef, {
              ...newUser,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL || null,
              createdAt: serverTimestamp(),
              lastLoginAt: serverTimestamp(),
            });
            setAuthState((prev) => ({
              ...prev,
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL || null,
                createdAt: new Date(), // Approximate client-side for createdAt
                lastLoginAt: new Date(), // Approximate client-side for lastLoginAt
                ...newUser,
              },
              loading: false,
            }));
          }
        } catch (err) {
          console.error('Error fetching/creating user document:', err);
          setAuthState((prev) => ({ ...prev, user: null, loading: false, error: err as Error }));
        }
      } else {
        setAuthState({ user: null, firebaseUser: null, loading: false, error: null });
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will handle resetting user, firebaseUser, loading, error state
    } catch (err) {
      console.error("Error signing out: ", err);
      // Optionally set an error state specific to logout if needed
      setAuthState(prev => ({ ...prev, error: err as Error }));
    }
  }, []);

  return { ...authState, logout }; // Return the logout function along with the rest of the state
};

export default useAuth;
