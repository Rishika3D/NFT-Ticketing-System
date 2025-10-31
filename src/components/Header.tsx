import { Wallet, Menu, X, User, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
}

export function Header({ currentScreen, onNavigate, isWalletConnected, onWalletConnect }: HeaderProps) {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <Ticket className="w-5 h-5 text-amber-900" strokeWidth={1.5} />
            </div>
            <span className="text-gray-900 tracking-tight">Luxe Pass</span>
          </button>
          
          <nav className="hidden md:flex gap-8">
            <button 
              onClick={() => onNavigate('events')}
              className={`text-sm tracking-wide transition-colors ${
                currentScreen === 'events' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Events
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className={`text-sm tracking-wide transition-colors ${
                currentScreen === 'profile' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              My Passes
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isWalletConnected ? (
            <button 
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 hover:shadow-md transition-all"
            >
              <User className="w-4 h-4 text-amber-900" strokeWidth={1.5} />
              <span className="text-sm text-gray-900">0x7f...a3b2</span>
            </button>
          ) : (
            <Button
              onClick={onWalletConnect}
              className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all px-6"
            >
              <Wallet className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
