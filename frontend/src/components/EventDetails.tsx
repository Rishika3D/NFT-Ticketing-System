import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Share2, Heart, ArrowLeft, Check, Loader2, ExternalLink, Plus, Minus } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';

// --- IMPORT YOUR REAL DATA ---
import { EVENTS_DATA } from '../data';

interface EventDetailsProps {
  eventId?: number;
  onBack?: () => void;
  onMint?: () => void;
}

export function EventDetails({ eventId, onBack, onMint }: EventDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Resolve the Event Data
  const effectiveId = eventId || (id ? Number(id) : 1);
  const event = EVENTS_DATA.find(e => e.id === effectiveId) || EVENTS_DATA[0];

  // 1. Wallet Hooks
  const { open } = useWeb3Modal();
  const { isConnected, address } = useWeb3ModalAccount();

  // 2. Local State
  const [quantity, setQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 3. Helper Functions
  const handleBack = () => {
    if (onBack) onBack();
    else navigate('/events');
  };

  const increment = () => { if (quantity < 10) setQuantity(q => q + 1); };
  const decrement = () => { if (quantity > 1) setQuantity(q => q - 1); };

  // --- NEW MINT LOGIC: Call Backend API ---
  const handleMint = async () => {
    setError(null);
    setTxHash(null);

    // Step A: Ensure Wallet is Connected
    if (!isConnected || !address) {
      await open();
      return;
    }

    setIsMinting(true);

    try {
      // Step B: Call your Express Backend on Port 5050
      const response = await fetch('http://localhost:5050/api/booking', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,       
          walletAddress: address,  
          seatIds: []              
        })
      });

      const data = await response.json();

      // Step C: Handle API Errors
      if (!data.success) {
        throw new Error(data.message || "Server failed to process ticket.");
      }
      
      // Step D: Show Success Screen
      setTxHash(data.data.txHash); 
      if (onMint) onMint();

    } catch (err: any) {
      console.error("❌ Minting failed:", err);
      
      // 🚨 CUSTOM ERROR CHECK: Make the error message helpful
      if (err.message && err.message.includes("insufficient funds")) {
        setError("Error: The Server Wallet is out of test ETH. Please try the cheap 'GitHub Demo' event.");
      } else {
        setError(err.message || "Transaction failed. Please try again.");
      }
    } finally {
      setIsMinting(false);
    }
  };

  // --- SUCCESS VIEW (Post-Mint) ---
  if (txHash) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white pt-32 px-4 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-3xl border border-green-100 shadow-xl max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Mint Successful!</h2>
          <p className="text-gray-600 mb-6">
            You secured {quantity} ticket{quantity > 1 ? 's' : ''} for <strong>{event.title}</strong>.
          </p>
          
          <a 
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-green-700 font-medium mb-8 hover:underline"
          >
            View on Etherscan <ExternalLink className="w-4 h-4" />
          </a>

          <div className="space-y-3">
             <Button onClick={() => setTxHash(null)} variant="outline" className="w-full rounded-xl py-6">
               Buy Another
             </Button>
             <Button onClick={handleBack} className="w-full rounded-xl py-6 bg-gray-900 text-white hover:bg-gray-800">
               Back to Events
             </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- MAIN VIEW ---
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm sm:text-base">Back to events</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="rounded-3xl overflow-hidden aspect-square bg-gray-100 shadow-lg relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
               <div className="absolute top-4 left-4">
               <span className="inline-block px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-gray-900 text-sm font-bold shadow-sm">
                {event.category}
              </span>
            </div>
            </div>

            {/* NFT Preview Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">NFT Ticket Preview</p>
              <p className="text-sm sm:text-base text-gray-900 mb-4">This digital pass grants you exclusive access and proof of attendance.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-full border border-amber-200 text-amber-900 text-xs font-medium">Transferable</span>
                <span className="px-2.5 py-0.5 rounded-full border border-amber-200 text-amber-900 text-xs font-medium">Verifiable</span>
                <span className="px-2.5 py-0.5 rounded-full border border-amber-200 text-amber-900 text-xs font-medium">Collectible</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">{event.category}</span>
                <span className="text-xs sm:text-sm text-gray-500">• 2,450 attending</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900 font-bold">{event.title}</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed">
                Experience an unforgettable night of electronic music with world-class DJs and immersive visual art installations.
              </p>
            </div>

            {/* Event Info */}
            <div className="space-y-4 py-5 sm:py-6 border-y border-gray-100">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Date & Time</p>
                  <p className="text-sm sm:text-base text-gray-900">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Location</p>
                  <p className="text-sm sm:text-base text-gray-900">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Capacity</p>
                  <p className="text-sm sm:text-base text-gray-900">Limited to 3,000 passes</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 text-gray-900 font-semibold">Pass Benefits</h3>
              <div className="space-y-3">
                {[
                  'Full access to all stages and performances',
                  'Exclusive NFT artwork and commemorative token',
                  'Priority entry and VIP lounge access',
                  'Potential airdrops for future events'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-amber-900" strokeWidth={2} />
                    </div>
                    <p className="text-sm sm:text-base text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Actions & Quantity */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Price per Ticket</p>
                  <p className="text-2xl sm:text-3xl text-gray-900 font-bold">{event.price} ETH</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" strokeWidth={1.5} />
                  </button>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-2 mb-6 border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-2">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button 
                        onClick={decrement}
                        disabled={quantity <= 1 || isMinting}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-lg font-bold text-gray-900 w-6 text-center">{quantity}</span>
                    <button 
                        onClick={increment}
                        disabled={quantity >= 10 || isMinting}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-600 shadow-sm hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                  </div>
              </div>

              <div className="flex justify-between items-center mb-4 text-sm">
                 <span className="text-gray-500">Total</span>
                 <span className="font-bold text-gray-900">{(Number(event.price) * quantity).toFixed(4)} ETH</span>
              </div>

              {/* ⚠️ ERROR MESSAGE DISPLAY (Only shows if error exists) */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-start gap-2">
                  <div className="w-1 h-4 bg-red-400 rounded-full mt-0.5" />
                  {error}
                </div>
              )}

              {/* MAIN ACTION BUTTON */}
              <Button
                onClick={handleMint}
                disabled={isMinting}
                className="w-full rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl hover:scale-[1.01] transition-all py-6 sm:py-7 text-lg font-medium text-white disabled:opacity-70"
              >
                {isMinting ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing on Server...
                    </>
                ) : (
                    `Buy Ticket`
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}