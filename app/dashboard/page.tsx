"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserData, Transaction } from '../../types';
import { HomeIcon, WalletIcon, ArrowsRightLeftIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon, UserCircleIcon, Bars3Icon, XMarkIcon, PresentationChartBarIcon, BanknotesIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, CalendarDaysIcon, InformationCircleIcon, PaperAirplaneIcon, PlusCircleIcon, ArrowDownTrayIcon, BoltIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AddMoneyModal from '../components/AddMoneyModal';
import SendPaymentModal from '../components/modals/SendPaymentModal'; // Corrected import path
import { initializeRazorpayPayment, createTransactionRecord } from '../../lib/razorpay';
import { addFundsToWallet } from '../../lib/walletService';
import { toast, Toaster } from 'react-hot-toast';

type ViewName = 'dashboard' | 'wallets' | 'transactions' | 'settings';

interface NavLinkProps {
  viewName: ViewName;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & { title?: string; titleId?: string; } & React.RefAttributes<SVGSVGElement>>;
  label: string;
}

const DashboardPage: React.FC = () => {
  const { user, firebaseUser, loading, error, logout } = useAuth();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewName>('dashboard');
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isSendPaymentModalOpen, setIsSendPaymentModalOpen] = useState(false); // Added state for modal

  const handleAddMoneySubmit = async (amount: number, currency: 'USD' | 'INR' | 'EUR') => {
    console.log('Add Money Submitted:', { amount, currency });
    
    if (!user || !firebaseUser) {
      toast.error('You must be logged in to add funds');
      return;
    }

    try {
      if (currency === 'INR') {
        // Use Razorpay for INR transactions
        initializeRazorpayPayment(
          amount,
          currency,
          {
            name: user.displayName || 'FusionPay User',
            email: user.email || 'user@example.com',
          },
          async (paymentId: string) => {
            try {
              // Create transaction record
              const transaction = createTransactionRecord(
                user.uid,
                amount,
                currency,
                paymentId,
                'Razorpay'
              );

              // Update user's wallet in Firestore
              const updatedUser = await addFundsToWallet(
                user.uid,
                amount,
                currency,
                transaction
              );

              // Close modal and show success message
              setIsAddMoneyModalOpen(false);
              toast.success(`Successfully added ${amount} ${currency} to your wallet!`);
            } catch (error) {
              console.error('Error updating wallet after Razorpay payment:', error);
              toast.error('Payment was successful, but there was an error updating your wallet. Please contact support.');
            }
          },
          (error) => {
            console.error('Razorpay payment failed:', error);
            toast.error(`Payment failed: ${error.message || 'Unknown error'}`);
          }
        );
      } else {
        // Mock payment for other currencies
        // Create transaction record
        const transaction = createTransactionRecord(
          user.uid,
          amount,
          currency,
          `mock-${Date.now()}`,
          'Mock'
        );

        // Update user's wallet in Firestore
        const updatedUser = await addFundsToWallet(
          user.uid,
          amount,
          currency,
          transaction
        );

        // Close modal and show success message
        setIsAddMoneyModalOpen(false);
        toast.success(`Successfully added ${amount} ${currency} to your wallet!`);
      }
    } catch (error) {
      console.error('Error in add money flow:', error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: mainScrollRef });
  const parallaxHeaderY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const parallaxHeaderOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.push('/auth');
    }
  }, [firebaseUser, loading, router]);

  // Animation Variants
  const commonHoverTapProps = {
    whileHover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
    whileTap: { scale: 0.95 },
  };

  const iconHoverProps = {
    whileHover: { scale: 1.2, rotate: 5, transition: { type: 'spring', stiffness: 400 } }
  };

  const navListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  };

  const sectionVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
    exit: { opacity: 0, x: 30, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  const AnimatedSkeletonCard: React.FC<{count?: number}> = ({count = 1}) => (
    <>
    {Array.from({length: count}).map((_, index) => (
      <div key={index} className="h-64 bg-slate-700/30 backdrop-blur-md rounded-xl shadow-lg p-6 border border-slate-600/50 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-slate-600/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />
        <div className="h-6 w-3/4 bg-slate-600/50 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-slate-600/50 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-slate-600/50 rounded"></div>
      </div>
    ))}
    </>
  );

  const glassmorphicCardStyle = "bg-slate-800/30 backdrop-blur-lg rounded-xl shadow-2xl p-6 border border-slate-700/50 relative overflow-hidden";

  const NavLink: React.FC<{ viewName: ViewName; icon: React.ElementType; label: string }> = ({ viewName, icon: Icon, label }): React.ReactElement => (
    <motion.a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setCurrentView(viewName);
        setIsMobileSidebarOpen(false);
      }}
      className={`relative flex items-center px-4 py-3 text-sm font-medium rounded-lg group transition-colors duration-200 
                  ${currentView === viewName ? 'text-white bg-sky-600/30' : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}`}
      variants={navItemVariants}
      {...commonHoverTapProps}
    >
      <motion.div {...iconHoverProps}>
        <Icon className={`h-5 w-5 mr-3 transition-colors duration-200 ${currentView === viewName ? 'text-sky-300' : 'text-slate-400 group-hover:text-sky-400'}`} />
      </motion.div>
      {label}
      {currentView === viewName && (
        <motion.div
          layoutId="activeNavHighlight"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full"
          initial={false}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </motion.a>
  );

  const sidebarContent = (
    <>
      <motion.div 
        className="p-6 border-b border-slate-700/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1, type: 'spring', stiffness: 200 }}}
      >
        <h1 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">
          FusionPay
        </h1>
        <p className="text-xs text-slate-400 mt-1">Next-Gen Finance</p>
      </motion.div>

      <motion.nav 
        className="flex-grow px-4 py-6 space-y-2 overflow-y-auto"
        variants={navListVariants}
        initial="hidden"
        animate="visible"
      >
        <NavLink viewName='dashboard' icon={HomeIcon} label="Dashboard" />
        <NavLink viewName='wallets' icon={WalletIcon} label="Wallets" />
        <NavLink viewName='transactions' icon={ArrowsRightLeftIcon} label="Transactions" />
        <NavLink viewName='settings' icon={Cog6ToothIcon} label="Settings" />
      </motion.nav>

      <motion.div 
        className="p-4 border-t border-slate-700/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.6, type: 'spring', stiffness: 200, damping: 20 }}}
      >
        <div className="flex items-center mb-3">
          {user?.photoURL ? (
            <motion.img 
              src={user?.photoURL} 
              alt={user?.displayName || 'User'} 
              className="h-10 w-10 rounded-full mr-3 border-2 border-sky-500/70"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 15, delay: 0.7 } }}
            />
          ) : (
            <UserCircleIcon className="h-10 w-10 text-slate-400 mr-3" />
          )}
          <div>
            <p className="text-sm font-medium text-slate-200 truncate">{user?.displayName || user?.email?.split('@')[0] || 'Fusion User'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email || 'No email provided'}</p>
          </div>
        </div>
        <motion.button
          onClick={async () => {
            await logout();
            setIsMobileSidebarOpen(false);
          }}
          className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-300 rounded-lg bg-slate-700/70 hover:bg-red-600/70 hover:text-white transition-colors duration-200 group"
          {...commonHoverTapProps}
        >
          <motion.div {...iconHoverProps}>
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-slate-400 group-hover:text-red-300 transition-colors duration-200" />
          </motion.div>
          Logout
        </motion.button>
      </motion.div>
    </>
  );

  const WalletBalancesDisplay: React.FC<{ balances: UserData['balances'] | undefined }> = ({ balances }) => {
    if (!balances || Object.keys(balances).length === 0) {
      return (
        <div className={`${glassmorphicCardStyle} flex flex-col items-center justify-center min-h-[200px]`}>
          <InformationCircleIcon className="h-12 w-12 text-sky-500 mb-3" />
          <h3 className="text-xl font-semibold text-slate-200 mb-1">No Balance Data</h3>
          <p className="text-sm text-slate-400 text-center">Your wallet balances will appear here once available.</p>
        </div>
      );
    }

    const currencyDisplayOrder = ['USD', 'EUR', 'INR']; // Add more or fetch dynamically if needed
    const displayBalances = currencyDisplayOrder.filter(currency => balances.hasOwnProperty(currency));

    return (
      <div className={`${glassmorphicCardStyle}`}>
        <div className="flex items-center mb-4">
          <BanknotesIcon className="h-7 w-7 text-sky-400 mr-3" />
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Wallet Balances</h2>
        </div>
        <div className="space-y-3">
          {displayBalances.map((currency) => (
            <div key={currency} className="p-3 bg-slate-700/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg text-slate-300 font-medium">{currency}</span>
                <span className="text-xl font-semibold text-sky-300">
                  {new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balances[currency] || 0)}
                </span>
              </div>
              <div className="flex space-x-2 mt-1">
                <motion.button 
                  {...commonHoverTapProps}
                  onClick={() => alert(`Send ${currency} clicked - placeholder`)}
                  className="flex-1 text-xs bg-sky-600/70 hover:bg-sky-500/70 text-white py-1.5 px-2 rounded-md flex items-center justify-center transition-colors duration-150">
                  <PaperAirplaneIcon className="h-3.5 w-3.5 mr-1.5" /> Send
                </motion.button>
                <motion.button 
                  {...commonHoverTapProps}
                  onClick={() => setIsAddMoneyModalOpen(true)}
                  className="flex-1 text-xs bg-green-600/70 hover:bg-green-500/70 text-white py-1.5 px-2 rounded-md flex items-center justify-center transition-colors duration-150">
                  <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-1.5" /> Add Funds
                </motion.button>
              </div>
            </div>
          ))}
          {Object.keys(balances).filter(b => !displayBalances.includes(b)).length > 0 && (
             <p className="text-xs text-slate-500 pt-2">Other balances available in Wallets section.</p>
          )}
        </div>
      </div>
    );
  };

  const QuickActionsCard: React.FC = () => {
    const actionButtonClass = "flex flex-col items-center justify-center p-4 bg-slate-700/50 hover:bg-sky-600/50 rounded-lg text-slate-300 hover:text-white transition-all duration-200 aspect-square";
    const iconClass = "h-8 w-8 mb-2 text-sky-400 group-hover:text-sky-300 transition-colors duration-200";

    return (
      <div className={`${glassmorphicCardStyle}`}>
        <div className="flex items-center mb-4">
          <BoltIcon className="h-7 w-7 text-sky-400 mr-3" />
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <motion.button {...commonHoverTapProps} className={actionButtonClass} onClick={() => setIsSendPaymentModalOpen(true)}> // Updated to open modal
            <PaperAirplaneIcon className={iconClass} />
            <span className="text-sm font-medium text-center">Send Payment</span>
          </motion.button>
          <motion.button {...commonHoverTapProps} className={actionButtonClass} onClick={() => alert('Request Payment clicked - placeholder') }>
            <ArrowDownCircleIcon className={iconClass} /> {/* Re-using, consider specific request icon later */}
            <span className="text-sm font-medium text-center">Request Payment</span>
          </motion.button>
          <motion.button 
            {...commonHoverTapProps} 
            className={actionButtonClass} 
            onClick={() => setIsAddMoneyModalOpen(true)}>
            <PlusCircleIcon className={iconClass} />
            <span className="text-sm font-medium text-center">Add Funds</span>
          </motion.button>
        </div>
      </div>
    );
  };

  const RecentTransactionsDisplay: React.FC<{ transactions: UserData['recentTransactions'] | undefined }> = ({ transactions }) => {
    if (!transactions || transactions.length === 0) {
      return (
        <div className={`${glassmorphicCardStyle} flex flex-col items-center justify-center min-h-[200px]`}>
          <InformationCircleIcon className="h-12 w-12 text-sky-500 mb-3" />
          <h3 className="text-xl font-semibold text-slate-200 mb-1">No Recent Transactions</h3>
          <p className="text-sm text-slate-400 text-center">Your recent transactions will appear here.</p>
        </div>
      );
    }

    return (
      <div className={`${glassmorphicCardStyle}`}>
        <div className="flex items-center mb-4">
          <PresentationChartBarIcon className="h-7 w-7 text-sky-400 mr-3" />
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-400">Recent Transactions</h2>
        </div>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg text-slate-300 font-medium">{transaction.type}</span>
                <span className="text-xl font-semibold text-sky-300">
                  {new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(transaction.amount)}
                </span>
              </div>
              <div className="flex space-x-2 mt-1">
                <motion.button 
                  {...commonHoverTapProps}
                  onClick={() => alert(`View ${transaction.type} clicked - placeholder`)}
                  className="flex-1 text-xs bg-sky-600/70 hover:bg-sky-500/70 text-white py-1.5 px-2 rounded-md flex items-center justify-center transition-colors duration-150">
                  <CalendarDaysIcon className="h-3.5 w-3.5 mr-1.5" /> View
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SettingsView: React.FC<{ user: UserData }> = ({ user }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const [isRegisteringOnChain, setIsRegisteringOnChain] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState('');

    const handlePasswordUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      setUpdateMessage('');
      if (newPassword !== confirmNewPassword) {
        setUpdateMessage('New passwords do not match.');
        return;
      }
      if (!firebaseUser) {
        setUpdateMessage('User not authenticated.');
        return;
      }
      setIsUpdatingPassword(true);
      try {
        // Re-authenticate is often needed for sensitive operations like password change
        // This example assumes you have a way to get current credentials or handle re-auth
        // For simplicity, directly calling updatePassword. In a real app, re-auth first.
        // const credential = firebase.auth.EmailAuthProvider.credential(firebaseUser.email!, currentPassword);
        // await firebaseUser.reauthenticateWithCredential(credential);
        // await firebaseUser.updatePassword(newPassword);
        setUpdateMessage('Password update functionality is not fully implemented in this mock.');
        // For now, just simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error: any) {
        setUpdateMessage(`Error: ${error.message}`);
      } finally {
        setIsUpdatingPassword(false);
      }
    };

    const handleRegisterOnChain = async () => {
      if (!user || !user.uid || !user.fusionPayId) {
        setRegistrationStatus('Error: User data or FusionPay ID is missing.');
        return;
      }
      setIsRegisteringOnChain(true);
      setRegistrationStatus('Processing registration...');
      try {
        const response = await fetch('/api/register-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: user.uid, fusionPayId: user.fusionPayId }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.details || data.error || 'On-chain registration failed.');
        }
        setRegistrationStatus(`Successfully registered/verified! Address: ${data.blockchainAddress}, Tx: ${data.transactionHash}`);
        // Optionally, trigger a refresh of user data if 'onChainRegistered' flag is added to useAuth
      } catch (error: any) {
        setRegistrationStatus(`Error: ${error.message}`);
      } finally {
        setIsRegisteringOnChain(false);
      }
    };

    const UserProfileCard: React.FC<{ user: UserData }> = ({ user }) => (
      <div className={`${glassmorphicCardStyle} mb-8`}>
        <h3 className="text-xl font-semibold text-sky-300 mb-4">User Profile</h3>
        <div className="space-y-2 text-slate-300">
          <p><strong>Name:</strong> {user.displayName || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
          <p><strong>FusionPay ID:</strong> {user.fusionPayId || 'N/A'}</p>
          <p><strong>Blockchain Address:</strong> {user.blockchainAddress || 'Not yet registered'}</p>
          {/* Add onChainRegistered status display once available in UserData */}
          {/* <p><strong>On-Chain Status:</strong> {user.onChainRegistered ? 'Registered' : 'Not Registered'}</p> */}
        </div>
        <div className="mt-6">
          <button
            onClick={handleRegisterOnChain}
            disabled={isRegisteringOnChain}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-800/50 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 text-base mb-2"
          >
            {isRegisteringOnChain ? 'Registering...' : 'Register / Verify On-Chain Identity'}
          </button>
          {registrationStatus && (
            <p className={`mt-2 text-sm ${registrationStatus.startsWith('Error:') ? 'text-red-400' : 'text-green-400'}`}>
              {registrationStatus}
            </p>
          )}
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        <UserProfileCard user={user} />
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-sky-300 tracking-tight">Change Password</h3>
        </div>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Current Password:</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">New Password:</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Confirm New Password:</label>
            <input 
              type="password" 
              value={confirmNewPassword} 
              onChange={(e) => setConfirmNewPassword(e.target.value)} 
              className="w-full p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75"
            />
          </div>
          <motion.button 
            type="submit"
            disabled={isUpdatingPassword}
            className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-sky-800/50 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-102 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 text-base"
          >
            {isUpdatingPassword ? 'Updating...' : 'Update Password'}
          </motion.button>
          {updateMessage && (
            <p className={`mt-2 text-sm ${updateMessage.startsWith('Error:') ? 'text-red-400' : 'text-green-400'}`}>
              {updateMessage}
            </p>
          )}
        </form>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="dark">
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <>
      <AddMoneyModal 
        isOpen={isAddMoneyModalOpen} 
        onClose={() => setIsAddMoneyModalOpen(false)} 
        onSubmit={handleAddMoneySubmit} 
        commonHoverTapProps={commonHoverTapProps}
        glassmorphicCardStyle={glassmorphicCardStyle} />
      <SendPaymentModal 
        isOpen={isSendPaymentModalOpen}
        onClose={() => setIsSendPaymentModalOpen(false)}
        currentUser={user}
      />
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'backdrop-blur-lg bg-slate-800/80 text-white border border-slate-700/50',
          style: {
            borderRadius: '10px',
            background: 'rgba(15, 23, 42, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <motion.div 
        initial={{ opacity: 0 }}
        className="flex min-h-screen text-slate-100 font-sans overflow-hidden"
        style={{ 
          backgroundSize: '400% 400%',
          backgroundImage: 'linear-gradient(-45deg, #1e293b, #334155, #475569, #0f172a, #334155, #1e293b)' 
        }}
        animate={{
          opacity: 1,
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          opacity: { duration: 0.7, delay: 0.2, ease: "easeInOut" },
          backgroundPosition: { 
            duration: 20, 
            ease: 'linear', 
            repeat: Infinity, 
            repeatType: 'mirror' 
          }
        }}
      >
        {/* Mobile Header with Hamburger Menu */} 
        <motion.header 
          className="sm:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50"
          initial={{ y: -100 }}
          animate={{ y: 0, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.1 } }}
        >
          <h1 className="text-xl font-semibold text-sky-400">FusionPay</h1>
          <motion.button 
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} 
            className="text-slate-300 hover:text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            {...commonHoverTapProps}
          >
            <AnimatePresence initial={false} mode='wait'>
              <motion.div
                key={isMobileSidebarOpen ? 'xmark' : 'bars3'}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1}}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileSidebarOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.header>

        {/* Sidebar for Mobile (Sliding) */} 
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 z-40 w-64 h-full backdrop-blur-xl bg-slate-800/90 border-r border-slate-700/50 shadow-2xl flex flex-col sm:hidden pt-16"
            >
              {sidebarContent}
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar for Desktop (Fixed) */} 
        <aside className="hidden sm:fixed sm:top-0 sm:left-0 sm:z-30 sm:w-64 sm:h-screen sm:flex sm:flex-col backdrop-blur-lg bg-slate-800/60 border-r border-slate-700/50 shadow-2xl">
          {sidebarContent}
        </aside>

        {/* Main Content Area */} 
        <main ref={mainScrollRef} className="flex-1 p-6 mt-16 sm:mt-0 sm:ml-64 overflow-y-auto relative">
          <motion.div
            className="w-full"
          >
            {/* Actual Parallax Header */}
            <motion.div
              className="sticky top-0 z-10 -mx-6 sm:-mx-10"
              style={{ y: parallaxHeaderY, opacity: parallaxHeaderOpacity }}
            >
              <div className="h-48 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-lg rounded-b-xl shadow-2xl p-6 flex flex-col justify-center items-center text-center border-b border-slate-700/60">
                <h2 className="text-3xl font-bold text-slate-100">Welcome, {user?.displayName || user?.email?.split('@')[0] || 'User'}!</h2>
                <p className="text-slate-300 mt-1 text-sm">Here's your financial snapshot.</p>
              </div>
            </motion.div>

            {/* View-specific content with AnimatePresence */} 
            <div className="pt-6"> 
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {currentView === 'dashboard' && (
                    <div>
                      <h3 className="text-3xl font-semibold text-sky-300 mb-6 tracking-tight">Dashboard Overview</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <WalletBalancesDisplay balances={user?.balances} />
                        <RecentTransactionsDisplay transactions={user?.recentTransactions} />
                        <QuickActionsCard />
                      </div>
                    </div>
                  )}
                  {currentView === 'wallets' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-3xl font-semibold text-sky-300 tracking-tight">My Wallets</h3>
                        <motion.button 
                          {...commonHoverTapProps}
                          onClick={() => setIsAddMoneyModalOpen(true)}
                          className="flex items-center bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-md transition-all duration-150 text-sm"
                        >
                          <PlusCircleIcon className="h-5 w-5 mr-2" />
                          Add Money
                        </motion.button>
                      </div>
                      <p className="text-slate-400">Your wallet balances will be displayed here. Use the 'Add Money' button to top up.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(['USD', 'INR', 'EUR'] as const).map(curr => (
                          <div key={curr} className={`${glassmorphicCardStyle} p-6 rounded-xl`}>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-2xl font-semibold text-sky-300">{curr} Balance</span>
                              {/* Icon for currency could go here */}
                            </div>
                            <p className="text-3xl font-bold text-white">
                              {new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(user?.balances?.[curr] || 0)}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">Equivalent to XYZ in primary currency</p> {/* Placeholder */}
                          </div>
                        ))}
                      </div>
                      <AnimatedSkeletonCard count={1} /> {/* Placeholder for more wallet features */}
                    </div>
                  )}
                  {currentView === 'transactions' && (
                    <div>
                      <h3 className="text-2xl font-semibold text-amber-300 mb-4">All Transactions</h3>
                      {/* Placeholder for full transaction list/table */}
                      {Array.from({ length: 8 }).map((_, idx) => <AnimatedSkeletonCard key={`txn-skeleton-${idx}`} />)}
                    </div>
                  )}
                  {currentView === 'settings' && (
                    <SettingsView user={user} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </main>
      </motion.div>
    </>
  );
};

export default DashboardPage;
