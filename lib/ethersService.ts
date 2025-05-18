import { JsonRpcProvider, Wallet, Contract, getAddress, type BigNumberish } from 'ethers';
import FusionPaymentABI from './FusionPaymentABI.json';

const baseSepoliaRpcUrl = process.env.BASE_SEPOLIA_RPC_URL;
const systemWalletPrivateKey = process.env.SYSTEM_WALLET_PRIVATE_KEY;
const FUSIONPAY_CONTRACT_ADDRESS = '0xCeDbdE434B9c326d607A89B12F05d64749B6feaC'; // Replace with your deployed contract address

if (!baseSepoliaRpcUrl) {
  throw new Error('BASE_SEPOLIA_RPC_URL is not set in environment variables.');
}

if (!systemWalletPrivateKey) {
  throw new Error('SYSTEM_WALLET_PRIVATE_KEY is not set in environment variables.');
}

// Setup provider
export const provider = new JsonRpcProvider(baseSepoliaRpcUrl);

// Setup wallet (signer)
// This wallet will be used by the backend to sign transactions on behalf of the system/owner
export const systemWallet = new Wallet(systemWalletPrivateKey, provider);

// Setup contract instance
export const fusionPaymentContract = new Contract(
  FUSIONPAY_CONTRACT_ADDRESS,
  FusionPaymentABI, // Use the ABI directly
  systemWallet
);

console.log(`Ethers service initialized. Connected to contract at: ${FUSIONPAY_CONTRACT_ADDRESS} via wallet: ${systemWallet.address}`);

// Define the PaymentParams interface/type matching the smart contract struct
export interface PaymentParams { // Matches Solidity struct
  fromFusionPayId: string;
  toFusionPayId: string;
  amount: BigNumberish;           // e.g., smallest unit like cents
  fromCurrency: string;         // e.g., "USD"
  toCurrency: string;           // e.g., "EUR"
  fxRate: BigNumberish;           // Exchange rate, scaled (e.g., 1.08 USD/EUR as 10800 with 4 decimal precision)
  fxRoute: string[];            // Array of currency codes representing the conversion path (e.g. ["USD", "EUR"])
}

// Example function to interact with the contract (can be expanded)
export const registerUserOnChain = async (fusionPayId: string, userWalletAddress: string) => {
  try {
    // Check if the contract function requires the wallet address to be checksummed
    const checksumAddress = getAddress(userWalletAddress);
    const tx = await fusionPaymentContract.registerUser(fusionPayId, checksumAddress);
    await tx.wait();
    console.log(`User ${fusionPayId} with wallet ${checksumAddress} registered on-chain. Tx hash: ${tx.hash}`);
    return { success: true, transactionHash: tx.hash };
  } catch (error: any) {
    console.error('Error registering user on-chain:');
    console.error('  Message:', error.message);
    if (error.code) console.error('  Code:', error.code);
    if (error.reason) console.error('  Reason (Revert Message):', error.reason);
    if (error.data) console.error('  Data:', error.data);
    if (error.transaction) console.error('  Transaction:', error.transaction);
    if (error.receipt) console.error('  Receipt:', error.receipt);
    // Log the full error object for deeper inspection if needed, but be mindful of verbosity
    // console.error('  Full Error Object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    return { success: false, error };
  }
};

export const processPaymentOnChain = async (txId: string, params: PaymentParams) => {
  try {
    // Ensure BigNumberish values are actual BigNumber instances if needed by ethers.js v6, though v5 often handles strings/numbers.
    // For safety, explicitly convert if there are issues, e.g., ethers.BigNumber.from(params.amountToSend)
    // For ethers v6, passing strings for BigNumberish params or actual BigInts is usually fine.
    const tx = await fusionPaymentContract.processPayment(txId, params);
    await tx.wait(); // Wait for the transaction to be mined
    console.log(`Payment processed on-chain. TxId: ${txId}, Tx Hash: ${tx.hash}`);
    return { success: true, transactionHash: tx.hash, txId };
  } catch (error) {
    console.error(`Error processing payment on-chain for TxId ${txId}:`, error);
    return { success: false, error, txId };
  }
};

// You can add more functions here to interact with other parts of your smart contract
// e.g., getTransactionStatus, etc.
