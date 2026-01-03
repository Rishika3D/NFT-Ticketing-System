import { motion } from 'motion/react';
import { Wallet, Mail, ArrowRight, Shield, Sparkles, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import React from 'react';

interface SignInProps {
  onWalletConnect: () => void;
  onEmailSignIn: () => void;
  onBack: () => void;
}

export function SignIn({ onWalletConnect, onEmailSignIn, onBack }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Web3Modal hooks
  const { isConnected } = useWeb3ModalAccount();

  // Handle wallet connection - Navigate to wallet selection page
  const handleWalletLogin = () => {
    navigate('/wallet'); // Go to proper wallet selection screen
  };

  // Watch for connection success (from WalletConnect page)
  React.useEffect(() => {
    if (isConnected) {
      console.log("✅ Wallet connected!");
      onWalletConnect();
      navigate('/events');
    }
  }, [isConnected, onWalletConnect, navigate]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginMethod", "email");
        onEmailSignIn();
        navigate("/events");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-amber-900" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900 font-bold">Welcome Back</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">Sign in to access your exclusive passes</p>
        </motion.div>

        {/* Wallet Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 sm:mb-8">
          <Button
            onClick={handleWalletLogin}
            disabled={false}
            className="w-full rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl transition-all py-6 sm:py-7 text-base sm:text-lg"
          >
            <span className="flex items-center">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6 mr-3" strokeWidth={1.5} />
              Sign In with Wallet
            </span>
          </Button>
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-3">
            Connect with MetaMask, WalletConnect, or Coinbase
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center"><span className="px-4 bg-white text-sm text-gray-500">or continue with email</span></div>
        </motion.div>

        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onSubmit={handleEmailSubmit} className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-12 h-12 sm:h-14 rounded-2xl border-gray-200 bg-white text-base" required />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-12 h-12 sm:h-14 rounded-2xl border-gray-200 bg-white text-base" required />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full rounded-2xl bg-gradient-to-r from-amber-100 to-amber-50 hover:shadow-lg transition-all py-6 sm:py-7 text-base sm:text-lg text-gray-900 hover:bg-amber-100">
            {isLoading ? "Signing in..." : <>Continue with Email <ArrowRight className="w-5 h-5 ml-2" strokeWidth={1.5} /></>}
          </Button>
        </motion.form>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-900" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg mb-1.5 sm:mb-2 text-gray-900 font-medium">Secure Access</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">Your credentials are encrypted and secure.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 sm:mt-8 text-center space-y-3">
          <p className="text-sm text-gray-500">Don't have an account? <button onClick={handleWalletLogin} className="text-amber-900 hover:underline font-medium">Create one</button></p>
          <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-900 transition-colors">← Back to home</button>
        </motion.div>
      </div>
    </div>
  );
}