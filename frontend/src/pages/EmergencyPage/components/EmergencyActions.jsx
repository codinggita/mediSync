import React from 'react';
import { Phone, Ambulance, ShieldAlert } from 'lucide-react';

const EmergencyActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Call Ambulance */}
      <button className="relative overflow-hidden group flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#D32F2F] to-[#9A1B1B] border border-[#EF4444]/50 rounded-[16px] p-5 shadow-[0_8px_20px_rgba(211,47,47,0.3)] transition-all hover:shadow-[0_12px_30px_rgba(211,47,47,0.5)] active:scale-95">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors pointer-events-none" />
        
        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center relative z-10 group-hover:-translate-y-1 transition-transform">
          <Ambulance size={28} className="text-white" />
        </div>
        <div className="text-center relative z-10">
          <p className="text-[1.1rem] font-black text-white leading-tight">108</p>
          <p className="text-[0.65rem] font-bold text-white/80 uppercase tracking-widest mt-1">Call Ambulance</p>
        </div>
      </button>

      {/* Police / SOS */}
      <button className="relative overflow-hidden group flex flex-col items-center justify-center gap-3 bg-[#1A0B0B] border border-[#D32F2F]/30 rounded-[16px] p-5 shadow-lg transition-all hover:bg-[#220E0E] hover:border-[#D32F2F]/50 active:scale-95">
        <div className="w-14 h-14 rounded-full bg-[#D32F2F]/10 border border-[#D32F2F]/30 flex items-center justify-center relative z-10 group-hover:-translate-y-1 transition-transform">
          <ShieldAlert size={28} className="text-[#EF4444]" />
        </div>
        <div className="text-center relative z-10">
          <p className="text-[1.1rem] font-black text-[#EF4444] leading-tight">112</p>
          <p className="text-[0.65rem] font-bold text-[#EF4444]/80 uppercase tracking-widest mt-1">National SOS</p>
        </div>
      </button>

      {/* Emergency Contact */}
      <button className="col-span-2 relative overflow-hidden group flex items-center justify-center gap-3 bg-[#1A0B0B] border border-[#D32F2F]/30 rounded-[16px] p-4 shadow-lg transition-all hover:bg-[#220E0E] active:scale-[0.98]">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center relative z-10">
          <Phone size={18} className="text-white" />
        </div>
        <div className="flex flex-col relative z-10 items-start">
          <p className="text-[0.9rem] font-black text-white">Notify Emergency Contacts</p>
          <p className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-wider mt-0.5">Alerts 3 saved family members</p>
        </div>
      </button>
    </div>
  );
};

export default EmergencyActions;
