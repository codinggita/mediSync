import React from 'react';
import logoImg from '../../../assets/MediSync_Logo.png';
import medicalHeroImg from '../../../assets/images/medical_hero.png';

const LoginBranding = () => {
  return (
    <div className="flex-1 p-12 flex flex-col relative overflow-hidden hidden md:flex border-none bg-gradient-to-br from-[#ecf0f3] to-[#e0e5ec] dark:from-[#121826] dark:to-[#1a2133] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-[inset_10px_10px_20px_#0a0f1d,inset_-10px_-10px_20px_#202d47] m-4 rounded-[2rem] group/brand">
      {/* Background Hero Image */}
      <div className="absolute inset-0 opacity-10 group-hover/brand:opacity-20 transition-opacity pointer-events-none group-hover/brand:scale-110 transition-transform duration-[10s]">
        <img src={medicalHeroImg} alt="Branding" className="w-full h-full object-cover" />
      </div>

      <div className="flex items-center gap-3 mb-10 relative z-10">
        <div className="w-14 h-14 bg-[#ecf0f3] dark:bg-[#151E32] rounded-2xl flex items-center justify-center shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] p-1 border-none">
          <img src={logoImg} alt="MediSync" className="w-full h-full object-contain scale-[1.2]" />
        </div>
        <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
          Medi<span className="text-[#2A7FFF]">Sync</span>
        </div>
      </div>
      
      <div className="relative z-10 my-auto animate-in fade-in slide-in-from-left-8 duration-700">
        <h1 className="text-[3.2rem] font-black text-slate-900 dark:text-white leading-[1.1] mb-6 drop-shadow-md">
          Healthcare,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71]">
            Elevated.
          </span>
        </h1>
        <p className="text-[1.1rem] text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-[90%]">
          The enterprise-grade platform connecting patients, doctors, and pharmacies with zero friction.
        </p>
      </div>
    </div>
  );
};

export default LoginBranding;
