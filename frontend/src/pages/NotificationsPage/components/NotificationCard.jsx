import React from 'react';
import { Clock, ChevronRight, Trash2 } from 'lucide-react';

const NotificationCard = ({ notif, onMarkRead, onDelete }) => {
  return (
    <div
      className={`group p-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6 ${
        notif.read
          ? 'bg-[#ecf0f3]/50 dark:bg-[#0B1121]/50 border-white/20 dark:border-white/5 shadow-none opacity-70 scale-[0.98]'
          : 'bg-[#ecf0f3] dark:bg-[#151E32] border-white/60 dark:border-white/10 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] hover:translate-y-[-2px]'
      }`}
    >
      {}
      {!notif.read && (
        <div 
          className="absolute -top-10 -left-10 w-32 h-32 blur-3xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
          style={{ backgroundColor: notif.color }}
        />
      )}

      {}
      <div className="relative shrink-0">
        <div
          className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-inner relative z-10"
          style={{ backgroundColor: `${notif.color}15`, color: notif.color }}
        >
          <notif.icon size={28} />
        </div>
        {!notif.read && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2A7FFF] rounded-full border-2 border-[#ecf0f3] dark:border-[#151E32] shadow-[0_0_10px_#2A7FFF] animate-pulse z-20"></div>
        )}
      </div>

      {}
      <div className="flex-1 min-w-0 w-full relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h3 className={`text-[1.15rem] font-black tracking-tight ${notif.read ? 'text-slate-500 dark:text-slate-400' : 'text-slate-900 dark:text-white'}`}>
            {notif.title}
          </h3>
          <span className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 shrink-0 bg-white/40 dark:bg-black/20 px-3 py-1 rounded-lg border border-white/50 dark:border-white/5 shadow-sm">
            <Clock size={12} /> {notif.time}
          </span>
        </div>
        <p className={`text-[0.95rem] font-medium leading-relaxed mb-5 ${notif.read ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-300'}`}>
          {notif.message}
        </p>

        {}
        <div className="flex items-center gap-4">
          {!notif.read && (
            <button
              onClick={() => onMarkRead(notif.id)}
              className="px-5 py-2 bg-white dark:bg-[#202d47] text-[#2A7FFF] rounded-xl text-[0.75rem] font-black uppercase tracking-widest shadow-[4px_4px_10px_#cbced1,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#0a0f1d,-4px_-4px_10px_#202d47] hover:scale-105 active:scale-95 transition-all border border-white/50 dark:border-white/5"
            >
              Mark Read
            </button>
          )}
          <button
            onClick={() => onDelete(notif.id)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] text-red-400 hover:text-white hover:bg-red-500 shadow-[4px_4px_10px_#cbced1,-4px_-4px_10px_#ffffff] dark:shadow-[4px_4px_10px_#0a0f1d,-4px_-4px_10px_#202d47] active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] transition-all border border-white/50 dark:border-white/5"
            title="Delete Alert"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {}
      <button className="hidden md:flex w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] items-center justify-center text-slate-400 group-hover:text-[#2A7FFF] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] transition-all hover:scale-110 border border-white/40 dark:border-white/5 shrink-0 ml-2">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default NotificationCard;
