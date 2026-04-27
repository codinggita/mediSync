import React from 'react';

const TacticalTips = () => {
  return (
    <div className="mt-12 p-10 rounded-[3rem] bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-none border border-white/20 relative z-10">
      <p className="text-[0.9rem] font-black text-[#2A7FFF] uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
        <span className="w-2 h-2 bg-[#2A7FFF] rounded-full animate-pulse" /> Clinical Integrity Protocol
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { text: 'Biometric Clarity Verification', desc: 'Ensure all textual metadata is legible.' },
          { text: 'High-Resolution Rendering', desc: 'Lossless scan ensures better AI analysis.' },
          { text: 'Doctor Attribution Node', desc: 'Verify medical professional credentials.' }
        ].map((tip, i) => (
          <div key={i} className="flex flex-col gap-3 p-6 bg-white/40 dark:bg-white/5 rounded-3xl border border-white/60 dark:border-white/10 hover:shadow-xl transition-all">
            <span className="text-[0.75rem] font-black text-slate-800 dark:text-white uppercase tracking-tight">{tip.text}</span>
            <p className="text-[0.65rem] text-slate-400 font-bold leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TacticalTips;
