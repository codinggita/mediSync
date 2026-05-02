import React from 'react';
import { TrendingDown, CheckCircle2, Zap } from 'lucide-react';
import medBoxImg from '../../../assets/images/medicine_box.png';
import vitaminsImg from '../../../assets/images/vitamins.png';

const ComparisonHero = ({ medicinesCount, totalSavings }) => {
  return (
    <div className="bg-gradient-to-br from-[#2A7FFF] to-[#1a5fd8] rounded-[3rem] p-8 lg:p-10 mb-10 text-white relative overflow-hidden shadow-2xl shadow-[#2A7FFF]/30">
      {}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block pointer-events-none">
        {}
        <div className="absolute top-10 right-40 w-48 h-48 bg-white/20 rounded-full blur-[60px]"></div>
        <div className="absolute bottom-[-20px] right-10 w-56 h-56 bg-emerald-400/30 rounded-full blur-[60px]"></div>

        {}
        <img
          src={medBoxImg}
          alt="Medicine Box"
          className="absolute -right-12 top-1/2 -translate-y-1/2 w-[24rem] drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)] rotate-[-12deg] hover:rotate-[-8deg] hover:scale-105 transition-all duration-700 ease-out"
        />
        <img
          src={vitaminsImg}
          alt="Vitamins"
          className="absolute right-40 bottom-[-30px] w-[14rem] drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)] rotate-[15deg] hover:rotate-[20deg] transition-all duration-700 ease-out"
        />
      </div>
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <TrendingDown size={20} />
          </div>
          <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-white/70">
            Real-Time Intelligence
          </span>
        </div>
        <h1 className="text-[2.2rem] font-black leading-tight mb-3">
          Medicine Price
          <br />
          Comparison Engine
        </h1>
        <p className="text-white/75 text-[0.95rem] font-medium leading-relaxed">
          Compare prices across verified pharmacies near you. Find the best deal and save on every
          prescription.
        </p>
        <div className="flex items-center gap-3 mt-6 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full border border-white/25 backdrop-blur-md">
            <CheckCircle2 size={14} />
            <span className="text-[0.75rem] font-black">{medicinesCount} Medicines tracked</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full border border-white/25 backdrop-blur-md">
            <Zap size={14} />
            <span className="text-[0.75rem] font-black">
              ₹{totalSavings}+ Total Savings Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonHero;
