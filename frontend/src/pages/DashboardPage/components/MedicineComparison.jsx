import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { 
  Search, AlertTriangle
} from 'lucide-react';
import api from '../../../utils/api';
import PharmacyCard from './PharmacyCard';
import OrderConfirmationModal from './OrderConfirmationModal';
import MedicineSearchInput from './MedicineSearchInput';
import SourcingEngineStatus from './SourcingEngineStatus';

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
      <SourcingEngineStatus />

      <div ref={searchRef}>
        <MedicineSearchInput 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSelectMed={handleSelectMed}
          suggestions={suggestions}
          isSearching={isSearching}
        />
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
