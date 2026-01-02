import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Ticket {
  id: string;
  eventId: number;
  eventName: string;
  date: string;
  location: string;
  image: string;
  tokenId: string;
  purchaseDate: string;
}

interface AppState {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
}

// This saves your tickets to LocalStorage so they don't disappear on refresh
export const useStore = create<AppState>()(
  persist(
    (set) => ({
      tickets: [],
      addTicket: (ticket: any) => set((state: { tickets: any; }) => ({ 
        tickets: [...state.tickets, ticket] 
      })),
    }),
    {
      name: 'ticket-storage',
    }
  )
);