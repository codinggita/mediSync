import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsHeader = ({ onMarkAllRead }) => {
  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-4">
         <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#151E32] flex items-center justify-center shadow-sm text-[#2A7FFF] border border-slate-100 dark:border-slate-800">
            <Bell size={28} />
         </div>
         <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Health Alerts</h1>
            <p className="text-[0.8rem] font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time health &amp; price intelligence</p>
         </div>
      </div>
      <button 
        onClick={onMarkAllRead}
        className="px-6 py-3 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-xl text-[0.75rem] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all"
      >
         Mark all as read
      </button>
    </div>
  );
};

export default NotificationsHeader;
