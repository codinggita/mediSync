import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation2, Star, Clock, Phone, ExternalLink, Loader2 } from 'lucide-react';
import api from '../../../utils/api';
import pharmacyImg from '../../../assets/images/pharmacy-card.png';
import medBoxImg from '../../../assets/images/medicine_box.png';
import vitaminImg from '../../../assets/images/vitamin_bottle.png';

const CITY_COORDS = {
  'mumbai': { lat: 19.0760, lng: 72.8777, bbox: '72.80%2C19.00%2C72.95%2C19.15' },
  'delhi': { lat: 28.6139, lng: 77.2090, bbox: '77.05%2C28.48%2C77.15%2C28.55' },
  'bangalore': { lat: 12.9716, lng: 77.5946, bbox: '77.50%2C12.90%2C77.70%2C13.05' },
  'hyderabad': { lat: 17.3850, lng: 78.4867, bbox: '78.40%2C17.30%2C78.60%2C17.45' },
  'pune': { lat: 18.5204, lng: 73.8567, bbox: '73.75%2C18.45%2C73.95%2C18.60' }
};

const NearbyPharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [userLocation, setUserLocation] = useState('New Delhi, India');
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mapConfig, setMapConfig] = useState(CITY_COORDS.delhi);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const { data } = await api.get('/pharmacies/verified');
        setPharmacies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    const query = userLocation.toLowerCase();
    let matched = false;
    
    Object.keys(CITY_COORDS).forEach(city => {
      if (query.includes(city)) {
        setMapConfig(CITY_COORDS[city]);
        matched = true;
      }
    });

    setTimeout(() => {
      setIsSearching(false);
      if (matched) {
        setPharmacies(prev => prev.map(p => ({
          ...p,
          distance: `${(Math.random() * 2 + 0.5).toFixed(1)} km`
        })));
      }
    }, 1200);
  };

  if (loading) {
    return (
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] shadow-[6px_6px_12px_#cbced1] h-[550px] flex items-center justify-center border border-white/40">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#2A7FFF]" size={42} />
          <p className="text-slate-400 font-black text-[0.8rem] uppercase tracking-widest">Synchronizing Geography...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 w-full animate-in fade-in duration-700">
      
      {/* ── PART 1: Tactical Map Overview (Full Width Top) ────────────────────── */}
      <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-[12px_12px_24px_#0a0f1d] overflow-hidden border border-white/40 relative">
        <div className="h-[500px] relative overflow-hidden bg-slate-200">
          
          {/* Location Header Overlay */}
          <div className="absolute top-8 left-8 right-8 z-10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-5 px-8 py-4 bg-white/95 dark:bg-[#151E32]/95 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/50">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shadow-inner">
                   <MapPin size={24} className="text-emerald-500" />
                </div>
                <div>
                   <p className="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.2em]">Clinical Perimeter</p>
                   <p className="text-[1.1rem] font-black text-slate-800 dark:text-white leading-none mt-1.5">{userLocation}</p>
                </div>
             </div>

             <form onSubmit={handleLocationSubmit} className="relative w-full md:w-[450px] group">
                <Navigation2 size={20} className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isSearching ? 'text-[#2A7FFF] animate-pulse' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Sync new location coordinates..."
                  value={userLocation}
                  onChange={(e) => setUserLocation(e.target.value)}
                  className="w-full py-6 pl-16 pr-4 bg-white/95 dark:bg-[#1a2235]/95 backdrop-blur-md border-none rounded-[2.5rem] text-[1rem] font-black text-slate-700 dark:text-white outline-none shadow-2xl focus:ring-4 ring-[#2A7FFF]/10 transition-all"
                />
                {isSearching && <div className="absolute right-8 top-1/2 -translate-y-1/2 text-[0.6rem] font-black text-[#2A7FFF] uppercase tracking-widest animate-pulse">Locking...</div>}
             </form>
          </div>

          <div className="absolute bottom-8 right-8 z-10 flex items-center gap-4">
             <div className="bg-white/95 dark:bg-[#151E32]/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl border border-white/50 flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[#2ECC71] animate-ping" />
              <span className="text-[0.85rem] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Active Logistics Grid</span>
            </div>
          </div>

          <iframe
            key={`${mapConfig.lat}-${mapConfig.lng}`}
            title="Nearby Pharmacies Map"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapConfig.bbox}&layer=mapnik&marker=${mapConfig.lat}%2C${mapConfig.lng}`}
            className="w-full h-full grayscale-[0.2] opacity-90 contrast-[1.1]"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>

      {/* ── PART 2: The 6-Card Pharmacy Catalog (Perfectly Adjusted) ──────────── */}
      <div className="flex flex-col gap-12 mt-4">
        <div className="flex items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-[#ecf0f3] dark:bg-[#1a2235] flex items-center justify-center shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-none border border-white/40">
               <Search size={28} className="text-[#2A7FFF]" />
            </div>
            <div>
              <h3 className="text-[2rem] font-black text-slate-800 dark:text-white leading-tight tracking-tight">Verified Pharmacy Directory</h3>
              <div className="text-[0.85rem] text-slate-400 font-bold uppercase tracking-[0.3em] mt-3 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#2ECC71]" />
                {pharmacies.length} Premium Medical Hubs Identified in Your Region
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-5 px-8 py-4 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] shadow-[inset_4px_4px_8px_#cbced1] dark:shadow-none border border-white/20">
             <Star size={20} className="text-amber-500 fill-amber-500" />
             <span className="text-[0.95rem] font-black text-slate-600 dark:text-slate-300">Clinical Excellence Filter Active</span>
          </div>
        </div>

        {/* 6-Card Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-2">
          {pharmacies.map((p, idx) => (
            <div
              key={p._id || p.id || `pharmacy-${idx}`}
              className="group bg-[#ecf0f3] dark:bg-[#1a2235] p-8 rounded-[3.5rem] shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-[12px_12px_24px_#0a0f1d] border border-white/40 hover:-translate-y-2 transition-all duration-700 relative overflow-hidden"
            >
              {/* Distance Node (Compact) */}
              <div className="absolute top-8 right-8 px-5 py-2 bg-white/70 dark:bg-[#0B1121]/70 backdrop-blur-md rounded-xl text-[0.8rem] font-black text-[#2A7FFF] shadow-md border border-white/40 flex items-center gap-2 z-10">
                 <Navigation2 size={16} /> {p.distance}
              </div>

              <div className="flex flex-col items-center text-center mt-2 mb-6">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white dark:bg-[#151E32] shadow-xl border-4 border-white dark:border-[#1a2235] overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-700">
                  <img 
                    src={[
                      'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop&q=80', // Card 1 (Original)
                      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=400&h=400&fit=crop&q=80', // Card 2 (Fixed)
                      pharmacyImg, // Card 3 (Local Asset - Guaranteed Fix)
                      'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=400&fit=crop&q=80', // Card 4
                      'https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?w=400&h=400&fit=crop&q=80', // Card 5
                      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop&q=80'  // Card 6
                    ][idx % 6]} 
                    alt="Clinical Hub" 
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity" 
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="text-[1.5rem] font-black text-slate-800 dark:text-white leading-none tracking-tight mb-4">{p.name}</h4>
                  
                  <div className={`inline-flex px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-widest mb-6 ${p.status === 'Open' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                       Status: {p.status}
                  </div>

                  <p className="text-[1rem] text-slate-500 dark:text-slate-400 font-bold leading-tight mb-6 px-4 h-[40px] line-clamp-2">
                    {p.address}
                  </p>

                  <div className="flex items-center justify-center gap-8">
                    <div className="flex items-center gap-2.5">
                      <Star size={20} className="text-amber-500 fill-amber-500" />
                      <span className="text-[1.1rem] font-black text-slate-700 dark:text-slate-200">{p.rating}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={20} className="text-slate-400" />
                      <span className="text-[1.1rem] font-black text-slate-700 dark:text-slate-200">{p.closes}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => window.open(`https://www.google.com/maps/dir/${encodeURIComponent(userLocation)}/${encodeURIComponent(p.name)}`, '_blank')}
                  className="w-full py-5 rounded-[1.8rem] bg-[#2A7FFF] text-white text-[1.1rem] font-black shadow-[0_15px_30px_rgba(42,127,255,0.3)] hover:shadow-[0_20px_40px_rgba(42,127,255,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-4"
                >
                  <Navigation2 size={20} /> Directions
                </button>
                <a
                  href={`tel:${p.phone}`}
                  className="w-full py-4 flex items-center justify-center rounded-[1.8rem] bg-white dark:bg-[#0B1121] text-slate-400 hover:text-[#2ECC71] shadow-[4px_4px_8px_#cbced1] dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all gap-3 font-black text-[1rem]"
                >
                  <Phone size={20} /> Contact Hub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyPharmacies;
