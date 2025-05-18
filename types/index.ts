// types/index.ts

export interface Transaction {
  id?: string; // Optional: if you fetch them as separate documents later
  type: 'sent' | 'received' | 'deposit';
  amount: number;
  currency: 'USD' | 'EUR' | 'INR';
  to?: string; // fusionPayId or address
  from?: string; // fusionPayId or address
  timestamp: any; // Firebase Timestamp or string for display
  status?: string; // e.g., 'Completed', 'Pending'
  description?: string; // e.g., "Added funds to wallet"
  method?: 'Razorpay' | 'Mock' | string; // Payment method used
  paymentId?: string; // Transaction ID from payment gateway
}

export interface Balances {
  USD: number;
  EUR: number;
  INR: number;
  [key: string]: number; // To allow other currencies if needed
}

export interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  fusionPayId: string;
  balances: Balances;
  recentTransactions: Transaction[];
  createdAt?: Date | null; // Assuming we convert Firestore Timestamp to Date
  lastLoginAt?: Date | null; // Assuming we convert Firestore Timestamp to Date
  walletAddress?: string | null;      // Added for on-chain identity
  isRegisteredOnChain?: boolean; // Added for on-chain identity status
}
