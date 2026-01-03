import { User, Ticket, Calendar, MapPin, ExternalLink, Loader2, RefreshCw } from 'lucide-react';
import { useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/utils';
import React from 'react';
import { EVENTS_DATA } from '../data';

interface TicketData {
  tokenId: number;
  eventId: number;
  owner: string;
  used: boolean;
}

export function Profile() {
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTickets = useCallback(async () => {
    if (!isConnected || !walletProvider || !address) return;
    
    setLoading(true);
    setError('');
    setTickets([]);

    try {
      const ethersProvider = new ethers.BrowserProvider(walletProvider);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, ethersProvider);

      console.log("🔍 Fetching tickets for:", address);

      // Get TicketMinted events to find all tickets purchased by this user
      // Since filters.Transfer doesn't exist in our ABI, we'll query TicketMinted events
      const currentBlock = await ethersProvider.getBlockNumber();
      
      // Look back 10000 blocks (adjust based on when contract was deployed)
      const fromBlock = Math.max(0, currentBlock - 10000);
      
      // Query all TicketMinted events (no filter available in our ABI)
      // We'll filter by buyer address after
      const allEvents = await ethersProvider.getLogs({
        address: CONTRACT_ADDRESS,
        fromBlock,
        toBlock: currentBlock,
        topics: [
          ethers.id("TicketMinted(uint256,uint256,address)") // Event signature
        ]
      });
      
      console.log("📜 Found", allEvents.length, "TicketMinted events");

      const foundTickets: TicketData[] = [];

      for (const log of allEvents) {
        try {
          // Parse the log using contract interface
          const parsed = contract.interface.parseLog({
            topics: [...log.topics],
            data: log.data
          });
          
          if (!parsed) continue;
          
          const eventId = Number(parsed.args[0]);
          const tokenId = Number(parsed.args[1]);
          const buyer = parsed.args[2];
          
          // Only include tickets bought by this user
          if (buyer.toLowerCase() !== address.toLowerCase()) continue;
          
          // Verify current owner (in case ticket was transferred)
          const currentOwner = await contract.ownerOf(tokenId);
          
          if (currentOwner.toLowerCase() === address.toLowerCase()) {
            // Check if ticket has been used
            const isUsed = await contract.ticketUsed(tokenId);
            
            foundTickets.push({
              tokenId,
              eventId,
              owner: currentOwner,
              used: isUsed
            });
            
            console.log(`✅ Found ticket #${tokenId} for event #${eventId}`);
          }
        } catch (err) {
          console.error("Error processing event:", err);
        }
      }

      setTickets(foundTickets);
      console.log("🎫 Total tickets owned:", foundTickets.length);

    } catch (err: any) {
      console.error("❌ Error fetching tickets:", err);
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  }, [isConnected, walletProvider, address]);

  useEffect(() => {
    if (isConnected) {
      fetchTickets();
    }
  }, [isConnected, fetchTickets]);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <User className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Connect Wallet</h2>
        <p className="text-gray-500 mt-2">Connect your wallet to view your tickets.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {address?.slice(2, 4).toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full mx-auto md:mx-0 w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
          </div>
          
          <button 
            onClick={fetchTickets} 
            disabled={loading}
            className="md:ml-auto p-3 text-gray-500 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            title="Refresh Tickets"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tickets Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Ticket className="w-6 h-6 text-amber-600" />
        My Tickets {tickets.length > 0 && `(${tickets.length})`}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p className="font-medium">Error loading tickets</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
          <span className="ml-3 text-gray-600">Loading your tickets...</span>
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No tickets found</h3>
          <p className="text-gray-500 mt-2">
            {isConnected 
              ? "Purchase tickets from events to see them here."
              : "Connect your wallet to view tickets."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => {
            const eventData = EVENTS_DATA.find(e => e.id === ticket.eventId);
            
            // If event data not found in our local data, show a basic card
            if (!eventData) {
              return (
                <div key={ticket.tokenId} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Ticket className="w-16 h-16 text-gray-400" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 shadow-sm">
                      #{ticket.tokenId}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-gray-900 mb-3">
                      Event #{ticket.eventId}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Event details not available locally</p>
                    <a 
                      href={`https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${ticket.tokenId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
                    >
                      View on Chain <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            }

            return (
              <div key={ticket.tokenId} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative">
                {ticket.used && (
                  <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white/90 px-6 py-3 rounded-full">
                      <span className="text-gray-900 font-bold">TICKET USED</span>
                    </div>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={eventData.image} 
                    alt={eventData.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-600 shadow-sm">
                    TICKET #{ticket.tokenId}
                  </div>
                  {!ticket.used && (
                    <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm">
                      VALID
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-1">
                    {eventData.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>{eventData.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{eventData.location}</span>
                    </div>
                  </div>

                  <a 
                    href={`https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${ticket.tokenId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
                  >
                    View on Chain <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}