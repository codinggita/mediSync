import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Pill, Share2, Stethoscope, 
  CalendarCheck, ShieldAlert, Settings, LogOut, ChevronLeft, ChevronRight, Activity 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import logoImg from '../../../assets/MediSync_Logo.png';

const navItems = [
  { label: 'Dashboard',       icon: LayoutDashboard, path: '/dashboard',     badge: null },
  { label: 'Medical Records', icon: FileText,        path: '/records',       badge: '8' },
  { label: 'Pharmacy',        icon: Pill,            path: '/pharmacy',      badge: null, role: ['Patient', 'Admin'] },
  { label: 'Sharing',         icon: Share2,          path: '/sharing',       badge: null },
  { label: 'Doctor Portal',   icon: Stethoscope,     path: '/doctor-portal', badge: null, role: ['Doctor', 'Admin'] },
  { label: 'Appointments',    icon: CalendarCheck,   path: '/appointments',  badge: '2' },
  { label: 'Admin',           icon: Activity,        path: '/admin',         badge: null, role: ['Admin'] },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter items based on user role
  const filteredNavItems = navItems.filter(item => {
    if (!item.role) return true; // Show to everyone
    if (user && item.role.includes(user.role)) return true; // Show to specific role
    return false;
  });

  return (
    <>
      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex relative flex-col h-screen bg-[#ecf0f3] dark:bg-[#121826] border-none shadow-[8px_0_16px_#cbced1,-8px_0_16px_#ffffff] dark:shadow-[8px_0_16px_#0a0f1d,-8px_0_16px_#1a2133] transition-all duration-300 z-20 shrink-0 ${collapsed ? 'w-[80px]' : 'w-[260px]'}`}
      >
        {/* Logo Header */}
        <div className={`flex items-center h-[70px] border-b border-[#cbced1] dark:border-slate-800/60 ${collapsed ? 'justify-center px-0' : 'px-5 gap-3'}`}>
          <div className="w-10 h-10 rounded-xl bg-[#ecf0f3] dark:bg-[#151E32] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] flex items-center justify-center shrink-0 p-1">
            <img src={logoImg} alt="MediSync" className="w-full h-full object-contain scale-110" />
          </div>
          {!collapsed && (
            <div className="flex flex-col flex-1 min-w-0">
              <h1 className="text-[1.1rem] font-extrabold text-[#1F2937] dark:text-white leading-tight tracking-tight">MediSync</h1>
              <p className="text-[0.6rem] font-bold text-[#2A7FFF] uppercase tracking-[0.15em] mt-0.5">Clinical Atelier</p>
            </div>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={`absolute -right-3 top-[22px] w-6 h-6 bg-[#ecf0f3] dark:bg-[#151E32] border-none rounded-full flex items-center justify-center text-gray-400 hover:text-[#2A7FFF] dark:hover:text-[#2A7FFF] shadow-[2px_2px_4px_#cbced1,-2px_-2px_4px_#ffffff] dark:shadow-[2px_2px_4px_#0a0f1d,-2px_-2px_4px_#202d47] active:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] transition-all z-30`}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* User Profile Area */}
        <div className={`mt-5 mb-2 mx-3 ${collapsed ? 'hidden' : 'block'}`}>
          <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[1.2rem] p-3.5 flex items-center gap-3 transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
            {user?.profilePic ? (
              <img 
                src={user.profilePic} 
                alt={user.name} 
                className="w-10 h-10 rounded-full object-cover shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] shrink-0 border-2 border-white dark:border-slate-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#1565C0] flex items-center justify-center text-white text-xs font-black shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] shrink-0 uppercase border-2 border-[#ecf0f3] dark:border-[#151E32]">
                {user?.name?.substring(0, 2) || 'PS'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[0.85rem] font-black text-[#1F2937] dark:text-white truncate leading-tight">{user?.name || 'Guest User'}</p>
              <p className="text-[0.65rem] font-bold text-gray-400 dark:text-slate-500 mt-0.5 tracking-wide uppercase">{user?.role || 'Patient'}</p>
            </div>
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-2 h-2 bg-[#2ECC71] rounded-full shadow-[0_0_10px_rgba(46,204,113,0.5)] animate-pulse"></div>
              <span className="text-[0.5rem] font-black text-[#2ECC71] uppercase tracking-tighter">Live</span>
            </div>
          </div>
        </div>
        
        {/* Nav Label */}
        {!collapsed && (
          <p className="px-5 pt-3 pb-2 text-[0.6rem] font-bold text-gray-400 uppercase tracking-wider">Main Navigation</p>
        )}

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 scrollbar-hide">
          <div className="flex flex-col gap-1">
            {filteredNavItems.map(({ label, icon: Icon, path, badge }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  title={collapsed ? label : ''}
                  className={`relative flex items-center rounded-2xl transition-all duration-300 group ${
                    collapsed ? 'justify-center p-3' : 'px-4 py-3'
                  } ${
                    active 
                      ? 'bg-[#2A7FFF] text-white shadow-lg shadow-[#2A7FFF]/25 ring-1 ring-[#2A7FFF]/10' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#151E32] hover:text-[#1F2937] dark:hover:text-white'
                  }`}
                >
                  {/* Subtle Glow for Active Item */}
                  {active && !collapsed && (
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-[#2A7FFF] rounded-full blur-[1px]"></div>
                  )}
                  
                  <div className={`relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${collapsed ? '' : 'mr-4'}`}>
                    <Icon size={19} className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-[#2A7FFF] dark:group-hover:text-white'} transition-colors`} />
                    {badge && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 text-white text-[0.55rem] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-[#0B1121] shadow-sm">
                        {badge}
                      </span>
                    )}
                  </div>

                  {!collapsed && (
                    <span className={`text-[0.88rem] ${active ? 'font-black tracking-tight' : 'font-bold'} transition-all`}>
                      {label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="px-3 py-2">
          <div className="h-[1px] bg-gray-100 dark:bg-slate-800 w-full mb-2"></div>
          <div className="flex flex-col gap-1">
            {user?.role === 'Patient' && (
              <Link
                to="/emergency"
                title={collapsed ? 'Emergency Mode' : ''}
                className={`flex items-center rounded-xl transition-all group ${
                  collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
                } bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20`}
              >
                <ShieldAlert size={18} className="text-red-500 drop-shadow-sm shrink-0" />
                {!collapsed && <span className="ml-3 text-[0.85rem] font-bold">Emergency Mode</span>}
              </Link>
            )}
            
            <Link
              to="/settings"
              title={collapsed ? 'Settings' : ''}
              className={`flex items-center rounded-xl transition-all group ${
                collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
              } text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#151E32] hover:text-[#1F2937] dark:hover:text-white`}
            >
              <Settings size={18} className="text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-white shrink-0 transition-colors" />
              {!collapsed && <span className="ml-3 text-[0.85rem] font-semibold">Settings</span>}
            </Link>

            <button
              onClick={handleLogout}
              title={collapsed ? 'Logout' : ''}
              className={`flex items-center rounded-xl transition-all group w-full ${
                collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
              } text-gray-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400`}
            >
              <LogOut size={18} className="text-gray-400 dark:text-slate-500 group-hover:text-rose-500 dark:group-hover:text-rose-400 shrink-0 transition-colors" />
              {!collapsed && <span className="ml-3 text-[0.85rem] font-semibold">Logout</span>}
            </button>
          </div>
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="px-5 py-3 border-t border-[#cbced1] dark:border-slate-800 bg-[#ecf0f3] dark:bg-[#151E32]">
            <p className="text-[0.6rem] font-bold text-gray-400 dark:text-slate-500 tracking-wider">MEDISYNC v2.1.0 · © 2026</p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar */}
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
    </>
  );
};

export default Sidebar;
