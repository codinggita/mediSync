import React from 'react';
import { Search, Loader2, Pill, ChevronRight } from 'lucide-react';

const MedicineSearchInput = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSelectMed, 
  suggestions, 
  isSearching 
}) => {
  return (
    <div className="relative mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2A7FFF] transition-colors" size={16} />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSelectMed(searchQuery)}
          placeholder="Search medicines..."
          className="w-full pl-10 sm:pl-14 pr-6 py-3 sm:py-4 bg-slate-50 dark:bg-[#0B1121] border border-slate-200/60 dark:border-slate-800 rounded-xl sm:rounded-2xl text-[0.8rem] sm:text-[0.9rem] font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all placeholder:text-slate-400"
        />
        
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-2xl z-50 overflow-hidden">
            {suggestions.map((name, i) => (
              <button 
                key={i}
                onClick={() => handleSelectMed(name)}
                className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 hover:bg-slate-50 dark:hover:bg-[#0B1121] border-b border-slate-100 dark:border-slate-800 last:border-0 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Pill size={14} className="text-slate-300 group-hover:text-[#2A7FFF]" />
                  <span className="text-[0.8rem] sm:text-[0.9rem] font-black text-slate-700 dark:text-slate-200">{name}</span>
                </div>
                <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        )}

        {isSearching && (
          <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2">
            <Loader2 size={16} className="animate-spin text-[#2A7FFF]" />
          </div>
        )}
      </div>
      
      <button 
        onClick={() => handleSelectMed(searchQuery)}
        className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-[#2A7FFF] text-white rounded-xl sm:rounded-2xl font-black text-[0.85rem] sm:text-[0.9rem] shadow-lg shadow-[#2A7FFF]/20 hover:bg-[#1A6FFF] transition-all"
      >
        Search
      </button>
    </div>
  );
};

export default MedicineSearchInput;
