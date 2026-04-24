import React, { useState } from 'react';
import {
  Pill, FileText, AlertTriangle, TrendingUp, TrendingDown,
  Footprints, Heart, Droplets, Activity, BarChart2,
  Clock, ChevronRight, Zap, CalendarCheck, Plus, ArrowUpRight
} from 'lucide-react';

const statCards = [
  { label: 'Saved Medicines', value: 12, trend: '+2 this week', up: true, icon: Pill, gradient: 'from-[#E6F0FF] to-[#F8FAFC]', iconBg: 'bg-[#2A7FFF]/10', iconColor: 'text-[#2A7FFF]', border: 'border-[#E6F0FF]' },
  { label: 'Clinical Reports', value: 8, trend: '+1 this month', up: true, icon: FileText, gradient: 'from-[#E8F8F5] to-[#F8FAFC]', iconBg: 'bg-[#2ECC71]/10', iconColor: 'text-[#2ECC71]', border: 'border-[#E8F8F5]' },
  { label: 'Appointments', value: 2, trend: 'Next: Tomorrow', up: true, icon: CalendarCheck, gradient: 'from-[#F8FAFC] to-gray-50', iconBg: 'bg-[#1F2937]/5', iconColor: 'text-[#1F2937]', border: 'border-gray-100' },
  { label: 'Active Alerts', value: 3, trend: '+1 urgent', up: false, icon: AlertTriangle, gradient: 'from-[#F59E0B]/10 to-[#F8FAFC]', iconBg: 'bg-[#F59E0B]/20', iconColor: 'text-[#F59E0B]', border: 'border-[#F59E0B]/20', urgent: true },
];

const weeklyData = [45, 72, 58, 88, 65, 92, 75];
const monthlyData = [55, 70, 60, 85, 50, 75, 90, 65, 80, 55, 70, 95];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const upcomingMeds = [
  { name: 'Metformin 500mg', time: '08:00 AM', taken: true, color: '#2A7FFF' },
  { name: 'Lisinopril 10mg', time: '01:00 PM', taken: false, color: '#1565C0' },
  { name: 'Vitamin D3', time: '08:00 PM', taken: false, color: '#F59E0B' },
];

const recentActivity = [
  { text: 'Lab report uploaded', sub: 'Blood test results — CBC', time: '2h ago', icon: FileText, color: '#2A7FFF' },
  { text: 'Prescription added', sub: 'Dr. Sharma — Lisinopril', time: '1d ago', icon: Pill, color: '#1565C0' },
  { text: 'Appointment confirmed', sub: 'Dr. Patel — Cardiology', time: '2d ago', icon: CalendarCheck, color: '#7C3AED' },
];

