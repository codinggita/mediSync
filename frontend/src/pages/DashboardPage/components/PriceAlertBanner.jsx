import React from 'react';
import { TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PriceAlertBanner = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/comparison')}
      className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] p-6 flex items-center justify-between cursor-pointer hover:bg-emerald-500/20 hover:scale-[1.01] transition-all group shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
          <TrendingDown size={28} />
        </div>
        <div>
          <h3 className="text-[1.1rem] font-black text-emerald-700 dark:text-emerald-400 mb-1 leading-tight">
            PRICE DROP ALERT: Medicines now under ₹100!
          </h3>
          <p className="text-[0.75rem] font-bold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-widest">
            Click to view nearby pharmacy addresses & exact locations
          </p>
        </div>
      </div>
      <button className="hidden md:block px-6 py-3 bg-emerald-500 text-white rounded-[1rem] text-[0.75rem] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30 group-hover:bg-emerald-600 group-active:scale-95 transition-all whitespace-nowrap">
        View Stores
      </button>
    </div>
  );
};

export default PriceAlertBanner;
