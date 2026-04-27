import React from 'react';
import { Navigation2, Phone, Clock, ArrowUpRight } from 'lucide-react';

const hospitals = [
  {
    id: 1,
    name: 'Apollo ER Center',
    distance: '3.4 km',
    time: '8 min',
    status: 'High Capacity',
  },
  {
    id: 2,
    name: 'City Care Hospital',
    distance: '1.2 km',
    time: '3 min',
    status: 'Accepting ER',
  },
  {
    id: 3,
    name: 'Medicenter Triage',
    distance: '5.1 km',
    time: '12 min',
    status: 'Limited Space',
  },
];

const NearbyHospitals = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-[0.85rem] font-black text-white uppercase tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
          Nearest ER Facilities
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {hospitals.map((h, i) => (
          <div
            key={h.id}
            className="group relative bg-[#150A0A] border border-[#D32F2F]/20 rounded-xl p-4 flex items-center justify-between transition-all hover:bg-[#1C0D0D] hover:border-[#D32F2F]/40 cursor-pointer overflow-hidden"
          >
            {/* Highlight for the closest hospital */}
            {i === 1 && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D32F2F] shadow-[0_0_10px_#D32F2F]" />
            )}
            
            <div className={`flex flex-col gap-1.5 ${i === 1 ? 'pl-2' : ''}`}>
              <h3 className="text-[0.95rem] font-black text-white leading-none">{h.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] text-[#EF4444] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Navigation2 size={10} /> {h.distance}
                </span>
                <span className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock size={10} /> {h.time} away
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-[0.6rem] font-bold uppercase tracking-wider px-2 py-1 rounded-md hidden sm:block ${
                h.status === 'High Capacity' ? 'bg-[#2ECC71]/10 text-[#2ECC71]' :
                h.status === 'Limited Space' ? 'bg-[#F59E0B]/10 text-[#F59E0B]' :
                'bg-[#2A7FFF]/10 text-[#2A7FFF]'
              }`}>
                {h.status}
              </span>
              <button className="w-9 h-9 rounded-lg bg-[#D32F2F]/10 flex items-center justify-center border border-[#D32F2F]/30 text-[#EF4444] group-hover:bg-[#D32F2F] group-hover:text-white transition-all active:scale-95">
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyHospitals;
