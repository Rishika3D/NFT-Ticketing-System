import React from 'react'
import { motion } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { EventCard } from './EventCard';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { EVENTS_DATA } from '../data'; // ✅ Importing shared data

interface EventListProps {
  onEventSelect: (eventId: number) => void;
}

export function EventList({ onEventSelect }: EventListProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900 font-bold tracking-tight">Upcoming Events</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500">Discover and mint your next exclusive experience</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" strokeWidth={1.5} />
            <Input
              placeholder="Search events..."
              className="pl-10 sm:pl-12 h-11 sm:h-12 rounded-full border-gray-200 bg-white shadow-sm focus-visible:ring-amber-500"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full px-5 sm:px-6 border-gray-200 hover:bg-gray-50 h-11 sm:h-12 text-gray-700"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Filters
          </Button>
        </motion.div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EVENTS_DATA.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard 
                {...event} 
                onClick={() => onEventSelect(event.id)} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}