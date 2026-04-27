import React from 'react';
import { Clock, ChevronRight, Trash2 } from 'lucide-react';

const NotificationCard = ({ notif, onMarkRead, onDelete }) => {
  return (
    <div 
      className={`group p-6 rounded-[2.5rem] border transition-all relative overflow-hidden ${
        notif.read 
        ? 'bg-white/40 dark:bg-[#151E32]/40 border-slate-100 dark:border-slate-800/40 opacity-70' 
        : 'bg-white dark:bg-[#151E32] border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none'
      }`}
    >
      <div className="flex items-start gap-6 relative z-10">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${notif.color}15`, color: notif.color }}
        >
          <notif.icon size={28} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
               <h3 className="text-[1rem] font-black text-slate-900 dark:text-white">{notif.title}</h3>
               {!notif.read && <div className="w-2 h-2 rounded-full bg-[#2A7FFF] animate-pulse"></div>}
            </div>
            <span className="text-[0.7rem] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1.5">
               <Clock size={12} /> {notif.time}
            </span>
          </div>
          <p className="text-[0.9rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{notif.message}</p>
          
          <div className="flex items-center gap-3">
             {!notif.read && (
               <button 
                 onClick={() => onMarkRead(notif.id)}
                 className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[0.7rem] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
               >
                  Mark Read
               </button>
             )}
             <button 
               onClick={() => onDelete(notif.id)}
               className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
             >
                <Trash2 size={16} />
             </button>
          </div>
        </div>
        
        <button className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-[#0B1121] flex items-center justify-center text-slate-300 group-hover:text-[#2A7FFF] transition-all">
           <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
