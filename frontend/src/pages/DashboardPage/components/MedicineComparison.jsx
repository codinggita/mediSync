import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import api from '../../../utils/api';
import OrderConfirmationModal from './OrderConfirmationModal';
import MedicineSearchInput from './MedicineSearchInput';
import SourcingEngineStatus from './SourcingEngineStatus';
import SourcingEnginePlaceholder from './SourcingEnginePlaceholder';
import PharmacyComparisonResults from './PharmacyComparisonResults';

const MedicineComparison = forwardRef((props, ref) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMed, setSelectedMed] = useState(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchMeds = async () => {
      try {
        const response = await fetch(
          `https://rxnav.nlm.nih.gov/REST/spellcheck.json?name=${searchQuery}`
        );
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
    if (!name || name.trim().length === 0) return;
    setIsSearching(true);
    setSuggestions([]);

    // Smooth scroll to top of search results if needed
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    try {
      const { data: meds } = await api.get(`/medicines?search=${name}`);

      const medsArray = Array.isArray(meds) ? meds : [];
      const medicine =
        medsArray.find((m) => m.name?.toLowerCase() === name.toLowerCase()) || medsArray[0];

      if (!medicine) {
        setSelectedMed({
          name,
          brand: 'Registry Reference',
          type: 'Sourcing Intelligence Required',
          pharmacies: [],
        });
        setSearchQuery(name);
        return;
      }

      const { data: priceEntries } = await api.get(`/medicines/${medicine._id}/prices`);
      setSelectedMed({
        name: medicine.name,
        brand: medicine.manufacturer || 'Verified Generic',
        type: medicine.category || 'Clinical Protocol',
        pharmacies: Array.isArray(priceEntries)
          ? priceEntries.map((p) => ({
              name: p.pharmacy?.name || 'Local Hub',
              price: Number(p.price || 0) - (Number(p.price || 0) * (p.discount || 0)) / 100,
              distance: (Math.random() * 5).toFixed(1) + ' km',
              rating: (4 + Math.random()).toFixed(1),
              stock: 'Available',
              delivery: Math.floor(Math.random() * 30 + 10) + ' mins',
              location: p.pharmacy?.address || 'Medical District',
            }))
          : [],
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
    searchForMedicine: (name) => handleSelectMed(name),
  }));

  const handleGetDirections = (pharm) => {
    const query = encodeURIComponent(`${pharm.name} ${pharm.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
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

      <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide flex-1 relative">
        {isSearching && (
          <div className="absolute inset-0 z-20 bg-white/60 dark:bg-[#151E32]/60 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-20 h-20 relative mb-6">
              <div className="absolute inset-0 border-4 border-[#2A7FFF]/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-[#2A7FFF] rounded-full animate-spin" />
            </div>
            <p className="text-[0.7rem] font-black text-[#2A7FFF] uppercase tracking-[0.3em] animate-pulse">
              Sourcing Clinical Data...
            </p>
          </div>
        )}

        {selectedMed ? (
          <PharmacyComparisonResults
            selectedMed={selectedMed}
            onSelectPharmacy={setSelectedPharmacy}
            onClear={() => setSelectedMed(null)}
          />
        ) : (
          <SourcingEnginePlaceholder />
        )}
      </div>

      <OrderConfirmationModal
        pharmacy={selectedPharmacy}
        orderSuccess={orderSuccess}
        onOrder={async () => {
          try {
            await api.post('/prescriptions/add', {
              name: selectedMed.name,
              brand: selectedMed.brand,
              type: selectedMed.type,
              pharmacy: selectedPharmacy.name,
              price: selectedPharmacy.price,
            });
            setOrderSuccess(true);
            // Trigger global stats refresh if provided via props
            if (props.onRefresh) props.onRefresh();
            setTimeout(() => {
              setOrderSuccess(false);
              setSelectedPharmacy(null);
            }, 3000);
          } catch (err) {
            console.error('Failed to save medicine:', err);
            alert('Sourcing Synchronization Failed. Please try again.');
          }
        }}
        onClose={() => setSelectedPharmacy(null)}
        onDirections={handleGetDirections}
      />
    </div>
  );
});

export default MedicineComparison;
