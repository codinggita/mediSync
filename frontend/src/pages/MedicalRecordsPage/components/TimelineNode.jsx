import React from 'react';

const TimelineNode = ({ rec, isSelected, isLast, onSelect, Icon, color }) => {
  const dateObj = new Date(rec.createdAt);
  const shortDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="flex gap-4 group cursor-pointer relative" onClick={() => onSelect(rec._id)}>
      {/* Spine Connector */}
      {!isLast && (
        <div className={`absolute left-5 top-10 bottom-0 w-[2px] ${isSelected ? 'bg-gradient-to-b from-[#2A7FFF] to-transparent' : 'bg-slate-200 dark:bg-slate-800'} transition-colors duration-500`} />
      )}

      {/* Node Icon */}
      <div className="flex flex-col items-center shrink-0 z-10">
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
            isSelected
              ? 'shadow-[4px_4px_12px_rgba(42,127,255,0.4)] scale-110'
              : 'shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d] bg-[#ecf0f3] dark:bg-[#151E32] group-hover:scale-105'
          }`}
          style={{
            backgroundColor: isSelected ? '#2A7FFF' : '',
          }}
        >
          <Icon size={16} style={{ color: isSelected ? 'white' : color }} className={isSelected ? 'animate-pulse' : ''} />
        </div>
      </div>

      {/* Card Content */}
      <div
        className={`flex-1 min-w-0 mb-6 p-4 rounded-[1.8rem] transition-all duration-500 border ${
          isSelected
            ? 'bg-white dark:bg-[#2A7FFF]/5 border-[#2A7FFF]/30 shadow-[10px_10px_20px_rgba(0,0,0,0.05)] translate-x-2'
            : 'bg-transparent border-transparent hover:translate-x-1'
        }`}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.65rem] font-black text-[#2A7FFF] uppercase tracking-[0.15em]">{shortDate}</span>
          <div className={`w-2 h-2 rounded-full ${rec.hasAlert ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
        </div>
        <p className={`text-[0.9rem] font-black truncate ${isSelected ? 'text-[#2A7FFF]' : 'text-slate-800 dark:text-white'}`}>
          {rec.title}
        </p>
        <p className="text-[0.65rem] font-bold text-gray-400 dark:text-slate-500 truncate uppercase tracking-tighter mt-1">{rec.type} · Secured</p>
      </div>
    </div>
  );
};

export default TimelineNode;
