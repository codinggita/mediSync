import React from 'react';
import { Download, Activity, File as FileIcon, FileText, ChevronRight } from 'lucide-react';

const ClinicalHistoryTimeline = ({ activePatient }) => {
  if (!activePatient) return null;

  return (
    <div className="flex-1 min-w-0 bg-white dark:bg-[#151E32] rounded-[2.5rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800/60">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-tight">Medical History</h2>
          <p className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Patient: {activePatient.name}</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#ecf0f3] dark:bg-[#0B1121] text-slate-600 dark:text-slate-300 font-black text-[0.8rem] uppercase tracking-widest rounded-xl hover:bg-[#2A7FFF] hover:text-white transition-all shadow-sm group">
          <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" /> Export PDF
        </button>
      </div>

      <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-700 space-y-10">
        {activePatient.records.map((record) => (
          <div key={record.id} className="relative">
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-white dark:bg-[#151E32] border-4 border-[#2A7FFF] rounded-full shadow-[0_0_10px_rgba(42,127,255,0.4)]"></div>
            
            <span className="text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-widest bg-[#2A7FFF]/10 px-3 py-1 rounded-full mb-3 inline-block">
              {record.date}
            </span>
            
            <div className="bg-[#ecf0f3] dark:bg-[#0B1121] p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#2A7FFF]/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#1A2642] flex items-center justify-center shrink-0 shadow-sm">
                  {record.type === 'Lab Report' && <Activity size={20} className="text-[#2ECC71]" />}
                  {record.type === 'Imaging' && <FileIcon size={20} className="text-[#8B5CF6]" />}
                  {record.type === 'Clinical Note' && <FileText size={20} className="text-[#2A7FFF]" />}
                </div>
                <div>
                  <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white leading-tight">{record.title}</h4>
                  <p className="text-[0.75rem] font-bold text-slate-500 uppercase tracking-widest mt-1">{record.type}</p>
                </div>
              </div>

              <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-black text-[0.75rem] uppercase tracking-widest rounded-xl hover:bg-[#2A7FFF] hover:text-white transition-all shadow-sm">
                View Preview <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalHistoryTimeline;
