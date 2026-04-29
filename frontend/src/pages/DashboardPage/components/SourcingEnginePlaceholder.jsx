import React from 'react';
import { Search } from 'lucide-react';

const SourcingEnginePlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-20 px-10 bg-slate-50/50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#2A7FFF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center relative z-10">
          <Search size={40} className="text-[#2A7FFF]" />
        </div>
      </div>
      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">
        Initialize Sourcing Engine
      </h4>
      <p className="text-[0.85rem] font-medium text-slate-400 max-w-xs mx-auto leading-relaxed uppercase tracking-tight">
        Search for clinical medicine names to visualize real-time price intelligence
      </p>
    </div>
  );
};

export default SourcingEnginePlaceholder;
