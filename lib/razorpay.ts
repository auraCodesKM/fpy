// lib/razorpay.ts
import { Transaction } from '../types';

// Razorpay key for test mode
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_a4zcZABGsJEBrs';

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Interface for Razorpay options
interface RazorpayOptions {
  key: string;
  amount: number; // in paise (INR)
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill: {
    name: string;
    email: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme: {
    color: string;
  };
  handler: (response: any) => void;
}

// Initialize Razorpay payment
export const initializeRazorpayPayment = async (
  amount: number, // in currency units (e.g., rupees)
  currency: string,
  userDetails: {
    name: string;
    email: string;
  },
  onSuccess: (paymentId: string) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error('Razorpay SDK failed to load');
    }

    // Convert amount to paise (for INR)
    const amountInPaise = Math.round(amount * 100);

    // Razorpay options
    const options: RazorpayOptions = {
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: currency,
      name: 'FusionPay',
      description: `Add ${amount} ${currency} to your FusionPay wallet`,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
      },
      theme: {
        color: '#0ea5e9', // sky-500 color
      },
      handler: function (response) {
        // Handle successful payment
        onSuccess(response.razorpay_payment_id);
      },
    };

    // Initialize Razorpay
    const razorpay = new (window as any).Razorpay(options);
    razorpay.on('payment.failed', (response: any) => {
      onError(response.error);
    });
    razorpay.open();
  } catch (error) {
    onError(error);
  }
};

// Create a transaction object for Firestore
export const createTransactionRecord = (
  userId: string,
  amount: number,
  currency: 'USD' | 'INR' | 'EUR',
  paymentId?: string,
  method: 'Razorpay' | 'Mock' = 'Mock'
): Transaction => {
  return {
    type: 'deposit',
    amount,
    currency,
    to: userId,
    timestamp: new Date(),
    status: 'Completed',
    description: `Added ${amount} ${currency} to wallet`,
    method,
    paymentId,
  };
};
