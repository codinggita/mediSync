import React from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

const NotificationDropdown = ({ notifications, onClose }) => {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#151E32] border border-gray-100 dark:border-white/10 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[100] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-white/5">
        <span className="font-bold text-gray-900 dark:text-white text-[0.9rem]">
          Notifications
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-white/5">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-[#1E293B] transition-colors ${n.unread ? 'bg-[#2A7FFF]/3' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.type === 'alert' ? 'bg-red-50 dark:bg-red-500/10' : 'bg-green-50 dark:bg-green-500/10'}`}
            >
              {n.type === 'alert' ? (
                <AlertTriangle size={14} className="text-[#D32F2F] dark:text-red-400" />
              ) : (
                <CheckCircle size={14} className="text-[#2A7FFF] dark:text-green-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.8rem] font-semibold text-gray-800 dark:text-white leading-tight">
                {n.text}
              </p>
              <p className="text-[0.7rem] text-gray-400 dark:text-slate-500 mt-0.5">
                {n.time}
              </p>
            </div>
            {n.unread && (
              <div className="w-2 h-2 bg-[#2A7FFF] rounded-full shrink-0 mt-1"></div>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-gray-50 dark:border-white/5 text-center">
        <button className="text-[0.78rem] text-[#2A7FFF] font-bold hover:underline">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;
