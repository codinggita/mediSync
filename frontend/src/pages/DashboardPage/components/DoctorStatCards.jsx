import React from 'react';

const DoctorStatCards = ({ statCards, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="relative bg-[#ecf0f3] dark:bg-[#151E32] p-8 rounded-[2.5rem] shadow-[10px_10px_20px_#cbced1,-10px_-10px_20px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 overflow-hidden group hover:-translate-y-2 transition-all duration-500"
        >
          {}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} mb-6 shadow-sm border border-white/20 group-hover:scale-110 transition-transform duration-500 relative z-10`}
          >
            <stat.icon size={26} color={stat.color} />
          </div>

          <div className="relative z-10">
            <p className="text-[0.7rem] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h2 className="text-[2.5rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
              {loading ? '-' : stat.value}
            </h2>
          </div>

          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tl from-slate-200/50 dark:from-slate-800/30 to-transparent rounded-full pointer-events-none opacity-50 blur-xl group-hover:blur-2xl transition-all" />
        </div>
      ))}
    </div>
  );
};

export default DoctorStatCards;
