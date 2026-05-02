import React from 'react';
import { Zap, Activity, Plus } from 'lucide-react';

const PlatformSection = () => {
  return (
    <section id="platform" className="py-6 px-8 relative overflow-hidden">
      {}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#2ECC71]/10 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-32">
          <div className="lg:w-[45%] platform-content">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2A7FFF]/10 text-[#2A7FFF] text-[0.7rem] font-black uppercase tracking-[0.2em] mb-8 border border-[#2A7FFF]/20">
              The Core Protocol
            </div>
            <h2 className="text-[2rem] sm:text-[3rem] font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              The Operating System <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-300">
                for Modern Care.
              </span>
            </h2>
            <p className="text-[1.15rem] font-medium text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-xl">
              MediSync isn't just a database; it's an intelligent coordination layer. We unify
              fragmented clinical streams into a single, real-time operating environment for
              practitioners and patients.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: 'Real-time Vitals Stream',
                  desc: 'Zero-latency synchronization of patient metrics.',
                },
                {
                  title: 'Distributed Health Ledger',
                  desc: 'Immutable, secure sharing across verified nodes.',
                },
                {
                  title: 'AI Diagnostics Overlay',
                  desc: 'Predictive insights integrated into every view.',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#151E32] shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center text-[#2ECC71] group-hover:bg-[#2ECC71] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[0.85rem] font-bold text-slate-400 uppercase tracking-wide">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-[55%] relative">
            {}
            <div className="relative z-10 p-8 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] nm-flat border border-white/20 dark:border-white/5 shadow-2xl">
              <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] overflow-hidden nm-inset p-8">
                {}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF] nm-button flex items-center justify-center text-white shadow-lg">
                      <Activity size={24} />
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                        Patient Monitor
                      </p>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        ID: 982-SYNC-7
                      </h4>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-[0.65rem] font-black uppercase tracking-widest border border-emerald-500/20">
                    Active Sync
                  </div>
                </div>

                {}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-6 rounded-3xl nm-flat">
                    <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest mb-4">
                      Heart Rate
                    </p>
                    <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
                      72 <span className="text-[0.7rem] text-slate-400">BPM</span>
                    </div>
                    <div className="mt-4 h-10 w-full flex items-end gap-1">
                      {[40, 70, 45, 90, 65, 30, 85, 55].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-[#2A7FFF]/20 rounded-full"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-6 rounded-3xl nm-flat">
                    <p className="text-[0.55rem] font-black text-slate-400 uppercase tracking-widest mb-4">
                      Blood Glucose
                    </p>
                    <div className="text-3xl font-black text-slate-900 dark:text-white flex items-baseline gap-2">
                      5.4 <span className="text-[0.7rem] text-slate-400">mmol/L</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 h-1.5 nm-inset rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-[#2ECC71]" />
                      </div>
                    </div>
                  </div>
                </div>

                {}
                <div className="p-6 rounded-3xl nm-flat">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-[0.7rem] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                      Recent Protocols
                    </h5>
                    <Plus size={16} className="text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { t: 'Cardio Checkup', s: 'Verified' },
                      { t: 'Neurology Sync', s: 'Pending' },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-2xl nm-inset"
                      >
                        <span className="text-[0.7rem] font-bold text-slate-700 dark:text-slate-300">
                          {p.t}
                        </span>
                        <span
                          className={`text-[0.5rem] font-black uppercase px-2 py-1 rounded-md ${p.s === 'Verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}
                        >
                          {p.s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#2A7FFF] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#2ECC71] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
