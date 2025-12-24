import { motion } from 'motion/react';
import { Wallet, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface WalletConnectProps {
  onConnect: () => void;
  onBack: () => void;
}

const wallets = [
  {
    name: 'MetaMask',
    description: 'Popular browser extension wallet',
    icon: '🦊'
  },
  {
    name: 'WalletConnect',
    description: 'Connect via mobile wallet app',
    icon: '📱'
  },
  {
    name: 'Coinbase Wallet',
    description: 'Secure wallet by Coinbase',
    icon: '💼'
  },
  {
    name: 'Rainbow',
    description: 'Beautiful Ethereum wallet',
    icon: '🌈'
  }
];

export function WalletConnect({ onConnect, onBack }: WalletConnectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <Wallet className="w-8 h-8 sm:w-10 sm:h-10 text-amber-900" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">Connect Your Wallet</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 px-4">
            Choose your preferred wallet to get started with NFT ticketing
          </p>
        </motion.div>

        {/* Wallet Options */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
          {wallets.map((wallet, index) => (
            <motion.button
              key={wallet.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={onConnect}
              className="w-full p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 hover:border-amber-200 hover:shadow-lg transition-all group text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gray-50 flex items-center justify-center text-xl sm:text-2xl">
                    {wallet.icon}
                  </div>
                  <div>
                    <p className="text-base sm:text-lg text-gray-900 mb-0.5 sm:mb-1">{wallet.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{wallet.description}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-amber-900 group-hover:translate-x-1 transition-all" strokeWidth={1.5} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Security Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
        >
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg mb-1.5 sm:mb-2 text-gray-900">Safe & Secure</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Your wallet connection is encrypted and secure. We never store your private keys or have access to your funds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg mb-1.5 sm:mb-2 text-gray-900">Instant Access</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Once connected, you can mint tickets, view your collection, and transfer passes instantly.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 sm:mt-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-gray-500 hover:text-gray-900"
          >
            Go back
          </Button>
        </motion.div>
      </div>
    </div>
  );
}