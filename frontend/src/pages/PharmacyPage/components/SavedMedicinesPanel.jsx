import React from 'react';
import { Bookmark, Pill, TrendingDown, ArrowRight } from 'lucide-react';

const SAVED = [
  { id: 1, name: 'Paracetamol', dosage: '500mg', type: 'Tablet', price: '₹32', trend: 'stable' },
  { id: 2, name: 'Amoxicillin', dosage: '250mg', type: 'Capsule', price: '₹145', trend: 'down' },
];

const SavedMedicinesPanel = () => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d] border border-white/40">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
          <Bookmark size={24} className="text-[#2A7FFF]" />
          Clinical Archive
        </h2>
        <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{SAVED.length} Prescriptions Stored</span>
      </div>

      <div className="flex flex-col gap-4">
        {SAVED.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-6 bg-white/40 dark:bg-white/5 rounded-[2.5rem] border border-white/60 group hover:bg-[#2A7FFF]/5 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF]">
                <Pill size={24} />
              </div>
              <div>
                <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white">{m.name}</h3>
                <p className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-wider">{m.dosage} • {m.type}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-10">
              <div className="text-right">
                <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">Market Price</p>
                <p className="text-[1.2rem] font-black text-slate-900 dark:text-white">{m.price}</p>
              </div>
              <div className={`flex items-center gap-1 text-[0.8rem] font-black ${m.trend === 'down' ? 'text-emerald-500' : 'text-slate-400'}`}>
                {m.trend === 'down' ? <TrendingDown size={16} /> : null}
                {m.trend === 'down' ? '-12%' : 'STABLE'}
              </div>
              <button className="w-12 h-12 rounded-2xl bg-white dark:bg-black/20 shadow-md flex items-center justify-center text-[#2A7FFF] hover:scale-110 transition-transform">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedMedicinesPanel;
