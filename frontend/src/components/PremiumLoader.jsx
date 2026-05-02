import React from 'react';
import { ShieldCheck, Activity, Cpu, Database } from 'lucide-react';
import healthAbstractImg from '../assets/images/health_abstract.png';
import dnaImg from '../assets/images/dna.png';

const PremiumLoader = ({ message = 'Synchronizing Intelligence' }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#ecf0f3] dark:bg-[#0B1121] overflow-hidden">
      {}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <img
          src={healthAbstractImg}
          alt="Network"
          className="w-full h-full object-cover scale-150 animate-spin-slow"
        />
      </div>

      {}
      <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
        <div className="w-[800px] h-[800px] bg-[#2A7FFF]/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative flex flex-col items-center gap-12">
        {}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {}
          <div className="absolute inset-0 border-[1px] border-[#2A7FFF]/10 rounded-full animate-spin-slow" />
          <div className="absolute inset-4 border-[1px] border-[#8B5CF6]/10 rounded-full animate-reverse-spin" />

          {}
          <div className="relative w-40 h-40 group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A7FFF] to-transparent opacity-20 blur-xl rounded-full" />
            <img
              src={dnaImg}
              alt="Neural Helix"
              className="w-full h-full object-contain animate-float drop-shadow-[0_0_20px_rgba(42,127,255,0.4)]"
            />

            {}
            <div className="absolute left-0 right-0 h-[2px] bg-[#2A7FFF] shadow-[0_0_15px_#2A7FFF] animate-scan z-20" />
          </div>

          {}
          {[0, 90, 180, 270].map((deg, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#2A7FFF] rounded-full shadow-[0_0_10px_#2A7FFF]"
              style={{
                transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)`,
                animation: `pulse-node 2s infinite ${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-8 px-10 py-5 bg-white/40 dark:bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
                <span className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em]">
                  Neural Connection Active
                </span>
              </div>
              <h2 className="text-[1.8rem] font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                {message}
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </span>
              </h2>
            </div>

            <div className="h-10 w-[1px] bg-slate-300 dark:bg-white/10" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#0B1121] flex items-center justify-center shadow-inner border border-white/20">
                <Activity className="text-[#2A7FFF] animate-pulse" size={24} />
              </div>
            </div>
          </div>

          {}
          <div className="w-80 h-1.5 bg-[#ecf0f3] dark:bg-white/5 rounded-full overflow-hidden shadow-inner relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A7FFF] via-[#8B5CF6] to-[#2A7FFF] w-full animate-loading-slide shadow-[0_0_15px_#2A7FFF]" />
          </div>

          <div className="flex items-center gap-6 text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-2">
              <Cpu size={12} /> Proc: 8.4GHz
            </span>
            <span className="flex items-center gap-2">
              <Database size={12} /> Sync: 100%
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={12} /> RSA: 4096
            </span>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        @keyframes loading-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-scan { animation: scan 3s linear infinite; }
        .perspective-1000 { perspective: 1000px; }
      `,
        }}
      />
    </div>
  );
};

export default PremiumLoader;
