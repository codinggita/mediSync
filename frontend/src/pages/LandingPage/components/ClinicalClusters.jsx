import React from 'react';
import { HeartPulse, Shield, Zap } from 'lucide-react';

const CLUSTERS = [
  {
    title: 'Pulse Analytics',
    icon: HeartPulse,
    grad: 'from-[#3B82F6] to-[#8B5CF6]',
    glow: 'rgba(59, 130, 246, 0.5)',
    desc: 'High-fidelity physiological data streams synchronized in real-time.',
  },
  {
    title: 'Genetic Protocol',
    icon: Shield,
    grad: 'from-[#10B981] to-[#3B82F6]',
    glow: 'rgba(16, 185, 129, 0.5)',
    desc: 'Post-quantum encryption for genomic sequences and clinical artifacts.',
  },
  {
    title: 'Neural Bridge',
    icon: Zap,
    grad: 'from-[#F59E0B] to-[#EF4444]',
    glow: 'rgba(245, 158, 11, 0.5)',
    desc: 'Direct specialist consultation bridge with low-latency neural hashing.',
  },
];

const ClinicalClusters = () => {
  return (
    <section className="py-20 px-8 relative overflow-hidden bg-white/30 dark:bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {CLUSTERS.map((cluster, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cluster.grad} rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700`}
              />
              <div className="relative nm-flat p-12 rounded-[4rem] border border-white/60 dark:border-white/5 transition-all duration-500 hover:-translate-y-4 overflow-hidden group/card">
                <div
                  className={`w-20 h-20 rounded-[2rem] bg-gradient-to-br ${cluster.grad} flex items-center justify-center text-white mb-10 shadow-[0_20px_40px_${cluster.glow}] group-hover/card:scale-110 transition-transform duration-700`}
                >
                  <cluster.icon size={36} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                  {cluster.title}
                </h3>
                <p className="text-[1rem] font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  {cluster.desc}
                </p>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${cluster.grad} w-[70%] group-hover/card:w-full transition-all duration-1000`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClinicalClusters;
