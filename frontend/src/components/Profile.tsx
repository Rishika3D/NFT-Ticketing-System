import { motion } from 'motion/react';
import { Settings, QrCode, Copy } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { useStore } from '../lib/store';

export function Profile({ onNavigate }: { onNavigate: (s: string) => void }) {
  const { user, tickets } = useStore();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-6 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-4xl font-serif text-amber-900">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-4xl mb-2 text-gray-900">{user.name}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500 font-mono text-sm">{user.walletAddress || "No Wallet"}</p>
                  <button className="p-1 hover:bg-gray-100 rounded"><Copy className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
            </div>
            <Button onClick={() => onNavigate('settings')} variant="outline" className="rounded-full">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Total Passes</p>
              <p className="text-3xl font-bold text-gray-900">{tickets.length}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Status</p>
              <p className="text-3xl font-bold text-emerald-500">Active</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm mb-1">Collection Value</p>
              <p className="text-3xl font-bold text-gray-900">{(tickets.length * 0.5).toFixed(1)} ETH</p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="owned" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="owned">My Tickets</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="owned">
            {tickets.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 mb-4">You have no tickets yet.</p>
                <Button onClick={() => onNavigate('events')}>Browse Events</Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="relative h-64 bg-gray-900">
                      <img src={ticket.image} alt={ticket.eventName} className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs">{ticket.tokenId}</span>
                          <QrCode className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{ticket.eventName}</h3>
                          <p className="text-sm opacity-90">{ticket.date}</p>
                          <p className="text-xs opacity-70">{ticket.location}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}