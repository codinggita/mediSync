import React from 'react';
import { Package, AlertCircle, TrendingUp, TrendingDown, PackageCheck, Zap } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'Stock',
    msg: 'Metformin 500mg: Low stock at Apollo Pharmacy (Noida)',
    severity: 'red',
    icon: Package,
  },
  {
    id: 2,
    type: 'Price',
    msg: 'Insulin Glargine: Unusual 15% price spike in Mumbai region',
    severity: 'orange',
    icon: TrendingUp,
  },
  {
    id: 3,
    type: 'Demand',
    msg: 'Paracetamol: High demand surge predicted for next 48 hrs',
    severity: 'blue',
    icon: Zap,
  },
  {
    id: 4,
    type: 'Inventory',
    msg: 'Expired batch (B204) identified at Wellness Forever',
    severity: 'red',
    icon: AlertCircle,
  },
];

const InventoryAlertsPanel = () => {
  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] flex flex-col h-full shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="p-5 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
            <AlertCircle size={18} className="text-[#EF4444]" />
          </div>
          <div>
            <h3 className="font-black text-[#1F2937] dark:text-white text-[0.92rem]">Inventory Alerts</h3>
            <p className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-wider">Critical system monitors</p>
          </div>
        </div>
        <span className="text-[0.6rem] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full animate-pulse">4 New</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className={`p-3.5 rounded-xl border transition-all hover:translate-x-1 group ${
              a.severity === 'red' ? 'bg-red-50/30 dark:bg-red-500/5 border-red-100/50 dark:border-red-500/10' :
              a.severity === 'orange' ? 'bg-amber-50/30 dark:bg-amber-500/5 border-amber-100/50 dark:border-amber-500/10' :
              'bg-blue-50/30 dark:bg-blue-500/5 border-blue-100/50 dark:border-blue-500/10'
            }`}
          >
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110 ${
                a.severity === 'red' ? 'bg-white dark:bg-[#151E32] border-red-100 text-red-500' :
                a.severity === 'orange' ? 'bg-white dark:bg-[#151E32] border-amber-100 text-amber-500' :
                'bg-white dark:bg-[#151E32] border-blue-100 text-[#2A7FFF]'
              }`}>
                <a.icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[0.62rem] font-black uppercase tracking-tighter ${
                    a.severity === 'red' ? 'text-red-400' : a.severity === 'orange' ? 'text-amber-400' : 'text-blue-400'
                  }`}>
                    {a.type} Alert
                  </span>
                  <span className="text-[0.6rem] text-gray-400 font-medium">14m ago</span>
                </div>
                <p className="text-[0.78rem] font-bold text-[#1F2937] dark:text-slate-200 mt-1 leading-snug">
                  {a.msg}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-50 dark:border-slate-800 bg-white dark:bg-[#151E32]">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1F2937] dark:bg-[#0B1121] text-white text-[0.8rem] font-black hover:bg-black transition-all shadow-lg active:scale-95 group">
          <PackageCheck size={16} className="text-[#2ECC71] group-hover:rotate-12 transition-transform" />
          Manage Global Catalog
        </button>
      </div>
    </div>
  );
};

export default InventoryAlertsPanel;
