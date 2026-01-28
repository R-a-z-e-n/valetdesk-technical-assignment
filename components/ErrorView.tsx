
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
    <div className="bg-red-50 p-4 rounded-full mb-4">
      <AlertTriangle className="text-red-500" size={32} />
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-2">Something went wrong</h3>
    <p className="text-slate-600 mb-6">{message}</p>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);
