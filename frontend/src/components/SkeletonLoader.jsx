import React from 'react';

const SkeletonCard = () => (
  <div className="rounded-[2.5rem] bg-[#ecf0f3] dark:bg-[#1a2233] p-8 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_#0a0f1d] animate-pulse">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-2xl"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
        <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-24 bg-slate-300 dark:bg-slate-700 rounded-3xl"></div>
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
    </div>
  </div>
);

const SkeletonTable = ({ rows = 5 }) => (
  <div className="rounded-[2.5rem] bg-[#ecf0f3] dark:bg-[#1a2233] p-8 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff] dark:shadow-[15px_15px_30px_#0a0f1d] animate-pulse overflow-hidden">
    <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded-xl w-48 mb-8"></div>
    <div className="space-y-6">
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-4 py-4 border-b border-slate-200 dark:border-slate-800"
        >
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
          <div className="flex-1 h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
          <div className="w-24 h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
          <div className="w-16 h-8 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
        </div>
      ))}
    </div>
  </div>
);

export { SkeletonCard, SkeletonTable };
