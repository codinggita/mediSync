import React from 'react';
import { FileText, User, Clock, Eye, Download } from 'lucide-react';

const SharedRecordCard = ({ record, onDownload }) => {
  return (
    <div className="p-8 rounded-[3.5rem] bg-white dark:bg-[#0B1121] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-[#2A7FFF]/20 transition-all group">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6 flex-1 min-w-0">
          <div className="w-16 h-16 rounded-[1.8rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-[#2A7FFF] shadow-inner group-hover:scale-110 transition-transform">
            <FileText size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[1.3rem] font-black text-slate-800 dark:text-white leading-tight mb-2 truncate">
              {record.title}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-2 text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-[0.15em]">
                <User size={14} /> {record.patient?.name || 'Unknown Patient'}
              </span>
              <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
              <span className="flex items-center gap-2 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">
                <Clock size={14} /> Shared {new Date(record.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto">
          <button
            onClick={() => window.open(record.fileUrl, '_blank')}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[#ecf0f3] dark:bg-[#151E32] text-slate-600 dark:text-slate-300 rounded-[1.5rem] font-black text-[0.8rem] uppercase tracking-widest border border-white/40 shadow-md hover:text-[#2A7FFF] hover:border-[#2A7FFF]/30 transition-all"
          >
            <Eye size={18} /> Preview
          </button>
          <button
            onClick={() => onDownload(record.fileUrl, record.title)}
            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-[#2A7FFF] text-white rounded-[1.5rem] font-black text-[0.8rem] uppercase tracking-widest shadow-lg shadow-[#2A7FFF]/25 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Download size={18} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharedRecordCard;
