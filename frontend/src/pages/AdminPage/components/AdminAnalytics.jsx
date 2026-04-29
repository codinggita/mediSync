import React from 'react';
import { LineChart, BarChart, Filter, Calendar, ChevronDown, Download, TrendingUp } from 'lucide-react';

const AdminAnalytics = ({ isDarkMode }) => {
  const [activeRange, setActiveRange] = React.useState('Weekly');
  const [priceRange, setPriceRange] = React.useState('Monthly');
  
  const [pharmacyData] = React.useState([
    { label: 'Jan', val: 80 }, { label: 'Feb', val: 60 }, { label: 'Mar', val: 100 },
    { label: 'Apr', val: 40 }, { label: 'May', val: 120 }, { label: 'Jun', val: 20 },
    { label: 'Jul', val: 80 }, { label: 'Aug', val: 10 }, { label: 'Sep', val: 60 }
  ]);

  const monthlyPrices = [40, 70, 45, 90, 65, 30, 85, 55, 75, 40, 95, 60];
  const yearlyPrices  = [60, 45, 80, 55, 70, 90, 35, 65, 50, 85, 40, 75];
  const currentPrices = priceRange === 'Monthly' ? monthlyPrices : yearlyPrices;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* 📊 Pharmacy Growth Line Chart */}
      <div className={`rounded-[2.5rem] p-10 transition-all duration-500 relative overflow-hidden group ${
        isDarkMode 
          ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47] border border-white/5' 
          : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
      }`}>
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div>
            <h3 className={`text-[1.1rem] font-black flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <LineChart size={22} className="text-[#2A7FFF]" strokeWidth={3} />
              Pharmacy Growth
            </h3>
            <p className="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.25em] mt-2">New Onboarding Trend</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex bg-[#ecf0f3] dark:bg-[#0B1121] p-1.5 rounded-xl shadow-inner`}>
              {['Weekly', 'Monthly'].map(r => (
                <button 
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-4 py-2 text-[0.65rem] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeRange === r ? 'bg-[#2A7FFF] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button className={`p-3 rounded-xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] text-[#2ECC71] hover:scale-110 active:shadow-inner transition-all border border-white/10`}>
              <Download size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="h-64 w-full relative group/chart">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="lineGradPremium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A7FFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2A7FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,150 Q100,120 200,160 T400,60 T600,180 T800,80 L800,200 L0,200 Z" 
              fill="url(#lineGradPremium)" 
              className="animate-pulse duration-[3000ms]"
            />
            <path 
              d="M0,150 Q100,120 200,160 T400,60 T600,180 T800,80" 
              fill="none" 
              stroke="#2A7FFF" 
              strokeWidth="5" 
              strokeLinecap="round"
              className="drop-shadow-[0_5px_10px_rgba(42,127,255,0.4)]"
            />
            
            {/* Interactive Data Nodes */}
            {[0, 200, 400, 600, 800].map((x, i) => (
              <circle 
                key={i} 
                cx={x} cy={i === 0 ? 150 : i === 1 ? 160 : i === 2 ? 60 : i === 3 ? 180 : 80} 
                r="6" 
                fill="#fff" 
                stroke="#2A7FFF" 
                strokeWidth="4" 
                className="hover:r-10 transition-all cursor-pointer"
              />
            ))}
          </svg>
          
          <div className="absolute bottom-[-30px] left-0 right-0 flex justify-between px-4 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
            {pharmacyData.filter((_, i) => i % 2 === 0).map(d => <span key={d.label}>{d.label}</span>)}
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between">
          <div className="flex gap-6">
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#2A7FFF] shadow-[0_0_8px_#2A7FFF]" />
                <span className="text-[0.7rem] font-black text-slate-500 uppercase tracking-widest">Retail Expansion</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
                <span className="text-[0.7rem] font-black text-slate-500 uppercase tracking-widest">Institutional</span>
             </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp size={14} className="text-[#2ECC71]" />
            <span className="text-[0.75rem] font-black text-[#2ECC71] tracking-tight">↑ 14.2% Growth</span>
          </div>
        </div>
      </div>

      {/* 📊 Price Analytics Bar Chart */}
      <div className={`rounded-[2.5rem] p-10 transition-all duration-500 relative overflow-hidden group ${
        isDarkMode 
          ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47] border border-white/5' 
          : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
      }`}>
         <div className="flex items-center justify-between mb-10 relative z-10">
          <div>
            <h3 className={`text-[1.1rem] font-black flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <BarChart size={22} className="text-[#8B5CF6]" strokeWidth={3} />
              Price Analytics
            </h3>
            <p className="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.25em] mt-2">Medicine Price Fluctuations</p>
          </div>
          <div className={`flex bg-[#ecf0f3] dark:bg-[#0B1121] p-1.5 rounded-xl shadow-inner`}>
            {['Monthly', 'Yearly'].map(r => (
              <button 
                key={r}
                onClick={() => setPriceRange(r)}
                className={`px-4 py-2 text-[0.65rem] font-black uppercase tracking-widest rounded-lg transition-all ${
                  priceRange === r ? 'bg-[#8B5CF6] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full flex items-end justify-between gap-3 px-4 relative">
           {currentPrices.map((h, i) => (
             <div key={i} className="flex-1 group relative">
                <div 
                  className="w-full bg-[#8B5CF6]/10 group-hover:bg-[#8B5CF6]/30 transition-all rounded-[1rem] relative overflow-hidden flex flex-col justify-end"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#8B5CF6] to-transparent opacity-30" />
                  <div className="w-full h-1.5 bg-[#8B5CF6] rounded-t-full shadow-[0_-4px_10px_#8B5CF6]" />
                </div>
                {/* Tactical Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[0.65rem] font-black px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 whitespace-nowrap shadow-xl z-20 pointer-events-none">
                  ₹{(h * 2.5).toFixed(0)} AVG COST
                </div>
             </div>
           ))}
        </div>
        
        <div className="mt-8 flex justify-between px-6 text-[0.65rem] font-black text-slate-400 uppercase tracking-widest">
          {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => <span key={m}>{m}</span>)}
        </div>

        <div className={`mt-10 p-6 rounded-[1.5rem] flex items-center justify-between border ${
          isDarkMode ? 'bg-[#0B1121] border-white/5' : 'bg-white border-slate-100 shadow-sm'
        }`}>
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                <Calendar size={20} strokeWidth={3} />
              </div>
              <p className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest">Market Volatility Index: <span className="text-[#8B5CF6]">Optimal</span></p>
           </div>
           <button className="text-[0.7rem] font-black text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white px-6 py-2 rounded-xl border border-[#8B5CF6]/30 transition-all uppercase tracking-widest">Insights</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
