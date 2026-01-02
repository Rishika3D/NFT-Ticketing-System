import { X, Calendar, MapPin, Ticket, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/utils';
import React from 'react';

interface CheckoutModalProps {
  event: {
    id: number;
    title: string;
    price: string;
    date: string;
    location: string;
    image: string;
  } | null; // Allow null here for safety
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ event, isOpen, onClose }: CheckoutModalProps) {
  const { open } = useWeb3Modal();
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [txHash, setTxHash] = useState('');

  // 🔴 FIX: Check if event is null. If so, don't render anything.
  if (!isOpen || !event) return null;

  const handleMint = async () => {
    // 1. If not connected, open the wallet modal first
    if (!isConnected) {
      open();
      return;
    }

    if (!walletProvider) {
      setErrorMessage("Wallet provider not found. Please refresh.");
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('minting');
    setErrorMessage('');

    try {
      // 2. Setup Provider & Signer
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      
      // 3. Create Contract Instance
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // 4. Send Transaction
      // Note: We send the value in ETH (wei) matching the ticket price
      const priceInWei = ethers.parseEther(event.price);
      
      console.log("Minting ticket for event ID:", event.id, "Price:", event.price);

      const tx = await contract.buyTicket(event.id, 1, {
        value: priceInWei
      });

      console.log("Transaction sent:", tx.hash);
      
      // 5. Wait for confirmation
      await tx.wait();
      
      setTxHash(tx.hash);
      setStatus('success');
      
      // Close modal after 2 seconds on success to show the success state briefly
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);

    } catch (error: any) {
      console.error("❌ Minting failed:", error);
      setStatus('error');
      
      // Extract a readable error message if possible
      if (error.reason) {
        setErrorMessage(error.reason);
      } else if (error.message && error.message.includes("user rejected")) {
        setErrorMessage("Transaction rejected by user.");
      } else {
        setErrorMessage("Transaction failed. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Image */}
        <div className="relative h-32 bg-gray-100">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
          
          <div className="flex flex-col gap-2 text-gray-600 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Ticket Price</span>
              <span className="text-xl font-bold text-gray-900">{event.price} ETH</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Service Fee</span>
              <span className="text-gray-900 font-medium">0.00 ETH</span>
            </div>
            <div className="border-t border-amber-200/50 my-2 pt-2 flex justify-between items-center">
              <span className="font-bold text-amber-900">Total</span>
              <span className="font-bold text-amber-900 text-lg">{event.price} ETH</span>
            </div>
          </div>

          {/* Status Messages */}
          {status === 'error' && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <div>
                <p className="font-bold">Success! Ticket minted.</p>
                <p className="text-xs break-all mt-1 opacity-80">Tx: {txHash}</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleMint}
            disabled={loading || status === 'success'}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
              ${status === 'success' 
                ? 'bg-green-600 text-white cursor-default' 
                : 'bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white shadow-lg shadow-amber-500/25'
              }
              ${loading ? 'opacity-80 cursor-wait' : ''}
            `}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Transaction...
              </>
            ) : status === 'success' ? (
              <>
                <Ticket className="w-5 h-5" />
                Ticket Confirmed!
              </>
            ) : !isConnected ? (
              "Connect Wallet to Buy"
            ) : (
              <>
                Confirm Purchase
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Powered by Sepolia Testnet
          </p>
        </div>
      </div>
    </div>
  );
}