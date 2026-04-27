import React from 'react';
import { ArrowRight, Shield, Activity, Globe } from 'lucide-react';
import medicalHeroImg from '../../assets/images/medical_hero.png';

const LandingHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-8 overflow-hidden bg-[#ecf0f3] dark:bg-[#0B1121]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2A7FFF]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2ECC71]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/60 dark:bg-black/20 rounded-full border border-white/40 shadow-sm mb-8">
             <Shield size={16} className="text-[#2A7FFF]" />
             <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">SOC2 Type II Certified Platform</span>
          </div>

          <h1 className="text-[4.5rem] md:text-[5.5rem] font-black text-slate-900 dark:text-white leading-[0.95] tracking-tight mb-8">
            The Future of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] via-[#1C71E1] to-[#2ECC71]">
              Human Care.
            </span>
          </h1>

          <p className="text-[1.2rem] font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-12 max-w-[90%]">
            MediSync is the elite operational layer for modern healthcare. Connecting patients, specialists, and pharmacies through zero-latency biological synchronization.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button className="px-10 py-6 bg-[#2A7FFF] text-white rounded-[2rem] font-black text-[1.1rem] uppercase tracking-widest shadow-[0_20px_40px_rgba(42,127,255,0.4)] hover:bg-[#1C71E1] hover:-translate-y-2 active:scale-95 transition-all flex items-center gap-4 group">
              Start Your Protocol <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-10 py-6 bg-white/60 dark:bg-black/20 text-slate-900 dark:text-white rounded-[2rem] font-black text-[1.1rem] uppercase tracking-widest border border-white/40 hover:bg-white transition-all">
              Watch Vision
            </button>
          </div>

          <div className="mt-16 flex items-center gap-12 opacity-40">
             <div className="flex items-center gap-3">
                <Activity size={24} />
                <span className="text-[0.8rem] font-black uppercase tracking-widest">Real-time Vitals</span>
             </div>
             <div className="flex items-center gap-3">
                <Globe size={24} />
                <span className="text-[0.8rem] font-black uppercase tracking-widest">Global Network</span>
             </div>
          </div>
        </div>

        <div className="relative group animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="absolute inset-0 bg-[#2A7FFF]/20 rounded-[5rem] blur-[60px] group-hover:blur-[80px] transition-all" />
          <div className="relative bg-white/40 dark:bg-[#151E32]/40 backdrop-blur-xl rounded-[5rem] border border-white/40 shadow-[30px_30px_60px_rgba(0,0,0,0.1)] overflow-hidden">
             <img src={medicalHeroImg} alt="Healthcare Innovation" className="w-full h-full object-cover scale-110 group-hover:scale-105 transition-transform duration-[10s]" />
          </div>
          
          {/* Floating UI Elements */}
          <div className="absolute -top-10 -right-10 bg-white/90 dark:bg-[#151E32]/90 p-8 rounded-[2.5rem] shadow-2xl border border-white/40 animate-float">
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
                <Activity size={24} />
             </div>
             <p className="text-[1.2rem] font-black text-slate-900 dark:text-white">99.9%</p>
             <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest">Sync Accuracy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
