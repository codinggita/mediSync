import React from 'react';
import { Shield } from 'lucide-react';
import logoImg from '../../../assets/MediSync_Logo.png';
import signupLeftBg from '../../../assets/images/signup_left_bg.png';

const SignupBranding = () => {
  return (
    <div className="flex-1 p-8 flex flex-col relative overflow-hidden hidden md:flex border-r border-slate-100 rounded-l-3xl shadow-[inset_-10px_0_30px_rgba(0,0,0,0.1)]">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: `url(${signupLeftBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090F1E] via-[#090F1E]/60 to-transparent z-0" />
      <div className="absolute inset-0 bg-[#2A7FFF]/10 mix-blend-overlay z-0" />

      {/* Top Logo */}
      <div className="flex items-center gap-2 mb-8 relative z-10">
        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg p-1 border border-white/20">
          <img src={logoImg} alt="MediSync" className="w-full h-full object-contain scale-[1.2] drop-shadow-md" />
        </div>
        <div className="text-xl font-black text-white tracking-tight drop-shadow-lg">Medi<span className="text-[#2A7FFF]">Sync</span></div>
      </div>
      
      {/* Center Content */}
      <div className="relative z-10 my-auto animate-in fade-in slide-in-from-left-8 duration-700">
        <h1 className="text-[3.2rem] font-black text-slate-900 dark:text-white leading-[1] mb-6 drop-shadow-md">
          Your Health,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71]">
            Unified.
          </span>
        </h1>
        <p className="text-[1.1rem] text-slate-500 dark:text-slate-400 font-bold leading-relaxed max-w-[90%]">
          Join thousands of users who manage their healthcare journey with intelligent insights and military-grade security.
        </p>
      </div>

      {/* Bottom Floating Card */}
      <div className="relative z-10 mt-auto flex items-center gap-4 p-5 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d] border-none">
        <div className="w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d] text-[#2A7FFF] shrink-0">
          <Shield size={22} className="drop-shadow-sm" />
        </div>
        <div>
          <p className="text-slate-900 dark:text-white text-[0.9rem] font-black leading-none mb-1">HIPAA Compliant</p>
          <p className="text-slate-500 text-[0.75rem] font-bold">AES-256 Protocol Encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default SignupBranding;
