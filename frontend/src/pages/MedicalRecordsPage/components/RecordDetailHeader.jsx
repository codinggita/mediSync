import React from 'react';
import { Clock, Share2, Trash2, Loader2 } from 'lucide-react';

const RecordDetailHeader = ({ record, dateStr, onShare, onDelete, isDeleting }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2 px-4 py-1.5 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full border border-white/20 text-[0.7rem] font-black uppercase tracking-widest text-slate-400">
        <Clock size={14} className="text-[#2A7FFF]" /> {dateStr}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDelete}
          disabled={isDeleting}
          className="w-11 h-11 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm disabled:opacity-50"
          title="Delete Artifact"
        >
          {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
        <button
          onClick={onShare}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2A7FFF] text-white text-[0.85rem] font-black rounded-xl shadow-[0_8px_16px_rgba(42,127,255,0.3)] hover:scale-105 active:scale-95 transition-all"
        >
          <Share2 size={16} /> Secure Share
        </button>
      </div>
    </div>
  );
};

export default RecordDetailHeader;
