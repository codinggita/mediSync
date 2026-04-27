import React from 'react';
import { LineChart, BarChart, Filter, Calendar, ChevronDown, Download } from 'lucide-react';

const AdminAnalytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* 📊 Pharmacy Growth Line Chart (Mockup) */}
      <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] p-6 shadow-sm transition-all hover:shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h3 className="text-[0.95rem] font-black text-[#1F2937] dark:text-white flex items-center gap-2">
              <LineChart size={18} className="text-[#2A7FFF]" />
              Pharmacy Growth
            </h3>
            <p className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-widest mt-0.5">New onboarding trend</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#0B1121] text-[0.7rem] font-bold text-gray-500 dark:text-slate-400 hover:text-[#2A7FFF] transition-all">
              Weekly <ChevronDown size={12} />
            </button>
            <button className="p-1.5 rounded-lg bg-gray-50 dark:bg-[#0B1121] text-gray-400 hover:text-[#2ECC71]">
              <Download size={14} />
            </button>
          </div>
        </div>

        {/* Mock Chart Area */}
        <div className="h-48 w-full relative flex items-end gap-1">
          {/* SVG Line path mockup */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A7FFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2A7FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,80 Q50,60 100,100 T200,40 T300,120 T400,20 T500,80 T600,10 T700,60 T800,30 L800,160 L0,160 Z" 
              fill="url(#lineGrad)" 
            />
            <path 
              d="M0,80 Q50,60 100,100 T200,40 T300,120 T400,20 T500,80 T600,10 T700,60 T800,30" 
              fill="none" 
              stroke="#2A7FFF" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          </svg>
          
          {/* X-Axis labels */}
          <div className="absolute bottom-[-20px] left-0 right-0 flex justify-between px-2 text-[0.6rem] font-bold text-gray-400 uppercase">
            <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between px-2">
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A7FFF]" />
                <span className="text-[0.7rem] font-bold text-gray-500">Retail</span>
             </div>
             <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                <span className="text-[0.7rem] font-bold text-gray-500">Wholesale</span>
             </div>
          </div>
          <p className="text-[0.75rem] font-bold text-[#2ECC71]">↑ 14.2% Growth</p>
        </div>
      </div>

      {/* 📊 Medicine Price Trends (Bar/Area Chart Mockup) */}
      <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] p-6 shadow-sm transition-all hover:shadow-md relative overflow-hidden">
         <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h3 className="text-[0.95rem] font-black text-[#1F2937] dark:text-white flex items-center gap-2">
              <BarChart size={18} className="text-[#8B5CF6]" />
              Price Analytics
            </h3>
            <p className="text-[0.65rem] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Medicine price fluctuations</p>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex bg-gray-50 dark:bg-[#0B1121] p-1 rounded-lg">
                <button className="px-3 py-1 text-[0.65rem] font-bold bg-white dark:bg-[#151E32] text-[#8B5CF6] rounded-md shadow-sm">Monthly</button>
                <button className="px-3 py-1 text-[0.65rem] font-bold text-gray-400">Yearly</button>
             </div>
          </div>
        </div>

        {/* Mock Bar Area */}
        <div className="h-48 w-full flex items-end justify-between gap-1.5 px-2">
           {[40, 70, 45, 90, 65, 30, 85, 55, 75, 40, 95, 60].map((h, i) => (
             <div key={i} className="flex-1 group relative">
                <div 
                  className="w-full bg-[#8B5CF6]/10 group-hover:bg-[#8B5CF6]/20 transition-all rounded-t-lg relative overflow-hidden flex flex-col justify-end"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6] to-transparent opacity-40" />
                  <div className="w-full h-1 bg-[#8B5CF6] rounded-t-lg" />
                </div>
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white text-[0.6rem] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                  ${(h * 1.5).toFixed(0)} Avg
                </div>
             </div>
           ))}
        </div>
        
        {/* X-Axis for bars */}
        <div className="mt-2 flex justify-between px-2 text-[0.6rem] font-bold text-gray-400 uppercase">
          {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => <span key={m}>{m}</span>)}
        </div>

        <div className="mt-6 p-3 rounded-xl bg-[#8B5CF6]/5 border border-[#8B5CF6]/10 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[#8B5CF6]" />
              <p className="text-[0.7rem] font-bold text-gray-500">Market Volatility: <span className="text-[#8B5CF6]">Low</span></p>
           </div>
           <button className="text-[0.7rem] font-black text-[#8B5CF6] hover:underline uppercase tracking-tight">Full Report</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
