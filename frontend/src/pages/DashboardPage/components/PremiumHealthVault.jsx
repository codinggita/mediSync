import React from 'react';
import { ShoppingBag, ArrowRight, ArrowUpRight } from 'lucide-react';
import healthAbstractImg from '../../../assets/images/health_abstract.png';

const PremiumHealthVault = ({ 
  medBoxImg, vitaminsImg, firstAidImg, eyeDropsImg, inhalerImg, onSelectMedicine 
}) => {
  const items = [
    { name: 'Metformin XR', category: 'Prescription', price: '₹450', img: medBoxImg, color: 'from-blue-500/20 to-transparent' },
    { name: 'Vitality Complex', category: 'Supplements', price: '₹1,200', img: vitaminsImg, color: 'from-amber-500/20 to-transparent' },
    { name: 'Smart Rescue Kit', category: 'Emergency', price: '₹2,500', img: firstAidImg, color: 'from-red-500/20 to-transparent' },
    { name: 'OptiClear Drops', category: 'Eye Care', price: '₹320', img: eyeDropsImg, color: 'from-cyan-500/20 to-transparent' },
    { name: 'BreatheEasy Inhaler', category: 'Respiratory', price: '₹850', img: inhalerImg, color: 'from-teal-500/20 to-transparent' },
    { name: 'Chronic Care Pack', category: 'Wellness', price: '₹3,200', img: medBoxImg, color: 'from-indigo-500/20 to-transparent' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-6">
           <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-[#2A7FFF]/10 rounded-3xl blur-xl animate-pulse" />
              <img src={healthAbstractImg} alt="Health" className="w-full h-full object-contain relative z-10 drop-shadow-xl" />
           </div>
           <div>
              <h3 className="text-[1.5rem] font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                 <ShoppingBag size={28} className="text-[#2A7FFF]" />
                 Premium Health Vault
              </h3>
              <p className="text-[0.8rem] text-slate-400 font-bold uppercase tracking-widest mt-1">Curated pharmaceutical essentials for your profile</p>
           </div>
        </div>
        <button className="px-6 py-3 bg-[#ecf0f3] dark:bg-[#151E32] text-[#2A7FFF] rounded-2xl font-black text-[0.8rem] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] hover:shadow-[inset_2px_2px_4px_#cbced1] transition-all uppercase tracking-widest flex items-center gap-2">
           Explore Full Store <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <div key={i} className="group relative bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-6 shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] dark:shadow-[10px_10px_20px_#0a0f1d,-10px_-10px_20px_#202d47] hover:shadow-[15px_15px_30px_#cbced1,-15px_-15px_30px_#ffffff] transition-all duration-500 overflow-hidden cursor-pointer border border-transparent hover:border-white/20">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-full aspect-square mb-6 rounded-3xl overflow-hidden bg-white/50 dark:bg-black/20 p-4 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] group-hover:scale-[1.05] transition-transform duration-500">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain drop-shadow-2xl" />
              </div>
              <div className="w-full text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[0.65rem] font-black text-[#2A7FFF] uppercase tracking-[0.2em]">{item.category}</span>
                  <span className="text-[0.9rem] font-black text-slate-900 dark:text-white">{item.price}</span>
                </div>
                <h4 className="text-[1.05rem] font-black text-slate-800 dark:text-white mb-4 line-clamp-1">{item.name}</h4>
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelectMedicine && onSelectMedicine(item.name); }}
                  className="w-full py-3 bg-[#ecf0f3] dark:bg-[#151E32] rounded-2xl text-[0.75rem] font-black text-slate-600 dark:text-slate-300 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] group-hover:bg-[#2A7FFF] group-hover:text-white group-hover:shadow-[0_8px_16px_rgba(42,127,255,0.3)] transition-all flex items-center justify-center gap-2"
                >
                   Find Lowest Price <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumHealthVault;
