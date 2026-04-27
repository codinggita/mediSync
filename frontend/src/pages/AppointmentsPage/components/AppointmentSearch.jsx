import React from 'react';
import { Search } from 'lucide-react';

const AppointmentSearch = () => {
  return (
    <div className="relative mb-4">
      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      <input 
        type="text" 
        placeholder="Identify Doctor or Clinical Specialty..." 
        className="w-full pl-16 pr-8 py-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] border border-white/40 shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-none text-[1rem] text-slate-700 dark:text-slate-200 outline-none focus:border-[#2A7FFF]/50 transition-all font-bold placeholder:text-slate-400" 
      />
    </div>
  );
};

export default AppointmentSearch;
