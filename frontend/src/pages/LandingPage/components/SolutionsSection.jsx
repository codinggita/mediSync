import React from 'react';
import { Zap, Shield, HeartPulse, Building2, Pill, Users, ArrowRight } from 'lucide-react';

const SolutionsSection = () => {
  return (
    <section
      id="solutions"
      className="py-6 px-8 bg-[#ecf0f3] dark:bg-black/10 relative overflow-hidden"
    >
      <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 sm:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-[0.7rem] font-black uppercase tracking-[0.2em] mb-6 border border-[#8B5CF6]/20">
            The Ecosystem
          </div>
          <h2 className="text-[2.2rem] sm:text-[3rem] font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">
            Integrated <span className="text-[#8B5CF6]">Verticals.</span>
          </h2>
          <p className="text-[0.9rem] sm:text-[1.1rem] font-bold text-slate-500 uppercase tracking-[0.3em] max-w-2xl mx-auto opacity-60">
            Modular power. Unified control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              icon: Zap,
              title: 'Instant Sync',
              desc: 'Real-time record sharing with millisecond latency across verified specialist nodes.',
              color: '#2A7FFF',
            },
            {
              icon: Shield,
              title: 'Military Grade',
              desc: 'End-to-end encryption for all biological data and prescription artifacts.',
              color: '#2ECC71',
            },
            {
              icon: HeartPulse,
              title: 'Patient Hub',
              desc: 'A unified tactical dashboard for all your medical history and clinical stats.',
              color: '#F59E0B',
            },
            {
              icon: Building2,
              title: 'Clinic OS',
              desc: 'Distributed management system for specialist clinics and hospital nodes.',
              color: '#8B5CF6',
            },
            {
              icon: Pill,
              title: 'Smart Pharmacy',
              desc: 'Automated prescription routing and fulfillment with real-time stock sync.',
              color: '#EC4899',
            },
            {
              icon: Users,
              title: 'Global ID',
              desc: 'Decentralized identity protocol for seamless clinical mobility worldwide.',
              color: '#06B6D4',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="solution-card group relative cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <div
                className="relative nm-flat p-8 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-white/60 dark:border-white/5 transition-all duration-300 transform-gpu overflow-hidden inner-card"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div
                  className="w-24 h-24 rounded-[2.5rem] nm-button flex items-center justify-center mb-12 group-hover:scale-110 transition-transform duration-500"
                  style={{ color: f.color, transform: 'translateZ(30px)' }}
                >
                  <f.icon size={44} />
                </div>

                <h3
                  className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-6 tracking-tight"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-[1rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-10"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {f.desc}
                </p>

                <div
                  className="flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.2em] group/link cursor-pointer"
                  style={{ color: f.color, transform: 'translateZ(20px)' }}
                >
                  <span className="group-hover/link:mr-2 transition-all">Explore Module</span>{' '}
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
