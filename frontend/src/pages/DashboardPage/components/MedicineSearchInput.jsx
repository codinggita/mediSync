import React from 'react';
import { Search, Loader2, Pill, ChevronRight, TrendingDown, ArrowRight, Zap } from 'lucide-react';

const MedicineSearchInput = ({
  searchQuery,
  setSearchQuery,
  handleSelectMed,
  suggestions,
  isSearching,
}) => {
  return (
    <div className="space-y-8 mb-10">
      {}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSelectMed(searchQuery);
        }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-[#ecf0f3] dark:bg-[#0B1121] rounded-[24px] shadow-[inset_8px_8px_16px_#cbced1,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#050810,inset_-8px_-8px_16px_#1e2d4d] transition-shadow duration-500 group-focus-within:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:group-focus-within:shadow-[inset_4px_4px_8px_#050810,inset_-4px_-4px_8px_#1e2d4d]" />
          <div className="relative flex items-center px-8 py-5 sm:py-6">
            <div className="relative">
              <Search
                className="text-slate-400 group-focus-within:text-[#2A7FFF] transition-all duration-300 transform group-focus-within:scale-110"
                size={22}
              />
              <div className="absolute inset-0 bg-[#2A7FFF]/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Clinical Formulas..."
              className="w-full bg-transparent border-none outline-none pl-5 text-[1rem] sm:text-[1.1rem] font-bold text-slate-800 dark:text-white placeholder:text-slate-400/40"
            />
          </div>

          {}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-6 bg-white/80 dark:bg-[#151E32]/80 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[32px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] z-50 overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="p-2">
                {suggestions.map((name, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectMed(name)}
                    className="w-full text-left px-8 py-6 hover:bg-[#2A7FFF]/5 dark:hover:bg-white/5 rounded-[24px] transition-all flex items-center justify-between group/item"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-[18px] bg-[#ecf0f3] dark:bg-[#0B1121] shadow-sm flex items-center justify-center group-hover/item:text-[#2A7FFF] transition-colors">
                        <Pill size={20} className="text-slate-400 group-hover/item:scale-110 transition-transform" />
                      </div>
                      <div>
                        <span className="block text-[1.1rem] font-black text-slate-800 dark:text-white group-hover/item:text-[#2A7FFF] transition-colors">
                          {name}
                        </span>
                        <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                          Sourcing Verified
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-transparent group-hover/item:border-[#2A7FFF]/20 group-hover/item:bg-white dark:group-hover/item:bg-white/5 transition-all">
                      <ArrowRight size={18} className="text-[#2A7FFF] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
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

      {}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">
          Try Searching For:
        </span>
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

      {}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Trending',
            name: 'Azithromycin',
            icon: Pill,
            color: 'bg-blue-500/10 text-blue-500',
          },
          {
            label: 'Price Drop',
            name: 'Metformin',
            icon: TrendingDown,
            color: 'bg-emerald-500/10 text-emerald-500',
          },
          {
            label: 'Substitutes',
            name: 'Find Generic',
            icon: ArrowRight,
            color: 'bg-amber-500/10 text-amber-500',
          },
        ].map((tag, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tag.name !== 'Find Generic' && handleSelectMed(tag.name)}
            className="flex items-center gap-4 p-5 rounded-[28px] bg-white dark:bg-white/5 border border-white dark:border-white/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group/tag"
          >
            <div
              className={`w-12 h-12 rounded-2xl ${tag.color} flex items-center justify-center group-hover/tag:scale-110 transition-transform`}
            >
              <tag.icon size={20} />
            </div>
            <div className="text-left">
              <p className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400">
                {tag.label}
              </p>
              <p className="text-[0.9rem] font-black text-slate-800 dark:text-white">{tag.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MedicineSearchInput;
