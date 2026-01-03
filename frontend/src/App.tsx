import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { EventList } from './components/EventList';
import { EventDetails } from './components/EventDetails';
import { WalletConnect } from './components/WalletConnect';
import { Profile } from './components/Profile';
import { SignIn } from './components/SignIn';
import { Settings } from './components/Settings';

export default function App() {
  const { isConnected, address } = useWeb3ModalAccount();
  const navigate = useNavigate();
  // We don't need selectedEventId state anymore because the URL handles it!
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Track authentication from wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('walletAddress', address);
    } else {
      const savedAuth = localStorage.getItem('isAuthenticated');
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, [isConnected, address]);

  const handleConnect = () => {
    setIsAuthenticated(true);
    navigate('/events');
  };

  const handleEventSelect = (id: number) => {
    // This pushes the ID to the URL (e.g., /event/1)
    navigate(`/event/${id}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('walletAddress');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentScreen="dynamic"
        onNavigate={(screen) => navigate(`/${screen === 'landing' ? '' : screen}`)}
        isWalletConnected={isAuthenticated || isConnected}
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
        
        {/* ✅ CORRECT: The :id in the path is automatically read by EventDetails */}
        <Route path="/event/:id" element={
          <EventDetails 
            onBack={() => navigate('/events')} 
            onMint={() => {}} 
          />
        } />
        
        <Route path="/wallet" element={
          <WalletConnect 
            onConnect={handleConnect} 
            onBack={() => navigate('/')} 
          />
        } />

        <Route 
          path="/profile" 
          element={<Profile />} 
        />

        <Route 
          path="/settings" 
          element={
            <Settings 
              onBack={() => navigate(-1)} 
            />
          } 
        />

      </Routes>
    </div>
  );
}