const HealthBar = ({ icon: Icon, label, value, max, unit, status, color }) => {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  return (
    <div className="p-4 rounded-2xl bg-white border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
            <Icon size={17} style={{ color }} />
          </div>
          <span className="text-[0.85rem] font-bold text-gray-800">{label}</span>
        </div>
        <span className="text-[0.68rem] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>{status}</span>
      </div>
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-[1.8rem] font-extrabold text-gray-900 leading-none">{value}</span>
        <span className="text-xs text-gray-400 font-medium">{unit}</span>
        <span className="ml-auto text-xs text-gray-400">{pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
};

const DashboardContent = () => {
  const [chartView, setChartView] = useState('weekly');
  const chartData = chartView === 'weekly' ? weeklyData : monthlyData;
  const labels = chartView === 'weekly' ? days : months;
  const maxVal = Math.max(...chartData);

  return (
    <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-5 lg:p-7">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#2A7FFF] to-[#1565C0] rounded-2xl p-6 mb-6 flex items-center justify-between overflow-hidden relative shadow-lg shadow-[#2A7FFF]/20">
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white" style={{ width: `${80 + i * 60}px`, height: `${80 + i * 60}px`, top: '50%', right: '-20px', transform: 'translateY(-50%)' }} />
          ))}
        </div>
        <div className="relative z-10">
          <p className="text-white/70 text-[0.82rem] font-medium mb-1 flex items-center gap-2">
            <Zap size={13} className="text-yellow-300" /> Your health summary for today
          </p>
          <h2 className="text-white text-[1.4rem] font-extrabold leading-tight">Welcome back, Priyabrata 👋</h2>
          <p className="text-white/70 text-[0.82rem] mt-1">You have <span className="text-white font-bold">3 active alerts</span> and <span className="text-white font-bold">2 upcoming appointments</span>.</p>
        </div>
        <div className="relative z-10 hidden sm:flex flex-col items-end gap-2">
          <div className="bg-white/15 rounded-2xl px-4 py-2 border border-white/20 text-white text-center">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white/60">Health Score</p>
            <p className="text-2xl font-extrabold">78<span className="text-sm font-bold text-white/60">/100</span></p>
          </div>
          <div className="flex items-center gap-1.5 text-white/70 text-[0.72rem] font-medium">
            <TrendingUp size={13} className="text-green-300" /> +5 pts from last week
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
        {[
          { label: 'Add Record', icon: Plus, color: '#2A7FFF' },
          { label: 'Schedule Appointment', icon: CalendarCheck, color: '#2ECC71' },
          { label: 'Refill Prescription', icon: Pill, color: '#1F2937' },
          { label: 'View Reports', icon: BarChart2, color: '#F59E0B' },
        ].map(({ label, icon: Icon, color }) => (
          <button key={label} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[0.82rem] font-bold text-gray-700 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0 group">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
              <Icon size={13} style={{ color }} />
            </div>
            {label}
            <ArrowUpRight size={13} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map(({ label, value, trend, up, icon: Icon, gradient, iconBg, iconColor, border, urgent }) => (
          <div key={label} className={`relative bg-gradient-to-br ${gradient} border ${border} rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden group`}>
            {urgent && <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#F59E0B] to-red-500 rounded-t-2xl" />}
            <div className={`absolute -right-3 -bottom-3 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity`}>
              <Icon size={64} />
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center`}>
                <Icon size={17} className={iconColor} />
              </div>
              <div className={`flex items-center gap-1 text-[0.67rem] font-bold px-2 py-1 rounded-full ${up ? 'bg-[#E8F8F5] text-[#2ECC71]' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>
                {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {trend}
              </div>
            </div>
            <p className="text-[2rem] font-extrabold text-gray-900 leading-none">{value}</p>
            <p className="text-[0.78rem] font-semibold text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900 flex items-center gap-2 text-[0.95rem]">
                <BarChart2 size={17} className="text-[#2A7FFF]" /> Medication Price Trends
              </h3>
              <p className="text-[0.72rem] text-gray-400 mt-0.5">Average spend per medication (USD)</p>
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['weekly', 'monthly'].map(v => (
                <button key={v} onClick={() => setChartView(v)}
                  className={`px-3 py-1.5 rounded-[8px] text-[0.73rem] font-bold transition-all capitalize ${chartView === v ? 'bg-[#2A7FFF] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-36 mt-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[100, 75, 50, 25].map(g => (
                <div key={g} className="w-full border-t border-gray-100 flex items-center">
                  <span className="text-[0.6rem] text-gray-300 -mt-2.5 mr-1 w-6 text-right">{g}</span>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-1.5 h-full flex-1 pl-8">
              {chartData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="relative w-full flex flex-col justify-end h-28">
                    <div className="w-full rounded-t-md bg-gradient-to-t from-[#2A7FFF] to-[#E6F0FF] group-hover:from-[#1565C0] group-hover:to-[#2A7FFF] transition-all duration-200 cursor-pointer"
                      style={{ height: `${(val / maxVal) * 100}%`, minHeight: '4px' }}>
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[0.6rem] font-bold text-[#2A7FFF] opacity-0 group-hover:opacity-100 transition-all bg-white border border-[#E6F0FF] px-1.5 py-0.5 rounded-lg shadow-sm whitespace-nowrap">${val}</div>
                    </div>
                  </div>
                  <span className="text-[0.58rem] text-gray-400 font-medium">{labels[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between text-[0.75rem] font-medium pt-3 mt-2 border-t border-gray-50">
            <div className="flex items-center gap-2 text-[#1F2937]">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-t from-[#2A7FFF] to-[#E6F0FF]" /> Avg. Spend
            </div>
            <span className="font-bold text-[#2A7FFF]">Total: ${chartData.reduce((a, b) => a + b, 0)}</span>
          </div>
        </div>

        {/* Health Activity */}
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 text-[0.95rem]">
            <Activity size={17} className="text-[#2A7FFF]" /> Health Activity
          </h3>
          <HealthBar icon={Footprints} label="Daily Steps" value={7240} max={10000} unit="steps" status="On Track" color="#2A7FFF" />
          <HealthBar icon={Heart} label="Heart Rate" value={72} max={100} unit="bpm" status="Normal" color="#2ECC71" />
          <HealthBar icon={Droplets} label="Hydration" value={1.8} max={3} unit="L" status="Low" color="#F59E0B" />
        </div>
      </div>

      {/* Bottom Grid: Medications + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Today's Medications */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-[0.95rem]"><Pill size={17} className="text-[#2A7FFF]" /> Today's Medications</h3>
            <button className="text-[0.75rem] text-[#2A7FFF] font-bold hover:underline flex items-center gap-1">View all <ChevronRight size={13} /></button>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingMeds.map((med, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${med.taken ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'} transition-all`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${med.color}15` }}>
                  <Pill size={16} style={{ color: med.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[0.83rem] font-bold truncate ${med.taken ? 'line-through text-gray-400' : 'text-gray-900'}`}>{med.name}</p>
                  <p className="text-[0.7rem] text-gray-400 flex items-center gap-1 mt-0.5"><Clock size={10} /> {med.time}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${med.taken ? 'bg-[#2A7FFF] border-[#2A7FFF]' : 'border-gray-300 hover:border-[#2A7FFF]'}`}>
                  {med.taken && <div className="w-3 h-3 text-white">✓</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-[0.95rem]"><Activity size={17} className="text-[#2A7FFF]" /> Recent Activity</h3>
            <button className="text-[0.75rem] text-[#2A7FFF] font-bold hover:underline flex items-center gap-1">View all <ChevronRight size={13} /></button>
          </div>
          <div className="flex flex-col gap-3">
            {recentActivity.map(({ text, sub, time, icon: Icon, color }, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}12` }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.83rem] font-bold text-gray-900">{text}</p>
                  <p className="text-[0.72rem] text-gray-400 mt-0.5">{sub}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[0.68rem] text-gray-400 whitespace-nowrap">{time}</span>
                  <ArrowUpRight size={13} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
