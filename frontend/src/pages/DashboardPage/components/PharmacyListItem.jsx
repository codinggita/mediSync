import React from 'react';
import { Star, Navigation, Clock, ArrowUpRight } from 'lucide-react';

const PharmacyListItem = ({ pharmacy, onClick, onDirections }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-6 p-5 rounded-[32px] bg-[#F8FAFC] dark:bg-[#1E293B]/40 border border-transparent hover:border-[#2ECC71]/30 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-[0_15px_35px_rgba(46,204,113,0.1)] cursor-pointer transition-all duration-500 group relative overflow-hidden"
    >
      <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 shadow-lg border-4 border-white dark:border-[#334155] relative z-10 group-hover:scale-105 transition-transform duration-500">
        <img 
          src={pharmacy.image || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a'} 
          alt={pharmacy.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white truncate transition-colors group-hover:text-[#2ECC71]">
            {pharmacy.name}
          </h4>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 rounded-xl text-amber-500 font-black text-[0.75rem] border border-amber-400/20 shadow-sm">
            <Star size={12} fill="currentColor" /> {pharmacy.rating || 'New'}
          </div>
        </div>
        
        <div className="flex items-center gap-5 mb-4">
          <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">
            <Navigation size={12} className="text-[#2A7FFF]" /> {pharmacy.distance || '---'}
          </div>
          <div className="flex items-center gap-1.5 text-[0.7rem] font-black text-emerald-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {pharmacy.status || 'Verified'}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase bg-white dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5">
            <Clock size={12} /> {pharmacy.timing || 'Syncing...'}
          </div>
          <div 
            onClick={(e) => { e.stopPropagation(); onDirections(e, pharmacy); }}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-slate-400 hover:bg-[#2A7FFF] hover:text-white transition-all transform hover:-rotate-12"
          >
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyListItem;
