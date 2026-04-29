import React from 'react';
import { Search, Loader2, Pill, ChevronRight, TrendingDown, ArrowRight, Zap } from 'lucide-react';

const MedicineSearchInput = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSelectMed, 
  suggestions, 
  isSearching 
}) => {
  return (
    <div className="space-y-8 mb-10">
      {/* Search Action Container */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSelectMed(searchQuery); }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-[#ecf0f3] dark:bg-[#0B1121] rounded-2xl shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#050810,inset_-6px_-6px_12px_#1e2d4d]" />
          <div className="relative flex items-center px-6 py-4 sm:py-5">
            <Search className="text-slate-400 group-focus-within:text-[#2A7FFF] transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Paracetamol, Insulin..."
              className="w-full bg-transparent border-none outline-none pl-4 text-[0.9rem] sm:text-[1rem] font-bold text-slate-700 dark:text-slate-200 placeholder:text-slate-400/60"
            />
          </div>

          {/* Dynamic Suggestions Overlay */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-4 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] z-50 overflow-hidden animate-in slide-in-from-top-4 duration-300">
              {suggestions.map((name, i) => (
                <button 
                  key={i}
                  type="button"
                  onClick={() => handleSelectMed(name)}
                  className="w-full text-left px-8 py-5 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-50 dark:border-white/5 last:border-0 flex items-center justify-between group/item"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-[#2A7FFF]/10 transition-colors">
                      <Pill size={18} className="text-slate-400 group-hover/item:text-[#2A7FFF]" />
                    </div>
                    <span className="text-[1rem] font-black text-slate-700 dark:text-slate-200">{name}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover/item:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button 
          type="submit"
          disabled={isSearching || !searchQuery.trim()}
          className="px-8 sm:px-12 py-4 sm:py-0 bg-[#2A7FFF] hover:bg-[#1A6FFF] text-white rounded-2xl font-black text-[0.85rem] sm:text-[0.9rem] shadow-lg shadow-[#2A7FFF]/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:translate-y-0"
        >
          {isSearching ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Zap size={18} fill="currentColor" />
          )}
          Intelligence Search
        </button>
      </form>

      {/* Intelligence Guidance Section */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Try Searching For:</span>
        {['Amoxicillin', 'Atorvastatin', 'Lisinopril', 'Levothyroxine'].map((med) => (
          <button 
            key={med}
            type="button"
            onClick={() => handleSelectMed(med)}
            className="px-4 py-2 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[0.75rem] font-black text-slate-600 dark:text-slate-300 hover:border-[#2A7FFF] hover:text-[#2A7FFF] transition-all"
          >
            {med}
          </button>
        ))}
      </div>

      {/* Quick Intelligence Tags */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Trending', name: 'Azithromycin', icon: Pill, color: 'bg-blue-500/10 text-blue-500' },
          { label: 'Price Drop', name: 'Metformin', icon: TrendingDown, color: 'bg-emerald-500/10 text-emerald-500' },
          { label: 'Substitutes', name: 'Find Generic', icon: ArrowRight, color: 'bg-amber-500/10 text-amber-500' }
        ].map((tag, i) => (
          <button 
            key={i}
            type="button"
            onClick={() => tag.name !== 'Find Generic' && handleSelectMed(tag.name)}
            className="flex items-center gap-4 p-5 rounded-[28px] bg-white dark:bg-white/5 border border-white dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group/tag"
          >
            <div className={`w-12 h-12 rounded-2xl ${tag.color} flex items-center justify-center group-hover/tag:scale-110 transition-transform`}>
               <tag.icon size={20} />
            </div>
            <div className="text-left">
              <p className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">{tag.label}</p>
              <p className="text-[0.9rem] font-black text-slate-800 dark:text-white">{tag.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MedicineSearchInput;
