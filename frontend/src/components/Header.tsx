import { Wallet, Menu, X, User, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { useState } from 'react';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  isWalletConnected: boolean;
  onWalletConnect: () => void;
}

export function Header({ currentScreen, onNavigate, isWalletConnected, onWalletConnect }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 sm:gap-12">
          <button onClick={() => onNavigate('landing')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <Ticket className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900" strokeWidth={1.5} />
            </div>
            <span className="text-gray-900 tracking-tight text-sm sm:text-base">Luxe Pass</span>
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

        <div className="flex items-center gap-3 sm:gap-4">
          {isWalletConnected ? (
            <button 
              onClick={() => onNavigate('profile')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 hover:shadow-md transition-all"
            >
              <User className="w-4 h-4 text-amber-900" strokeWidth={1.5} />
              <span className="text-sm text-gray-900">0x7f...a3b2</span>
            </button>
          ) : (
            <Button
              onClick={onWalletConnect}
              className="hidden sm:flex rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all px-6"
            >
              <Wallet className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Connect Wallet
            </Button>
          )}
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => {
                  onNavigate('events');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  currentScreen === 'events' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Events
              </button>
              <button 
                onClick={() => {
                  onNavigate('profile');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  currentScreen === 'profile' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                My Passes
              </button>
              
              <div className="pt-3 border-t border-gray-100">
                {isWalletConnected ? (
                  <button 
                    onClick={() => {
                      onNavigate('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100"
                  >
                    <User className="w-4 h-4 text-amber-900" strokeWidth={1.5} />
                    <span className="text-sm text-gray-900">0x7f...a3b2</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        onNavigate('signin');
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full rounded-xl border-gray-200"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        onWalletConnect();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-xl bg-gradient-to-r from-gray-900 to-gray-800"
                    >
                      <Wallet className="w-4 h-4 mr-2" strokeWidth={1.5} />
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}