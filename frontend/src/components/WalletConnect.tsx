import { motion } from 'motion/react';
import { Wallet, Shield, Zap, ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'; // Added CheckIcon
import { Button } from './ui/button';
import { useState } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// ... (Keep your existing projectId and config setup here) ...
const projectId = 'YOUR_PROJECT_ID_HERE'; 

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
};

const metadata = {
  name: 'NFT Ticketing',
  description: 'NFT Event Ticketing System',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const ethersConfig = defaultConfig({
  metadata,
  enableEmail: true,
  defaultChainId: 1,
  enableCoinbase: true,
  rpcUrl: 'https://cloudflare-eth.com',
});

const modal = createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true
});

// ... End config ...

interface WalletConnectProps {
  onConnect: () => void;
  onBack: () => void;
}

const wallets = [
  { id: 'metamask', name: 'MetaMask', description: 'Popular browser extension', icon: '🦊' },
  { id: 'walletconnect', name: 'WalletConnect', description: 'Scan QR code with mobile', icon: '📱' },
  { id: 'coinbase', name: 'Coinbase Wallet', description: 'Secure extension & mobile', icon: '💼' },
  { id: 'rainbow', name: 'Rainbow', description: 'User-friendly wallet', icon: '🌈' }
];

export function WalletConnect({ onConnect, onBack }: WalletConnectProps) {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successAddress, setSuccessAddress] = useState<string | null>(null); // New Success State

  const handleWalletClick = async (walletId: string) => {
    setErrorMsg(null);
    setConnectingWallet(walletId);

    try {
      if (walletId === 'walletconnect') {
        // ... (Keep existing WalletConnect logic) ...
        await modal.open();
        // Simplified check for demo purposes
        const interval = setInterval(() => {
            if (modal.getIsConnected()) {
                clearInterval(interval);
                handleSuccess("WalletConnect");
            }
        }, 1000);
      } 
      else {
        // Browser Extension Logic
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          if (accounts.length > 0) {
            const address = accounts[0];
            localStorage.setItem("walletAddress", address);
            localStorage.setItem("loginMethod", "wallet");
            
            // INSTEAD OF REDIRECTING INSTANTLY, SHOW SUCCESS
            handleSuccess(address);
          }
        } else {
          throw new Error("No wallet extension found. Please install MetaMask.");
        }
      }
    } catch (error: any) {
      console.error("Wallet Error:", error);
      if (error.code === 4001) setErrorMsg("Connection request cancelled.");
      else if (error.code === -32002) setErrorMsg("Check your wallet extension! A connection request is waiting.");
      else setErrorMsg(error.message || "Failed to connect.");
      setConnectingWallet(null);
    }
  };

  // Helper to show success for 1.5 seconds, then redirect
  const handleSuccess = (addressOrName: string) => {
    setConnectingWallet(null);
    // Format address if it's long (e.g. 0x123...abc)
    const display = addressOrName.startsWith("0x") 
      ? `${addressOrName.slice(0, 6)}...${addressOrName.slice(-4)}`
      : addressOrName;
      
    setSuccessAddress(display);
    
    // Wait 1.5s before moving to next screen
    setTimeout(() => {
      onConnect();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          {/* Change Icon based on Success State */}
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 transition-colors duration-500 ${successAddress ? 'bg-green-100' : 'bg-gradient-to-br from-amber-100 to-amber-50'}`}>
            {successAddress ? (
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" strokeWidth={2} />
            ) : (
              <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-amber-900" strokeWidth={1.5} />
            )}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">
            {successAddress ? "Wallet Connected!" : "Connect Your Wallet"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 px-4">
            {successAddress ? `Redirecting you to events...` : "Select your preferred wallet"}
          </p>
        </motion.div>

        {/* Success Banner */}
        {successAddress && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
             <p className="text-green-800 font-medium">Successfully connected as <span className="font-mono">{successAddress}</span></p>
          </motion.div>
        )}

        {/* Error Banner */}
        {errorMsg && !successAddress && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{errorMsg}</span>
          </motion.div>
        )}

        {/* Buttons - Hidden or Disabled on Success */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          {wallets.map((wallet, index) => (
            <motion.button
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleWalletClick(wallet.id)}
              disabled={connectingWallet !== null || successAddress !== null}
              className={`w-full p-5 sm:p-6 rounded-2xl bg-white border transition-all group text-left relative flex items-center justify-between
                ${successAddress ? 'opacity-50 grayscale' : 'border-gray-200 hover:border-amber-200 hover:shadow-lg'}
                ${connectingWallet === wallet.id ? 'border-amber-500 ring-1 ring-amber-500' : ''}
              `}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 flex items-center justify-center text-xl sm:text-2xl">
                  {wallet.icon}
                </div>
                <div>
                  <p className="text-base sm:text-lg text-gray-900 mb-0.5 sm:mb-1">{wallet.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{wallet.description}</p>
                </div>
              </div>
              
              {connectingWallet === wallet.id ? (
                <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
              ) : successAddress ? (
                <div /> 
              ) : (
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-amber-900 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
              )}
            </motion.button>
          ))}
        </div>

        {/* Back Button */}
        {!successAddress && (
          <div className="text-center">
            <Button variant="ghost" onClick={onBack} className="text-gray-500 hover:text-gray-900">Go back</Button>
          </div>
        )}
      </div>
    </div>
  );
}