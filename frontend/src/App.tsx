import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useStore } from './lib/store';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { EventList } from './components/EventList';
import { EventDetails } from './components/EventDetails';
import { WalletConnect } from './components/WalletConnect';
import { MintConfirmation } from './components/MintConfirmation';
import { Profile } from './components/Profile';
import { SignIn } from './components/SignIn';

export default function App() {
  const { isAuthenticated } = useStore();
  const navigate = useNavigate();
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleConnect = () => {
    navigate('/events');
  };

  const handleEventSelect = (id: number) => {
    setSelectedEventId(id);
    navigate('/event-details');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentScreen="dynamic"
        onNavigate={(screen) => navigate(`/${screen === 'landing' ? '' : screen}`)}
        isWalletConnected={isAuthenticated}
        onWalletConnect={() => navigate('/wallet')}
      />

      <Routes>
        <Route 
          path="/" 
          element={<LandingPage onNavigate={(screen) => navigate(`/${screen === 'landing' ? '' : screen}`)} />} 
        />
        
        <Route path="/signin" element={
          <SignIn 
            onWalletConnect={() => navigate('/wallet')}
            onEmailSignIn={handleConnect}
            onBack={() => navigate('/')}
          />
        } />

        <Route path="/events" element={
          <EventList onEventSelect={handleEventSelect} />
        } />
        
        <Route path="/event-details" element={
          <EventDetails 
            eventId={selectedEventId || 1}
            onBack={() => navigate('/events')} 
            onMint={() => navigate(isAuthenticated ? '/mint-confirm' : '/wallet')} 
          />
        } />

        <Route path="/wallet" element={
          <WalletConnect 
            onConnect={handleConnect} 
            onBack={() => navigate('/')} 
          />
        } />

        <Route path="/mint-confirm" element={
          <MintConfirmation 
            onViewProfile={() => navigate('/profile')} 
            onBackToEvents={() => navigate('/events')} 
          />
        } />

        <Route 
          path="/profile" 
          element={<Profile onNavigate={(screen) => navigate(`/${screen}`)} />} 
        />
      </Routes>
    </div>
  );
}