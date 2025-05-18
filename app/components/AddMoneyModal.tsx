import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, CreditCardIcon, BanknotesIcon, CurrencyDollarIcon, CurrencyEuroIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, currency: 'USD' | 'INR' | 'EUR') => void;
  defaultCurrency?: 'USD' | 'INR' | 'EUR';
  glassmorphicCardStyle: string;
  commonHoverTapProps: object;
}

const AddMoneyModal: React.FC<AddMoneyModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultCurrency = 'INR',
  glassmorphicCardStyle,
  commonHoverTapProps
}) => {
  const [amount, setAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'INR' | 'EUR'>(defaultCurrency);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setSelectedCurrency(defaultCurrency);
      setError('');
    }
  }, [isOpen, defaultCurrency]);

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    setError('');
    onSubmit(numericAmount, selectedCurrency);
  };

  const currencyOptions = [
    { value: 'INR', label: 'INR', icon: CurrencyRupeeIcon },
    { value: 'USD', label: 'USD', icon: CurrencyDollarIcon },
    { value: 'EUR', label: 'EUR', icon: CurrencyEuroIcon },
  ] as const;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`${glassmorphicCardStyle} w-full max-w-md p-6 rounded-xl shadow-2xl`} 
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <BanknotesIcon className="h-8 w-8 text-sky-400 mr-3" />
                <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Add Money</h2>
              </div>
              <motion.button {...commonHoverTapProps} onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-700/50">
                <XMarkIcon className="h-6 w-6 text-slate-400" />
              </motion.button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-slate-300 mb-1">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-slate-800/60 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-3 transition-colors duration-150"
                />
              </div>

              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-slate-300 mb-1">Currency</label>
                <div className="relative">
                  <select
                    id="currency"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value as 'USD' | 'INR' | 'EUR')}
                    className="w-full bg-slate-800/60 border border-slate-700 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-3 appearance-none pr-10 transition-colors duration-150"
                  >
                    {currencyOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                     {React.createElement(currencyOptions.find(c => c.value === selectedCurrency)?.icon || BanknotesIcon, { className: "h-5 w-5"})}
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <motion.button
                {...commonHoverTapProps}
                onClick={handleSubmit}
                className="w-full flex items-center justify-center bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-150 text-base"
              >
                <CreditCardIcon className="h-5 w-5 mr-2" />
                Proceed to Pay
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddMoneyModal;
