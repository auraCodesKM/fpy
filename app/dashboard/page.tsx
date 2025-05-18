"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'; 
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth'; 
import { UserData, Transaction } from '@/types';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeftIcon, Cog8ToothIcon, HomeIcon, WalletIcon, ArrowsRightLeftIcon, CreditCardIcon, ClockIcon, InformationCircleIcon, BanknotesIcon, PlusCircleIcon, PaperAirplaneIcon, UserCircleIcon, ArrowPathIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, MagnifyingGlassIcon, ChevronDownIcon, BuildingLibraryIcon, PowerIcon, BellIcon, LifebuoyIcon, QuestionMarkCircleIcon,
  CurrencyDollarIcon, CurrencyEuroIcon, CurrencyRupeeIcon, WrenchScrewdriverIcon, CheckCircleIcon // Added CheckCircleIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import Image from 'next/image';
import LoadingSpinner from '@/app/components/LoadingSpinner'; 
import AddMoneyModal from '@/app/components/AddMoneyModal'; 
import SendPaymentModal from '@/app/components/modals/SendPaymentModal'; 
import { FusionPayLogo } from '@/components/fusion-pay-logo';

const glassmorphicCardStyle = "bg-indigo-950/25 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-indigo-700/40";
const buttonStyle = "bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center justify-center text-base";
const secondaryButtonStyle = "bg-indigo-800/60 hover:bg-indigo-700/80 text-indigo-100 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 ease-in-out flex items-center justify-center text-base"; 
const commonHoverTapProps = {
  whileHover: { scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  whileTap: { scale: 0.97 },
};

const sectionVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.2, ease: 'anticipate' } }
};

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      type: 'spring',
      stiffness: 120,
      damping: 15
    }
  })
};

const cardHoverEffect = {
  whileHover: { y: -8, boxShadow: "0px 20px 35px rgba(0,0,0,0.25), 0px 10px 15px rgba(0,0,0,0.2)", scale: 1.02, transition: { type: 'spring', stiffness: 200, damping: 12 } }
};

