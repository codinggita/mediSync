import React from 'react';
import { User } from 'lucide-react';

const SharedPatientSidebar = ({ patients, selectedPatientId, onSelectPatient }) => {
  return (
    <div className="w-full lg:w-[350px] shrink-0 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] p-8 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 flex flex-col gap-6 relative overflow-hidden">
      <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3 mb-2 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
          <User className="text-[#2A7FFF]" size={20} />
        </div>
        Shared Patients
      </h3>
      <div className="flex flex-col gap-4 overflow-y-auto pr-2 relative z-10 h-full scrollbar-hide pb-10">
        {patients.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelectPatient(p.id)}
            className={`p-5 rounded-[24px] cursor-pointer transition-all duration-300 group relative overflow-hidden ${
              selectedPatientId === p.id
                ? 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border border-transparent'
                : 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 hover:scale-[1.02]'
            }`}
          >
            {selectedPatientId === p.id && (
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2A7FFF] rounded-l-[24px]" />
            )}
            <div className="flex justify-between items-start mb-2 pl-1">
              <h4
                className={`text-[1.1rem] font-black ${selectedPatientId === p.id ? 'text-[#2A7FFF]' : 'text-slate-900 dark:text-white group-hover:text-[#2A7FFF]'}`}
              >
                {p.name}
              </h4>
              <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                {p.lastUpdate}
              </span>
            </div>
            <p className="text-[0.75rem] text-slate-500 font-bold uppercase tracking-widest mb-4 pl-1">
              {p.age} YRS • {p.gender}
            </p>
            <div className="flex flex-wrap gap-2 pl-1">
              {p.conditions.map((c, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-lg text-[0.65rem] font-black uppercase tracking-wider ${selectedPatientId === p.id ? 'bg-[#2A7FFF]/10 text-[#2A7FFF]' : 'bg-white/50 dark:bg-black/20 text-slate-500'} shadow-sm`}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedPatientSidebar;
