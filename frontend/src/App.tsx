import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { StoreProvider, useStore } from './lib/store'; // 1. Import Store
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { EventList } from './components/EventList';
import { EventDetails } from './components/EventDetails';
import { WalletConnect } from './components/WalletConnect';
import { MintConfirmation } from './components/MintConfirmation';
import { Profile } from './components/Profile';
import { SignIn } from './components/SignIn';

// 2. Create an inner component to handle the logic
function AppContent() {
  const { isAuthenticated } = useStore(); // Use global state instead of local useState
  const navigate = useNavigate();
  
  // We can keep a local state for the specific event selected, 
  // so we know which one to show on the Details page.
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const handleConnect = () => {
    // The actual login logic is handled inside the WalletConnect/SignIn components
    // via the useStore() hook. We just need to navigate.
    navigate('/events');
  };

  const handleEventSelect = (id: number) => {
    setSelectedEventId(id);
    navigate('/event-details');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Global Auth State */}
      <Header
        currentScreen="dynamic"
        onNavigate={(screen) => navigate(`/${screen === 'landing' ? '' : screen}`)}
        isWalletConnected={isAuthenticated} 
        onWalletConnect={() => navigate('/wallet')}
      />

      <Routes>
        <Route path="/" element={<LandingPage onNavigate={(screen) => navigate(`/${screen === 'landing' ? '' : screen}`)} />} />
        
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
        
        {/* Pass the selected ID to EventDetails if needed, or default to first event */}
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

        <Route path="/profile" element={<Profile onNavigate={(screen) => navigate(`/${screen}`)} />} />
      </Routes>
    </div>
  );
}

// 3. Wrap the App in the StoreProvider
export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}