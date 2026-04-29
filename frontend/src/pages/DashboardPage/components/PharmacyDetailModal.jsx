import React from 'react';
import { 
  X, Star, MapPin, Clock, ShieldCheck, ShoppingBag, Navigation, Phone 
} from 'lucide-react';

const PharmacyDetailModal = ({ pharmacy, onClose, onDirections, onNavigateToPharmacy }) => {
  if (!pharmacy) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0F172A] w-full max-w-xl rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden relative animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/20 transition-all hover:scale-110 z-20"
        >
          <X size={24} />
        </button>
        
        <div className="h-72 relative">
          <img 
            src={pharmacy.image || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a'} 
            alt={pharmacy.name} 
            className="w-full h-full object-cover scale-110 blur-[8px] opacity-30 absolute inset-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />
          
          <div className="relative h-full flex flex-col justify-end p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-2">
              <div className="w-24 h-24 rounded-[32px] overflow-hidden border-[6px] border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-[#1E293B] flex items-center justify-center relative group/img">
                <img 
                  src={pharmacy.image || 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a'} 
                  alt={pharmacy.name} 
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" 
                />
                {!pharmacy.image && (
                   <ShoppingBag size={32} className="text-white/20 absolute" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
                     <span className="text-emerald-400 font-black uppercase text-[0.6rem] tracking-[0.2em]">Verified Hub</span>
                   </div>
                   <div className="flex items-center gap-1 text-amber-400 font-black text-[0.8rem] bg-black/20 px-2.5 py-1 rounded-lg backdrop-blur-md">
                     <Star size={12} fill="currentColor" /> {pharmacy.rating || 'New'}
                   </div>
                </div>
                <h3 className="text-[2.2rem] sm:text-[3rem] font-[900] text-white leading-[0.9] tracking-tight drop-shadow-2xl">
                  {pharmacy.name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 sm:px-12 pb-10 sm:pb-12 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {[
              { label: 'Clinical Trust', val: pharmacy.rating || 'New', icon: Star, color: 'text-amber-400', bg: 'bg-amber-400/5' },
              { label: 'Proximity Sync', val: pharmacy.distance || 'Syncing...', icon: Navigation, color: 'text-blue-400', bg: 'bg-blue-400/5' },
              { label: 'Availability', val: pharmacy.timing || '9 AM - 9 PM', icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-400/5' }
            ].map((stat, i) => (
              <div key={i} className={`group p-6 rounded-[32px] ${stat.bg} border border-white/5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all duration-300 hover:-translate-y-1`}>
                <div className={`w-10 h-10 rounded-2xl ${stat.bg} border border-white/10 flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                   <stat.icon size={18} className={`${stat.color}`} />
                </div>
                <p className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest mb-1.5">{stat.label}</p>
                <p className={`text-[0.9rem] font-black ${stat.color} leading-tight`}>{stat.val}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <button 
              onClick={onNavigateToPharmacy}
              className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg text-[1.1rem] font-[900] shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                 <ShoppingBag size={20} /> 
              </div>
              Browse Inventory
            </button>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={(e) => onDirections(e, pharmacy)}
                className="flex-1 py-4.5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-white rounded-lg text-[0.95rem] font-black flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/5"
              >
                <Navigation size={18} className="text-blue-500" /> Directions
              </button>
              <a 
                href={`tel:${pharmacy.phone || '+910000000000'}`}
                className="flex-1 py-4.5 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-white rounded-lg text-[0.95rem] font-black flex items-center justify-center gap-3 hover:bg-slate-100 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/5"
              >
                <Phone size={18} className="text-emerald-500" /> Call Hub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyDetailModal;
