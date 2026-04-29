import React from 'react';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

const StatGrid = ({ statCards, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, i) => (
        <div
          key={i}
          className="relative nm-flat rounded-[28px] p-6 transition-all duration-300 group cursor-pointer overflow-hidden hover:-translate-y-2"
        >
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
            <card.icon size={120} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center nm-inset">
              <card.icon size={22} style={{ color: card.color }} className="drop-shadow-md" />
            </div>
            <div
              className={`flex items-center gap-1 text-[0.68rem] font-black px-2.5 py-1 rounded-full uppercase tracking-tight ${card.up ? 'bg-[#2ECC71]/10 text-[#2ECC71]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}
            >
              {card.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {card.trend}
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[2.5rem] font-black text-slate-800 dark:text-white leading-none drop-shadow-sm">
              {loading ? <Loader2 className="animate-spin text-gray-300" size={24} /> : card.value}
            </span>
            <span className="text-[0.8rem] font-bold text-gray-400">total</span>
          </div>
          <p className="text-[0.85rem] font-black text-gray-400 dark:text-slate-500 mt-1 uppercase tracking-widest">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatGrid;
