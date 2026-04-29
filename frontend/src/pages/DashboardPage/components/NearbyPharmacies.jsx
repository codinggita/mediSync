import React, { useState, useEffect } from 'react';
import { MapPin, Globe, ShoppingBag, Star, Navigation, ArrowRight, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import PharmacyListItem from './PharmacyListItem';
import PharmacyDetailModal from './PharmacyDetailModal';

const NearbyPharmacies = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const { data } = await api.get('/pharmacies/verified');
        setPharmacies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch pharmacies', err);
      }
    };
    fetchPharmacies();
  }, []);

  const handleGetDirections = (e, pharm) => {
    if (e) e.stopPropagation();
    const query = encodeURIComponent(`${pharm.name} ${pharm.address || ''}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[32px] p-6 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex flex-col transition-all relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#2ECC71]/10 rounded-full blur-3xl group-hover:bg-[#2ECC71]/20 transition-colors" />

      <div className="flex items-center justify-between mb-8 relative z-10 gap-2">
        <h3 className="text-[1.2rem] sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2 sm:gap-3 truncate">
          <MapPin size={22} className="text-[#2A7FFF] shrink-0" />
          <span className="truncate">Nearby <span className="text-[#2A7FFF]">Pharmacies</span></span>
        </h3>
        <button 
          onClick={() => navigate('/pharmacy')}
          className="text-[0.65rem] sm:text-[0.7rem] font-black text-[#2A7FFF] bg-[#2A7FFF]/10 px-3 py-1.5 rounded-full uppercase tracking-widest hover:bg-[#2A7FFF]/20 transition-all whitespace-nowrap shrink-0"
        >
          View Map
        </button>
      </div>

      <div className="flex flex-col gap-5 relative z-10">
        {pharmacies.length > 0 ? pharmacies.slice(0, 2).map((pharm) => (
          <div 
            key={pharm.id || pharm._id}
            className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-2xl rounded-[24px] p-6 shadow-sm border border-white dark:border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(42,127,255,0.15)] overflow-hidden"
          >
            {/* Professional Gloss Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E8F0FF] to-white dark:from-[#2A7FFF]/20 dark:to-transparent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 shrink-0">
                <MapPin size={24} className="text-[#2A7FFF]" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[0.6rem] font-black uppercase tracking-widest border border-emerald-500/20">
                  {pharm.open247 ? 'Open 24/7' : 'Open Now'}
                </div>
              </div>
            </div>

            <div className="relative z-10 mb-6">
              <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white mb-1.5 leading-tight tracking-tight truncate">
                {pharm.name}
              </h4>
              <div className="flex items-center justify-between">
                <p className="text-[0.7rem] font-bold text-[#2A7FFF] uppercase tracking-widest flex items-center gap-1.5">
                  <Navigation size={12} fill="currentColor" /> {pharm.distance || '1.2 km'}
                </p>
                <div className="flex items-center gap-1 text-amber-500 font-black text-[0.7rem]">
                   <Star size={12} fill="currentColor" /> {pharm.rating || '4.8'}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 relative z-10">
              <button 
                onClick={() => setSelectedPharmacy(pharm)}
                className="flex-1 py-3 bg-[#2A7FFF] hover:bg-[#1A6FFF] text-white rounded-xl font-black text-[0.75rem] uppercase tracking-widest shadow-[0_10px_20px_rgba(42,127,255,0.2)] hover:shadow-[0_15px_30px_rgba(42,127,255,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Visit Hub
              </button>
              <a 
                href={`tel:${pharm.phone || '911'}`}
                onClick={(e) => e.stopPropagation()}
                className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#2A7FFF] transition-all shadow-sm active:scale-95 shrink-0"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        )) : (
          [1, 2].map(i => (
            <div key={i} className="bg-white/40 dark:bg-white/5 rounded-[24px] p-10 border border-dashed border-slate-200 dark:border-white/10 flex items-center justify-center">
               <div className="w-10 h-10 border-4 border-[#2A7FFF]/20 border-t-[#2A7FFF] rounded-full animate-spin" />
            </div>
          ))
        )}
      </div>

      <PharmacyDetailModal 
        pharmacy={selectedPharmacy}
        onClose={() => setSelectedPharmacy(null)}
        onDirections={handleGetDirections}
        onNavigateToPharmacy={() => navigate('/pharmacy')}
      />
    </div>
  );
};

export default NearbyPharmacies;
