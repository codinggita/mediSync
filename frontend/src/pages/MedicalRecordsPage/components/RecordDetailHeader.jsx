import React from 'react';
import { Clock, Share2 } from 'lucide-react';

const RecordDetailHeader = ({ record, dateStr, onShare }) => {
  const getIcon = (type) => {
    // This is already handled in the parent, but I'll pass the Icon or handle it here
    return null; 
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2 px-4 py-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-[0.7rem] font-black uppercase tracking-widest text-slate-400">
        <Clock size={14} className="text-[#2A7FFF]" /> {dateStr}
      </div>
      <button 
        onClick={onShare}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#2A7FFF] text-white text-[0.85rem] font-black rounded-xl shadow-[0_8px_16px_rgba(42,127,255,0.3)] hover:scale-105 active:scale-95 transition-all"
      >
        <Share2 size={16} /> Secure Share
      </button>
    </div>
  );
};

export default RecordDetailHeader;
