import React, { useState } from 'react';
import { Heart, BarChart2, ChevronDown, MapPin, Star, Zap, ShoppingCart } from 'lucide-react';
import medBoxImg from '../../../assets/images/medicine_box.png';
import vitaminsImg from '../../../assets/images/vitamins.png';

const CategoryBadge = ({ cat }) => {
  const colors = {
    Diabetes: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    Cardiac: 'bg-red-50 dark:bg-red-500/10 text-red-500',
    Analgesic: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
    Gastro: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-widest ${colors[cat] || 'bg-slate-100 text-slate-500'}`}
    >
      {cat}
    </span>
  );
};

const PriceRow = ({ entry, isBest }) => {
  const saving = entry.original - entry.price;
  const pct = Math.round((saving / entry.original) * 100);

  return (
    <div
      className={`flex flex-col xs:flex-row items-start xs:items-center justify-between p-4 rounded-2xl border transition-all gap-4 group ${
        isBest
          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30'
          : 'bg-slate-50 dark:bg-[#0B1121]/60 border-slate-100 dark:border-slate-800 hover:border-[#2A7FFF]/30'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 w-full xs:w-auto">
        {isBest && (
          <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 bg-emerald-500 text-white text-[0.6rem] font-black rounded-full uppercase tracking-widest">
            <Zap size={10} /> Best
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[0.85rem] font-black text-slate-900 dark:text-white truncate">
            {entry.pharmacy}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
            <span className="text-[0.7rem] text-slate-400 flex items-center gap-1">
              <MapPin size={10} /> {entry.distance}
            </span>
            <span className="text-[0.7rem] text-slate-400 flex items-center gap-1">
              <Star size={10} className="text-amber-400 fill-amber-400" /> {entry.rating}
            </span>
            {entry.inStock ? (
              <span className="text-[0.65rem] text-emerald-500 font-black">In Stock</span>
            ) : (
              <span className="text-[0.65rem] text-red-400 font-black">Out of Stock</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between xs:justify-end gap-4 w-full xs:w-auto shrink-0 border-t xs:border-t-0 border-slate-200 dark:border-slate-800 pt-3 xs:pt-0">
        <div className="text-left xs:text-right">
          <p className="text-[1.1rem] font-black text-slate-900 dark:text-white leading-none">₹{entry.price}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <p className="text-[0.7rem] text-slate-400 line-through">₹{entry.original}</p>
            {pct > 0 && <span className="text-[0.65rem] font-black text-emerald-500">-{pct}%</span>}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Sourcing Request Initiated: ${entry.pharmacy} hub is processing your order for delivery.`);
          }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            entry.inStock
              ? 'bg-[#2A7FFF] text-white hover:bg-[#1565C0] shadow-lg shadow-[#2A7FFF]/20 active:scale-90'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-300 cursor-not-allowed'
          }`}
          disabled={!entry.inStock}
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
};

const MedicineCard = React.memo(({ medicine, isWishlisted, onWishlist }) => {
  const [expanded, setExpanded] = useState(false);

  const sorted = [...medicine.prices].sort((a, b) => a.price - b.price);
  const bestPrice = sorted[0].price;
  const maxPrice = sorted[sorted.length - 1].price;
  const avgSave = Math.round(
    medicine.prices.reduce((s, p) => s + (p.original - p.price), 0) / medicine.prices.length
  );

  return (
    <div className="nm-flat rounded-[3rem] transition-all duration-500 overflow-hidden group hover:scale-[1.01]">
      {}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center nm-inset p-2 overflow-hidden shrink-0">
              <img
                src={medicine.category === 'Analgesic' ? vitaminsImg : medBoxImg}
                alt={medicine.name}
                className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white leading-tight">
                {medicine.name}
              </h3>
              <p className="text-[0.78rem] text-slate-400 font-bold mt-1 uppercase tracking-tighter">
                {medicine.generic}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CategoryBadge cat={medicine.category} />
            <button
              onClick={() => onWishlist(medicine.id)}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${
                isWishlisted
                  ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-500'
                  : 'border-slate-100 dark:border-slate-800 text-slate-300 hover:text-red-500'
              }`}
            >
              <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-[2rem] nm-inset text-center">
            <p className="text-[0.6rem] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
              Best Price
            </p>
            <p className="text-[1.2rem] font-black text-emerald-600 dark:text-emerald-400">
              ₹{bestPrice}
            </p>
          </div>
          <div className="p-4 rounded-[2rem] nm-inset text-center">
            <p className="text-[0.6rem] font-black text-slate-400 uppercase tracking-widest mb-1">
              Highest
            </p>
            <p className="text-[1.2rem] font-black text-slate-700 dark:text-slate-200">
              ₹{maxPrice}
            </p>
          </div>
          <div className="p-4 rounded-[2rem] nm-inset text-center">
            <p className="text-[0.6rem] font-black text-[#2A7FFF] uppercase tracking-widest mb-1">
              Avg Save
            </p>
            <p className="text-[1.2rem] font-black text-[#2A7FFF]">₹{avgSave}</p>
          </div>
        </div>

        {}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#0B1121]/60 border border-slate-100 dark:border-slate-800 text-[0.75rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:border-[#2A7FFF]/30 transition-all"
        >
          <span className="flex items-center gap-2">
            <BarChart2 size={14} /> Compare {medicine.prices.length} Pharmacies
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {}
      {expanded && (
        <div className="px-6 pb-6 space-y-3 border-t border-slate-100 dark:border-slate-800/50 pt-4">
          {sorted.map((entry, i) => (
            <PriceRow key={i} entry={entry} isBest={i === 0} />
          ))}
        </div>
      )}
    </div>
  );
});

export default MedicineCard;
