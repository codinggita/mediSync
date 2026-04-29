import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

const DashboardFooter = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-10 border-t border-slate-200/50 dark:border-slate-800">
      {[
        { text: 'End-to-End Encrypted', icon: ShieldCheck },
        { text: 'HIPAA Compliant Protocol', icon: Check },
        { text: 'Biometric Secure Node', icon: ShieldCheck },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-6 py-3 bg-white/40 dark:bg-[#151E32]/40 backdrop-blur-xl rounded-2xl border border-white/20 text-[0.75rem] font-black text-slate-400 uppercase tracking-widest shadow-sm"
        >
          <item.icon size={16} className="text-[#2ECC71]" /> {item.text}
        </div>
      ))}
    </div>
  );
};

export default DashboardFooter;
