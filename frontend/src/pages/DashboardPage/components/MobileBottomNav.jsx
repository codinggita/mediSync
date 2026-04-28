import React from 'react';
import { Link } from 'react-router-dom';

const MobileBottomNav = ({ filteredNavItems, location }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#ecf0f3] dark:bg-[#151E32] shadow-[0_-8px_16px_rgba(203,206,209,0.5)] dark:shadow-[0_-8px_16px_rgba(10,15,29,0.5)] border-t border-white/40 dark:border-slate-800 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {filteredNavItems.slice(0, 5).map(({ label, icon: Icon, path, badge }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all ${
                active 
                  ? 'text-[#2A7FFF] -translate-y-2' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#1F2937] dark:hover:text-white'
              }`}
            >
              {active && (
                <div className="absolute -top-1 w-8 h-8 bg-[#2A7FFF]/10 rounded-full blur-md"></div>
              )}
              <div className="relative z-10 flex items-center justify-center mb-1 transition-transform group-hover:scale-110">
                <Icon size={20} className={`${active ? 'text-[#2A7FFF]' : 'text-slate-400'} transition-colors`} />
                {badge && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 text-white text-[0.55rem] font-black rounded-full flex items-center justify-center shadow-sm">
                    {badge}
                  </span>
                )}
              </div>
              <span className={`text-[0.6rem] leading-none ${active ? 'font-black opacity-100' : 'font-bold opacity-70'}`}>
                {label.split(' ')[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
