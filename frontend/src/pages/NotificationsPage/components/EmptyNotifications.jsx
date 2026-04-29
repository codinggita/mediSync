import React from 'react';
import { Bell } from 'lucide-react';

const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
      <Bell size={64} className="text-slate-300 mb-4" />
      <p className="text-lg font-black text-slate-400 uppercase tracking-[0.2em]">All Caught Up!</p>
      <p className="text-sm font-bold text-slate-400">No new notifications at the moment.</p>
    </div>
  );
};

export default EmptyNotifications;
