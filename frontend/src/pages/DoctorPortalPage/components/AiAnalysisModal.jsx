import React from 'react';
import { X, Check, BrainCircuit } from 'lucide-react';

const AiAnalysisModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 dark:bg-[#0B1121]/80 backdrop-blur-md transition-all">
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] w-full max-w-2xl shadow-2xl border border-white/40 overflow-hidden transform transition-all">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-[#8B5CF6]/10 to-transparent">
          <h2 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
             <div className="w-12 h-12 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-lg"><BrainCircuit size={24} /></div>
             MediSync AI Analysis
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors shadow-sm"><X size={20} /></button>
        </div>
        <div className="p-10 flex flex-col gap-8">
           <div className="flex items-start gap-6 p-6 bg-white dark:bg-[#0B1121] rounded-3xl shadow-inner border border-slate-100 dark:border-slate-800">
              <div className="shrink-0 p-3 bg-emerald-500/10 text-emerald-500 rounded-full"><Check size={24} /></div>
              <div>
                 <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-2">Vitals Stabilized</h4>
                 <p className="text-[0.85rem] font-bold text-slate-500 leading-relaxed">Patient's heart rate and BP parameters are within the nominal range. The AI model indicates a 94% probability that current medication is highly effective.</p>
              </div>
           </div>
           <button onClick={onClose} className="w-full py-5 bg-[#8B5CF6] text-white rounded-[1.5rem] font-black text-[1rem] shadow-xl hover:-translate-y-1 transition-all">Acknowledge Report</button>
        </div>
      </div>
    </div>
  );
};

export default AiAnalysisModal;
