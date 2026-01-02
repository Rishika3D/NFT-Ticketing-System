import { motion } from 'motion/react';
import { Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import React from 'react';

interface LandingPageProps {
  onNavigate: (screen: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 mb-6 sm:mb-8">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-900" strokeWidth={1.5} />
              <span className="text-xs sm:text-sm text-amber-900">Web3 Event Ticketing</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 text-gray-900 tracking-tight px-4">
              Your VIP Pass to
              <span className="block mt-2 bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
                Exclusive Experiences
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
              Secure, verifiable, and truly yours. Mint premium NFT tickets for world-class events.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Button
                onClick={() => onNavigate('events')}
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-2xl transition-all px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('signin')}
                className="w-full sm:w-auto rounded-full border-gray-200 hover:bg-gray-50 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base"
              >
                Sign In
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Ownership',
                description: 'Blockchain-secured tickets that prove authenticity and prevent fraud.'
              },
              {
                icon: Zap,
                title: 'Instant Transfer',
                description: 'Send tickets to friends seamlessly with peer-to-peer NFT transfers.'
              },
              {
                icon: Sparkles,
                title: 'Exclusive Perks',
                description: 'Unlock special benefits, airdrops, and collector rewards.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-900" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-white">Ready to experience luxury ticketing?</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8">Join thousands securing their next event pass.</p>
            <Button
              onClick={() => onNavigate('events')}
              className="w-full sm:w-auto rounded-full bg-white text-gray-900 hover:bg-gray-100 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base"
            >
              Browse Events
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}