import React from 'react';
import { Pill, Edit3, Trash2, Package } from 'lucide-react';

const MedicineCard = ({ medicine: m, isDarkMode, onEdit, onDelete }) => {
  return (
    <div
      className={`p-8 rounded-[2.5rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-[12px_12px_24px_#0a0f1d,-12px_-12px_24px_#202d47] border border-white/40 dark:border-white/5 transition-all hover:scale-[1.03] group`}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className={`w-16 h-16 rounded-[20px] bg-[#ecf0f3] dark:bg-[#0B1121] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border border-white/20`}
        >
          <Pill size={28} className="text-[#F59E0B]" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(m)}
            className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#0B1121] flex items-center justify-center text-slate-400 hover:text-[#2A7FFF] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,inset_0_0_0_transparent] transition-all active:shadow-inner"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(m._id);
            }}
            className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-rose-500 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] transition-all active:shadow-inner border border-white/20 hover:bg-rose-500/10"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <h3
        className={`text-[1.3rem] font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'} leading-none tracking-tight`}
      >
        {m.name}
      </h3>
      <p className="text-[#F59E0B] text-[0.65rem] font-black uppercase tracking-[0.25em] mb-4">
        {m.category || 'General'}
      </p>

      <div className="flex items-center gap-2 mb-6 text-slate-500 dark:text-slate-400">
        <Package size={14} strokeWidth={2.5} />
        <span className="text-[0.75rem] font-black uppercase tracking-widest">
          {m.dosage} • {m.manufacturer}
        </span>
      </div>

      <div
        className={`w-full py-3.5 rounded-2xl text-[0.75rem] font-black uppercase tracking-[0.2em] text-center transition-all ${
          m.stockStatus === 'In Stock'
            ? 'bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20 shadow-[inset_2px_2px_4px_rgba(46,204,113,0.1)]'
            : 'bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-[inset_2px_2px_4px_rgba(244,63,94,0.1)]'
        }`}
      >
        {m.stockStatus}
      </div>
    </div>
  );
};

export default MedicineCard;
