import React from 'react';
import {
  Activity,
  Users,
  Zap,
  Mail,
  FileText,
  Shield,
  HeartPulse,
  Scale,
  Lock,
  CircleCheck,
  ArrowUp,
} from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="py-20 px-8 bg-[#ecf0f3] dark:bg-[#0B1121] border-t border-slate-200 dark:border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-20 footer-content relative z-10">
        <div className="col-span-1 md:col-span-2">
          <span
            className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 block cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Medi<span className="text-[#2A7FFF]">Sync</span>
          </span>
          <p className="text-[1rem] font-medium text-slate-500 dark:text-slate-400 max-w-sm mb-10 leading-relaxed uppercase tracking-widest opacity-60">
            The next-generation protocol for clinical data synchronization and specialist
            coordination.
          </p>
          <div className="flex gap-6">
            {[
              { icon: Activity, color: '#1DA1F2' },
              { icon: Users, color: '#0077B5' },
              { icon: Zap, color: '#333' },
              { icon: Mail, color: '#EA4335' },
            ].map((social, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-2xl nm-button flex items-center justify-center text-slate-400 hover:text-white group cursor-pointer transition-all hover:-translate-y-2 relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: social.color }}
                />
                <social.icon
                  size={20}
                  className="relative z-10 group-hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[0.7rem] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8 opacity-40">
            Network Map
          </h5>
          <ul className="space-y-4">
            {[
              { label: 'Core Protocol', icon: Activity },
              { label: 'Security Grid', icon: Shield },
              { label: 'Network Status', icon: Zap },
              { label: 'API Docs', icon: FileText },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href="#"
                  className="text-[0.85rem] font-black text-slate-500 dark:text-slate-400 hover:text-[#2A7FFF] transition-colors uppercase tracking-widest flex items-center gap-3 group"
                >
                  <l.icon
                    size={14}
                    className="opacity-40 group-hover:opacity-100 group-hover:text-[#2A7FFF] transition-all"
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-[0.7rem] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] mb-8 opacity-40">
            Governance
          </h5>
          <ul className="space-y-4">
            {[
              { label: 'Terms of Service', icon: Scale },
              { label: 'Privacy Policy', icon: Lock },
              { label: 'Compliance Certs', icon: CircleCheck },
              { label: 'Security Bounty', icon: HeartPulse },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href="#"
                  className="text-[0.85rem] font-black text-slate-500 dark:text-slate-400 hover:text-[#2A7FFF] transition-colors uppercase tracking-widest flex items-center gap-3 group"
                >
                  <l.icon
                    size={14}
                    className="opacity-40 group-hover:opacity-100 group-hover:text-[#2ECC71] transition-all"
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 footer-content relative z-10">
        <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.2em]">
          © 2026 DeepMind Advanced Systems. Verified Deployment.
        </p>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full nm-inset">
            <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
            <span className="text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Global Systems Operational
            </span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full nm-button flex items-center justify-center text-[#2A7FFF] hover:-translate-y-1 transition-transform"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      {/* Decorative background blur */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2A7FFF]/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </footer>
  );
};

export default LandingFooter;
