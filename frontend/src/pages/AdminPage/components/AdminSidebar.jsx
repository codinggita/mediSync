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
      className={`relative z-20 flex flex-col h-full transition-all duration-500 shrink-0 shadow-xl ${collapsed ? 'w-[76px]' : 'w-[260px]'}`}
      style={{ background: sidebar.bg, borderRight: `1px solid ${sidebar.border}` }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #2A7FFF80, transparent)' }} />

      {/* Brand */}
      <div className="flex items-center h-[70px] px-4 gap-3 border-b relative" style={{ borderColor: sidebar.border }}>
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] flex items-center justify-center shadow-lg"
            style={{ boxShadow: '0 0 18px rgba(42,127,255,0.35)' }}>
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#2ECC71] rounded-full border-2 animate-pulse"
            style={{ borderColor: isDarkMode ? '#0D1526' : '#fff' }} />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-[1rem] font-black leading-none" style={{ color: sidebar.text }}>MediSync</p>
            <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] mt-0.5 text-[#2ECC71]">Admin Console</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all hover:shadow-md z-10"
          style={{ backgroundColor: isDarkMode ? '#151E32' : '#fff', border: `1px solid ${sidebar.border}`, color: '#94a3b8' }}>
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>

      {/* Admin profile */}
      {!collapsed && (
        <div className="mx-3 mt-4 p-3.5 rounded-2xl relative overflow-hidden group/admin"
          style={{ background: sidebar.profileBg, border: `1px solid ${sidebar.profileBorder}` }}>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 opacity-20 group-hover/admin:opacity-40 transition-opacity pointer-events-none grayscale group-hover/admin:grayscale-0 group-hover/admin:scale-110 transition-all duration-500">
             <img src={adminCoreImg} alt="Core" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#8B5CF6] flex items-center justify-center text-white text-[0.85rem] font-black shadow-md">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.85rem] font-black truncate leading-tight" style={{ color: sidebar.text }}>{user?.name || 'Admin'}</p>
              <p className="text-[0.6rem] truncate" style={{ color: sidebar.sub }}>{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-2.5">
            <Zap size={10} className="text-[#F59E0B]" />
            <span className="text-[0.55rem] font-black text-[#F59E0B] uppercase tracking-widest">Full System Authority</span>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1 scrollbar-hide">
        {!collapsed && <p className="text-[0.5rem] font-black uppercase tracking-[0.3em] px-2 mb-2" style={{ color: isDarkMode ? '#334155' : '#cbd5e1' }}>Navigation</p>}
        {TABS.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-3 w-full rounded-2xl transition-all duration-300 relative overflow-hidden ${collapsed ? 'justify-center p-3' : 'px-4 py-3'}`}
              style={active
                ? { background: isDarkMode ? `${tab.color}18` : `${tab.color}12`, border: `1px solid ${tab.color}35`, boxShadow: isDarkMode ? `0 0 18px ${tab.color}15` : `0 4px 14px ${tab.color}18` }
                : { border: '1px solid transparent', background: 'transparent' }}>
              {active && <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full" style={{ backgroundColor: tab.color }} />}
              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                style={active
                  ? { backgroundColor: `${tab.color}20`, boxShadow: `0 0 12px ${tab.color}25` }
                  : { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }}>
                <Icon size={16} style={{ color: active ? tab.color : sidebar.sub }} />
              </div>
              {!collapsed && (
                <>
                  <span className="text-[0.82rem] font-black flex-1 text-left transition-colors" style={{ color: active ? sidebar.text : sidebar.sub }}>
                    {tab.label}
                  </span>
                  {tab.id === 'alerts' && alertCount > 0 && (
                    <span className="text-[0.55rem] font-black px-2 py-0.5 rounded-full text-white bg-[#F97316]"
                      style={{ boxShadow: '0 0 8px #F9731660' }}>{alertCount}</span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t" style={{ borderColor: sidebar.border }}>
        <button onClick={onLogout}
          className={`flex items-center gap-3 w-full rounded-2xl p-3 transition-all group hover:bg-rose-500/10 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors shrink-0">
            <LogOut size={15} className="text-rose-500" />
          </div>
          {!collapsed && <span className="text-[0.82rem] font-black text-rose-500">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
