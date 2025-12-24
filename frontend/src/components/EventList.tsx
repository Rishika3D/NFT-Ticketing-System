import { motion } from 'motion/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { EventCard } from './EventCard';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface EventListProps {
  onEventSelect: (eventId: number) => void;
}

const events = [
  {
    id: 1,
    title: 'Ethereal Sounds Festival',
    date: 'Dec 15, 2025 • 8:00 PM',
    location: 'Tokyo, Japan',
    attendees: '2,450',
    price: '0.5',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1677186304454-6fbe1fe3aaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25jZXJ0JTIwdmVudWV8ZW58MXx8fHwxNzYxOTUxMzc2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    title: 'Web3 Summit 2025',
    date: 'Jan 20, 2026 • 9:00 AM',
    location: 'San Francisco, CA',
    attendees: '5,800',
    price: '1.2',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMGV2ZW50fGVufDF8fHx8MTc2MTg5ODQwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    title: 'Neon Nights Gala',
    date: 'Nov 30, 2025 • 7:00 PM',
    location: 'Miami, FL',
    attendees: '1,200',
    price: '0.8',
    category: 'VIP',
    image: 'https://images.unsplash.com/photo-1696041760674-4123ffd6d226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXAlMjBleGNsdXNpdmUlMjBldmVudHxlbnwxfHx8fDE3NjE4NTc1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    title: 'Digital Art Exposition',
    date: 'Dec 5, 2025 • 6:00 PM',
    location: 'New York, NY',
    attendees: '950',
    price: '0.3',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1631288140270-a1d4f68ff381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2MTg5MTkxN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    title: 'Electric Dreams Party',
    date: 'Dec 22, 2025 • 10:00 PM',
    location: 'Ibiza, Spain',
    attendees: '3,500',
    price: '0.6',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1647304232647-6bc53bfc3a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHBhcnR5JTIwbGlnaHRzfGVufDF8fHx8MTc2MTk1MTM3N3ww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 6,
    title: 'Future of Design',
    date: 'Jan 10, 2026 • 2:00 PM',
    location: 'London, UK',
    attendees: '1,800',
    price: '0.4',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1549791084-5f78368b208b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MTkxMjEyNnww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 text-gray-900">Upcoming Events</h1>
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
              className="pl-10 sm:pl-12 h-11 sm:h-12 rounded-full border-gray-200 bg-white"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full px-5 sm:px-6 border-gray-200 hover:bg-gray-50 h-11 sm:h-12"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Filters
          </Button>
        </motion.div>

        {/* Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard {...event} onClick={() => onEventSelect(event.id)} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}