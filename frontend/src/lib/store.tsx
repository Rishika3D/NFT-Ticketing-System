import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Ticket {
  id: string;
  eventId: number | string;
  eventName: string;
  date: string;
  location: string;
  image: string;
  tokenId: string;
  purchaseDate: string;
}

interface UserProfile {
  name: string;
  email: string;
  walletAddress: string | null;
  loginMethod: 'wallet' | 'email' | null;
}

interface StoreContextType {
  user: UserProfile;
  tickets: Ticket[];
  isAuthenticated: boolean;
  login: (address: string, method?: 'wallet' | 'email') => void;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  addTicket: (ticket: Ticket) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_profile');
      return saved ? JSON.parse(saved) : { name: 'Anonymous User', email: '', walletAddress: null, loginMethod: null };
    }
    return { name: 'Anonymous User', email: '', walletAddress: null, loginMethod: null };
  });

  const [tickets, setTickets] = useState<Ticket[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('user_tickets');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(user));
    localStorage.setItem('user_tickets', JSON.stringify(tickets));
  }, [user, tickets]);

  const login = (address: string, method: 'wallet' | 'email' = 'wallet') => {
    setUser(prev => ({ ...prev, walletAddress: address, loginMethod: method }));
  };

  const logout = () => {
    setUser({ name: 'Anonymous User', email: '', walletAddress: null, loginMethod: null });
    localStorage.removeItem('user_profile');
  };

  const updateProfile = (name: string, email: string) => {
    setUser(prev => ({ ...prev, name, email }));
  };

  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [ticket, ...prev]);
  };

  return (
    <StoreContext.Provider value={{ user, tickets, isAuthenticated: !!user.walletAddress, login, logout, updateProfile, addTicket }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};