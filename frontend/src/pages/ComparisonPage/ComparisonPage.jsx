import React, { useState, useMemo } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import {
  Search, TrendingUp, BarChart2,
  MapPin, ChevronDown, ArrowUpDown,
  ShoppingCart, Heart, AlertCircle, CheckCircle2,
  Zap, Filter, X
} from 'lucide-react';
import ComparisonHero from './components/ComparisonHero';
import MedicineCard from './components/MedicineCard';

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

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search medicine or generic name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 neu-input text-[0.875rem] text-slate-700 dark:text-white"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-3 rounded-2xl text-[0.75rem] font-black uppercase tracking-wider transition-all ${
                    category === cat
                      ? 'bg-[#2A7FFF] text-white shadow-[0_8px_16px_rgba(42,127,255,0.3)]'
                      : 'bg-[#ecf0f3] dark:bg-[#151E32] text-slate-500 dark:text-slate-400 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d] hover:shadow-[2px_2px_4px_#cbced1] active:shadow-[inset_2px_2px_4px_#cbced1]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto p-1.5 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
              <ArrowUpDown size={14} className="text-[#2A7FFF] ml-3" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="pl-2 pr-8 py-2 bg-transparent border-none rounded-xl text-[0.75rem] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider outline-none cursor-pointer"
              >
                <option value="name">Name A–Z</option>
                <option value="price">Lowest Price</option>
                <option value="saving">Most Savings</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-widest">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              {category !== 'All' && ` · ${category}`}
              {search && ` · "${search}"`}
            </p>
            {wishlist.size > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-500 text-[0.7rem] font-black rounded-full border border-red-100 dark:border-red-500/20">
                <Heart size={11} fill="currentColor" /> {wishlist.size} saved
              </span>
            )}
          </div>

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
