import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ onClose, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-[#151E32] border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2 z-[100]">
      {['My Profile', 'System Settings', 'Security HUD'].map((item) => (
        <button
          key={item}
          onClick={() => {
            onClose();
            if (item === 'My Profile') navigate('/settings?tab=profile');
            if (item === 'System Settings') navigate('/settings?tab=records');
            if (item === 'Security HUD') navigate('/settings?tab=security');
          }}
          className="w-full text-left px-4 py-2.5 text-[0.83rem] font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#1E293B] hover:text-[#2A7FFF] transition-colors"
        >
          {item}
        </button>
      ))}
      <div className="border-t border-gray-100 dark:border-white/5 mt-1 pt-1">
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2.5 text-[0.83rem] font-medium text-[#D32F2F] dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
