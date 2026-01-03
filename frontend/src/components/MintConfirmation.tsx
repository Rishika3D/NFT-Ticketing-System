import { motion } from 'motion/react';
import { CheckCircle2, Download, Share2, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import React from 'react';

interface MintConfirmationProps {
  onViewProfile: () => void;
  onBackToEvents: () => void;
}

export function MintConfirmation({ onViewProfile, onBackToEvents }: MintConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center mx-auto mb-5 sm:mb-6 relative">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" strokeWidth={1.5} />
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-emerald-200"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 mb-5 sm:mb-6">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-900" strokeWidth={1.5} />
              <span className="text-xs sm:text-sm text-amber-900">Minted Successfully</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">Your Pass is Ready!</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 px-4">
              Congratulations! Your NFT ticket has been minted to your wallet.
            </p>
          </motion.div>
        </motion.div>

        {/* NFT Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-2xl">
            {/* Ticket Header */}
            <div className="relative h-64 sm:h-80 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1677186304454-6fbe1fe3aaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25jZXJ0JTIwdmVudWV8ZW58MXx8fHwxNzYxOTUxMzc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              
              <div className="relative h-full p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-amber-300 text-xs sm:text-sm mb-1 sm:mb-2">VIP Pass #1247</p>
                    <h2 className="text-2xl sm:text-3xl text-white">Ethereal Sounds<br/>Festival</h2>
                  </div>
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <span className="text-white text-xs sm:text-sm">Verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Date</p>
                    <p className="text-white text-sm sm:text-base">Dec 15, 2025</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Location</p>
                    <p className="text-white text-sm sm:text-base">Tokyo, JP</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-0.5 sm:mb-1">Seat</p>
                    <p className="text-white text-sm sm:text-base">GA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-5 sm:mb-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Contract Address</p>
                  <p className="text-gray-900 font-mono text-xs sm:text-sm">0x7f2a...a3b2</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Token ID</p>
                  <p className="text-gray-900 text-sm sm:text-base">#1247</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-gray-200 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Save
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-gray-200 hover:bg-gray-50"
                >
                  <Share2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 mb-6 sm:mb-8"
        >
          <h3 className="text-base sm:text-lg mb-3 sm:mb-4 text-gray-900">Transaction Details</h3>
          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Transaction Hash</span>
              <span className="text-gray-900 font-mono">0xa7b3...9c2d</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Network</span>
              <span className="text-gray-900">Ethereum Mainnet</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Gas Fee</span>
              <span className="text-gray-900">0.003 ETH</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">Status</span>
              <span className="text-emerald-600">Confirmed</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <Button
            onClick={onViewProfile}
            className="flex-1 rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl transition-all py-5 sm:py-6"
          >
            View My Collection
            <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
          </Button>
          <Button
            onClick={onBackToEvents}
            variant="outline"
            className="flex-1 rounded-full border-gray-200 hover:bg-gray-50 py-5 sm:py-6"
          >
            Browse More Events
          </Button>
        </motion.div>
      </div>
    </div>
  );
}