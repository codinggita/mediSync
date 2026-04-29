import React from 'react';
import { Stethoscope, Search, AlertCircle } from 'lucide-react';
import DoctorSharingCard from './DoctorSharingCard';

const VerifiedSpecialists = ({ loading, doctors, onShareClick }) => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[16px_16px_32px_#cbced1,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#0a0f1d] border border-white/40">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
          <Stethoscope size={24} className="text-[#2A7FFF]" />
          Verified Specialists
        </h3>
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search doctors..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#0B1121] rounded-2xl border-none outline-none text-[0.9rem] font-bold shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-slate-200 dark:bg-slate-800 rounded-[3rem] animate-pulse"
            />
          ))
        ) : doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorSharingCard key={doctor._id} doctor={doctor} onShareClick={onShareClick} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-[#0B1121]/5 rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4">
            <AlertCircle size={48} className="text-slate-300" />
            <p className="text-slate-400 font-black uppercase tracking-widest">
              No specialists found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedSpecialists;
