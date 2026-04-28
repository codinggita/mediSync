import React, { useState, useEffect } from 'react';
import { MapPin, Globe, ShoppingBag } from 'lucide-react';
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
    <div className="bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-white/5 rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col h-full transition-all relative overflow-hidden group">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#2ECC71]/10 rounded-full blur-3xl group-hover:bg-[#2ECC71]/20 transition-colors" />

      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 rounded-xl bg-[#2ECC71]/10 flex items-center justify-center">
                <MapPin size={18} className="text-[#2ECC71]" />
             </div>
             <h3 className="text-[1.2rem] font-black text-slate-800 dark:text-white tracking-tight">
               Local Network
             </h3>
          </div>
          <p className="text-[0.7rem] text-slate-400 font-bold uppercase tracking-[0.2em] ml-10">Verified pharmacies near you</p>
        </div>
        <button 
          onClick={() => navigate('/pharmacy')}
          className="px-5 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2 group/btn"
        >
          <Globe size={14} className="group-hover/btn:rotate-12 transition-transform" /> View Map
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide flex-1 relative z-10">
        {pharmacies.length > 0 ? pharmacies.map((pharm) => (
          <PharmacyListItem 
            key={pharm.id || pharm._id}
            pharmacy={pharm}
            onClick={() => setSelectedPharmacy(pharm)}
            onDirections={handleGetDirections}
          />
        )) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-10">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-slate-300" />
            </div>
            <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-widest">No local hubs synchronized</p>
          </div>
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
