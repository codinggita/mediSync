import React from 'react';
import { Stethoscope, UserCheck, Clock, Share2 } from 'lucide-react';

const DoctorSharingCard = ({ doctor, onShareClick }) => {
  return (
    <div className="bg-white dark:bg-[#0B1121] p-8 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
        <Stethoscope size={100} />
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-[2.5rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center border-4 border-white dark:border-[#151E32] shadow-2xl mb-6">
          <UserCheck className="text-[#2A7FFF]" size={40} />
        </div>
        <h4 className="text-[1.4rem] font-black text-slate-900 dark:text-white leading-tight mb-2">
          {doctor.name}
        </h4>
        <p className="text-[0.8rem] font-black text-[#2A7FFF] uppercase tracking-[0.2em] mb-4">
          {doctor.specialty}
        </p>
        <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 text-emerald-500 rounded-full text-[0.7rem] font-black uppercase tracking-widest mb-8 border border-emerald-500/10">
          <Clock size={14} /> Available Now
        </div>

        <button
          onClick={() => onShareClick(doctor)}
          className="w-full py-4 bg-[#2A7FFF] text-white rounded-[1.8rem] font-black text-[0.9rem] uppercase tracking-widest shadow-lg shadow-[#2A7FFF]/25 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
        >
          <Share2 size={18} /> Share Report
        </button>
      </div>
    </div>
  );
};

export default DoctorSharingCard;
