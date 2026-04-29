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
            disabled={isSaving}
            className={`px-10 py-5 text-[0.95rem] font-black rounded-full transition-all duration-500 flex items-center gap-4 active:scale-95 shadow-xl relative overflow-hidden group ${
              isSaving 
                ? 'bg-slate-100 dark:bg-white/5 text-slate-400 cursor-not-allowed' 
                : 'bg-[#2A7FFF] hover:bg-[#1A6FFF] text-white hover:shadow-blue-500/40 hover:-translate-y-1'
            }`}
          >
            {/* Professional Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {isSaving ? (
              <>
                <Clock className="animate-spin text-[#2A7FFF]" size={22} />
                <span className="uppercase tracking-[0.1em]">Syncing Hub...</span>
              </>
            ) : (
              <>
                <Save size={22} className="group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-[0.1em]">Save All Changes</span>
              </>
            )}
          </button>
      </div>
    </div>
  );
};

export default SettingsHeader;
