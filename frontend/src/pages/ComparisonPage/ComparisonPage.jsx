import React, { useState, useMemo } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import { AlertCircle } from 'lucide-react';
import ComparisonHero from './components/ComparisonHero';
import MedicineCard from './components/MedicineCard';
import ComparisonFilters from './components/ComparisonFilters';
import ComparisonMetaBar from './components/ComparisonMetaBar';

// ── Static medicine data ────────────────────────────────────────────────────
const MEDICINES = [
  {
    id: 1, name: 'Metformin 500mg', category: 'Diabetes',
    generic: 'Metformin HCl',
    prices: [
      { pharmacy: 'Apollo Pharmacy',   price: 38,  original: 52, rating: 4.8, distance: '0.8 km', inStock: true  },
      { pharmacy: 'MediPlus',          price: 42,  original: 52, rating: 4.5, distance: '1.2 km', inStock: true  },
      { pharmacy: 'HealthMart',        price: 50,  original: 52, rating: 4.2, distance: '2.1 km', inStock: false },
      { pharmacy: 'CareFirst Pharma',  price: 45,  original: 52, rating: 4.6, distance: '3.4 km', inStock: true  },
    ],
  },
  {
    id: 2, name: 'Atorvastatin 10mg', category: 'Cardiac',
    generic: 'Atorvastatin Calcium',
    prices: [
      { pharmacy: 'Apollo Pharmacy',   price: 120, original: 145, rating: 4.8, distance: '0.8 km', inStock: true  },
      { pharmacy: 'MediPlus',          price: 135, original: 145, rating: 4.5, distance: '1.2 km', inStock: true  },
      { pharmacy: 'HealthMart',        price: 110, original: 145, rating: 4.2, distance: '2.1 km', inStock: true  },
      { pharmacy: 'CareFirst Pharma',  price: 142, original: 145, rating: 4.6, distance: '3.4 km', inStock: false },
    ],
  },
  {
    id: 3, name: 'Paracetamol 650mg', category: 'Analgesic',
    generic: 'Acetaminophen',
    prices: [
      { pharmacy: 'Apollo Pharmacy',   price: 18,  original: 25, rating: 4.8, distance: '0.8 km', inStock: true  },
      { pharmacy: 'MediPlus',          price: 20,  original: 25, rating: 4.5, distance: '1.2 km', inStock: true  },
      { pharmacy: 'HealthMart',        price: 22,  original: 25, rating: 4.2, distance: '2.1 km', inStock: true  },
      { pharmacy: 'CareFirst Pharma',  price: 15,  original: 25, rating: 4.6, distance: '3.4 km', inStock: true  },
    ],
  },
  {
    id: 4, name: 'Omeprazole 20mg', category: 'Gastro',
    generic: 'Omeprazole',
    prices: [
      { pharmacy: 'Apollo Pharmacy',   price: 95,  original: 120, rating: 4.8, distance: '0.8 km', inStock: true  },
      { pharmacy: 'MediPlus',          price: 88,  original: 120, rating: 4.5, distance: '1.2 km', inStock: false },
      { pharmacy: 'HealthMart',        price: 102, original: 120, rating: 4.2, distance: '2.1 km', inStock: true  },
      { pharmacy: 'CareFirst Pharma',  price: 90,  original: 120, rating: 4.6, distance: '3.4 km', inStock: true  },
    ],
  },
  {
    id: 5, name: 'Amlodipine 5mg', category: 'Cardiac',
    generic: 'Amlodipine Besylate',
    prices: [
      { pharmacy: 'Apollo Pharmacy',   price: 55,  original: 70, rating: 4.8, distance: '0.8 km', inStock: true  },
      { pharmacy: 'MediPlus',          price: 62,  original: 70, rating: 4.5, distance: '1.2 km', inStock: true  },
      { pharmacy: 'HealthMart',        price: 48,  original: 70, rating: 4.2, distance: '2.1 km', inStock: true  },
      { pharmacy: 'CareFirst Pharma',  price: 58,  original: 70, rating: 4.6, distance: '3.4 km', inStock: false },
    ],
  },
];

const CATEGORIES = ['All', 'Diabetes', 'Cardiac', 'Analgesic', 'Gastro'];

const ComparisonPage = () => {
  const [search,     setSearch]     = useState('');
  const [category,   setCategory]   = useState('All');
  const [sortBy,     setSortBy]     = useState('name'); 
  const [wishlist,   setWishlist]   = useState(new Set());

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = [...MEDICINES];
    if (category !== 'All') list = list.filter(m => m.category === category);
    if (search)             list = list.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.generic.toLowerCase().includes(search.toLowerCase())
    );
    list.sort((a, b) => {
      if (sortBy === 'price')  return Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price));
      if (sortBy === 'saving') {
        const avgSave = m => m.prices.reduce((s, p) => s + (p.original - p.price), 0) / m.prices.length;
        return avgSave(b) - avgSave(a);
      }
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [search, category, sortBy]);

  const totalSavings = MEDICINES.reduce((s, m) =>
    s + m.prices.reduce((ps, p) => ps + (p.original - p.price), 0), 0
  );

  return (
    <div className="flex h-screen bg-[#ecf0f3] dark:bg-[#121826] transition-colors duration-300 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide pb-24 md:pb-6">
          <ComparisonHero 
            medicinesCount={MEDICINES.length}
            totalSavings={totalSavings}
          />

          <ComparisonFilters 
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={CATEGORIES}
          />

          <ComparisonMetaBar 
            count={filtered.length}
            category={category}
            search={search}
            wishlistSize={wishlist.size}
          />

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10">
              {filtered.map(med => (
                <MedicineCard
                  key={med.id}
                  medicine={med}
                  isWishlisted={wishlist.has(med.id)}
                  onWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center opacity-50">
              <AlertCircle size={56} className="text-slate-300 mb-4" />
              <p className="text-xl font-black text-slate-400 uppercase tracking-[0.15em]">No Medicines Found</p>
              <p className="text-sm text-slate-400 mt-2">Try adjusting your search or filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ComparisonPage;
