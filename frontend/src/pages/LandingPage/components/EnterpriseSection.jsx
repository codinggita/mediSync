import React from 'react';
import { useNavigate } from 'react-router-dom';

const ENTERPRISE_STATS = [
  { label: 'Uptime', val: '99.99%' },
  { label: 'Security', val: 'Elite' },
  { label: 'Latency', val: '<2ms' },
  { label: 'Nodes', val: '12.4k' },
];

const EnterpriseSection = () => {
  const navigate = useNavigate();
  return (
    <section id="enterprise" className="py-10 px-8 text-center relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent via-[#2A7FFF]/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 enterprise-content">
        <h2 className="text-[4rem] font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
          Scaled for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71]">
            Global Healthcare.
          </span>
        </h2>
        <p className="text-[1.4rem] font-medium text-slate-500 dark:text-slate-400 mb-20 leading-relaxed max-w-3xl mx-auto">
          From individual practices to national health networks, MediSync scales to meet the demands
          of enterprise-level clinical operations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-32">
          <button 
            onClick={() => navigate('/signup')}
            className="px-16 py-8 bg-[#2A7FFF] text-white rounded-[2.5rem] font-black text-[1.2rem] uppercase tracking-[0.2em] shadow-[0_30px_60px_rgba(42,127,255,0.4)] nm-button hover:bg-[#1C71E1] hover:-translate-y-2 active:scale-95 transition-all"
          >
            Request Demo
          </button>
          <button 
            onClick={() => window.open('https://github.com/priyabratasahoo780/mediSync', '_blank')}
            className="px-16 py-8 bg-[#ecf0f3] dark:bg-white/5 text-slate-900 dark:text-white rounded-[2.5rem] font-black text-[1.2rem] uppercase tracking-[0.2em] border border-slate-200 dark:border-white/10 nm-button hover:bg-slate-50 transition-all"
          >
            Read Whitepaper
          </button>
        </div>

        {}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 p-12 rounded-[3rem] nm-inset border border-white/20 dark:border-white/5">
          {ENTERPRISE_STATS.map((s) => (
            <div key={s.label}>
              <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">
                {s.label}
              </p>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">{s.val}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
