import React from 'react';
import {
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Calendar,
  Download,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const AdminAnalytics = ({ isDarkMode, data }) => {
  const [activeRange, setActiveRange] = React.useState('Weekly');
  const [priceRange, setPriceRange] = React.useState('Monthly');

  // Static Fallback Data
  const weeklyPharmacyData = [
    { label: 'Mon', retail: 40, institutional: 24 },
    { label: 'Tue', retail: 30, institutional: 13 },
    { label: 'Wed', retail: 20, institutional: 98 },
    { label: 'Thu', retail: 27, institutional: 39 },
    { label: 'Fri', retail: 18, institutional: 48 },
    { label: 'Sat', retail: 23, institutional: 38 },
    { label: 'Sun', retail: 34, institutional: 43 },
  ];
  const monthlyPharmacyData = [
    { label: 'Jan', retail: 80, institutional: 40 },
    { label: 'Feb', retail: 60, institutional: 30 },
    { label: 'Mar', retail: 100, institutional: 60 },
    { label: 'Apr', retail: 40, institutional: 20 },
    { label: 'May', retail: 120, institutional: 80 },
    { label: 'Jun', retail: 20, institutional: 10 },
    { label: 'Jul', retail: 80, institutional: 40 },
    { label: 'Aug', retail: 100, institutional: 50 },
    { label: 'Sep', retail: 60, institutional: 30 },
  ];

  // Missing data definitions
  const monthlyData = [
    { name: 'Jan', val: 400 },
    { name: 'Feb', val: 300 },
    { name: 'Mar', val: 600 },
    { name: 'Apr', val: 800 },
    { name: 'May', val: 500 },
    { name: 'Jun', val: 900 },
    { name: 'Jul', val: 1100 },
  ];

  const yearlyData = [
    { name: '2022', val: 4500 },
    { name: '2023', val: 5200 },
    { name: '2024', val: 6800 },
    { name: '2025', val: 8900 },
  ];

  // Logic to use backend data if available
  const pharmacyData = React.useMemo(() => {
    if (data?.appointmentsByMonth && activeRange === 'Monthly') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return data.appointmentsByMonth.map(item => ({
        label: months[item._id.month - 1] || 'Unknown',
        retail: (Number(item.count) || 0) * 2, // Dummy retail multiplier
        institutional: Number(item.count) || 0
      }));
    }
    return (activeRange === 'Weekly' ? weeklyPharmacyData : monthlyPharmacyData).map(d => ({
      ...d,
      retail: Number(d.retail) || 0,
      institutional: Number(d.institutional) || 0
    }));
  }, [data, activeRange]);

  const activePriceData = React.useMemo(() => {
    if (data?.medicineCategoryBreakdown && priceRange === 'Monthly') {
      return data.medicineCategoryBreakdown.map(item => ({
        name: item._id || 'General',
        val: Number(item.count) || 0
      }));
    }
    return (priceRange === 'Monthly' ? monthlyData : yearlyData).map(d => ({
      ...d,
      val: Number(d.val) || 0
    }));
  }, [data, priceRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0B1121] border-white/10' : 'bg-white border-slate-200'} shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl`}>
          <p className={`text-[0.7rem] font-black uppercase tracking-widest mb-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-3 mb-2 last:mb-0">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 10px ${entry.color}` }} />
              <p className={`text-[0.8rem] font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {entry.name}: <span className="ml-1" style={{ color: entry.color }}>{entry.value}</span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-[#0B1121] border-[#8B5CF6]/30' : 'bg-white border-[#8B5CF6]/30'} shadow-[0_15px_30px_rgba(139,92,246,0.2)] backdrop-blur-xl`}>
          <p className={`text-[0.7rem] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
          <p className="text-[0.9rem] font-black text-[#8B5CF6] uppercase tracking-wider">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {}
      <div
        className={`rounded-[2.5rem] p-10 transition-all duration-500 relative overflow-hidden group ${
          isDarkMode
            ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47] border border-white/5'
            : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
        }`}
      >
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div>
            <h3
              className={`text-[1.1rem] font-black flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            >
              <LineChartIcon size={22} className="text-[#2A7FFF]" strokeWidth={3} />
              Pharmacy Growth
            </h3>
            <p className="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.25em] mt-2">
              New Onboarding Trend
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex bg-[#ecf0f3] dark:bg-[#0B1121] p-1.5 rounded-xl shadow-inner`}>
              {['Weekly', 'Monthly'].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-4 py-2 text-[0.65rem] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeRange === r
                      ? 'bg-[#2A7FFF] text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <button
              className={`p-3 rounded-xl bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] text-[#2ECC71] hover:scale-110 active:shadow-inner transition-all border border-white/10`}
            >
              <Download size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="h-[280px] w-full relative z-10 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pharmacyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRetail" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A7FFF" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2A7FFF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInst" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="institutional" name="Institutional" stroke="#8B5CF6" strokeWidth={4} fillOpacity={1} fill="url(#colorInst)" activeDot={{ r: 8, strokeWidth: 0, fill: '#8B5CF6' }} />
              <Area type="monotone" dataKey="retail" name="Retail Expansion" stroke="#2A7FFF" strokeWidth={4} fillOpacity={1} fill="url(#colorRetail)" activeDot={{ r: 8, strokeWidth: 0, fill: '#2A7FFF' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#2A7FFF] shadow-[0_0_8px_#2A7FFF]" />
              <span className="text-[0.7rem] font-black text-slate-500 uppercase tracking-widest">
                Retail Expansion
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
              <span className="text-[0.7rem] font-black text-slate-500 uppercase tracking-widest">
                Institutional
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp size={14} className="text-[#2ECC71]" />
            <span className="text-[0.75rem] font-black text-[#2ECC71] tracking-tight">
              ↑ 14.2% Growth
            </span>
          </div>
        </div>
      </div>

      {}
      <div
        className={`rounded-[2.5rem] p-10 transition-all duration-500 relative overflow-hidden group ${
          isDarkMode
            ? 'bg-[#151E32] shadow-[15px_15px_30px_#0a0f1d,-15px_-15px_30px_#202d47] border border-white/5'
            : 'bg-[#ecf0f3] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] border border-white/40'
        }`}
      >
        <div className="flex items-center justify-between mb-10 relative z-10">
          <div>
            <h3
              className={`text-[1.1rem] font-black flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            >
              <BarChartIcon size={22} className="text-[#8B5CF6]" strokeWidth={3} />
              Price Analytics
            </h3>
            <p className="text-[0.7rem] text-slate-400 font-black uppercase tracking-[0.25em] mt-2">
              Medicine Price Fluctuations
            </p>
          </div>
          <div className={`flex bg-[#ecf0f3] dark:bg-[#0B1121] p-1.5 rounded-xl shadow-inner`}>
            {['Monthly', 'Yearly'].map((r) => (
              <button
                key={r}
                onClick={() => setPriceRange(r)}
                className={`px-4 py-2 text-[0.65rem] font-black uppercase tracking-widest rounded-lg transition-all ${
                  priceRange === r
                    ? 'bg-[#8B5CF6] text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[280px] w-full relative z-10 -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activePriceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 900 }} />
              <RechartsTooltip content={<CustomBarTooltip />} cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', radius: 8 }} />
              <Bar dataKey="val" radius={[8, 8, 8, 8]} barSize={20}>
                {activePriceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={isDarkMode ? '#8B5CF6' : '#8B5CF6'} fillOpacity={0.8} style={{ cursor: 'pointer', transition: 'fill 0.3s ease' }} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`mt-8 p-6 rounded-[1.5rem] flex items-center justify-between border ${
            isDarkMode ? 'bg-[#0B1121] border-white/5' : 'bg-white border-slate-100 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
              <Calendar size={20} strokeWidth={3} />
            </div>
            <p className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest">
              Market Volatility Index: <span className="text-[#8B5CF6]">Optimal</span>
            </p>
          </div>
          <button className="text-[0.7rem] font-black text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white px-6 py-2 rounded-xl border border-[#8B5CF6]/30 transition-all uppercase tracking-widest">
            Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
