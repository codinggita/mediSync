import React from 'react';
import { TrendingUp, TrendingDown, ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

const MarketComparisonTable = ({ prices, getPriceHighlight, isDarkMode }) => {
  return (
    <div
      className={`rounded-[3rem] overflow-hidden p-10 transition-all ${
        isDarkMode
          ? 'bg-[#151E32] shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/5'
          : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 px-2 gap-6">
        <h3
          className={`text-[1.5rem] font-black flex items-center gap-4 ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tight`}
        >
          <TrendingUp size={28} className="text-[#2ECC71]" strokeWidth={3} /> Competitive Index
        </h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC71] shadow-[0_0_12px_rgba(46,204,113,0.6)]" />
            <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[#2ECC71]">
              Market Minimum
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shadow-[0_0_12px_rgba(225,29,72,0.6)]" />
            <span className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[#E11D48]">
              Market Maximum
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr>
              {[
                'Medication Identity',
                'Unit',
                'Source Pharmacy',
                'List Price',
                'Rebate',
                'Effective Cost',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-8 py-2 text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.25em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prices.map((p) => {
              const hl = getPriceHighlight(p);
              const final = p.price - (p.price * (p.discount || 0)) / 100;
              return (
                <tr
                  key={p._id}
                  className={`transition-all duration-300 group hover:translate-x-1 ${
                    hl === 'lowest'
                      ? 'bg-emerald-500/5'
                      : hl === 'highest'
                        ? 'bg-rose-500/5'
                        : 'hover:bg-black/2 dark:hover:bg-white/5'
                  }`}
                >
                  <td
                    className={`px-8 py-6 rounded-l-[1.5rem] font-black text-[1rem] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                  >
                    {p.medicine?.name || '—'}
                  </td>
                  <td className="px-8 py-6 text-[0.8rem] font-black text-slate-400 uppercase tracking-widest">
                    {p.medicine?.dosage || '—'}
                  </td>
                  <td
                    className={`px-8 py-6 text-[0.85rem] font-black tracking-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    {p.pharmacy?.name || '—'}
                  </td>
                  <td className="px-8 py-6 text-[0.9rem] font-black text-slate-500">
                    ₹{p.price.toFixed(2)}
                  </td>
                  <td className="px-8 py-6">
                    {p.discount ? (
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[0.7rem] font-black bg-white/50 dark:bg-black/20 shadow-sm border border-white/20`}
                      >
                        <TrendingDown size={14} className="text-[#8B5CF6]" strokeWidth={3} />
                        <span className="text-[#8B5CF6]">{p.discount}%</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-bold">—</span>
                    )}
                  </td>
                  <td className="px-8 py-6 rounded-r-[1.5rem]">
                    <div
                      className={`inline-flex items-center gap-4 px-6 py-3 rounded-[1.2rem] transition-all duration-300 ${
                        isDarkMode
                          ? hl === 'lowest'
                            ? 'bg-[#0B1121] shadow-[inset_4px_4px_8px_#05080f,inset_-4px_-4px_8px_#1a264a]'
                            : 'bg-black/20'
                          : hl === 'lowest'
                            ? 'bg-[#ecf0f3] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]'
                            : 'bg-white shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff]'
                      } border border-white/10`}
                    >
                      {hl === 'lowest' && (
                        <ArrowDown size={16} strokeWidth={3} className="text-[#2ECC71]" />
                      )}
                      {hl === 'highest' && (
                        <ArrowUp size={16} strokeWidth={3} className="text-[#E11D48]" />
                      )}
                      <span
                        className={`text-[1.2rem] font-black tracking-tight ${
                          hl === 'lowest'
                            ? 'text-[#2ECC71]'
                            : hl === 'highest'
                              ? 'text-[#E11D48]'
                              : isDarkMode
                                ? 'text-white'
                                : 'text-slate-900'
                        }`}
                      >
                        ₹{final.toFixed(2)}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!prices.length && (
          <div className="py-32 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-[#0B1121] flex items-center justify-center text-slate-300">
              <DollarSign size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">
              No market data synchronized
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketComparisonTable;
