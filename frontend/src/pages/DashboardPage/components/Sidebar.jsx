import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Pill, Share2, Stethoscope, 
  CalendarCheck, Activity 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import DesktopSidebar from './DesktopSidebar';
import MobileBottomNav from './MobileBottomNav';

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

  const filteredNavItems = navItems.filter(item => {
    if (!item.role) return true;
    if (user && item.role.includes(user.role)) return true;
    return false;
  });

  return (
    <>
      <DesktopSidebar 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        user={user}
        filteredNavItems={filteredNavItems}
        location={location}
        handleLogout={handleLogout}
      />
      <MobileBottomNav 
        filteredNavItems={filteredNavItems}
        location={location}
      />
    </>
  );
};

export default Sidebar;
