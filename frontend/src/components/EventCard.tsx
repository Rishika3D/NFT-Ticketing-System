import { Calendar, MapPin } from 'lucide-react';
import React from 'react'

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  price: string;
  category: string;
  image: string;
  onClick: () => void;
}

export function EventCard({ title, date, location, price, category, image, onClick }: EventCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-gray-900 shadow-sm">
            {category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
           <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/20">
             {price} ETH
           </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
          {title}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}