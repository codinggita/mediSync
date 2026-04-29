import React from 'react';
import { Search, Filter } from 'lucide-react';

const RecordsSearch = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative group">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors"
        />
        <input
          type="text"
          placeholder="Search vault..."
          className="pl-12 pr-6 py-3.5 neu-input text-[0.85rem] text-slate-800 dark:text-white w-full sm:w-64"
        />
      </div>
      <button className="w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-500 shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] hover:text-[#2A7FFF] transition-all active:shadow-[inset_3px_3px_6px_#cbced1]">
        <Filter size={20} />
      </button>
    </div>
  );
};

export default RecordsSearch;
