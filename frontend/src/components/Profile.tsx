import { motion } from 'motion/react';
import { Copy, ExternalLink, Settings, Download, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileProps {
  onNavigate: (screen: string) => void;
}

const ownedTickets = [
  {
    id: 1,
    name: 'Ethereal Sounds Festival',
    date: 'Dec 15, 2025',
    location: 'Tokyo, Japan',
    tokenId: '#1247',
    image: 'https://images.unsplash.com/photo-1677186304454-6fbe1fe3aaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25jZXJ0JTIwdmVudWV8ZW58MXx8fHwxNzYxOTUxMzc2fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: 'Web3 Summit 2025',
    date: 'Jan 20, 2026',
    location: 'San Francisco, CA',
    tokenId: '#892',
    image: 'https://images.unsplash.com/photo-1700936655767-7049129f1995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwY29uZmVyZW5jZSUyMGV2ZW50fGVufDF8fHx8MTc2MTg5ODQwMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: 'Digital Art Exposition',
    date: 'Dec 5, 2025',
    location: 'New York, NY',
    tokenId: '#543',
    image: 'https://images.unsplash.com/photo-1631288140270-a1d4f68ff381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2MTg5MTkxN3ww&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export function Profile({ onNavigate }: ProfileProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-6 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-2xl sm:text-3xl text-amber-900">L</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl mb-2 text-gray-900">My Collection</h1>
                <div className="flex items-center gap-2 sm:gap-3">
                  <p className="text-gray-500 font-mono text-sm sm:text-base">0x7f2a...a3b2</p>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" strokeWidth={1.5} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
            <Button variant="outline" className="rounded-full border-gray-200 w-full sm:w-auto">
              <Settings className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Settings
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-100">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Total Passes</p>
              <p className="text-2xl sm:text-3xl text-gray-900">3</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-100">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Events Attended</p>
              <p className="text-2xl sm:text-3xl text-gray-900">1</p>
            </div>
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-gray-100">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Upcoming</p>
              <p className="text-2xl sm:text-3xl text-gray-900">2</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="owned" className="w-full">
          <TabsList className="w-full justify-start rounded-full bg-gray-100 p-1 mb-6 sm:mb-8 overflow-x-auto">
            <TabsTrigger value="owned" className="rounded-full px-6 sm:px-8 text-sm">Owned</TabsTrigger>
            <TabsTrigger value="attended" className="rounded-full px-6 sm:px-8 text-sm">Attended</TabsTrigger>
            <TabsTrigger value="activity" className="rounded-full px-6 sm:px-8 text-sm">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="owned">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {ownedTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-all">
                    {/* Ticket Card */}
                    <div className="relative h-56 sm:h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                      <div className="absolute inset-0 opacity-40">
                        <ImageWithFallback
                          src={ticket.image}
                          alt={ticket.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                      
                      <div className="relative h-full p-5 sm:p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-amber-400/20 backdrop-blur-sm text-amber-300 text-xs">
                            {ticket.tokenId}
                          </span>
                          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" strokeWidth={1.5} />
                          </button>
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl text-white mb-2 sm:mb-3">{ticket.name}</h3>
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-gray-300">{ticket.date}</span>
                            <span className="text-gray-400 truncate ml-2">{ticket.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-3 sm:p-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-full border-gray-200 text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" strokeWidth={1.5} />
                        Save
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-full border-gray-200 text-xs"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add More Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => onNavigate('events')}
                className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all cursor-pointer flex items-center justify-center min-h-[300px] sm:min-h-[340px]"
              >
                <div className="text-center p-6 sm:p-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl text-gray-400">+</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-900 mb-1 sm:mb-2">Mint More Passes</p>
                  <p className="text-xs sm:text-sm text-gray-500">Explore upcoming events</p>
                </div>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="attended">
            <div className="text-center py-16 sm:py-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl sm:text-3xl">🎉</span>
              </div>
              <p className="text-lg sm:text-xl text-gray-900 mb-2">1 Event Attended</p>
              <p className="text-sm sm:text-base text-gray-500">Your attended events will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-3 sm:space-y-4">
              {[
                { action: 'Minted', event: 'Ethereal Sounds Festival', time: '2 hours ago' },
                { action: 'Minted', event: 'Web3 Summit 2025', time: '1 day ago' },
                { action: 'Minted', event: 'Digital Art Exposition', time: '3 days ago' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-base sm:text-lg">✨</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base text-gray-900 truncate">
                          <span className="text-amber-900">{activity.action}</span> {activity.event}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" strokeWidth={1.5} />
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}