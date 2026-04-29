import React from 'react';
import { Activity } from 'lucide-react';

const PARTNERS = [
  { name: 'Mayo Clinic Connect', color: '#FF4D4D' },
  { name: 'Johns Hopkins Data', color: '#2A7FFF' },
  { name: 'NHS Digital Sync', color: '#2ECC71' },
  { name: 'Cleveland Health', color: '#F1C40F' },
  { name: 'Stanford Medicine', color: '#9B59B6' },
  { name: 'Mayo Clinic Connect', color: '#FF4D4D' },
  { name: 'Johns Hopkins Data', color: '#2A7FFF' },
  { name: 'NHS Digital Sync', color: '#2ECC71' },
  { name: 'Cleveland Health', color: '#F1C40F' },
  { name: 'Stanford Medicine', color: '#9B59B6' },
];

const PartnerTicker = () => {
  return (
    <section
      className="py-20 bg-white/20 dark:bg-black/10 overflow-hidden relative border-t border-white/20 dark:border-white/5"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <h3 className="text-[0.7rem] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-4">
          Partner Ecosystem
        </h3>
        <div className="w-20 h-1 bg-[#2A7FFF]/20" />
      </div>

      <div className="animate-scroll whitespace-nowrap flex items-center gap-32">
        {PARTNERS.map((partner, i) => (
          <div key={i} className="flex items-center gap-6 group cursor-pointer partner-card">
            <div
              className="w-20 h-20 rounded-3xl nm-button flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative"
              style={{
                boxShadow: `10px 10px 20px #b8bfc7, -10px -10px 20px #ffffff, 0 0 30px ${partner.color}10`,
              }}
            >
              <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-slate-200 shadow-inner group-hover:bg-[#2ECC71] transition-colors duration-500" />
              <div
                style={{ color: partner.color }}
                className="group-hover:scale-110 transition-transform"
              >
                <Activity size={32} />
              </div>
            </div>
            <span
              className="text-[2.5rem] font-black tracking-tighter transition-all duration-500 opacity-20 group-hover:opacity-100"
              style={{
                color: partner.color,
                textShadow: `0 0 40px ${partner.color}30`,
              }}
            >
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnerTicker;
