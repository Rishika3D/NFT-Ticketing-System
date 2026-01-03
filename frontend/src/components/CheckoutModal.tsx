import { X, Calendar, MapPin, Ticket, ShieldCheck, Loader2, AlertCircle, CheckCircle2, Download, Share2, ArrowRight, Sparkles } from 'lucide-react';
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/utils';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  event: {
    id: number;
    title: string;
    price: string;
    date: string;
    location: string;
    image: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ event, isOpen, onClose }: CheckoutModalProps) {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [txHash, setTxHash] = useState('');
  const [tokenId, setTokenId] = useState<number | null>(null);

  if (!isOpen || !event) return null;

  const handleMint = async () => {
    if (!isConnected) {
      open();
      return;
    }

    if (!walletProvider) {
      setErrorMessage("Wallet provider not found. Please refresh and reconnect.");
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus('minting');
    setErrorMessage('');

    try {
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const priceInWei = ethers.parseEther(event.price);
      
      console.log("🎫 Minting ticket...");
      console.log("Event ID:", event.id);
      console.log("Price:", event.price, "ETH");
      console.log("Buyer:", address);

      const tx = await contract.buyTicket(event.id, {
        value: priceInWei
      });

      console.log("📝 Transaction sent:", tx.hash);
      setTxHash(tx.hash);
      
      const receipt = await tx.wait();
      console.log("✅ Transaction confirmed:", receipt);
      
      // Extract tokenId from TicketMinted event
      const mintedEvent = receipt.logs.find((log: any) => {
        try {
          const parsed = contract.interface.parseLog(log);
          return parsed?.name === 'TicketMinted';
        } catch {
          return false;
        }
      });

      if (mintedEvent) {
        const parsed = contract.interface.parseLog(mintedEvent);
        const mintedTokenId = Number(parsed?.args?.tokenId);
        setTokenId(mintedTokenId);
        console.log("🎟️ Token ID:", mintedTokenId);
      }
      
      setStatus('success');

    } catch (error: any) {
      console.error("❌ Minting failed:", error);
      setStatus('error');
      
      if (error.reason) {
        setErrorMessage(error.reason);
      } else if (error.message) {
        if (error.message.includes("user rejected")) {
          setErrorMessage("Transaction was rejected.");
        } else if (error.message.includes("insufficient funds")) {
          setErrorMessage("Insufficient ETH balance.");
        } else if (error.message.includes("Event does not exist")) {
          setErrorMessage("Event not found on blockchain.");
        } else if (error.message.includes("Tickets sold out")) {
          setErrorMessage("Sorry, tickets are sold out!");
        } else if (error.message.includes("Incorrect ETH")) {
          setErrorMessage("Incorrect payment amount.");
        } else {
          setErrorMessage(error.message.slice(0, 100));
        }
      } else {
        setErrorMessage("Transaction failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage('');
    setTxHash('');
    setTokenId(null);
    onClose();
  };

  const handleViewProfile = () => {
    handleClose();
    window.location.href = '/profile';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            // SUCCESS VIEW - Mint Confirmation
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Success Header */}
              <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center border-b border-green-100">
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 hover:bg-green-100 text-green-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-4 relative"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" strokeWidth={2} />
                  <motion.div
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-emerald-200"
                  />
                </motion.div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 mb-4">
                  <Sparkles className="w-4 h-4 text-amber-900" strokeWidth={1.5} />
                  <span className="text-sm text-amber-900 font-medium">Minted Successfully</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Pass is Ready!</h2>
                <p className="text-gray-600">Your NFT ticket has been minted to your wallet</p>
              </div>

              {/* NFT Ticket Card */}
              <div className="p-6">
                <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg mb-6">
                  {/* Ticket Header */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-30">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-amber-300 text-xs mb-1">
                            {tokenId ? `VIP Pass #${tokenId}` : 'VIP Pass'}
                          </p>
                          <h3 className="text-2xl text-white font-bold">{event.title}</h3>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                          <span className="text-white text-xs">Verified</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Date</p>
                          <p className="text-white text-sm">{event.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Location</p>
                          <p className="text-white text-sm">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Transaction Hash</p>
                        <p className="text-gray-900 font-mono text-xs">
                          {txHash.slice(0, 10)}...{txHash.slice(-8)}
                        </p>
                      </div>
                      {tokenId && (
                        <div className="text-right">
                          <p className="text-gray-500 text-xs mb-1">Token ID</p>
                          <p className="text-gray-900 font-bold">#{tokenId}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={`https://sepolia.etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" strokeWidth={1.5} />
                        View on Chain
                      </a>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
                        <Share2 className="w-4 h-4" strokeWidth={1.5} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Transaction Details</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Network</span>
                      <span className="text-gray-900 font-medium">Ethereum Sepolia</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Contract</span>
                      <span className="text-gray-900 font-mono">{CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status</span>
                      <span className="text-emerald-600 font-medium">✓ Confirmed</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleViewProfile}
                    className="w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl text-white transition-all"
                  >
                    View My Collection
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full py-4 px-6 rounded-xl font-medium text-base border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
                  >
                    Browse More Events
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            // CHECKOUT VIEW - Original Purchase Flow
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header Image */}
              <div className="relative h-32 bg-gray-100">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button 
                  onClick={handleClose}
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
                    <span className="text-gray-500">Gas Fee</span>
                    <span className="text-gray-900 font-medium">~0.002 ETH</span>
                  </div>
                  <div className="border-t border-amber-200/50 my-2 pt-2 flex justify-between items-center">
                    <span className="font-bold text-amber-900">Total</span>
                    <span className="font-bold text-amber-900 text-lg">{event.price} ETH</span>
                  </div>
                </div>

                {/* Status Messages */}
                {status === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>{errorMessage}</p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  onClick={handleMint}
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]
                    ${loading 
                      ? 'bg-gradient-to-r from-amber-400 to-purple-500 opacity-80 cursor-wait' 
                      : !isConnected
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
                      : 'bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 shadow-lg shadow-amber-500/25'
                    } text-white`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing Transaction...
                    </>
                  ) : !isConnected ? (
                    "Connect Wallet to Buy"
                  ) : (
                    <>
                      Confirm Purchase ({event.price} ETH)
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Powered by Sepolia Testnet
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}