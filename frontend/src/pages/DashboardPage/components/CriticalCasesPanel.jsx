import React from 'react';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

const CriticalCasesPanel = ({ criticalCases }) => {
  return (
    <div className="bg-gradient-to-b from-red-500/10 to-transparent dark:from-red-900/20 rounded-[2.5rem] p-8 border border-red-500/20">
      <h3 className="text-[1.2rem] font-black text-red-500 flex items-center gap-3 mb-6 uppercase tracking-widest">
        <AlertTriangle size={20} className="animate-pulse" /> Critical Cases
      </h3>
      
      <div className="flex flex-col gap-4">
        {criticalCases.map(c => (
          <div key={c.id} className="bg-white dark:bg-[#151E32] p-5 rounded-2xl shadow-sm border-l-4 border-l-red-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldAlert size={40} className="text-red-500" />
            </div>
            <h4 className="text-[1rem] font-black text-slate-900 dark:text-white">{c.name}</h4>
            <p className="text-[0.85rem] font-bold text-red-500 mt-1">{c.condition}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">{c.status}</span>
              <button className="text-[0.75rem] font-black text-[#2A7FFF] hover:text-[#1565C0] uppercase tracking-wider">Review</button>
            </div>
          </div>
        ))}
        <button className="w-full mt-2 py-4 rounded-xl border border-dashed border-red-500/50 text-red-500 font-black text-[0.8rem] uppercase tracking-widest hover:bg-red-500/5 transition-colors">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default CriticalCasesPanel;
