import React from 'react';
import { 
  ShieldCheck, ChevronLeft, ChevronRight, LogOut, Zap
} from 'lucide-react';
import adminCoreImg from '../../../assets/images/admin_core.png';

const AdminSidebar = ({ 
  collapsed, setCollapsed, user, isDarkMode, 
  sidebar, activeTab, setActiveTab, alertCount, TABS, onLogout 
}) => {
  return (
    <aside 
      className={`relative z-20 flex flex-col h-full transition-all duration-500 shrink-0 ${collapsed ? 'w-[76px]' : 'w-[260px]'} bg-[#ecf0f3] dark:bg-[#121826] shadow-[8px_0_16px_#cbced1] dark:shadow-[8px_0_16px_#0a0f1d] border-none`}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#2A7FFF] opacity-50" />

      {/* Brand */}
      <div className={`flex items-center h-[70px] px-4 gap-3 border-b border-[#cbced1] dark:border-slate-800/60 relative`}>
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] p-1.5">
            <ShieldCheck size={20} className="text-[#2A7FFF]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#2ECC71] rounded-full border-2 border-[#ecf0f3] dark:border-[#0B1121] animate-pulse" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-[1.1rem] font-black leading-none text-slate-800 dark:text-white">MediSync</p>
            <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] mt-0.5 text-[#2ECC71]">Admin Console</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all bg-[#ecf0f3] dark:bg-[#151E32] shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0a0f1d,-2px_-2px_4px_#202d47] text-slate-400 hover:text-[#2A7FFF] z-30">
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>

      {/* Admin profile */}
      {!collapsed && (
        <div className="mx-3 mt-5 p-4 rounded-[1.5rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border border-white/20 dark:border-white/5 relative overflow-hidden group/admin">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 opacity-10 group-hover/admin:opacity-25 transition-opacity pointer-events-none">
             <img src={adminCoreImg} alt="Core" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] flex items-center justify-center text-white text-[0.85rem] font-black shadow-[4px_4px_8px_rgba(0,0,0,0.1)]">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.85rem] font-black truncate leading-tight text-slate-800 dark:text-white">{user?.name || 'Admin'}</p>
              <p className="text-[0.6rem] truncate text-slate-400 dark:text-slate-500 font-bold">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-3 px-2 py-1 bg-white/40 dark:bg-black/20 rounded-lg w-fit border border-white/40 dark:border-white/5">
            <Zap size={10} className="text-[#F59E0B]" />
            <span className="text-[0.5rem] font-black text-[#F59E0B] uppercase tracking-[0.15em]">System Authority</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 flex flex-col gap-2 scrollbar-hide">
        {!collapsed && <p className="text-[0.55rem] font-black uppercase tracking-[0.25em] px-2 mb-2 text-slate-400 dark:text-slate-600">Global Intel</p>}
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-3 w-full rounded-2xl transition-all duration-300 relative ${collapsed ? 'justify-center p-3' : 'px-4 py-3'} ${
                active 
                  ? 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] text-[#2A7FFF]' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-white'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                active 
                  ? 'bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47]' 
                  : 'bg-transparent'
              }`}>
                <Icon size={18} style={{ color: active ? tab.color : 'inherit' }} />
              </div>
              {!collapsed && (
                <span className={`text-[0.85rem] font-black flex-1 text-left ${active ? 'text-slate-900 dark:text-white' : ''}`}>
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#cbced1] dark:border-slate-800/60">
        <button onClick={onLogout}
          className={`flex items-center gap-3 w-full rounded-2xl p-3 transition-all group hover:bg-rose-500/10 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors shrink-0">
            <LogOut size={16} className="text-rose-500" />
          </div>
          {!collapsed && <span className="text-[0.85rem] font-black text-rose-500">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
