import React from 'react';
import { TrendingDown, TrendingUp, AlertTriangle, Package } from 'lucide-react';

const alerts = [
  {
    id: 1, type: 'price_drop', icon: TrendingDown, iconColor: 'text-[#2ECC71]', bg: 'bg-[#2ECC71]/10', border: 'border-[#2ECC71]/20',
    title: 'Price Drop Alert', message: 'Metformin 500mg dropped by ₹20 at MedPlus', time: '2 hours ago',
  },
  {
    id: 2, type: 'price_rise', icon: TrendingUp, iconColor: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10', border: 'border-[#F59E0B]/20',
    title: 'Price Rise Detected', message: 'Atorvastatin 10mg increased by ₹15 at Apollo', time: '5 hours ago',
  },
  {
    id: 3, type: 'low_stock', icon: Package, iconColor: 'text-[#EF4444]', bg: 'bg-[#EF4444]/10', border: 'border-[#EF4444]/20',
    title: 'Low Stock Warning', message: 'Lisinopril 5mg is out of stock at 2 nearby pharmacies', time: '1 day ago',
  },
  {
    id: 4, type: 'price_drop', icon: TrendingDown, iconColor: 'text-[#2ECC71]', bg: 'bg-[#2ECC71]/10', border: 'border-[#2ECC71]/20',
    title: 'Price Drop Alert', message: 'Paracetamol 650mg now ₹12 at Wellness Forever', time: '2 days ago',
  },
];

const PriceAlerts = () => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#1a2235] rounded-[2.5rem] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d] overflow-hidden border border-white/40">
      {/* Header */}
      <div className="px-8 py-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d]">
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <h3 className="text-[1rem] font-black text-slate-800 dark:text-white uppercase tracking-wider">Clinical Alerts</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-[#2A7FFF]/10 rounded-full animate-pulse">
           <div className="w-1.5 h-1.5 rounded-full bg-[#2A7FFF]" />
           <span className="text-[0.65rem] font-black text-[#2A7FFF] uppercase tracking-widest">{alerts.length} New</span>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`group flex items-start gap-5 p-5 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_12px_#cbced1] cursor-pointer`}
          >
            <div className={`w-12 h-12 rounded-2xl ${alert.bg} flex items-center justify-center shrink-0 border ${alert.border} group-hover:scale-110 transition-transform`}>
              <alert.icon size={20} className={alert.iconColor} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[0.9rem] font-black text-slate-800 dark:text-white">{alert.title}</p>
                <span className="text-[0.6rem] text-slate-400 font-black uppercase tracking-tighter">{alert.time}</span>
              </div>
              <p className="text-[0.78rem] text-slate-500 dark:text-slate-400 leading-relaxed font-bold">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full py-6 text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-[#2A7FFF] transition-all border-t border-slate-200/50 dark:border-slate-700/50 bg-[#ecf0f3]/50">
        Dismiss All Intelligence
      </button>
    </div>
  );
};

export default PriceAlerts;
