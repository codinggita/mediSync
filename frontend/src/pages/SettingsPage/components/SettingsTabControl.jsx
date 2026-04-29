import React from 'react';
import { LogOut } from 'lucide-react';

const SettingsTabControl = ({ tabs, activeTab, setActiveTab, onTerminate }) => {
  return (
    <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-between w-full p-6 rounded-[2rem] transition-all duration-500 group relative ${
              active
                ? 'bg-white dark:bg-[#151E32] shadow-2xl border border-slate-200 dark:border-white/10 scale-[1.02]'
                : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-[#2A7FFF] text-white shadow-lg rotate-3' : 'bg-slate-100 dark:bg-[#0B1121] group-hover:scale-110'}`}
              >
                <Icon size={20} />
              </div>
              <span
                className={`text-[0.95rem] ${active ? 'font-black text-slate-900 dark:text-white' : 'font-bold'}`}
              >
                {tab.label}
              </span>
            </div>
            {active && <div className="w-1.5 h-6 bg-[#2A7FFF] rounded-full absolute right-4" />}
          </button>
        );
      })}

      <div className="mt-10 p-8 bg-rose-500/5 rounded-[2.5rem] border border-rose-500/10 flex flex-col gap-4">
        <p className="text-[0.65rem] font-black text-rose-500 uppercase tracking-[0.3em]">
          Critical Action
        </p>
        <button
          onClick={onTerminate}
          className="flex items-center justify-center gap-3 w-full py-5 bg-[#F43F5E] hover:bg-[#E11D48] text-white rounded-full font-black text-[0.85rem] uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(244,63,94,0.3)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.4)] hover:-translate-y-1 active:scale-95 transition-all"
        >
          <LogOut size={20} /> TERMINATION
        </button>
      </div>
    </div>
  );
};

export default SettingsTabControl;
