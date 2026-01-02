import { motion } from 'motion/react';
import { Wallet, Mail, ArrowRight, Shield, Sparkles, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { ethers } from 'ethers'; // Import ethers

interface SignInProps {
  onWalletConnect: () => void;
  onEmailSignIn: () => void;
  onBack: () => void;
}

export function SignIn({ onWalletConnect, onEmailSignIn, onBack }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false); // State for wallet loading
  const navigate = useNavigate();

  // 1. THE WALLET CONNECTION LOGIC
  const handleWalletLogin = async () => {
    setWalletLoading(true);

    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (accounts.length > 0) {
          const address = accounts[0];
          console.log("Connected:", address);
          
          // Save to localStorage so the app remembers
          localStorage.setItem("walletAddress", address);
          localStorage.setItem("loginMethod", "wallet");

          // Trigger the parent callback to update App state
          onWalletConnect();
          
          // Navigate to events page
          navigate('/events');
        }
      } catch (error) {
        console.error("User denied connection:", error);
        alert("Connection request rejected. Please try again.");
      }
    } else {
      alert("MetaMask is not installed! Please install it to use this feature.");
      // Optional: window.open('https://metamask.io/download/', '_blank');
    }
    setWalletLoading(false);
  };

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
        localStorage.setItem("loginMethod", "email"); // Track method
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">Welcome Back</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">Sign in to access your exclusive passes</p>
        </motion.div>

        {/* 2. UPDATED WALLET BUTTON */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 sm:mb-8">
          <Button
            onClick={handleWalletLogin} // Use the new function
            disabled={walletLoading}
            className="w-full rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl transition-all py-6 sm:py-7 text-base sm:text-lg"
          >
            {walletLoading ? (
               <span className="flex items-center">Connecting...</span>
            ) : (
               <span className="flex items-center">
                 <Wallet className="w-5 h-5 sm:w-6 sm:h-6 mr-3" strokeWidth={1.5} />
                 Sign In with Wallet
               </span>
            )}
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
              <h3 className="text-base sm:text-lg mb-1.5 sm:mb-2 text-gray-900">Secure Access</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">Your credentials are encrypted and secure.</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 sm:mt-8 text-center space-y-3">
          <p className="text-sm text-gray-500">Don't have an account? <button onClick={onWalletConnect} className="text-amber-900 hover:underline">Create one</button></p>
          <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-900 transition-colors">← Back to home</button>
        </motion.div>
      </div>
    </div>
  );
}