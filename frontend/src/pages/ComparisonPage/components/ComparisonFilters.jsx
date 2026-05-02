import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';

const ComparisonFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories,
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6 mb-10">
      <div className="relative flex-1 lg:max-w-md w-full">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search medicine or generic name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-4 neu-input text-[0.875rem] text-slate-700 dark:text-white"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-3 rounded-2xl text-[0.7rem] font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              category === cat
                ? 'bg-[#2A7FFF] text-white shadow-[0_8px_16px_rgba(42,127,255,0.3)]'
                : 'bg-[#ecf0f3] dark:bg-[#151E32] text-slate-500 dark:text-slate-400 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d] hover:shadow-[2px_2px_4px_#cbced1] active:shadow-[inset_2px_2px_4px_#cbced1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 lg:ml-auto p-1.5 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] w-full sm:w-auto self-start sm:self-auto">
        <ArrowUpDown size={14} className="text-[#2A7FFF] ml-3" />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex-1 sm:flex-none pl-2 pr-8 py-2 bg-transparent border-none rounded-xl text-[0.7rem] font-black text-slate-600 dark:text-slate-300 uppercase tracking-wider outline-none cursor-pointer"
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
