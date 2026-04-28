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
        
        <div className="h-64 relative">
          <img src={pharmacy.image} alt={pharmacy.name} className="w-full h-full object-cover scale-110 blur-[2px] opacity-40 absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
          <div className="relative h-full flex flex-col justify-end p-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-[32px] overflow-hidden border-4 border-white shadow-2xl">
                <img src={pharmacy.image} alt={pharmacy.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-[2.5rem] font-black text-white leading-none tracking-tight">{pharmacy.name}</h3>
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
              { label: 'Network Rating', val: pharmacy.rating, icon: Star, color: 'text-amber-400', bg: 'bg-amber-400/10' },
              { label: 'Live Distance', val: pharmacy.distance, icon: MapPin, color: 'text-blue-400', bg: 'bg-blue-400/10' },
              { label: 'Store Hours', val: pharmacy.timing, icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }
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
              onClick={onNavigateToPharmacy}
              className="w-full py-5 bg-[#2ECC71] text-white rounded-[24px] text-[1.1rem] font-black shadow-[0_20px_40px_rgba(46,204,113,0.3)] hover:bg-emerald-600 hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <ShoppingBag size={22} className="group-hover:rotate-12 transition-transform" /> 
              Browse Clinical Inventory
            </button>
            <div className="flex gap-4">
              <button 
                onClick={(e) => onDirections(e, pharmacy)}
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
  );
};

export default PharmacyDetailModal;
