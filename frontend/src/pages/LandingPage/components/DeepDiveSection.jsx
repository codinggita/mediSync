import React from 'react';
import { Zap, Shield, Activity, Lock, HeartPulse } from 'lucide-react';

const DEEP_DIVE_CARDS = [
  {
    title: 'Neural Diagnosis Sync',
    subtitle: 'AI AT THE CORE',
    color: '#2A7FFF',
    icon: Zap,
    desc: 'Real-time biological data processing using 128-bit neural hashing for instant diagnostic correlation across clinical nodes.',
    stat: '0.2ms Latency',
  },
  {
    title: 'Global Clinical Ledger',
    subtitle: 'DECENTRALIZED DATA',
    color: '#8B5CF6',
    icon: Shield,
    desc: 'Immutable distributed clinical history protocol ensuring patient mobility without compromising data integrity or security.',
    stat: 'Zero-Knowledge',
  },
  {
    title: 'Tactical Throughput',
    subtitle: 'SCALE WITHOUT LIMITS',
    color: '#2ECC71',
    icon: Activity,
    desc: 'Massive parallel processing for hospital-wide operations, handling millions of clinical events with military-grade precision.',
    stat: '10M+ RPS',
  },
  {
    title: 'Quantum Security Shield',
    subtitle: 'IMPREGNABLE VAULT',
    color: '#F59E0B',
    icon: Lock,
    desc: 'Post-quantum encryption algorithms securing every single data transmission across the MediSync network ecosystem.',
    stat: 'AES-256 GCM',
  },
  {
    title: 'Predictive Care Analytics',
    subtitle: 'FUTURE INSIGHTS',
    color: '#EC4899',
    icon: HeartPulse,
    desc: 'Advanced AI models forecasting patient health trajectories, enabling preemptive interventions before critical events.',
    stat: '99.9% ACCURACY',
  },
];

const DeepDiveSection = () => {
  return (
    <section
      id="deep-dive"
      className="min-h-screen w-full relative bg-[#ecf0f3] dark:bg-black/20 overflow-hidden flex flex-col justify-center py-20"
    >
      {}
      <div className="absolute inset-0 pointer-events-none z-0">
        <span className="absolute top-[35%] left-[-5%] text-[18rem] font-black text-slate-900/5 dark:text-white/5 uppercase tracking-tighter select-none parallax-bg-text">
          Neural
        </span>
        <span className="absolute top-[45%] right-[-5%] text-[18rem] font-black text-slate-900/5 dark:text-white/5 uppercase tracking-tighter select-none parallax-bg-text">
          Protocol
        </span>
        <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-[#2A7FFF]/5 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#2ECC71]/5 blur-[120px] animate-pulse" />
      </div>

      <div className="relative w-full z-10 flex flex-col justify-center">
        {}
        <div className="absolute top-[-5rem] left-0 w-full h-1 bg-slate-200 dark:bg-white/5 z-50">
          <div className="h-full bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71] w-0 horizontal-progress-bar shadow-[0_0_10px_#2A7FFF]" />
        </div>

        <div className="max-w-7xl mx-auto px-8 text-center mb-16 relative z-20">
          <h2 className="text-[4rem] md:text-[5rem] font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
            Unrivaled{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A7FFF] to-[#2ECC71]">
              Power.
            </span>
          </h2>
          <p className="text-[1.2rem] md:text-[1.4rem] font-medium text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Precision-engineered protocols for the modern clinical era. Swipe to explore the
            technical depth.
          </p>
        </div>

        <div className="horizontal-scroll-container flex gap-24 px-[10vw] md:px-[20vw] lg:px-[25vw] items-center pb-32">
          {DEEP_DIVE_CARDS.map((card, i) => (
            <div
              key={i}
              className="min-w-[80vw] md:min-w-[60vw] lg:min-w-[50vw] h-[65vh] flex-shrink-0 group"
            >
              <div className="nm-flat p-2 rounded-[4rem] border border-white/60 dark:border-white/10 shadow-2xl overflow-hidden bg-white/50 dark:bg-[#151E32]/80 backdrop-blur-xl h-full relative transition-transform duration-700 hover:scale-[1.02] hover:shadow-[0_30px_60px_-15px_rgba(42,127,255,0.1) /*]*/">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />
                <div className="p-12 md:p-16 flex flex-col justify-between h-full relative z-10">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl nm-inset flex items-center justify-center relative overflow-hidden shrink-0">
                        <div
                          className="absolute inset-0 opacity-20 blur-xl"
                          style={{ backgroundColor: card.color }}
                        />
                        <card.icon
                          size={28}
                          style={{ color: card.color }}
                          className="relative z-10 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <span
                        className="text-[0.75rem] font-black uppercase tracking-[0.4em]"
                        style={{ color: card.color }}
                      >
                        {card.subtitle}
                      </span>
                    </div>
                    <h3 className="text-[2.5rem] md:text-[3.5rem] font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight">
                      {card.title}
                    </h3>
                    <p className="text-[1.1rem] md:text-[1.2rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                      {card.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
                    <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full nm-inset text-slate-900 dark:text-white">
                      <div
                        className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_currentColor]"
                        style={{ backgroundColor: card.color }}
                      />
                      <span className="text-[0.75rem] font-black uppercase tracking-[0.2em]">
                        {card.stat}
                      </span>
                    </div>
                    <div className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.3em] opacity-50">
                      Module 0{i + 1}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="absolute bottom-0 left-0 w-full bg-white/40 dark:bg-[#0B1121]/80 backdrop-blur-2xl border-t border-white/60 dark:border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 md:gap-16">
              {[
                { label: 'Throughput', val: 'Active' },
                { label: 'Sync Status', val: '100%' },
                { label: 'Protocol', val: 'v4.2.0' },
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-1.5">
                    {stat.label}
                  </p>
                  <h4 className="text-[0.8rem] font-black text-slate-900 dark:text-white uppercase">
                    {stat.val}
                  </h4>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#2ECC71]/10 border border-[#2ECC71]/20">
              <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-ping" />
              <span className="text-[0.65rem] font-black text-[#2ECC71] uppercase tracking-widest">
                System Nominal
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeepDiveSection;
