import React from 'react';
import { Database, Save, Clock } from 'lucide-react';

const SettingsHeader = ({ isSaving, onSave }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#151E32] p-10 rounded-[3rem] border border-white dark:border-white/5 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <Database size={120} className="text-[#2A7FFF]" />
      </div>
      <div className="relative z-10">
        <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
          System <span className="text-[#2A7FFF]">Config</span>
        </h1>
        <div className="text-[0.75rem] text-slate-400 font-black uppercase tracking-[0.4em] mt-3 flex items-center gap-3">
           <div className="w-2 h-2 bg-[#2A7FFF] rounded-full animate-pulse" />
           Biometric &amp; Data Control Node
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10">
          <div className="text-right hidden md:block">
              <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">Last Sync</p>
              <p className="text-[0.9rem] font-black text-slate-900 dark:text-white">Today, 08:42 AM</p>
          </div>
          <button 
            onClick={onSave}
            className="px-10 py-5 bg-[#2A7FFF] text-white text-[0.9rem] font-black rounded-[1.8rem] shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95"
          >
            {isSaving ? <Clock className="animate-spin" size={20} /> : <Save size={20} />}
            {isSaving ? 'Syncing...' : 'Save All Changes'}
          </button>
      </div>
    </div>
  );
};

export default SettingsHeader;
