import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';

const ComparisonFilters = ({ search, setSearch, category, setCategory, sortBy, setSortBy, categories }) => {
  return (
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
        {categories.map(cat => (
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
  );
};

export default ComparisonFilters;
