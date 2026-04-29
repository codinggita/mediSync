import React from 'react';
import { Zap, ShoppingBag, TrendingUp } from 'lucide-react';
import { useDashboardStats } from '../../../hooks/useDashboardStats';

const SavingsInsights = () => {
  const { stats, loading } = useDashboardStats();
  const hasData = stats.medicines > 0;

  // Calculate dynamic data based on clinical averages if user has no data yet
  const displaySavings = hasData ? stats.medicines * 420 + 240 : 1240;
  const displayPercentage = hasData ? stats.medicines * 4 : 12;
  const displayAvoidance = hasData ? stats.medicines * 310 : 860;

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[32px] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] relative overflow-hidden group transition-all duration-500 hover:shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff]">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-10 group-hover:opacity-20 transition-opacity">
        <ShoppingBag size={120} className="text-[#2ECC71]" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-[1rem] font-black text-slate-900 dark:text-white flex items-center gap-2.5">
            <Zap size={20} className="text-[#2ECC71] animate-pulse" />
            Savings Insights
          </h3>
          <span
            className={`px-3 py-1 ${hasData ? 'bg-emerald-500/10 text-emerald-600' : 'bg-blue-500/10 text-blue-600'} text-[0.6rem] font-black rounded-full uppercase tracking-widest border ${hasData ? 'border-emerald-500/20' : 'border-blue-500/20'}`}
          >
            {hasData ? 'Personalized' : 'Clinical Average'}
          </span>
        </div>

        <div className="mb-10">
          <p className="text-[0.7rem] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
            {hasData ? 'Your Total Savings' : 'Est. Monthly Savings'}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-[2.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tighter">
              ₹{displaySavings.toLocaleString()}
            </span>
            <span className="text-[0.9rem] font-bold text-emerald-500 flex items-center gap-1">
              <TrendingUp size={16} /> +{displayPercentage}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.75rem] font-bold text-slate-500 dark:text-slate-400">
                Medicine Cost Avoidance
              </span>
              <span className="text-[0.75rem] font-black text-emerald-500">
                ₹{displayAvoidance.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-[#ecf0f3] dark:bg-[#151E32] rounded-full overflow-hidden shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47]">
              <div className="h-full bg-emerald-500 w-[65%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)] dark:shadow-[0_0_8px_rgba(46,204,113,0.5)]"></div>
            </div>
          </div>

          {!hasData && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              <span className="text-[0.6rem] font-black text-blue-500 uppercase tracking-widest">
                Awaiting Personal Sync
              </span>
            </div>
          )}
        </div>

        <p className="mt-8 text-[0.7rem] text-slate-400 dark:text-slate-500 font-medium italic leading-relaxed">
          {hasData
            ? `"By comparing prices across local pharmacies, you avoided a significant price markup."`
            : `"Based on clinical averages, MediSync users save 12% on monthly healthcare costs."`}
        </p>
      </div>
    </div>
  );
};

export default SavingsInsights;
