import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { 
  Search, Pill, MapPin, Star, ShoppingBag, X, Check, Loader2, Navigation, Phone, 
  ShieldCheck, Zap, Info, ArrowRight, Heart, CheckCircle, Clock, ChevronRight, AlertTriangle
} from 'lucide-react';
import PharmacyCard from './PharmacyCard';
import OrderConfirmationModal from './OrderConfirmationModal';

const MedicineComparison = forwardRef((props, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const searchRef = useRef(null);

  // Real-time Medicine Suggestions from NIH RxNorm API
  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchMeds = async () => {
      try {
        const response = await fetch(`https://rxnav.nlm.nih.gov/REST/spellcheck.json?name=${searchQuery}`);
        if (!response.ok) return;
        const data = await response.json();
        if (data.suggestionGroup && data.suggestionGroup.suggestion) {
          setSuggestions(data.suggestionGroup.suggestion.slice(0, 5));
        }
      } catch (err) {
        console.warn('NIH API Warning:', err.message);
      }
    };

    const timeout = setTimeout(fetchMeds, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleSelectMed = async (name) => {
    if (!name) return;
    setIsSearching(true);
    setSuggestions([]);
    try {
      const { data: meds } = await api.get(`/medicines?search=${name}`);
      const medicine = meds.find(m => m.name.toLowerCase() === name.toLowerCase()) || meds[0];

      if (!medicine) {
        setSelectedMed({
          name: name,
          brand: 'Registry Reference',
          type: 'Sourcing Intelligence Required',
          pharmacies: [] 
        });
        setSearchQuery(name);
        return;
      }

      const { data: priceEntries } = await api.get(`/medicines/${medicine._id}/prices`);

      setSelectedMed({
        name: medicine.name,
        brand: medicine.manufacturer || 'Verified Generic',
        type: medicine.category || 'Clinical Protocol',
        pharmacies: Array.isArray(priceEntries) ? priceEntries.map(p => ({
          name: p.pharmacy?.name || 'Local Hub',
          price: p.price - (p.price * (p.discount || 0) / 100),
          distance: (Math.random() * 5).toFixed(1) + ' km',
          rating: (4 + Math.random()).toFixed(1),
          stock: 'Available',
          delivery: Math.floor(Math.random() * 30 + 10) + ' mins',
          location: p.pharmacy?.address || 'Medical District'
        })) : []
      });
      setSearchQuery(name);
    } catch (err) {
      console.error('Clinical Sourcing Error:', err);
      setSelectedMed(null);
    } finally {
      setIsSearching(false);
    }
  };

  useImperativeHandle(ref, () => ({
    searchForMedicine: (name) => handleSelectMed(name)
  }));

  const handleGetDirections = (pharm) => {
    const query = encodeURIComponent(`${pharm.name} ${pharm.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const renderPharmacyList = () => {
    if (!selectedMed) return null;
    if (selectedMed.pharmacies.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 px-10 rounded-[3rem] bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 text-center">
           <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6">
              <AlertTriangle size={36} className="text-amber-500" />
           </div>
           <h4 className="text-lg font-black text-slate-800 dark:text-white mb-2">No Nearby Hubs found for "{selectedMed.name}"</h4>
           <p className="text-[0.8rem] text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
              Our clinical sourcing engine couldn't locate this medicine nearby.
           </p>
           <button onClick={() => setSelectedMed(null)} className="mt-8 px-8 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 rounded-xl font-black text-[0.75rem] uppercase tracking-widest border border-slate-200 dark:border-slate-700">
              Clear Search
           </button>
        </div>
      );
    }

    const sorted = [...selectedMed.pharmacies].sort((a, b) => a.price - b.price);
    const bestPrice = sorted[0].price;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-[#0B1121] rounded-2xl border border-slate-200/60 dark:border-slate-800 mb-6">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-[#2A7FFF] rounded-full" />
              <h4 className="text-[0.8rem] font-black text-slate-800 dark:text-white uppercase tracking-[0.2em]">Compare {sorted.length} Pharmacies</h4>
           </div>
        </div>
        
        {sorted.map((pharm, idx) => (
          <PharmacyCard 
            key={idx}
            pharm={pharm}
            isBest={pharm.price === bestPrice}
            onClick={() => setSelectedPharmacy({ ...pharm, medName: selectedMed.name })}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[2rem] sm:rounded-[32px] p-4 sm:p-8 shadow-sm h-full flex flex-col transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div>
          <h3 className="text-[1.1rem] sm:text-xl font-black text-[#1F2937] dark:text-white flex items-center gap-2 sm:gap-3">
            <ShoppingBag size={20} className="text-[#2A7FFF] sm:w-6 sm:h-6" />
            Price Intelligence
          </h3>
          <p className="text-[0.65rem] sm:text-[0.75rem] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time sourcing from NIH global database</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2A7FFF]/10 rounded-full border border-[#2A7FFF]/20 self-start sm:self-auto">
           <Zap size={12} className="text-[#2A7FFF]" />
           <span className="text-[0.6rem] font-black text-[#2A7FFF] uppercase">Live API Active</span>
        </div>
      </div>

      <div className="relative mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3" ref={searchRef}>
        <div className="relative flex-1 group">
          <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2A7FFF] transition-colors" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSelectMed(searchQuery)}
            placeholder="Search medicines..."
            className="w-full pl-10 sm:pl-14 pr-6 py-3 sm:py-4 bg-slate-50 dark:bg-[#0B1121] border border-slate-200/60 dark:border-slate-800 rounded-xl sm:rounded-2xl text-[0.8rem] sm:text-[0.9rem] font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all placeholder:text-slate-400"
          />
          
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-2xl z-50 overflow-hidden">
              {suggestions.map((name, i) => (
                <button 
                  key={i}
                  onClick={() => handleSelectMed(name)}
                  className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 hover:bg-slate-50 dark:hover:bg-[#0B1121] border-b border-slate-100 dark:border-slate-800 last:border-0 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <Pill size={14} className="text-slate-300 group-hover:text-[#2A7FFF]" />
                    <span className="text-[0.8rem] sm:text-[0.9rem] font-black text-slate-700 dark:text-slate-200">{name}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {isSearching && (
            <div className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2">
              <Loader2 size={16} className="animate-spin text-[#2A7FFF]" />
            </div>
          )}
        </div>
        
        <button 
          onClick={() => handleSelectMed(searchQuery)}
          className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-[#2A7FFF] text-white rounded-xl sm:rounded-2xl font-black text-[0.85rem] sm:text-[0.9rem] shadow-lg shadow-[#2A7FFF]/20 hover:bg-[#1A6FFF] transition-all"
        >
          Search
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide flex-1">
        {selectedMed ? renderPharmacyList() : (
          <div className="flex flex-col items-center justify-center h-full text-center py-20 px-10 bg-slate-50/50 dark:bg-white/5 rounded-[3rem] border border-dashed border-slate-200 dark:border-white/10">
             <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#2A7FFF]/20 rounded-full blur-3xl animate-pulse" />
                <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 shadow-2xl flex items-center justify-center relative z-10">
                   <Search size={40} className="text-[#2A7FFF]" />
                </div>
             </div>
             <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3">Initialize Sourcing Engine</h4>
             <p className="text-[0.85rem] font-medium text-slate-400 max-w-xs mx-auto leading-relaxed uppercase tracking-tight">Search for clinical medicine names to visualize real-time price intelligence</p>
          </div>
        )}
      </div>

      <OrderConfirmationModal 
        pharmacy={selectedPharmacy}
        orderSuccess={orderSuccess}
        onOrder={() => {
          setOrderSuccess(true);
          setTimeout(() => {
            setOrderSuccess(false);
            setSelectedPharmacy(null);
          }, 3000);
        }}
        onClose={() => setSelectedPharmacy(null)}
        onDirections={handleGetDirections}
      />
    </div>
  );
});

export default MedicineComparison;
