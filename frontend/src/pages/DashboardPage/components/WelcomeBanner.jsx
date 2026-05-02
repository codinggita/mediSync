import React from 'react';
import { Zap, ArrowRight, TrendingUp } from 'lucide-react';
import medicalHeroImg from '../../../assets/images/medical_hero.png';
import healthAbstractImg from '../../../assets/images/health_abstract.png';

const WelcomeBanner = ({ user, stats, greeting, firstAidImg }) => {
  return (
    <div className="relative bg-gradient-to-br from-[#2A7FFF] via-[#1C71E1] to-[#1565C0] rounded-[2rem] sm:rounded-[40px] p-6 sm:p-10 mb-2 overflow-hidden shadow-[20px_20px_40px_rgba(42,127,255,0.15)] group">
      {}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-blue-400/20 rounded-full blur-[60px] animate-bounce duration-[10s]" />

      {}
      <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-[10s]">
        <img src={medicalHeroImg} alt="Hero" className="w-full h-full object-cover" />
      </div>

      {}
      <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] opacity-30 pointer-events-none animate-pulse">
        <img
          src={healthAbstractImg}
          alt="Abstract"
          className="w-full h-full object-contain rotate-12"
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-10">
        <div className="w-full lg:max-w-2xl">
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="px-3 sm:px-4 py-1.5 bg-white/20 backdrop-blur-xl rounded-full text-[0.6rem] sm:text-[0.65rem] font-black text-white uppercase tracking-[0.2em] sm:tracking-[0.3em] border border-white/30 flex items-center gap-2 sm:gap-2.5 shadow-xl">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
              Live Health Intelligence
            </div>
          </div>

          <h2 className="text-white text-[1.8rem] sm:text-[2.8rem] font-black leading-[1.1] tracking-tight mb-3 sm:mb-4">
            {greeting},{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              {user?.name?.split(' ')[0] || 'Member'}
            </span>
            !
          </h2>

          <p className="text-white/80 text-[0.9rem] sm:text-[1.1rem] font-medium max-w-lg leading-relaxed">
            Your biometrics are{' '}
            <span className="text-white font-black underline decoration-2 sm:decoration-4 decoration-green-400 underline-offset-4 sm:underline-offset-8">
              synchronized and stable
            </span>
            . You have {stats.appointments} appointments today.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5 mt-6 sm:mt-8">
            <button className="px-6 py-3.5 sm:px-8 sm:py-4 bg-white text-[#2A7FFF] rounded-xl sm:rounded-[22px] font-black text-[0.8rem] sm:text-[0.9rem] shadow-[0_10px_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
              View Medical Vault <ArrowRight size={16} sm:size={18} />
            </button>
            <button className="px-6 py-3.5 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl sm:rounded-[22px] font-black text-[0.8rem] sm:text-[0.9rem] hover:bg-white/20 transition-all shadow-inner text-center">
              Daily Vitals
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="w-48 h-48 relative group/asset">
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl group-hover/asset:bg-[#2ECC71]/30 transition-colors duration-500" />
            <img
              src={firstAidImg}
              alt="Health 3D"
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-in slide-in-from-right-10 duration-1000 group-hover/asset:-rotate-12 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
