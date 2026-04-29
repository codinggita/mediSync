import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

const DoctorLocationCard = ({ location, onNavigate }) => {
  return (
    <section
      className="p-10 rounded-[3.5rem] bg-[#0B1121] dark:bg-black/40 relative overflow-hidden group/map mt-12"
      onClick={onNavigate}
    >
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#2A7FFF] flex items-center justify-center text-white">
            <MapPin size={20} />
          </div>
          <h3 className="text-[1rem] font-black text-white uppercase tracking-widest">
            Clinic Coordinates
          </h3>
        </div>
        <button className="p-3 rounded-xl bg-white/10 text-white hover:bg-[#2A7FFF] transition-all">
          <ArrowUpRight size={20} />
        </button>
      </div>
      <p className="text-[1.1rem] font-bold text-slate-400 mb-8 relative z-10 max-w-lg">
        {location}
      </p>
      <div className="h-64 bg-slate-800/50 rounded-[2.5rem] overflow-hidden relative border border-white/5 flex flex-col items-center justify-center cursor-pointer">
        <div className="w-12 h-12 rounded-full border-4 border-[#2A7FFF] border-t-transparent animate-spin"></div>
        <span className="text-[0.7rem] font-black text-slate-500 uppercase tracking-[0.4em] mt-4">
          Synchronizing Satellite View...
        </span>
      </div>
    </section>
  );
};

export default DoctorLocationCard;
