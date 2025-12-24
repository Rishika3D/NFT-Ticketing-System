import { useState } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { EventList } from './components/EventList';
import { EventDetails } from './components/EventDetails';
import { WalletConnect } from './components/WalletConnect';
import { MintConfirmation } from './components/MintConfirmation';
import { Profile } from './components/Profile';
import { SignIn } from './components/SignIn';

type Screen = 'landing' | 'events' | 'event-details' | 'wallet' | 'mint-confirm' | 'profile' | 'signin';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleWalletConnect = () => {
    if (!isWalletConnected) {
      setCurrentScreen('wallet');
    }
  };

  const handleConnect = () => {
    setIsWalletConnected(true);
    setCurrentScreen('events');
  };

  const handleMint = () => {
    if (isWalletConnected) {
      setCurrentScreen('mint-confirm');
    } else {
      setCurrentScreen('wallet');
    }
  };

  const handleSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleEmailSignIn = () => {
    setIsWalletConnected(true);
    setCurrentScreen('events');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        isWalletConnected={isWalletConnected}
        onWalletConnect={handleWalletConnect}
      />

      {currentScreen === 'landing' && (
        <LandingPage onNavigate={handleNavigate} />
      )}

      {currentScreen === 'signin' && (
        <SignIn
          onWalletConnect={handleWalletConnect}
          onEmailSignIn={handleEmailSignIn}
          onBack={() => handleNavigate('landing')}
        />
      )}

      {currentScreen === 'events' && (
        <EventList onEventSelect={() => handleNavigate('event-details')} />
      )}

      {currentScreen === 'event-details' && (
        <EventDetails
          onBack={() => handleNavigate('events')}
          onMint={handleMint}
        />
      )}

      {currentScreen === 'wallet' && (
        <WalletConnect
          onConnect={handleConnect}
          onBack={() => handleNavigate('landing')}
        />
      )}

      {currentScreen === 'mint-confirm' && (
        <MintConfirmation
          onViewProfile={() => handleNavigate('profile')}
          onBackToEvents={() => handleNavigate('events')}
        />
      )}

      {currentScreen === 'profile' && (
        <Profile onNavigate={handleNavigate} />
      )}
    </div>
  );
}