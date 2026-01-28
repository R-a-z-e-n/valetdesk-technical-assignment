
import React from 'react';

export const Loading: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 space-y-4">
    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-slate-500 font-medium animate-pulse">Loading data...</p>
  </div>
);
