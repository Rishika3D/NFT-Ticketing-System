import { motion } from 'motion/react';
import { Wallet, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { createWeb3Modal, defaultConfig, useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import React from 'react';

// ... (Keep your configuration: projectId, sepolia, metadata, etc.) ...

const projectId = '958ca6de4586388b98a8c3b07a235c6e';

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
};

const metadata = {
  name: 'Ticket dApp',
  description: 'Buy NFT Tickets',
  url: 'http://localhost:5173',
  icons: ['https://avatars.mywebsite.com/']
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [sepolia],
  projectId,
  enableAnalytics: true
});

interface WalletConnectProps {
  onConnect: () => void;
  onBack: () => void;
}

const wallets = [
  { id: 'metamask', name: 'MetaMask', description: 'Browser extension', icon: '🦊' },
  { id: 'walletconnect', name: 'WalletConnect', description: 'Scan QR with phone', icon: '📱' },
  { id: 'coinbase', name: 'Coinbase', description: 'Coinbase Wallet', icon: '💼' },
  { id: 'rainbow', name: 'Rainbow', description: 'Rainbow Extension', icon: '🌈' },
];

export function WalletConnect({ onConnect, onBack }: WalletConnectProps) {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  // REMOVED: The useEffect that forced disconnect() on mount.
  // Now, if you refresh, Web3Modal will remember you are connected.

  // Listen for successful connection
  useEffect(() => {
    if (isConnected) {
      onConnect();
    }
  }, [isConnected, onConnect]);

  const handleWalletClick = async (walletId: string) => {
    setConnectingWallet(walletId);
    try {
      await open();
    } catch (err) {
      console.error(err);
      setConnectingWallet(null);
    }
  };

  return (
    // ... (Keep your UI exactly the same) ...
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
           <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-5 sm:mb-6">
             <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-amber-900" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">Connect Wallet</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">Select your preferred wallet to continue</p>
        </motion.div>

        <div className="space-y-3 mb-8">
          {wallets.map((wallet, index) => (
            <motion.button
              key={wallet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleWalletClick(wallet.id)}
              disabled={connectingWallet !== null}
              className="w-full p-5 rounded-2xl bg-white border border-gray-200 hover:border-amber-200 hover:shadow-lg transition-all text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{wallet.icon}</div>
                <div>
                  <p className="font-medium text-gray-900">{wallet.name}</p>
                  <p className="text-xs text-gray-500">{wallet.description}</p>
                </div>
              </div>
              {connectingWallet === wallet.id ? <Loader2 className="w-5 h-5 animate-spin text-amber-600"/> : <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-amber-600"/>}
            </motion.button>
          ))}
        </div>
        
        <div className="text-center">
            <Button variant="ghost" onClick={onBack}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}