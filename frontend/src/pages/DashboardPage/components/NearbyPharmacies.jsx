import React, { useState, useEffect } from 'react';
import { 
  MapPin, Clock, Star, ChevronRight, 
  Navigation, Phone, ShieldCheck, X,
  ShoppingBag, Search, Globe, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';

const NearbyPharmacies = () => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const navigate = useNavigate();

  const handleGetDirections = (e, pharm) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${pharm.name} ${pharm.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const [pharmacies, setPharmacies] = useState([]);

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

  return (
    <div className="bg-white dark:bg-[#0F172A] border border-slate-100 dark:border-white/5 rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col h-full transition-all relative overflow-hidden group">
      {/* Decorative Blur */}
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
          <div 
            key={pharm.id || pharm._id} 
            onClick={() => setSelectedPharmacy(pharm)}
            className="flex items-center gap-6 p-5 rounded-[32px] bg-[#F8FAFC] dark:bg-[#1E293B]/40 border border-transparent hover:border-[#2ECC71]/30 hover:bg-white dark:hover:bg-[#1E293B] hover:shadow-[0_15px_35px_rgba(46,204,113,0.1)] cursor-pointer transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 shadow-lg border-4 border-white dark:border-[#334155] relative z-10 group-hover:scale-105 transition-transform duration-500">
               <img src={pharm.image || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a'} alt={pharm.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex-1 min-w-0 relative z-10">
               <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[1.1rem] font-black text-slate-900 dark:text-white truncate transition-colors group-hover:text-[#2ECC71]">{pharm.name}</h4>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 rounded-xl text-amber-500 font-black text-[0.75rem] border border-amber-400/20 shadow-sm">
                     <Star size={12} fill="currentColor" /> {pharm.rating || 'New'}
                  </div>
               </div>
               
               <div className="flex items-center gap-5 mb-4">
                  <div className="flex items-center gap-1.5 text-[0.7rem] font-bold text-slate-400 uppercase tracking-widest">
                     <Navigation size={12} className="text-[#2A7FFF]" /> {pharm.distance || '---'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.7rem] font-black text-emerald-500 uppercase tracking-widest">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     {pharm.status || 'Verified'}
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[0.65rem] font-black text-slate-500 dark:text-slate-400 uppercase bg-white dark:bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-white/5">
                    <Clock size={12} /> {pharm.timing || 'Syncing...'}
                  </div>
                  <div 
                    onClick={(e) => { e.stopPropagation(); handleGetDirections(e, pharm); }}
                    className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center text-slate-400 hover:bg-[#2A7FFF] hover:text-white transition-all transform hover:-rotate-12"
                  >
                    <ArrowUpRight size={18} />
                  </div>
               </div>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40 py-10">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-slate-300" />
            </div>
            <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-widest">No local hubs synchronized</p>
          </div>
        )}
      </div>

      {/* Detail Modal Overlay */}
      {selectedPharmacy && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white dark:bg-[#0F172A] w-full max-w-xl rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden relative animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setSelectedPharmacy(null)} 
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/20 transition-all hover:scale-110 z-20"
              >
                <X size={24} />
              </button>
              
              <div className="h-64 relative">
                 <img src={selectedPharmacy.image} alt={selectedPharmacy.name} className="w-full h-full object-cover scale-110 blur-[2px] opacity-40 absolute inset-0" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
                 <div className="relative h-full flex flex-col justify-end p-12">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-20 h-20 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
                          <img src={selectedPharmacy.image} alt={selectedPharmacy.name} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <h3 className="text-[2.5rem] font-black text-white leading-none tracking-tight">{selectedPharmacy.name}</h3>
                          <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 w-fit">
                             <ShieldCheck size={14} className="text-emerald-400" />
                             <span className="text-emerald-400 font-black uppercase text-[0.65rem] tracking-widest">Verified Pharmacy</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="px-12 pb-12 pt-4">
                 <div className="grid grid-cols-3 gap-6 mb-10">
                    {[
                      { label: 'Network Rating', val: selectedPharmacy.rating, icon: Star, color: 'text-amber-400', bg: 'bg-amber-400/10' },
                      { label: 'Live Distance', val: selectedPharmacy.distance, icon: MapPin, color: 'text-blue-400', bg: 'bg-blue-400/10' },
                      { label: 'Store Hours', val: selectedPharmacy.timing, icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }
                    ].map((stat, i) => (
                      <div key={i} className={`p-5 rounded-[2.5rem] ${stat.bg} border border-white/5 flex flex-col items-center justify-center text-center shadow-inner`}>
                         <stat.icon size={20} className={`${stat.color} mb-2`} />
                         <p className="text-[0.6rem] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                         <p className={`text-[0.85rem] font-black ${stat.color} truncate`}>{stat.val}</p>
                      </div>
                    ))}
                 </div>

                 <div className="flex flex-col gap-6">
                    <button 
                      onClick={() => navigate('/pharmacy')}
                      className="w-full py-5 bg-[#2ECC71] text-white rounded-[24px] text-[1.1rem] font-black shadow-[0_20px_40px_rgba(46,204,113,0.3)] hover:bg-emerald-600 hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                    >
                       <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" /> 
                       Browse Clinical Inventory
                    </button>
                    <div className="flex gap-4">
                       <button 
                        onClick={(e) => handleGetDirections(e, selectedPharmacy)}
                        className="flex-1 py-4.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[22px] text-[0.9rem] font-black flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
                       >
                          <Navigation size={18} /> Directions
                       </button>
                       <button className="flex-1 py-4.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[22px] text-[0.9rem] font-black flex items-center justify-center gap-3 hover:bg-slate-200 transition-all">
                          <Phone size={18} /> Call Store
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default NearbyPharmacies;

