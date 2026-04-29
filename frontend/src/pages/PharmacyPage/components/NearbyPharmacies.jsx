import React, { useState } from 'react';
import { MapPin, Phone, Star, Navigation, X, ShoppingBag, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PharmacyDetailModal from '../../DashboardPage/components/PharmacyDetailModal';

const PHARMACIES = [
  {
    id: 1,
    name: 'MedPlus Intelligence',
    distance: '1.2 km',
    rating: 4.8,
    status: 'Open Now',
    phone: '+919876543210',
    location: 'Medical District, North Block',
  },
  {
    id: 2,
    name: 'Apollo Pharmacy Hub',
    distance: '2.4 km',
    rating: 4.5,
    status: 'Open 24/7',
    phone: '+919876543211',
    location: 'Health Avenue, Sector 4',
  },
  {
    id: 3,
    name: 'Wellness Forever',
    distance: '3.1 km',
    rating: 4.2,
    status: 'Open Now',
    phone: '+919876543212',
    location: 'Wellness Plaza, East Wing',
  },
];

const NearbyPharmacies = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const navigate = useNavigate();

  const handleGetDirections = (e, pharm) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${pharm.name} ${pharm.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-8 sm:p-12 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d] border border-white/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
        <h2 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
          <MapPin size={24} className="text-[#2A7FFF]" />
          Nearby Pharmacies
        </h2>
        <button
          onClick={() =>
            window.open('https://www.google.com/maps/search/pharmacy+near+me', '_blank')
          }
          className="text-[0.8rem] font-black text-[#2A7FFF] uppercase tracking-widest hover:underline bg-[#2A7FFF]/5 px-4 py-2 rounded-full"
        >
          View Map View
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {PHARMACIES.map((p) => (
          <div
            key={p.id}
            className="bg-[#ecf0f3] dark:bg-[#0B1121] p-8 rounded-[3rem] shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-[8px_8px_16px_#050810] border border-white/40 group hover:-translate-y-2 transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-[20px] bg-white dark:bg-white/5 shadow-md flex items-center justify-center text-[#2A7FFF] group-hover:scale-110 transition-transform duration-500">
                <MapPin size={28} />
              </div>
              <span className="text-[0.65rem] font-black bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full uppercase tracking-widest border border-emerald-500/20">
                {p.status}
              </span>
            </div>

            <h3 className="text-[1.25rem] font-black text-slate-900 dark:text-white mb-2 leading-tight">
              {p.name}
            </h3>

            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-bold text-[0.85rem] mb-8">
              <div className="flex items-center gap-1.5">
                <Star size={16} className="fill-amber-400 text-amber-400" /> {p.rating}
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span>{p.distance}</span>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <button
                onClick={() => setSelectedPharmacy(p)}
                className="flex-1 py-5 bg-[#2A7FFF] hover:bg-[#1A6FFF] text-white rounded-lg font-black text-[0.85rem] uppercase tracking-[0.25em] shadow-[0_15px_30px_rgba(42,127,255,0.25)] hover:shadow-[0_20px_40px_rgba(42,127,255,0.35)] transition-all active:scale-95 flex items-center justify-center gap-3 group/btn"
              >
                Visit Hub
                <ArrowRight
                  size={18}
                  className="group-hover/btn:translate-x-1.5 transition-transform"
                />
              </button>
              <a
                href={`tel:${p.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="w-16 h-16 rounded-lg bg-white dark:bg-white/5 border border-white/60 dark:border-white/5 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#2A7FFF] transition-all active:scale-95"
              >
                <Phone size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <PharmacyDetailModal
        pharmacy={selectedPharmacy}
        onClose={() => setSelectedPharmacy(null)}
        onDirections={handleGetDirections}
        onNavigateToPharmacy={() => {
          setSelectedPharmacy(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default NearbyPharmacies;
