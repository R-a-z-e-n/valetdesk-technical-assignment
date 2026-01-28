
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { ListScreen } from './screens/ListScreen';
import { DetailScreen } from './screens/DetailScreen';
import { CreateScreen } from './screens/CreateScreen';
import { Screen } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('list');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Handle browser back button (rudimentary navigation persistence)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('detail/')) {
        const id = hash.split('/')[1];
        setSelectedTicketId(id);
        setCurrentScreen('detail');
      } else if (hash === 'create') {
        setCurrentScreen('create');
      } else {
        setCurrentScreen('list');
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Set initial state
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (screen: Screen, id?: string) => {
    setCurrentScreen(screen);
    if (id) {
      setSelectedTicketId(id);
      window.location.hash = `detail/${id}`;
    } else {
      setSelectedTicketId(null);
      window.location.hash = screen === 'list' ? '' : screen;
    }
  };

  const getTitle = () => {
    switch (currentScreen) {
      case 'detail': return 'Ticket Details';
      case 'create': return 'Issue Ticket';
      default: return 'Parking Tickets';
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'list':
        return <ListScreen onSelectItem={(id) => navigateTo('detail', id)} />;
      case 'detail':
        return selectedTicketId ? <DetailScreen ticketId={selectedTicketId} /> : <ListScreen onSelectItem={(id) => navigateTo('detail', id)} />;
      case 'create':
        return <CreateScreen onSuccess={() => navigateTo('list')} />;
      default:
        return <ListScreen onSelectItem={(id) => navigateTo('detail', id)} />;
    }
  };

  return (
    <Layout 
      currentScreen={currentScreen} 
      onNavigate={navigateTo} 
      title={getTitle()}
      onBack={currentScreen !== 'list' ? () => navigateTo('list') : undefined}
    >
      {renderScreen()}
    </Layout>
  );
};

export default App;
