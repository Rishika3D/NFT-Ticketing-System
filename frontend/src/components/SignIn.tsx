import { motion } from 'motion/react';
import { Wallet, Mail, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

interface SignInProps {
  onWalletConnect: () => void;
  onEmailSignIn: () => void;
  onBack: () => void;
}

// Brand Logos as SVG Components
const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const AppleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const DiscordLogo = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export function SignIn({ onWalletConnect, onEmailSignIn, onBack }: SignInProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      onEmailSignIn();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-900" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">Welcome Back</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">
            Sign in to access your exclusive passes
          </p>
        </motion.div>

        {/* Web3 Wallet Sign In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <Button
            onClick={onWalletConnect}
            className="w-full rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl transition-all py-6 sm:py-7 text-base sm:text-lg"
          >
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 mr-3" strokeWidth={1.5} />
            Sign In with Wallet
          </Button>
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-3">
            Connect with MetaMask, WalletConnect, or Coinbase
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-6 sm:mb-8"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-sm text-gray-500">or continue with email</span>
          </div>
        </motion.div>

        {/* Email Sign In Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleEmailSubmit}
          className="space-y-4 sm:space-y-5 mb-6 sm:mb-8"
        >
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 sm:h-14 rounded-2xl border-gray-200 bg-white text-base"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-100 to-amber-50 hover:shadow-lg transition-all py-6 sm:py-7 text-base sm:text-lg text-gray-900 hover:bg-amber-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-gray-400 border-t-gray-900 rounded-full"
                />
                Signing in...
              </span>
            ) : (
              <>
                Continue with Email
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={1.5} />
              </>
            )}
          </Button>
        </motion.form>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg mb-1.5 sm:mb-2 text-gray-900">Secure Access</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                Your credentials are encrypted and secure. We use industry-standard security practices to protect your account.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 sm:mt-8 text-center space-y-3"
        >
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button onClick={onWalletConnect} className="text-amber-900 hover:underline">
              Create one
            </button>
          </p>
          <button
            onClick={onBack}
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            ← Back to home
          </button>
        </motion.div>

        {/* Additional Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100"
        >
          <p className="text-xs sm:text-sm text-gray-500 text-center mb-4">
            Or sign in with
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Google', icon: <GoogleLogo /> },
              { name: 'Apple', icon: <AppleLogo /> },
              { name: 'Discord', icon: <DiscordLogo /> }
            ].map((provider) => (
              <button
                key={provider.name}
                className="p-4 rounded-xl border border-gray-200 hover:border-amber-200 hover:bg-amber-50/50 transition-all text-center group"
              >
                <div className="flex justify-center mb-2">{provider.icon}</div>
                <span className="text-xs text-gray-600 group-hover:text-gray-900">{provider.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}