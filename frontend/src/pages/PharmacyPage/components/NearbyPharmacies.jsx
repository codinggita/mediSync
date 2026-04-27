import React from 'react';
import { MapPin, Phone, Star, ArrowRight } from 'lucide-react';

const PHARMACIES = [
  { id: 1, name: 'MedPlus Intelligence', distance: '1.2 km', rating: 4.8, status: 'Open Now' },
  { id: 2, name: 'Apollo Pharmacy Hub', distance: '2.4 km', rating: 4.5, status: 'Open 24/7' },
  { id: 3, name: 'Wellness Forever', distance: '3.1 km', rating: 4.2, status: 'Open Now' },
];

const NearbyPharmacies = () => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d] border border-white/40">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
          <MapPin size={24} className="text-[#2A7FFF]" />
          Nearby Pharmacies
        </h2>
        <button className="text-[0.8rem] font-black text-[#2A7FFF] uppercase tracking-widest hover:underline">View Map View</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {PHARMACIES.map((p) => (
          <div key={p.id} className="bg-[#ecf0f3] dark:bg-[#0B1121] p-8 rounded-[3rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-none border border-white/40 group hover:-translate-y-2 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#2A7FFF]/10 flex items-center justify-center text-[#2A7FFF]">
                <MapPin size={24} />
              </div>
              <span className="text-[0.65rem] font-black bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full uppercase tracking-widest">{p.status}</span>
            </div>
            <h3 className="text-[1.2rem] font-black text-slate-900 dark:text-white mb-2">{p.name}</h3>
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-bold text-[0.8rem] mb-6">
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-amber-400 text-amber-400" /> {p.rating}
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{p.distance}</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex-1 py-3 bg-[#2A7FFF] text-white rounded-2xl font-black text-[0.8rem] uppercase tracking-widest shadow-lg shadow-[#2A7FFF]/20 hover:bg-[#1C71E1] transition-all">Visit Hub</button>
              <button className="w-12 h-12 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/60 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#2A7FFF] transition-all">
                <Phone size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPharmacies;
