import React, { useState } from 'react';
import { Search, Pill, TrendingDown, ShieldCheck, ShoppingCart, ArrowRight, Loader2, Camera, Info, Activity } from 'lucide-react';
import api from '../../../utils/api';
import medBoxImg from '../../../assets/images/medicine_box.png';

const MedicineSearchPanel = () => {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    try {
      // 1. Search for medicine
      const { data: medicines } = await api.get(`/medicines?search=${query}`);
      
      if (medicines.length > 0) {
        // 2. Fetch prices for the first match
        const { data: prices } = await api.get(`/medicines/${medicines[0]._id}/prices`);
        
        // Find cheapest price
        const minPrice = Math.min(...prices.map(p => p.price));
        
        const mappedResults = prices.map(p => ({
          id: p._id,
          pharmacy: p.pharmacy.name,
          price: p.price,
          stock: p.availability,
          isCheapest: p.price === minPrice,
          type: medicines[0].category
        }));
        
        setResults(mappedResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#1a2235] rounded-[3.5rem] p-10 shadow-[16px_16px_32px_#cbced1,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#0a0f1d] border border-white/40 relative overflow-hidden group">
      
      {/* Decorative Architecture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#2A7FFF]/10 transition-colors" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[1.3rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
              <Pill size={22} className="text-[#2A7FFF]" />
            </div>
            Clinical Engine: Medicine Search
          </h3>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#2A7FFF]/10 rounded-full border border-[#2A7FFF]/20">
             <div className="w-1.5 h-1.5 bg-[#2A7FFF] rounded-full animate-pulse" />
             <span className="text-[0.65rem] font-black text-[#2A7FFF] uppercase tracking-widest">Smart Compare Active</span>
          </div>
        </div>
        <p className="text-[0.9rem] text-slate-500 dark:text-slate-400 font-bold mb-8 flex items-center gap-2">
          <Activity size={14} className="text-[#2ECC71]" />
          Scan across local pharmacies for optimal clinical availability and logistics.
        </p>

        <div className="flex flex-col xl:flex-row items-center gap-6 mb-10">
          <form onSubmit={handleSearch} className="flex-1 relative group w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 transition-all group-focus-within:text-[#2A7FFF] group-focus-within:scale-110" size={22} />
            <input 
              type="text" 
              placeholder="Search molecular name or brand (e.g., Metformin)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-6 pl-16 pr-6 bg-[#ecf0f3] dark:bg-[#0B1121] border-none rounded-[2.2rem] text-[1.05rem] font-black text-slate-800 dark:text-white outline-none shadow-[inset_8px_8px_16px_#cbced1,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0f1d] focus:shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] placeholder-slate-400 transition-all"
            />
          </form>
          <div className="flex items-center gap-4 w-full xl:w-auto">
            <button 
              type="submit" 
              onClick={handleSearch}
              disabled={loading} 
              className="flex-1 xl:flex-none px-12 py-6 bg-[#2A7FFF] text-white rounded-[2.2rem] text-[1.1rem] font-black shadow-[0_20px_40px_rgba(42,127,255,0.4)] hover:shadow-[0_25px_50px_rgba(42,127,255,0.5)] hover:-translate-y-2 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3 group"
            >
              {loading ? <Loader2 className="animate-spin" size={22} /> : <><TrendingDown size={22} className="group-hover:animate-bounce" /> Analyze Prices</>}
            </button>
            <button 
              type="button"
              className="w-16 h-16 bg-[#ecf0f3] dark:bg-[#1a2235] text-slate-500 hover:text-[#2A7FFF] flex items-center justify-center rounded-[1.8rem] shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d] hover:shadow-2xl transition-all active:shadow-inner group"
            >
              <Camera size={26} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {hasSearched && !loading && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between mb-6 px-4">
              <h4 className="text-[1rem] font-black text-slate-800 dark:text-slate-200">
                Biological Matrix for <span className="text-[#2A7FFF] font-black">"{query}"</span>
              </h4>
              <div className="flex items-center gap-2 text-[0.75rem] font-black text-slate-400 uppercase tracking-widest bg-white dark:bg-[#0B1121] px-4 py-1.5 rounded-full shadow-inner">
                {results.length} Nodes Found
              </div>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {results.map((result) => (
                  <div 
                    key={result.id} 
                    className={`group p-8 rounded-[3rem] relative transition-all duration-500 hover:-translate-y-2 ${
                      result.isCheapest 
                        ? 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0f1d] ring-4 ring-emerald-500/20' 
                        : 'bg-[#ecf0f3] dark:bg-[#1a2235] shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff] dark:shadow-none border border-white/40'
                    }`}
                  >
                    {result.isCheapest && (
                      <div className="absolute -top-4 right-8 bg-[#2ECC71] text-white text-[0.7rem] font-black px-5 py-2 rounded-full shadow-lg flex items-center gap-2 border-4 border-white dark:border-[#151E32] z-20 animate-bounce">
                        <TrendingDown size={14} /> BEST CLINICAL PRICE
                      </div>
                    )}

                    <div className="flex flex-col items-center text-center mb-8">
                      <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-[#151E32] flex items-center justify-center shadow-2xl border-4 border-white dark:border-[#1a2235] mb-5 overflow-hidden">
                         <img src={medBoxImg} alt="Medicine" className="w-full h-full object-contain p-2 group-hover:scale-125 transition-transform duration-700" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-[1.2rem] font-black text-slate-900 dark:text-white leading-tight mb-1">{result.pharmacy}</h5>
                        <div className="flex items-center justify-center gap-2">
                           <span className="text-[0.7rem] text-slate-400 font-black uppercase tracking-widest">{result.type}</span>
                           <div className="w-1 h-1 rounded-full bg-slate-300" />
                           {result.stock ? (
                             <span className="text-[0.7rem] font-black text-[#2ECC71] uppercase">In Stock</span>
                           ) : (
                             <span className="text-[0.7rem] font-black text-rose-500 uppercase">Unavailable</span>
                           )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto bg-white/20 dark:bg-black/10 p-5 rounded-[2rem] border border-white/30">
                      <div>
                        <span className="text-[0.75rem] text-slate-400 font-black uppercase tracking-widest block mb-1">Pricing</span>
                        <p className={`text-[1.6rem] font-black ${result.isCheapest ? 'text-[#2ECC71]' : 'text-slate-800 dark:text-white'} leading-none`}>
                          ₹{result.price}
                        </p>
                      </div>
                      <button 
                        disabled={!result.stock}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-90 ${
                          result.stock 
                            ? result.isCheapest ? 'bg-[#2ECC71] text-white hover:bg-[#27AE60]' : 'bg-[#2A7FFF] text-white hover:bg-[#1C71E1]'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={22} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-[#ecf0f3] dark:bg-[#0B1121]/30 rounded-[4rem] border-4 border-dashed border-slate-200 dark:border-slate-800">
                <Info size={48} className="text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 font-black uppercase tracking-[0.3em]">No Biological Matches Detected</p>
              </div>
            )}
            
            <div className="mt-10 flex justify-center">
              <button className="px-8 py-4 bg-white dark:bg-[#1a2235] rounded-2xl shadow-xl text-[0.85rem] font-black text-[#2A7FFF] hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-3">
                Access Deep Analytics Hub <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineSearchPanel;
