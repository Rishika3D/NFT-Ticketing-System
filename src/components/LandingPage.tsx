import { motion } from 'motion/react';
import { Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onNavigate: (screen: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 mb-8">
              <Sparkles className="w-4 h-4 text-amber-900" strokeWidth={1.5} />
              <span className="text-sm text-amber-900">Web3 Event Ticketing</span>
            </div>
            
            <h1 className="text-7xl mb-6 text-gray-900 tracking-tight">
              Your VIP Pass to
              <span className="block mt-2 bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
                Exclusive Experiences
              </span>
            </h1>
            
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              Secure, verifiable, and truly yours. Mint premium NFT tickets for world-class events.
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => onNavigate('events')}
                className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-2xl transition-all px-8 py-6 text-base"
              >
                Explore Events
                <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate('wallet')}
                className="rounded-full border-gray-200 hover:bg-gray-50 px-8 py-6 text-base"
              >
                Connect Wallet
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
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
                className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-amber-900" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto p-12 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl mb-4 text-white">Ready to experience luxury ticketing?</h2>
            <p className="text-xl text-gray-300 mb-8">Join thousands securing their next event pass.</p>
            <Button
              onClick={() => onNavigate('events')}
              className="rounded-full bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base"
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
