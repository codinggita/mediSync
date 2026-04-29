import React from 'react';
import { Clock, ChevronRight, ShieldAlert, AlertTriangle, Info } from 'lucide-react';

const SEV = {
  critical: { color: '#E11D48', icon: ShieldAlert },
  warning: { color: '#F59E0B', icon: AlertTriangle },
  info: { color: '#2A7FFF', icon: Info },
};

const AdminAlertItem = ({ alert, isDarkMode, onResolve }) => {
  const cfg = SEV[alert.severity] || SEV.info;
  const Icon = cfg.icon;

  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-center gap-8 p-10 rounded-[3rem] transition-all duration-500 group relative overflow-hidden ${
        isDarkMode
          ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47] border border-white/5'
          : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
      } hover:scale-[1.01]`}
    >
      {/* Visual Accent Gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: cfg.color }}
      />

      <div
        className={`w-20 h-20 rounded-[30px] flex items-center justify-center shrink-0 transition-all duration-500 ${
          isDarkMode
            ? 'shadow-[inner_4px_4px_8px_#0a0f1d,inner_-4px_-4px_8px_#202d47]'
            : 'shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff]'
        }`}
        style={{ backgroundColor: `${cfg.color}10` }}
      >
        <Icon size={32} strokeWidth={2.5} style={{ color: cfg.color }} className="drop-shadow-sm" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-4 mb-3">
          <span
            className={`px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] flex items-center gap-2.5 ${
              isDarkMode ? 'bg-black/30' : 'bg-white shadow-inner'
            }`}
            style={{ color: cfg.color }}
          >
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: cfg.color }}
            />
            {alert.severity}
          </span>
          <span className="text-[0.7rem] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest opacity-60">
            <Clock size={14} strokeWidth={3} /> {new Date(alert.timestamp).toLocaleTimeString()}
          </span>
        </div>

        <h4
          className={`text-[1.3rem] font-black leading-tight mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
        >
          {alert.message}
        </h4>

        <div className="flex flex-wrap items-center gap-4">
          <span className="px-4 py-1.5 rounded-xl text-[0.65rem] font-black uppercase tracking-widest bg-black/5 dark:bg-white/5 text-slate-500 border border-white/5">
            {alert.type?.replace(/_/g, ' ')}
          </span>
          <span className="text-[0.65rem] font-bold text-slate-400/60 uppercase tracking-widest">
            NODE_REF: {alert._id?.substring(0, 8)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 self-end md:self-center">
        <button
          onClick={onResolve}
          className={`px-8 py-4 rounded-2xl font-black text-[0.7rem] uppercase tracking-[0.2em] transition-all duration-300 ${
            isDarkMode
              ? 'bg-[#E11D48]/10 text-[#E11D48] hover:bg-[#E11D48] hover:text-white border border-[#E11D48]/20'
              : 'bg-[#ecf0f3] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] text-slate-600 hover:text-[#E11D48]'
          } active:scale-95 active:shadow-inner`}
        >
          Resolve Protocol
        </button>
        <ChevronRight
          size={24}
          strokeWidth={3}
          className="text-slate-300 group-hover:translate-x-2 transition-transform opacity-40"
        />
      </div>
    </div>
  );
};

export default AdminAlertItem;
