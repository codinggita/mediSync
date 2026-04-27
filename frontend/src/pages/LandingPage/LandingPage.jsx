import React from 'react';
import LandingNavbar from './components/LandingNavbar';
import LandingHero from './components/LandingHero';
import { ArrowRight, Zap, Shield, HeartPulse } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-500 font-sans selection:bg-[#2A7FFF] selection:text-white">
      <LandingNavbar />
      
      <main>
        <LandingHero />

        {/* Feature Highlights */}
        <section className="py-32 px-8 bg-white/40 dark:bg-black/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-[3rem] font-black text-slate-900 dark:text-white mb-6 tracking-tight">The MediSync Ecosystem</h2>
              <p className="text-[1.1rem] font-bold text-slate-500 uppercase tracking-widest max-w-2xl mx-auto">One platform. Absolute clinical control.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: Zap, title: 'Instant Sync', desc: 'Real-time record sharing with millisecond latency across verified specialist nodes.' },
                { icon: Shield, title: 'Military Grade', desc: 'End-to-end encryption for all biological data and prescription artifacts.' },
                { icon: HeartPulse, title: 'Patient Hub', desc: 'A unified tactical dashboard for all your medical history and clinical stats.' }
              ].map((f, i) => (
                <div key={i} className="bg-[#ecf0f3] dark:bg-[#151E32] p-12 rounded-[4rem] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-none border border-white/40 group hover:-translate-y-4 transition-all">
                  <div className="w-20 h-20 rounded-[2rem] bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF] mb-10 group-hover:bg-[#2A7FFF] group-hover:text-white transition-all">
                    <f.icon size={36} />
                  </div>
                  <h3 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-6">{f.title}</h3>
                  <p className="text-[1rem] font-bold text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tactical Footer */}
        <footer className="py-20 px-8 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                Medi<span className="text-[#2A7FFF]">Sync</span>
              </span>
              <p className="text-[0.8rem] font-bold text-slate-400 mt-2 uppercase tracking-widest">© 2026 DeepMind Advanced Systems. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-12">
              {['Terms', 'Privacy', 'Compliance', 'Security'].map(item => (
                <a key={item} href="#" className="text-[0.7rem] font-black text-slate-500 hover:text-[#2A7FFF] transition-colors uppercase tracking-[0.2em]">{item}</a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
