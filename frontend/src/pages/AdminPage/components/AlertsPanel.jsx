import React from 'react';
import { PackageX, TrendingUp, AlertTriangle, Settings } from 'lucide-react';

const ALERTS = [
  {
    icon: PackageX,
    message: 'Amoxicillin 500mg — critically low stock across 8 pharmacies',
    severity: 'text-[#D32F2F] bg-red-50 border-red-100',
    iconColor: 'text-[#D32F2F]',
    dot: 'bg-[#D32F2F]',
    tag: 'Low Stock',
    tagBg: 'bg-red-50 text-[#D32F2F] border-red-100',
  },
  {
    icon: TrendingUp,
    message: 'Paracetamol demand spike — 340% above baseline in Delhi NCR',
    severity: 'text-[#F59E0B] bg-amber-50 border-amber-100',
    iconColor: 'text-[#F59E0B]',
    dot: 'bg-[#F59E0B]',
    tag: 'High Demand',
    tagBg: 'bg-amber-50 text-[#F59E0B] border-amber-100',
  },
  {
    icon: AlertTriangle,
    message: 'Price anomaly — Insulin Glargine listed 2.8× above MRP at 3 stores',
    severity: 'text-[#F59E0B] bg-amber-50 border-amber-100',
    iconColor: 'text-[#F59E0B]',
    dot: 'bg-amber-400',
    tag: 'Price Alert',
    tagBg: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    icon: PackageX,
    message: 'Metformin 1000mg out of stock — 14 pharmacies in Bengaluru',
    severity: 'text-[#D32F2F] bg-red-50 border-red-100',
    iconColor: 'text-[#D32F2F]',
    dot: 'bg-[#D32F2F]',
    tag: 'Low Stock',
    tagBg: 'bg-red-50 text-[#D32F2F] border-red-100',
  },
];

const AlertsPanel = () => {
  return (
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 admin-card flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-800">Inventory & Alerts</h3>
        <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
      </div>

      <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto pr-1 custom-scroll">
        {ALERTS.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 p-3 rounded-[10px] border ${a.severity} transition-all duration-150 hover:shadow-sm`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <a.icon size={15} className={a.iconColor} />
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit ${a.tagBg}`}>
                {a.tag}
              </span>
              <p className="text-xs text-gray-700 leading-relaxed">{a.message}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center justify-center gap-2 w-full border-[1.5px] border-[#2A7FFF] text-[#2A7FFF] text-sm font-bold py-2.5 rounded-[10px] hover:bg-green-50 transition-colors duration-200">
        <Settings size={14} />
        Manage Catalog
      </button>
    </div>
  );
};

export default AlertsPanel;
