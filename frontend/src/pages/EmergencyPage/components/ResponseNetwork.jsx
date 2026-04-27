import React from 'react';
import { Hospital, Ambulance, MapPin, Activity, Phone, Navigation, Zap, Shield } from 'lucide-react';

const ResponseNetwork = ({ nearbyHospitals, viewMode, setViewMode, onDeploy, deploymentStatus }) => (
  <div className="xl:col-span-7 space-y-10">
    <div className="flex items-center justify-between px-6">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-3xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
          <Hospital size={28} className="text-red-500" />
        </div>
        <div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white tracking-tight">Response Network</h2>
          <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em]">Optimized Triage Units</p>
        </div>
      </div>
      
      <div className="flex bg-white dark:bg-[#151E32] p-1.5 rounded-[24px] shadow-lg border border-slate-200 dark:border-white/5">
        <button onClick={() => setViewMode('tactical')} className={`px-8 py-3 rounded-[18px] text-[0.7rem] font-black uppercase tracking-widest transition-all ${viewMode === 'tactical' ? 'bg-[#E11D48] text-white shadow-lg' : 'text-slate-400'}`}>Tactical</button>
        <button onClick={() => setViewMode('list')} className={`px-8 py-3 rounded-[18px] text-[0.7rem] font-black uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-[#E11D48] text-white shadow-lg' : 'text-slate-400'}`}>List</button>
      </div>
    </div>

    <div className={`grid gap-6 ${viewMode === 'tactical' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
      {nearbyHospitals.map((hosp, i) => (
        <div key={i} className={`bg-white dark:bg-[#151E32] rounded-[1.8rem] py-8 px-8 shadow-lg border border-white dark:border-white/5 flex flex-col transition-all duration-500 relative group hover:border-red-500/30 ${viewMode === 'tactical' ? 'md:flex-row md:items-center md:justify-between' : 'min-h-[300px]'}`}>
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] dark:opacity-5 group-hover:scale-110 transition-transform pointer-events-none"><Ambulance size={140} /></div>
          <div className={`flex items-start gap-6 relative z-10 w-full ${viewMode === 'tactical' ? 'md:items-center' : 'flex-col'}`}>
            <div className="w-16 h-16 shrink-0 rounded-[1.2rem] bg-slate-50 dark:bg-[#090E1A] flex items-center justify-center text-[#E11D48] border border-slate-100 dark:border-white/5 group-hover:bg-[#E11D48] group-hover:text-white transition-all">
              <Ambulance size={28} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                <h3 className="text-[1.3rem] font-black text-slate-900 dark:text-white truncate">{hosp.name}</h3>
                <div className={`px-3 py-1 rounded-lg text-[0.55rem] font-black uppercase tracking-widest border ${hosp.triage === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>{hosp.triage}</div>
              </div>
              <div className="flex items-center gap-5 flex-wrap text-slate-500 dark:text-slate-400 font-black">
                <div className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /> {hosp.distance}</div>
                <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-2"><Activity size={16} className="text-blue-500" /> {hosp.status}</div>
              </div>
            </div>
          </div>

          <div className={`flex items-center gap-4 mt-8 w-full relative z-10 ${viewMode === 'tactical' ? 'md:mt-0 md:w-auto' : ''}`}>
            <button onClick={() => window.location.href = `tel:${hosp.phone}`} className="w-12 h-12 rounded-[0.8rem] bg-slate-50 dark:bg-[#090E1A] flex items-center justify-center text-slate-400 hover:text-[#E11D48] shadow-md border border-slate-100 dark:border-white/5"><Phone size={22} /></button>
            <button onClick={() => onDeploy(hosp)} disabled={deploymentStatus !== null} className={`flex-1 px-6 py-3.5 rounded-[0.8rem] font-black text-[0.85rem] flex items-center justify-center gap-3 transition-all shadow-xl ${deploymentStatus === hosp.id ? 'bg-emerald-500 text-white' : 'bg-[#E11D48] text-white'}`}>
              {deploymentStatus === hosp.id ? <Zap size={18} className="animate-spin" /> : <Navigation size={18} />}
              {deploymentStatus === hosp.id ? 'Deploying...' : `Deploy (${hosp.time})`}
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-slate-50 dark:bg-[#090E1A] p-9 rounded-[1.8rem] border border-slate-200 dark:border-white/5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
      <div className="flex items-center gap-6 relative z-10">
        <div className="w-16 h-16 rounded-[1.2rem] bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20"><Shield size={32} /></div>
        <div>
          <p className="text-[1.1rem] font-black text-slate-900 dark:text-white leading-tight">Tactical Grid Sync Active</p>
          <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">Pulse Offset: 0.2s • AES-XTS</p>
        </div>
      </div>
      <div className="px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20"><span className="text-[0.75rem] font-black text-emerald-500 uppercase tracking-widest">Network Stable</span></div>
    </div>
  </div>
);

export default ResponseNetwork;
