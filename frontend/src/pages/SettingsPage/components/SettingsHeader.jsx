import React from 'react';
import { Database, Save, Clock, Check } from 'lucide-react';

const SettingsHeader = ({ isSaving, syncSuccess, lastSyncTime, onSave }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#151E32] p-10 rounded-[3rem] border border-white dark:border-white/5 shadow-xl relative overflow-hidden transition-all duration-500">
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <Database size={120} className="text-[#2A7FFF]" />
      </div>
      <div className="relative z-10">
        <h1 className="text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
          System <span className="text-[#2A7FFF]">Config</span>
        </h1>
        <div className="text-[0.75rem] text-slate-400 font-black uppercase tracking-[0.4em] mt-3 flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full animate-pulse ${syncSuccess ? 'bg-emerald-500' : 'bg-[#2A7FFF]'}`} />
          Biometric &amp; Data Control Node
        </div>
      </div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="text-right hidden md:block">
          <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
            Last Sync
          </p>
          <p className={`text-[0.9rem] font-black transition-all duration-500 ${
            isSaving ? 'text-[#2A7FFF] animate-pulse' : 
            syncSuccess ? 'text-emerald-500' : 
            'text-slate-900 dark:text-white'
          }`}>
            {isSaving ? 'SYNC IN PROGRESS...' : syncSuccess ? 'SYNC SUCCESSFUL' : lastSyncTime}
          </p>
        </div>
        <button
          onClick={onSave}
          disabled={isSaving || syncSuccess}
          className={`px-10 py-5 text-[0.95rem] font-black rounded-full transition-all duration-700 flex items-center gap-4 active:scale-95 shadow-2xl relative overflow-hidden group ${
            isSaving
              ? 'bg-slate-900 text-white cursor-wait scale-[1.02]'
              : syncSuccess
              ? 'bg-emerald-500 text-white scale-[0.98]'
              : 'bg-[#2A7FFF] hover:bg-[#1A6FFF] text-white hover:shadow-blue-500/40 hover:-translate-y-1'
          }`}
        >
          {isSaving && (
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shimmer_1.5s_infinite] pointer-events-none" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {isSaving ? (
            <>
              <div className="relative">
                <Clock className="animate-spin text-white" size={22} />
                <div className="absolute inset-0 bg-white/20 blur-md rounded-full animate-pulse" />
              </div>
              <span className="uppercase tracking-[0.2em] text-[0.8rem]">Deep Syncing Hub...</span>
            </>
          ) : syncSuccess ? (
            <>
              <Check size={22} className="text-white animate-in zoom-in duration-500" />
              <span className="uppercase tracking-[0.1em]">Protocol Synced</span>
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
