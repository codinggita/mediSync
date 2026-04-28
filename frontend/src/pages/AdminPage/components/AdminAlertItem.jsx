import React from 'react';
import { Clock, ChevronRight, ShieldAlert, AlertTriangle, Info } from 'lucide-react';

const SEV = {
  critical: { color: '#E11D48', icon: ShieldAlert },
  warning:  { color: '#F59E0B', icon: AlertTriangle },
  info:     { color: '#2A7FFF', icon: Info },
};

const AdminAlertItem = ({ alert, isDarkMode }) => {
  const cfg = SEV[alert.severity] || SEV.info;
  const Icon = cfg.icon;

  return (
    <div className={`flex items-start sm:items-center gap-6 p-7 rounded-[2rem] transition-all duration-300 group ${
      isDarkMode 
        ? 'bg-[#151E32] shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]' 
        : 'bg-[#ecf0f3] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff]'
    } hover:scale-[1.005]`}>
      
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${
        isDarkMode ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'shadow-[5px_5px_10px_#cbced1,-5px_-5px_10px_#ffffff]'
      }`}>
        <Icon size={24} style={{ color: cfg.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className={`text-[1.1rem] font-black leading-tight mb-2 ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
          {alert.message}
        </h4>
        <div className="flex flex-wrap items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest flex items-center gap-2 ${
            isDarkMode ? 'bg-black/20' : 'bg-white shadow-inner'
          }`} style={{ color: cfg.color }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
            {alert.severity}
          </span>
          <span className="text-[0.65rem] font-bold text-slate-400 flex items-center gap-2">
            <Clock size={12} /> {new Date(alert.timestamp).toLocaleString()}
          </span>
          <span className="px-3 py-1 rounded-full text-[0.6rem] font-black uppercase tracking-widest bg-black/5 dark:bg-white/5 text-slate-500">
            {alert.type?.replace(/_/g, ' ')}
          </span>
        </div>
      </div>

      <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-2 transition-transform" />
    </div>
  );
};

export default AdminAlertItem;
