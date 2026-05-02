import React, { useEffect, useRef } from 'react';
import { AlertOctagon, RefreshCcw, ShieldAlert } from 'lucide-react';
import gsap from 'gsap';

const GlobalErrorUI = ({ error, resetErrorBoundary }) => {
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });
      gsap.to('.pulse-ring', {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        stagger: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-[#ecf0f3] dark:bg-[#0a0f1d] p-6 font-outfit overflow-hidden relative"
    >
      {}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[#2A7FFF]/5 rounded-full blur-[120px]" />
      </div>

      <div
        ref={cardRef}
        className="max-w-lg w-full rounded-[3.5rem] bg-[#ecf0f3] dark:bg-[#151E32] p-1 border border-white/20 dark:border-white/5 shadow-[20px_20px_60px_#bebebe,inset_4px_4px_8px_#ffffff] dark:shadow-none relative z-10"
      >
        <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.2rem] p-10 md:p-14 nm-inset dark:shadow-none flex flex-col items-center text-center">
          {}
          <div className="relative mb-10">
            <div className="pulse-ring absolute inset-0 rounded-full bg-red-500/20" />
            <div className="pulse-ring absolute inset-0 rounded-full bg-red-500/10" />
            <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-[#1a2235] shadow-xl flex items-center justify-center text-red-500 relative z-10 border border-red-500/20">
              <AlertOctagon size={44} strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-amber-500 shadow-lg flex items-center justify-center text-white border-4 border-[#ecf0f3] dark:border-[#151E32]">
              <ShieldAlert size={20} />
            </div>
          </div>

          <div className="space-y-4 mb-10">
            <h1 className="text-[2.5rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
              Protocol <span className="text-red-500">Anomaly</span>
            </h1>
            <p className="text-[0.9rem] font-bold text-slate-400 uppercase tracking-[0.3em]">
              Tactical Inconsistency Detected
            </p>
          </div>

          <div className="w-full p-6 rounded-3xl bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/60 dark:border-white/5 mb-10 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <AlertOctagon size={40} />
            </div>
            <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Symptom Registry
            </p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
              {error?.message || 'The system synchronization engine failed to initialize the clinical data stream.'}
            </p>
          </div>

          <div className="grid grid-cols-1 w-full gap-4">
            <button
              onClick={resetErrorBoundary}
              className="group relative flex items-center justify-center gap-3 w-full py-5 bg-[#2A7FFF] hover:bg-[#1C71E1] text-white font-black rounded-2xl shadow-[0_15px_30px_rgba(42,127,255,0.4)] transition-all duration-300 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
              <span className="uppercase tracking-widest text-[0.8rem]">Re-initialize Protocol</span>
            </button>
            
            <p className="text-[0.6rem] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
              Secure Fail-Safe v1.0.0 | Operational Status: Suspended
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorUI;
