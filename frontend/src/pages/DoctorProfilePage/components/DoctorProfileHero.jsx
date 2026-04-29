import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorProfileHero = ({ name, specialty }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 mb-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-4 group w-fit">
        <div className="w-12 h-12 rounded-[20px] bg-white dark:bg-[#151E32] flex items-center justify-center shadow-lg border border-white dark:border-white/5 group-hover:bg-[#2A7FFF] group-hover:text-white transition-all transform active:scale-95">
          <ArrowLeft size={20} />
        </div>
        <span className="font-black text-[0.9rem] uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
          Back to Intelligence Center
        </span>
      </button>

      <div>
        <h1 className="text-[3rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
          {name} <span className="text-[#2A7FFF]">Dossier</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold mt-4 uppercase tracking-[0.4em] text-[0.85rem]">
          {specialty} — VERIFIED MEDICAL ARCHIVE
        </p>
      </div>
    </div>
  );
};

export default DoctorProfileHero;
