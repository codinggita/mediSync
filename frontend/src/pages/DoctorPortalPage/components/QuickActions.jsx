import React from 'react';
import { FilePlus, TestTube, Share2 } from 'lucide-react';

const ACTIONS = [
  {
    icon: FilePlus,
    label: 'Add Prescription',
    color: 'bg-green-50 text-[#2A7FFF] hover:bg-green-100 border-green-100',
  },
  {
    icon: TestTube,
    label: 'Order Test',
    color: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100',
  },
  {
    icon: Share2,
    label: 'Share Record',
    color: 'bg-violet-50 text-violet-600 hover:bg-violet-100 border-violet-100',
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 doctor-card">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-3">Quick Actions</h3>

      <div className="flex flex-col gap-2">
        {ACTIONS.map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-[10px] border ${color} text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
