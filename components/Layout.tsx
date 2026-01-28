
import React from 'react';
import { ChevronLeft, Plus, Car, List } from 'lucide-react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  title: string;
  onBack?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentScreen, onNavigate, title, onBack }) => {
  return (
    <div className="flex justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md bg-white flex flex-col min-h-screen relative shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-blue-600 text-white px-4 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-1 hover:bg-blue-500 rounded-full transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
             <Car className="text-blue-200" size={20} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-6 flex justify-around items-center z-20 h-16 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => onNavigate('list')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'list' || currentScreen === 'detail' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <List size={22} />
            <span className="text-xs font-medium">Tickets</span>
          </button>
          
          <button 
            onClick={() => onNavigate('create')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'create' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <Plus size={22} className={currentScreen === 'create' ? 'bg-blue-100 p-0.5 rounded-md' : ''} />
            <span className="text-xs font-medium">Issue</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
