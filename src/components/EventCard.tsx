import { motion } from 'motion/react';
import { Calendar, MapPin, Users, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: string;
  price: string;
  image: string;
  category: string;
  onClick: () => void;
}

export function EventCard({ title, date, location, attendees, price, image, category, onClick }: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="rounded-3xl overflow-hidden bg-white border border-gray-100 hover:shadow-2xl transition-all">
        {/* Image */}
        <div className="relative h-72 overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-sm text-gray-900">
              {category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl mb-4 text-gray-900 group-hover:text-amber-900 transition-colors">
            {title}
          </h3>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">{date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Users className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm">{attendees} attending</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 mb-1">Starting from</p>
              <p className="text-xl text-gray-900">{price} ETH</p>
            </div>
            <div className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-100 to-amber-50 text-sm text-amber-900">
              Available
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
