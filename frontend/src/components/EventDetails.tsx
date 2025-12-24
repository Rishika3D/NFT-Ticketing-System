import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Share2, Heart, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventDetailsProps {
  onBack: () => void;
  onMint: () => void;
}

export function EventDetails({ onBack, onMint }: EventDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
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
            <div className="rounded-3xl overflow-hidden aspect-square bg-gray-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1677186304454-6fbe1fe3aaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25jZXJ0JTIwdmVudWV8ZW58MXx8fHwxNzYxOTUxMzc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Ethereal Sounds Festival"
                className="w-full h-full object-cover"
              />
            </div>

            {/* NFT Preview Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-100">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">NFT Ticket Preview</p>
              <p className="text-sm sm:text-base text-gray-900 mb-4">This digital pass grants you exclusive access and proof of attendance.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-amber-200 text-amber-900 text-xs">Transferable</Badge>
                <Badge variant="outline" className="border-amber-200 text-amber-900 text-xs">Verifiable</Badge>
                <Badge variant="outline" className="border-amber-200 text-amber-900 text-xs">Collectible</Badge>
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
                <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100 text-xs">Music</Badge>
                <span className="text-xs sm:text-sm text-gray-500">• 2,450 attending</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">Ethereal Sounds Festival</h1>
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
                  <p className="text-sm sm:text-base text-gray-900">December 15, 2025 • 8:00 PM JST</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Location</p>
                  <p className="text-sm sm:text-base text-gray-900">Shibuya Music Hall, Tokyo, Japan</p>
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
              <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 text-gray-900">Pass Benefits</h3>
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

            {/* Price & Actions */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200">
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Mint Price</p>
                  <p className="text-2xl sm:text-3xl text-gray-900">0.5 ETH</p>
                  <p className="text-xs sm:text-sm text-gray-400">≈ $1,850 USD</p>
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

              <Button
                onClick={onMint}
                className="w-full rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-xl transition-all py-5 sm:py-6"
              >
                Mint Ticket NFT
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}