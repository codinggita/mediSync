import React from 'react';
import { Download, Activity, File as FileIcon, FileText, ChevronRight } from 'lucide-react';

const ClinicalHistoryTimeline = ({ activePatient }) => {
  if (!activePatient) return null;

  return (
    <div className="flex-1 min-w-0 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-8 md:p-10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-200/50 dark:border-slate-800/50 pb-6 mb-8 gap-4 relative z-10 shrink-0">
        <div>
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            Medical History
          </h2>
          <p className="text-[0.8rem] font-bold text-[#2A7FFF] uppercase tracking-widest mt-1">
            Patient: {activePatient.name}
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-4 bg-[#ecf0f3] dark:bg-[#151E32] text-slate-600 dark:text-slate-300 font-black text-[0.8rem] uppercase tracking-widest rounded-2xl hover:text-[#2A7FFF] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:active:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 transition-all group shrink-0">
          <Download
            size={18}
            className="group-hover:-translate-y-0.5 transition-transform text-[#2A7FFF]"
          />{' '}
          Export PDF
        </button>
      </div>

      <div className="relative pl-8 border-l-[3px] border-slate-200/50 dark:border-slate-800/50 space-y-12 overflow-y-auto scrollbar-hide pr-2 pb-10 flex-1 relative z-10">
        {activePatient.records.map((record) => (
          <div key={record.id} className="relative">
            <div className="absolute -left-[42px] top-1 w-6 h-6 bg-[#ecf0f3] dark:bg-[#151E32] border-[5px] border-[#2A7FFF] rounded-full shadow-[0_0_15px_rgba(42,127,255,0.4)]"></div>

            <span className="text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-widest bg-[#2A7FFF]/10 px-4 py-1.5 rounded-full mb-4 inline-block shadow-sm">
              {record.date}
            </span>

            <div className="bg-[#ecf0f3] dark:bg-[#151E32] p-6 md:p-8 rounded-[2rem] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shrink-0 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
                  {record.type === 'Lab Report' && (
                    <Activity size={24} className="text-[#2ECC71] drop-shadow-sm" />
                  )}
                  {record.type === 'Imaging' && (
                    <FileIcon size={24} className="text-[#8B5CF6] drop-shadow-sm" />
                  )}
                  {record.type === 'Clinical Note' && (
                    <FileText size={24} className="text-[#2A7FFF] drop-shadow-sm" />
                  )}
                </div>
                <div>
                  <h4 className="text-[1.2rem] font-black text-slate-900 dark:text-white leading-tight">
                    {record.title}
                  </h4>
                  <p className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    {record.type}
                  </p>
                </div>
              </div>

              <button className="flex items-center justify-center gap-3 px-6 py-3.5 bg-[#ecf0f3] dark:bg-[#151E32] border border-white/40 dark:border-white/5 text-slate-600 dark:text-slate-300 font-black text-[0.75rem] uppercase tracking-widest rounded-xl hover:text-[#2A7FFF] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:active:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] shadow-[4px_4px_10px_#cbced1,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#0a0f1d,-4px_-4px_10px_#202d47] transition-all relative z-10 shrink-0">
                View Preview <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalHistoryTimeline;
