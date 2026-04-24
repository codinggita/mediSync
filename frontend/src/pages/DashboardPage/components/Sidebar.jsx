import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Pill, Share2, Stethoscope, 
  CalendarCheck, ShieldAlert, Settings, LogOut, ChevronLeft, ChevronRight, Activity 
} from 'lucide-react';
import logoImg from '../../../assets/MediSync_Logo.png';

const navItems = [
  { label: 'Dashboard',       icon: LayoutDashboard, path: '/dashboard',     badge: null },
  { label: 'Medical Records', icon: FileText,        path: '/records',       badge: '8' },
  { label: 'Pharmacy',        icon: Pill,            path: '/pharmacy',      badge: null },
  { label: 'Sharing',         icon: Share2,          path: '/sharing',       badge: null },
  { label: 'Doctor Portal',   icon: Stethoscope,     path: '/doctor-portal', badge: null },
  { label: 'Appointments',    icon: CalendarCheck,   path: '/appointments',  badge: '2' },
  { label: 'Admin',           icon: Activity,        path: '/admin',         badge: null },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div 
      className={`relative flex flex-col h-screen bg-white border-r border-gray-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 z-20 shrink-0 ${collapsed ? 'w-[80px]' : 'w-[260px]'}`}
    >
      {/* Logo Header */}
      <div className={`flex items-center h-[70px] border-b border-gray-100 ${collapsed ? 'justify-center px-0' : 'px-5 gap-3'}`}>
        <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 p-1">
          <img src={logoImg} alt="MediSync" className="w-full h-full object-contain scale-110" />
        </div>
        {!collapsed && (
          <div className="flex flex-col flex-1 min-w-0">
            <h1 className="text-[1.1rem] font-extrabold text-[#1F2937] leading-tight tracking-tight">MediSync</h1>
            <p className="text-[0.6rem] font-bold text-[#2A7FFF] uppercase tracking-[0.15em] mt-0.5">Clinical Atelier</p>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute -right-3 top-[22px] w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#2A7FFF] hover:border-[#2A7FFF] shadow-sm transition-all z-30`}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* User Profile Area */}
      <div className={`mt-5 mb-2 mx-3 ${collapsed ? 'hidden' : 'block'}`}>
        <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A7FFF] to-[#2ECC71] flex items-center justify-center text-white font-bold shadow-sm shrink-0">
            PS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[0.85rem] font-bold text-[#1F2937] truncate">Priyabrata Sahoo</p>
            <p className="text-[0.65rem] font-semibold text-gray-400">#MS-20491 · Patient</p>
          </div>
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full shadow-[0_0_8px_#2ECC71]"></div>
            <span className="text-[0.55rem] font-bold text-[#2ECC71]">Live</span>
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
          {navItems.map(({ label, icon: Icon, path, badge }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                title={collapsed ? label : ''}
                className={`relative flex items-center rounded-xl transition-all group ${
                  collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
                } ${
                  active 
                    ? 'bg-[#E6F0FF] text-[#2A7FFF]' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-[#1F2937]'
                }`}
              >
                {/* Active Indicator Left */}
                {active && !collapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-[#2A7FFF] rounded-r-md"></div>
                )}
                
                <div className={`relative flex items-center justify-center ${collapsed ? '' : 'mr-3'}`}>
                  <Icon size={18} className={`${active ? 'text-[#2A7FFF]' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`} />
                  {badge && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#F59E0B] text-white text-[0.55rem] font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {badge}
                    </span>
                  )}
                </div>

                {!collapsed && (
                  <span className={`text-[0.85rem] ${active ? 'font-bold' : 'font-semibold'} transition-colors flex-1`}>
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="h-[1px] bg-gray-100 w-full mb-2"></div>
        <div className="flex flex-col gap-1">
          <Link
            to="/emergency"
            title={collapsed ? 'Emergency Mode' : ''}
            className={`flex items-center rounded-xl transition-all group ${
              collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
            } bg-red-50 text-red-600 hover:bg-red-100`}
          >
            <ShieldAlert size={18} className="text-red-500 drop-shadow-sm shrink-0" />
            {!collapsed && <span className="ml-3 text-[0.85rem] font-bold">Emergency Mode</span>}
          </Link>
          
          <Link
            to="/settings"
            title={collapsed ? 'Settings' : ''}
            className={`flex items-center rounded-xl transition-all group ${
              collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
            } text-gray-500 hover:bg-gray-50 hover:text-[#1F2937]`}
          >
            <Settings size={18} className="text-gray-400 group-hover:text-gray-600 shrink-0" />
            {!collapsed && <span className="ml-3 text-[0.85rem] font-semibold">Settings</span>}
          </Link>

          <button
            onClick={() => navigate('/login')}
            title={collapsed ? 'Logout' : ''}
            className={`flex items-center rounded-xl transition-all group w-full ${
              collapsed ? 'justify-center p-3' : 'px-3 py-2.5'
            } text-gray-500 hover:bg-rose-50 hover:text-rose-600`}
          >
            <LogOut size={18} className="text-gray-400 group-hover:text-rose-500 shrink-0" />
            {!collapsed && <span className="ml-3 text-[0.85rem] font-semibold">Logout</span>}
          </button>
        </div>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50">
          <p className="text-[0.6rem] font-bold text-gray-400 tracking-wider">MEDISYNC v2.1.0 · © 2026</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
