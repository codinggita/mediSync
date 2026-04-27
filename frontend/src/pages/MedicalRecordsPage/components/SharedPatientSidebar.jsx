import React from 'react';
import { User } from 'lucide-react';

const SharedPatientSidebar = ({ patients, selectedPatientId, onSelectPatient }) => {
  return (
    <div className="w-full lg:w-[350px] shrink-0 bg-white dark:bg-[#151E32] rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-800/60 flex flex-col gap-4">
      <h3 className="text-[1rem] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2 mb-2">
        <User className="text-[#2A7FFF]" size={18} /> Shared Patients
      </h3>
      <div className="flex flex-col gap-3 overflow-y-auto pr-2">
        {patients.map(p => (
          <div 
            key={p.id} 
            onClick={() => onSelectPatient(p.id)}
            className={`p-4 rounded-2xl cursor-pointer border-2 transition-all group ${
              selectedPatientId === p.id 
                ? 'bg-[#2A7FFF]/5 border-[#2A7FFF] shadow-[0_4px_15px_rgba(42,127,255,0.1)]' 
                : 'bg-[#ecf0f3] dark:bg-[#0B1121] border-transparent hover:border-[#2A7FFF]/30'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className={`text-[1rem] font-black ${selectedPatientId === p.id ? 'text-[#2A7FFF]' : 'text-slate-900 dark:text-white'}`}>{p.name}</h4>
              <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">{p.lastUpdate}</span>
            </div>
            <p className="text-[0.75rem] text-slate-500 font-bold uppercase tracking-widest mb-3">
              {p.age} YRS • {p.gender}
            </p>
            <div className="flex flex-wrap gap-2">
              {p.conditions.map((c, i) => (
                <span key={i} className="px-2 py-1 bg-white dark:bg-slate-800 rounded-lg text-[0.6rem] font-black text-slate-500 border border-slate-200 dark:border-slate-700">
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
