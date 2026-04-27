import React from 'react';
import { TrendingUp, TrendingDown, ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

const MarketComparisonTable = ({ prices, getPriceHighlight, isDarkMode }) => {
  return (
    <div className={`rounded-[2.5rem] overflow-hidden p-8 ${
      isDarkMode 
        ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47]' 
        : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff]'
    }`}>
      <div className="flex items-center justify-between mb-8 px-4">
        <h3 className={`text-xl font-black flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>
          <TrendingUp size={24} className="text-[#2ECC71]" /> Competitive Index
        </h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#2ECC71] shadow-[0_0_8px_#2ECC71]" />
            <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#2ECC71]">Market Minimum</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E11D48] shadow-[0_0_8px_#E11D48]" />
            <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#E11D48]">Market Maximum</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/5 dark:border-white/5">
              {['Medication Identity', 'Unit', 'Source Pharmacy', 'List Price', 'Rebate', 'Effective Cost'].map(h => (
                <th key={h} className="text-left px-6 py-5 text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {prices.map(p => {
              const hl = getPriceHighlight(p);
              const final = p.price - (p.price * (p.discount || 0) / 100);
              return (
                <tr key={p._id} className={`transition-all duration-300 group ${
                  hl === 'lowest' ? 'bg-emerald-500/5' : hl === 'highest' ? 'bg-rose-500/5' : 'hover:bg-black/2'
                }`}>
                  <td className={`px-6 py-5 font-black text-[0.9rem] ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}>{p.medicine?.name || '—'}</td>
                  <td className="px-6 py-5 text-[0.8rem] font-bold text-slate-400">{p.medicine?.dosage || '—'}</td>
                  <td className={`px-6 py-5 text-[0.85rem] font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{p.pharmacy?.name || '—'}</td>
                  <td className="px-6 py-5 text-[0.9rem] font-black text-slate-500">₹{p.price.toFixed(2)}</td>
                  <td className="px-6 py-5">
                    {p.discount ? (
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.65rem] font-black bg-black/5 dark:bg-white/5`}>
                        <TrendingDown size={12} className="text-[#8B5CF6]" />
                        <span className="text-[#8B5CF6]">{p.discount}%</span>
                      </div>
                    ) : <span className="text-slate-600 font-bold">—</span>}
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-2xl transition-all duration-300 ${
                      isDarkMode 
                        ? (hl === 'lowest' ? 'shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47]' : 'bg-black/20') 
                        : (hl === 'lowest' ? 'shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff]' : 'bg-white shadow-inner')
                    }`}>
                      {hl === 'lowest'  && <ArrowDown size={14} className="text-[#2ECC71]" />}
                      {hl === 'highest' && <ArrowUp size={14} className="text-[#E11D48]" />}
                      <span className={`text-[1.1rem] font-black ${
                        hl === 'lowest' ? 'text-[#2ECC71]' : hl === 'highest' ? 'text-[#E11D48]' : (isDarkMode ? 'text-white' : 'text-[#1F2937]')
                      }`}>₹{final.toFixed(2)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!prices.length && (
          <div className="py-24 text-center flex flex-col items-center gap-4">
            <DollarSign size={40} className="text-slate-200" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No market data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketComparisonTable;
