import React from 'react';
import { Heart } from 'lucide-react';

const ComparisonMetaBar = ({ count, category, search, wishlistSize }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-widest">
        {count} result{count !== 1 ? 's' : ''}
        {category !== 'All' && ` · ${category}`}
        {search && ` · "${search}"`}
      </p>
      {wishlistSize > 0 && (
        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-500 text-[0.7rem] font-black rounded-full border border-red-100 dark:border-red-500/20">
          <Heart size={11} fill="currentColor" /> {wishlistSize} saved
        </span>
      )}
    </div>
  );
};

export default ComparisonMetaBar;
