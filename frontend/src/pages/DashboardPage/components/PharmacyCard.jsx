import React from 'react';
import { MapPin, Star, ShoppingBag, Zap } from 'lucide-react';

const PharmacyCard = ({ pharm, isBest, onClick }) => {
  const originalPrice = Math.round(pharm.price * 1.4);
  const discount = 28; // Example static discount

  return (
    <div
      onClick={onClick}
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4 sm:gap-0 rounded-[2rem] sm:rounded-[2.5rem] transition-all cursor-pointer group/item border ${
        isBest
          ? 'bg-emerald-50/40 dark:bg-emerald-500/5 border-emerald-200/60 dark:border-emerald-500/20 shadow-[0_15px_30px_rgba(46,204,113,0.1)]'
          : 'bg-white dark:bg-[#0B1121] border-slate-100 dark:border-slate-800 hover:border-[#2A7FFF]/30 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-1">
            {isBest && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#2ECC71] text-white rounded-full shadow-lg shadow-[#2ECC71]/30">
                <Zap size={10} className="fill-white" />
                <span className="text-[0.6rem] font-black uppercase tracking-tighter">
                  Best Price
                </span>
              </div>
            )}
            <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white truncate group-hover/item:text-[#2A7FFF] transition-colors">
              {pharm.name}
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[0.7rem] sm:text-[0.75rem] font-bold text-slate-400 tracking-tight mt-1 sm:mt-0">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
              <MapPin size={12} className="text-[#2A7FFF]" /> {pharm.distance}
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 px-2 py-1 rounded-md">
              <Star size={12} className="text-amber-400 fill-amber-400" /> {pharm.rating}
            </div>
            <div className="flex items-center gap-1.5 text-emerald-500 font-black uppercase text-[0.65rem] bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              Available
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-8 pt-4 sm:pt-0 border-t border-slate-100 dark:border-slate-800 sm:border-none mt-2 sm:mt-0">
        <div className="text-left sm:text-right">
          <p className="text-[1.4rem] font-black text-slate-900 dark:text-white leading-none">
            ₹{Math.round(pharm.price)}
          </p>
          <div className="flex items-center justify-end gap-2 mt-1">
            <span className="text-[0.75rem] font-bold text-slate-300 line-through">
              ₹{originalPrice}
            </span>
            <span className="text-[0.75rem] font-black text-[#2ECC71]">-{discount}%</span>
          </div>
        </div>
        <button className="w-14 h-14 rounded-2xl bg-[#2A7FFF] text-white flex items-center justify-center shadow-lg shadow-[#2A7FFF]/20 group-hover/item:scale-110 group-hover/item:bg-[#1A6FFF] transition-all">
          <ShoppingBag size={22} />
        </button>
      </div>
    </div>
  );
};

export default PharmacyCard;
