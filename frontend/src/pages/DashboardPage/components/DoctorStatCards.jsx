import React from 'react';

const DoctorStatCards = ({ statCards, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white dark:bg-[#151E32] p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800/60 relative overflow-hidden group hover:-translate-y-1 transition-transform"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} mb-4`}>
            <stat.icon size={22} color={stat.color} />
          </div>
          <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
          <h2 className="text-[2.2rem] font-black text-slate-900 dark:text-white mt-1 leading-none">
            {loading ? '-' : stat.value}
          </h2>
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100 dark:from-slate-800 to-transparent opacity-50 rounded-bl-[100px] pointer-events-none" />
        </div>
      ))}
    </div>
  );
};

export default DoctorStatCards;
