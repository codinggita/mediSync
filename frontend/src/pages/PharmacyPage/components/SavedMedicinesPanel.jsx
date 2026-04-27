import React, { useState } from 'react';
import { Heart, Trash2, Bell, BellOff, TrendingDown, ShieldCheck, Pill } from 'lucide-react';

const savedMeds = [
  { id: 1, name: 'Metformin 500mg', type: 'Diabetes', price: 85, lastPrice: 105, alertOn: true, stock: true },
  { id: 2, name: 'Atorvastatin 10mg', type: 'Cholesterol', price: 210, lastPrice: 210, alertOn: true, stock: true },
  { id: 3, name: 'Lisinopril 5mg', type: 'BP Control', price: 145, lastPrice: 175, alertOn: false, stock: false },
];

const SavedMedicinesPanel = () => {
  const [meds, setMeds] = useState(savedMeds);

  const toggleAlert = (id) =>
    setMeds((prev) => prev.map((m) => m.id === id ? { ...m, alertOn: !m.alertOn } : m));

  const removeMed = (id) =>
    setMeds((prev) => prev.filter((m) => m.id !== id));

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] border border-white/40 shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_#0a0f1d] overflow-hidden">
      {/* Header */}
      <div className="px-8 py-7 border-b border-white/40 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 shadow-inner">
             <Heart size={20} fill="currentColor" />
          </div>
          <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white">Saved Clinical Artifacts</h3>
        </div>
        <span className="text-[0.75rem] font-black text-slate-400 bg-[#ecf0f3] dark:bg-[#0B1121] px-5 py-2 rounded-full shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-none uppercase tracking-widest border border-white/20">
          {meds.length} Node{meds.length !== 1 ? 's' : ''} Tracked
        </span>
      </div>

      <div className="p-4 space-y-4">
        {meds.map((med) => {
          const dropped = med.price < med.lastPrice;
          const savings = med.lastPrice - med.price;
          return (
            <div key={med.id} className="p-6 rounded-[2.5rem] bg-[#ecf0f3] dark:bg-[#1a2235]/60 flex items-center gap-6 hover:shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:hover:shadow-none transition-all group border border-transparent hover:border-white/40">
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Pill size={24} className="text-[#2A7FFF]" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[1.1rem] font-black text-slate-900 dark:text-white truncate">{med.name}</span>
                  <span className="text-[0.65rem] font-black text-slate-400 uppercase bg-white/50 dark:bg-black/20 px-3 py-1 rounded-full border border-white/40">{med.type}</span>
                  {!med.stock && <span className="text-[0.65rem] font-black text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">Depleted</span>}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-[1.2rem] font-black text-slate-900 dark:text-white">₹{med.price}</span>
                  {dropped && (
                    <span className="text-[0.75rem] font-black text-[#2ECC71] bg-[#2ECC71]/10 px-4 py-1 rounded-full flex items-center gap-2 border border-[#2ECC71]/20">
                      <TrendingDown size={14} /> ₹{savings} Arbitrage
                    </span>
                  )}
                  {med.lastPrice !== med.price && (
                    <span className="text-[0.85rem] text-slate-400 font-bold line-through">₹{med.lastPrice}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => toggleAlert(med.id)}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-none hover:-translate-y-1 ${
                    med.alertOn
                      ? 'bg-[#2A7FFF] text-white shadow-[#2A7FFF]/30'
                      : 'bg-[#ecf0f3] dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {med.alertOn ? <Bell size={18} /> : <BellOff size={18} />}
                </button>
                <button
                  onClick={() => removeMed(med.id)}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#ecf0f3] dark:bg-slate-800 text-slate-400 hover:text-red-500 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-none hover:-translate-y-1 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {meds.length === 0 && (
        <div className="py-20 text-center animate-in fade-in duration-700">
          <div className="w-20 h-20 rounded-[2.5rem] bg-white/40 dark:bg-black/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
             <Heart size={32} className="text-slate-300" />
          </div>
          <p className="text-[1.1rem] font-black text-slate-900 dark:text-white">Artifact Vault Empty</p>
          <p className="text-[0.85rem] font-bold text-slate-400 mt-2">Initialize synchronization to track medicine pricing.</p>
        </div>
      )}
    </div>
  );
};

export default SavedMedicinesPanel;
