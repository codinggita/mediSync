import React from 'react';
import { User, RefreshCw, Phone } from 'lucide-react';

const TrustedNetwork = ({ contacts, isSearching, onRefresh }) => {
  return (
    <div className="bg-white dark:bg-[#151E32] rounded-[4.5rem] p-12 shadow-2xl border border-white dark:border-white/5 relative">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white flex items-center gap-4 leading-none tracking-tight">
            <User size={32} className="text-[#E11D48]" /> Trusted Network
          </h2>
          <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Verified Emergency Tier-1</p>
        </div>
        <button 
          onClick={onRefresh} 
          className={`w-16 h-16 rounded-[24px] bg-slate-50 dark:bg-[#090E1A] shadow-md text-slate-400 hover:text-[#E11D48] transition-all flex items-center justify-center ${isSearching ? 'rotate-180 bg-red-500/10 text-red-500' : ''}`}
        >
          <RefreshCw size={24} className={isSearching ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-6">
        {contacts.map((contact, i) => (
          <div key={i} className="flex items-center justify-between p-8 rounded-[3.5rem] bg-[#F8FAFC] dark:bg-[#090E1A]/40 border border-slate-100 dark:border-white/5 hover:scale-[1.02] transition-all group/card">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#E11D48] to-[#9F1239] text-white flex items-center justify-center font-black text-[1.4rem] shadow-xl group-hover/card:rotate-6 transition-transform">
                {contact.name[0]}
              </div>
              <div>
                <p className="text-[1.2rem] font-black text-slate-800 dark:text-white leading-none mb-1 tracking-tight">{contact.name}</p>
                <p className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.2em]">{contact.relation}</p>
              </div>
            </div>
            <a href={`tel:${contact.phone}`} className="w-14 h-14 rounded-[22px] bg-white dark:bg-[#151E32] text-[#E11D48] flex items-center justify-center shadow-xl border border-slate-100 dark:border-white/5">
              <Phone size={24} />
            </a>
          </div>
        ))}
      </div>
      <button className="w-full mt-10 py-6 border-3 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] text-[0.8rem] font-black text-slate-400 hover:text-[#E11D48] hover:border-red-500/30 transition-all uppercase tracking-[0.4em]">
        Augment Primary Hub
      </button>
    </div>
  );
};

export default TrustedNetwork;