const DashboardPage: React.FC = () => {
  const { user, loading, logout } = useAuth(); 
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'dashboard' | 'wallets' | 'transactions' | 'settings' | 'profile' | 'help'>('dashboard'); // Added 'settings'
  
  const mainScrollRef = useRef<HTMLElement>(null);
  const { scrollYProgress: mainScrollYProgress } = useScroll({ container: mainScrollRef });

  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedCurrencyForModal, setSelectedCurrencyForModal] = useState<'USD' | 'INR' | 'EUR' | undefined>(undefined);

  useEffect(() => {
    // Redirect to home if not loading and no user (e.g., after logout)
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleOpenAddMoneyModal = useCallback((currency: string) => {
    setSelectedCurrencyForModal(currency as 'USD' | 'INR' | 'EUR');
    setIsAddMoneyModalOpen(true);
  }, []);

  const handleOpenSendModal = useCallback((currency: string) => {
    setSelectedCurrencyForModal(currency as 'USD' | 'INR' | 'EUR');
    setIsSendModalOpen(true);
  }, []);

  const handleCloseModals = useCallback(() => {
    setIsAddMoneyModalOpen(false);
    setIsSendModalOpen(false);
    setSelectedCurrencyForModal(undefined);
  }, []);

  const handleAddMoneySubmit = useCallback(async (amount: number, currency: 'USD' | 'INR' | 'EUR') => {
    console.log('Add Money:', { amount, currency });
    alert(`Add Money Submitted: ${amount} ${currency}. Integration pending.`);
    handleCloseModals();
  }, [handleCloseModals]);

  if (loading) { // Only show loading spinner if actively loading
    return <LoadingSpinner />;
  }

  if (!user) {
    // If not loading and still no user, it means logout has occurred or auth failed initially.
    // The useEffect above should handle redirection. Showing spinner briefly during redirect.
    return <LoadingSpinner />;
  }

  const renderView = () => {
    return (
      <motion.div
        key={currentView} 
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full h-full"
      >
        {(() => {
          switch (currentView) {
            case 'dashboard':
              return <DashboardHomeView user={user} onSendClick={handleOpenSendModal} onAddFundsClick={handleOpenAddMoneyModal} glassmorphicCardStyle={glassmorphicCardStyle} commonHoverTapProps={commonHoverTapProps} buttonStyle={buttonStyle} secondaryButtonStyle={secondaryButtonStyle} scrollYProgress={mainScrollYProgress} />;
            case 'wallets':
              return <WalletsView user={user} onSendClick={handleOpenSendModal} onAddFundsClick={handleOpenAddMoneyModal} />;
            case 'settings': // Added settings view
              return <SettingsView user={user} />;
            default:
              return <DashboardHomeView user={user} onSendClick={handleOpenSendModal} onAddFundsClick={handleOpenAddMoneyModal} glassmorphicCardStyle={glassmorphicCardStyle} commonHoverTapProps={commonHoverTapProps} buttonStyle={buttonStyle} secondaryButtonStyle={secondaryButtonStyle} scrollYProgress={mainScrollYProgress} />;
          }
        })()}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} user={user} onLogout={logout} />

      <main ref={mainScrollRef} className="flex-1 p-4 md:p-8 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isAddMoneyModalOpen && (
          <AddMoneyModal 
            isOpen={isAddMoneyModalOpen}
            onClose={handleCloseModals}
            onSubmit={handleAddMoneySubmit} 
            initialCurrency={selectedCurrencyForModal}
            glassmorphicCardStyle={glassmorphicCardStyle} 
            commonHoverTapProps={commonHoverTapProps} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSendModalOpen && (
          <SendPaymentModal 
            isOpen={isSendModalOpen}
            onClose={handleCloseModals}
            currentUser={user} 
            initialCurrencyFrom={selectedCurrencyForModal}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

const WalletsView: React.FC<{ 
  user: UserData, 
  onSendClick: (currency: string) => void, 
  onAddFundsClick: (currency: string) => void 
}> = ({ user, onSendClick, onAddFundsClick }) => {
  const balances = user.balances || {};
  const currencies = Object.keys(balances).sort() as (keyof typeof balances)[];

  if (currencies.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        className={`${glassmorphicCardStyle} text-center py-12`}
        {...cardHoverEffect}
      >
        <InformationCircleIcon className="h-16 w-16 text-indigo-400 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-indigo-300 mb-3">No Wallets Found</h3>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">It looks like you don't have any currency wallets yet. Add funds to your account to get started with FusionPay.</p>
        <motion.button 
          onClick={() => onAddFundsClick('USD')} 
          className={`${buttonStyle} w-auto px-8 py-3 text-lg`}
          {...commonHoverTapProps}
        >
          <PlusCircleIcon className="h-6 w-6 mr-2" /> Add Funds
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {currencies.map((currency, index) => (
        <motion.div 
          key={currency.toString()} 
          className={`${glassmorphicCardStyle} flex flex-col`}
          variants={listItemVariants}
          custom={index}
          initial="hidden"
          animate="visible"
          {...cardHoverEffect}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-bold text-indigo-300 tracking-tight">{currency.toString().toUpperCase()}</h3>
            {currency.toString().toUpperCase() === 'USD' && <CurrencyDollarIcon className="h-10 w-10 text-indigo-500/70" />}
            {currency.toString().toUpperCase() === 'EUR' && <CurrencyEuroIcon className="h-10 w-10 text-indigo-500/70" />}
            {currency.toString().toUpperCase() === 'INR' && <CurrencyRupeeIcon className="h-10 w-10 text-indigo-500/70" />}
            {!['USD', 'EUR', 'INR'].includes(currency.toString().toUpperCase()) && <BanknotesIcon className="h-10 w-10 text-indigo-500/70" />}
          </div>
          <p className="text-4xl font-extrabold text-white mb-3">
            {(balances[currency] ?? 0).toLocaleString(undefined, { style: 'currency', currency: currency.toString(), minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-slate-400 mb-6">Available Balance</p>
          <div className="mt-auto space-y-3">
            <motion.button 
              {...commonHoverTapProps}
              onClick={() => onSendClick(currency.toString())} 
              className={`${buttonStyle} flex items-center justify-center`}
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-2" /> Send {currency.toString().toUpperCase()}
            </motion.button>
            <motion.button 
              {...commonHoverTapProps}
              onClick={() => onAddFundsClick(currency.toString())} 
              className={`${secondaryButtonStyle} flex items-center justify-center`}
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" /> Add {currency.toString().toUpperCase()}
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Placeholder SettingsView
const SettingsView: React.FC<{ user: UserData }> = ({ user }) => {
  const [isRegisteringOnChain, setIsRegisteringOnChain] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState<string>('');

  const callRegisterUserAPI = async () => {
    console.log("callRegisterUserAPI invoked. If for button, handleRegisterOnChainIdentity is preferred.");
    // Original fetch logic (can be removed if fully integrated and not used elsewhere)
  };

  const handleRegisterOnChainIdentity = async () => {
    if (!user || !user.uid || !user.fusionPayId) {
      console.error('User data or FusionPay ID is not available for registration.');
      setRegistrationMessage('Error: User data or FusionPay ID is not available.');
      return;
    }

    setIsRegisteringOnChain(true);
    setRegistrationMessage('');
    console.log(`Frontend: Preparing to call /api/register-user. User object available: ${!!user} user.uid type: ${typeof user.uid} user.uid value: ${user.uid} derivedFusionPayId: ${user.fusionPayId}`);

    try {
      console.log(`Attempting to call '/api/register-user' for user: ${user.uid} with FusionPay ID: ${user.fusionPayId}`);
      const response = await fetch('/api/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, fusionPayId: user.fusionPayId }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.alreadyRegistered) {
          setRegistrationMessage('On-chain identity already verified.');
          console.log('User already registered on-chain:', data.message);
        } else {
          setRegistrationMessage(`Successfully registered on-chain! Tx: ${data.transactionHash}`);
          console.log('Successfully registered user on-chain:', data);
        }
        // Optionally, refresh user data from Firestore if onChainRegistered status might change
        // This might be handled by a listener or a manual refresh function
      } else {
        console.error('Error calling \'/api/register-user\':', response.status, data);
        setRegistrationMessage(`Error: ${data.error || 'Failed to register on-chain.'} ${data.details ? JSON.stringify(data.details) : ''}`);
      }
    } catch (error) {
      console.error('Exception during \'/api/register-user\' call:', error);
      setRegistrationMessage(`Exception: ${(error as Error).message || 'An unexpected error occurred.'}`);
    }
    setIsRegisteringOnChain(false);
  };

  const fusionPayId = useMemo(() => {
    if (user.email) {
      return `${user.email.split('@')[0]}@fusionpay`;
    }
    return 'N/A';
  }, [user.email]);

  return (
    <motion.div
      className={`${glassmorphicCardStyle} p-6 md:p-8`} 
      {...cardHoverEffect}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
      exit={{ opacity: 0, y: 20 }}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-indigo-200 mb-6">User Profile</h2>
      
      <div className="space-y-4 text-base mb-8">
        <div>
          <span className="font-medium text-indigo-400 block sm:inline sm:mr-2">Name:</span>
          <span className="text-slate-200">{user.displayName || 'N/A'}</span>
        </div>
        <div>
          <span className="font-medium text-indigo-400 block sm:inline sm:mr-2">Email:</span>
          <span className="text-slate-200">{user.email || 'N/A'}</span>
        </div>
        <div>
          <span className="font-medium text-indigo-400 block sm:inline sm:mr-2">FusionPay ID:</span>
          <span className="text-slate-200">{fusionPayId}</span>
        </div>
        <div>
          <span className="font-medium text-indigo-400 block sm:inline sm:mr-2">Blockchain Address:</span>
          <span className="text-slate-200 break-all">{user.walletAddress || 'Not connected'}</span>
        </div>
        {user.isRegisteredOnChain && (
          <div className="mt-4">
            <p className="text-green-400 font-semibold flex items-center">
              <CheckCircleIcon className="h-6 w-6 mr-2 text-green-400" /> On-Chain Identity Verified
            </p>
          </div>
        )}
      </div>

      {!user.isRegisteredOnChain && (
        <button
          onClick={handleRegisterOnChainIdentity}
          disabled={isRegisteringOnChain}
          className="w-full mt-4 px-4 py-2.5 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg shadow-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRegisteringOnChain ? 'Registering...' : 'Register / Verify On-Chain Identity'}
        </button>
      )}
      {registrationMessage && (
        <p className={`mt-2 text-xs ${registrationMessage.toLowerCase().includes('error') || registrationMessage.toLowerCase().includes('failed') ? 'text-red-400' : 'text-green-400'}`}>
          {registrationMessage}
        </p>
      )}
      {user.isRegisteredOnChain && (
        <div className="text-center mt-6">
          <p className="text-slate-400">Your identity is verified on the blockchain.</p>
        </div>
      )}
    </motion.div>
  );
};

interface DashboardHomeViewProps {
  user: UserData;
  onSendClick: (currency: string) => void;
  onAddFundsClick: (currency: string) => void;
  glassmorphicCardStyle: string;
  commonHoverTapProps: any;
  buttonStyle: string;
  secondaryButtonStyle: string;
  scrollYProgress: any; 
}

const DashboardHomeView: React.FC<DashboardHomeViewProps> = ({ user, onSendClick, onAddFundsClick, glassmorphicCardStyle, commonHoverTapProps, buttonStyle, secondaryButtonStyle, scrollYProgress }) => {
  const yQuickActions = useTransform(scrollYProgress, [0, 0.6], [0, 15], { clamp: false });
  const yBalances = useTransform(scrollYProgress, [0, 0.7], [0, 25], { clamp: false });
  const yTransactions = useTransform(scrollYProgress, [0, 0.8], [0, 35], { clamp: false });

  const userName = user?.displayName?.split(' ')[0] || 'User';

  return (
    <div className="space-y-8">
      <motion.h2 
        className="text-4xl md:text-5xl font-light text-slate-200 pb-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7, ease: "circOut", delay: 0.2 } }}
      >
        Welcome back, <span className="font-semibold text-indigo-300">{userName}!</span>
      </motion.h2>

      <motion.div style={{ y: yQuickActions }} className={`${glassmorphicCardStyle}`} {...cardHoverEffect}>
        <h3 className="text-xl font-semibold text-indigo-300 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <motion.button onClick={() => onSendClick('USD')} className={`${buttonStyle} grow sm:grow-0`} {...commonHoverTapProps}><PaperAirplaneIcon className="h-5 w-5 mr-2" />Send Money</motion.button>
          <motion.button onClick={() => onAddFundsClick('USD')} className={`${secondaryButtonStyle} grow sm:grow-0`} {...commonHoverTapProps}><PlusCircleIcon className="h-5 w-5 mr-2"/>Add Funds</motion.button>
        </div>
      </motion.div>
      <motion.div style={{ y: yBalances }}>
        <WalletBalancesDisplay balances={user?.balances || {}} onSendClick={onSendClick} onAddFundsClick={onAddFundsClick} glassmorphicCardStyle={glassmorphicCardStyle} commonHoverTapProps={commonHoverTapProps} buttonStyle={buttonStyle} secondaryButtonStyle={secondaryButtonStyle} />
      </motion.div>
      <motion.div style={{ y: yTransactions }}>
        <RecentTransactionsDisplay transactions={user?.recentTransactions || []} glassmorphicCardStyle={glassmorphicCardStyle} />
      </motion.div>
    </div>
  );
}

const WalletBalancesDisplay: React.FC<any> = ({ balances, onSendClick, onAddFundsClick, glassmorphicCardStyle, commonHoverTapProps, buttonStyle, secondaryButtonStyle }) => {
    const displayCurrencies = ['USD', 'EUR', 'INR'];
    return (
        <motion.div className={`${glassmorphicCardStyle} p-6 rounded-2xl`} {...cardHoverEffect}>
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">Your Balances</h3>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" initial="hidden" animate="visible">
                {displayCurrencies.map((currency, index) => (
                    <motion.div 
                      key={currency} 
                      className="bg-indigo-900/40 p-4 rounded-xl shadow-lg border border-indigo-700/50"
                      variants={listItemVariants}
                      custom={index}
                      {...cardHoverEffect} 
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-lg font-medium text-indigo-200">{currency}</span>
                            {currency === 'USD' && <CurrencyDollarIcon className="w-6 h-6 text-indigo-400"/>}
                            {currency === 'EUR' && <CurrencyEuroIcon className="w-6 h-6 text-indigo-400"/>}
                            {currency === 'INR' && <CurrencyRupeeIcon className="w-6 h-6 text-indigo-400"/>}
                        </div>
                        <p className="text-2xl font-bold text-white mb-3">
                            {(balances[currency] ?? 0).toLocaleString(undefined, { style: 'currency', currency, minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex space-x-2">
                            <motion.button {...commonHoverTapProps} onClick={() => onSendClick(currency)} className={`${buttonStyle} text-xs py-2 px-3 w-full`}>Send</motion.button>
                            <motion.button {...commonHoverTapProps} onClick={() => onAddFundsClick(currency)} className={`${secondaryButtonStyle} text-xs py-2 px-3 w-full`}>Add Funds</motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

const RecentTransactionsDisplay: React.FC<any> = ({ transactions, glassmorphicCardStyle }) => {
    const limitedTransactions = transactions.slice(0, 5);
    return (
        <motion.div className={`${glassmorphicCardStyle} p-6 rounded-2xl`} {...cardHoverEffect}>
            <h3 className="text-xl font-semibold text-indigo-300 mb-4">Recent Activity</h3>
            {limitedTransactions.length > 0 ? (
                <motion.ul className="space-y-3" initial="hidden" animate="visible">
                    {limitedTransactions.map((tx: Transaction, index: number) => {
                        const isCredit = tx.type === 'received' || tx.type === 'deposit';
                        return (
                            <motion.li 
                              key={tx.id || index} 
                              className="flex justify-between items-center bg-indigo-900/40 p-3 rounded-lg shadow border border-indigo-700/50"
                              variants={listItemVariants}
                              custom={index}
                              {...cardHoverEffect} 
                            >
                                <div>
                                    <p className="font-medium text-indigo-100">{isCredit ? 'Received' : 'Sent'} {tx.currency}</p>
                                    <p className="text-xs text-indigo-400">{new Date(tx.timestamp).toLocaleDateString()} - {tx.description || (isCredit ? `From ${tx.from || 'Unknown'}` : `To ${tx.to || 'Unknown'}`)}</p>
                                </div>
                                <p className={`font-semibold ${isCredit ? 'text-green-400' : 'text-red-400'}`}>
                                    {isCredit ? '+' : '-'}{Math.abs(tx.amount).toLocaleString(undefined, { style: 'currency', currency: tx.currency, minimumFractionDigits: 2 })}
                                </p>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            ) : (
                <p className="text-slate-400 text-center py-4">No recent transactions.</p>
            )}
        </motion.div>
    );
};

const Sidebar: React.FC<any> = ({ currentView, setCurrentView, user, onLogout }) => {
  const navItems = [
    { name: 'Dashboard', icon: HomeIcon, view: 'dashboard' },
    { name: 'Wallets', icon: WalletIcon, view: 'wallets' },
    { name: 'Settings', icon: Cog8ToothIcon, view: 'settings' }, 
  ];
  const commonHoverTapProps = {
    whileHover: { scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 15 } },
    whileTap: { scale: 0.97 },
  };

  return (
    <aside className="w-full md:w-72 bg-slate-950/50 backdrop-blur-xl p-6 flex flex-col sticky top-0 h-screen shadow-2xl border-r border-indigo-800/30">
      <div className="flex items-center mb-10">
        <div className="mr-3">
          <FusionPayLogo size="small" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">FusionPay</h1>
      </div>

      <motion.div className={`${glassmorphicCardStyle} mb-8 p-4 text-center`} {...cardHoverEffect}>
          <Image 
              src={user?.photoURL || '/default-avatar.png'} 
              alt={user?.displayName || 'User'} 
              width={72} 
              height={72} 
              className="rounded-full mx-auto mb-3 border-2 border-indigo-400 shadow-lg"
              onError={(e) => { (e.target as HTMLImageElement).src = '/default-avatar.png'; }}
          />
          <h4 className="font-semibold text-lg text-slate-100 truncate">{user?.displayName || 'Current User'}</h4>
          <p className="text-xs text-indigo-300/80 truncate">{user?.email}</p>
      </motion.div>

      <nav className="flex-grow space-y-3 mb-8">
        {navItems.map(item => (
          <motion.button
            key={item.name}
            {...commonHoverTapProps}
            onClick={() => setCurrentView(item.view as any)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ease-in-out 
                        ${currentView === item.view 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                            : 'hover:bg-indigo-700/50 text-slate-300 hover:text-indigo-200'}`}
          >
            <item.icon className={`h-6 w-6 ${currentView === item.view ? 'text-white' : 'text-indigo-400/80'}`} />
            <span className="font-medium text-base">{item.name}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto">
        <motion.button
          {...commonHoverTapProps}
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-700/80 bg-slate-800/60 text-slate-300 hover:text-white transition-colors duration-200 ease-in-out group"
        >
          <PowerIcon className="h-6 w-6 text-red-400/80 group-hover:text-white" />
          <span className="font-medium text-base">Logout</span>
        </motion.button>
        <p className="text-xs text-center text-slate-500 mt-4"> FusionPay 2024-2025</p>
      </div>
    </aside>
  );
}

export default DashboardPage;
