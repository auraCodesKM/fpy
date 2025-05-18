import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { UserData } from '@/types'; // Assuming UserData type is available

interface SendPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserData | null;
}

const SendPaymentModal: React.FC<SendPaymentModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [recipientFusionPayId, setRecipientFusionPayId] = useState('');
  const [amount, setAmount] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('USD'); // Default or from user balance
  const [currencyTo, setCurrencyTo] = useState('USD');   // Default
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{ txId: string; transactionHash: string } | null>(null);

  useEffect(() => {
    // Reset form when modal opens or currentUser changes
    if (isOpen) {
      setRecipientFusionPayId('');
      setAmount('');
      setCurrencyFrom('USD'); 
      setCurrencyTo('USD');
      setError(null);
      setSuccessResult(null);
      setIsLoading(false);
    }
  }, [isOpen, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !currentUser.fusionPayId || !currentUser.uid) {
      setError('User data not available. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessResult(null);

    if (!recipientFusionPayId || !amount || !currencyFrom || !currencyTo) {
      setError('All fields are required.');
      setIsLoading(false);
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Invalid amount.');
      setIsLoading(false);
      return;
    }

    const payload = {
      senderUid: currentUser.uid,
      senderFusionPayId: currentUser.fusionPayId,
      recipientFusionPayId,
      amountToSend: Math.round(numericAmount * 100), 
      currencyFrom,
      currencyTo,
      exchangeRate: currencyFrom === currencyTo ? 10000 : 10000, 
    };

    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Payment failed');
      }

      setSuccessResult({ txId: result.txId, transactionHash: result.transactionHash });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
  
  const inputStyle = "w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300 ease-in-out text-white";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={onClose} 
          />
          
          <motion.div
            variants={cardVariants}
            className="relative bg-slate-800/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-slate-400 hover:text-sky-400 transition-colors"
              aria-label="Close modal"
            >
              <XMarkIcon className="h-7 w-7" />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-sky-400 mb-6 text-center">Send Payment</h2>

            {!successResult ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="recipientId" className="block text-sm font-medium text-sky-300 mb-1.5">Recipient's FusionPay ID</label>
                  <input 
                    type="text" 
                    id="recipientId" 
                    value={recipientFusionPayId}
                    onChange={(e) => setRecipientFusionPayId(e.target.value)}
                    className={inputStyle}
                    placeholder="e.g., user.fusionpay"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-sky-300 mb-1.5">Amount</label>
                    <input 
                      type="number" 
                      id="amount" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={inputStyle}
                      placeholder="0.00"
                      required
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label htmlFor="currencyFrom" className="block text-sm font-medium text-sky-300 mb-1.5">From</label>
                    <select 
                      id="currencyFrom" 
                      value={currencyFrom}
                      onChange={(e) => setCurrencyFrom(e.target.value)}
                      className={inputStyle}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                </div>
                
                {error && <p className="text-sm text-red-400 bg-red-900/30 p-3 rounded-lg">{error}</p>}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-800/50 disabled:text-sky-500/70 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Review & Send'}
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20}} className="mx-auto w-16 h-16 text-green-400">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-semibold text-green-400">Payment Successful!</h3>
                <p className="text-slate-300 text-sm sm:text-base">Your transaction has been processed.</p>
                
                <div className="text-left bg-slate-700/50 p-4 rounded-lg space-y-2 text-sm">
                  <p className="text-slate-300">
                    <span className="font-medium text-sky-300">Transaction ID:</span> {successResult.txId}
                  </p>
                  <p className="text-slate-300">
                    <span className="font-medium text-sky-300">Transaction Hash:</span> 
                    <a 
                      href={`https://sepolia.basescan.org/tx/${successResult.transactionHash}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300 underline break-all ml-1"
                    >
                      {successResult.transactionHash}
                    </a>
                  </p>
                </div>

                <button 
                  onClick={onClose}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-150 mt-2"
                >
                  Done
                </button>
              </div>
            )}
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendPaymentModal;
