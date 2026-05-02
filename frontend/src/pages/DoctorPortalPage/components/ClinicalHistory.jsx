import React from 'react';
import { FileText, ExternalLink, History } from 'lucide-react';

const ClinicalHistory = ({ patient }) => {
  const records = patient?.records || [];

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 flex items-center justify-center mb-6">
          <History size={32} className="text-slate-400" />
        </div>
        <h4 className="text-[1.2rem] font-black text-slate-800 dark:text-white mb-2 uppercase tracking-widest">
          No Clinical History
        </h4>
        <p className="text-slate-500 font-bold text-[0.85rem] max-w-sm">
          No past clinical events or lab reports have been recorded for this patient yet.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-0 h-full">
      {}
      <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />

      {records.map((record, i) => (
        <div key={i} className="relative flex gap-6 pb-8 last:pb-0 group timeline-item">
          {}
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center flex-shrink-0 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 group-hover:-translate-y-1 transition-transform duration-300">
            <FileText size={20} className="text-[#2A7FFF]" />
          </div>

          {}
          <div className="flex-1 min-w-0 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] border border-white/40 dark:border-white/5 p-6 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <p className="text-[1rem] font-black text-slate-800 dark:text-white leading-snug">
                {record.title || record.type || 'Clinical Record'}
              </p>
              <span className="text-[0.7rem] text-[#2A7FFF] font-black uppercase tracking-widest whitespace-nowrap flex-shrink-0 bg-[#2A7FFF]/10 px-3 py-1 rounded-lg">
                {new Date(record.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <p className="text-[0.85rem] text-slate-500 font-bold leading-relaxed mb-4">
              {record.description || 'No detailed summary provided for this clinical artifact.'}
            </p>
            <button className="flex items-center gap-2 text-[0.75rem] font-black uppercase tracking-widest text-[#2A7FFF] hover:text-[#1A66CC] transition-colors duration-150 group/btn">
              <ExternalLink
                size={14}
                className="group-hover/btn:translate-x-0.5 transition-transform"
              />
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClinicalHistory;
