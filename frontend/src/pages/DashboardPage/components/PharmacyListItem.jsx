import React from 'react';
import { Star, Navigation, Clock, ArrowUpRight } from 'lucide-react';

const PharmacyListItem = ({ pharmacy, onClick, onDirections }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-[28px] sm:rounded-[32px] bg-[#F8FAFC] dark:bg-[#1E293B]/40 border border-transparent hover:border-[#2ECC71]/30 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-[0_15px_35px_rgba(46,204,113,0.1)] cursor-pointer transition-all duration-500 group relative overflow-hidden"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl overflow-hidden shrink-0 shadow-lg border-2 sm:border-4 border-white dark:border-[#334155] relative z-10 group-hover:scale-105 transition-transform duration-500">
        <img 
          src={pharmacy.image || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a'} 
          alt={pharmacy.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex-1 min-w-0 w-full relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2 pr-1">
          <h4 className="text-[0.95rem] sm:text-[1.1rem] font-black text-slate-900 dark:text-white leading-tight transition-colors group-hover:text-[#2ECC71] flex-1 min-w-[120px]">
            {pharmacy.name}
          </h4>
          <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 bg-amber-400/10 rounded-xl text-amber-500 font-black text-[0.65rem] sm:text-[0.75rem] border border-amber-400/20 shadow-sm shrink-0 mt-0.5">
            <Star size={10} className="sm:size-[12px]" fill="currentColor" /> {pharmacy.rating || 'New'}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-4">
          <div className="flex items-center gap-1.5 text-[0.65rem] sm:text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">
            <Navigation size={10} className="sm:size-[12px] text-[#2A7FFF]" /> {pharmacy.distance || '---'}
          </div>
          <div className="flex items-center gap-1.5 text-[0.65rem] sm:text-[0.7rem] font-black text-emerald-500 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
            {pharmacy.status || 'Verified'}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[0.6rem] sm:text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase bg-white dark:bg-slate-800/50 px-2 sm:px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5">
            <Clock size={10} className="sm:size-[12px]" /> {pharmacy.timing || 'Syncing...'}
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); onDirections(e, pharmacy); }}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-slate-400 hover:bg-[#2A7FFF] hover:text-white transition-all transform hover:-rotate-12 shrink-0"
          >
            <ArrowUpRight size={16} className="sm:size-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyListItem;
