import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, FileText, AlertTriangle, TrendingDown, CalendarCheck, Check, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../utils/api';
import MedicineComparison from './MedicineComparison';
import DoctorConnect from './DoctorConnect';
import NearbyPharmacies from './NearbyPharmacies';
import WelcomeBanner from './WelcomeBanner';
import StatGrid from './StatGrid';
import PremiumHealthVault from './PremiumHealthVault';
import SavingsInsights from './SavingsInsights';
import HealthActivity from './HealthActivity';
import RecentRecordsPreview from './RecentRecordsPreview';
import PremiumLoader from '../../../components/PremiumLoader';

import medBoxImg from '../../../assets/images/medicine_box.png';
import vitaminsImg from '../../../assets/images/vitamins.png';
import firstAidImg from '../../../assets/images/first_aid.png';
import eyeDropsImg from '../../../assets/images/eye_drops.png';
import inhalerImg from '../../../assets/images/inhaler.png';

const DashboardContent = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ medicines: 0, records: 0, appointments: 0, alerts: 3 });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const medCompRef = useRef(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prescRes, recordRes, apptRes] = await Promise.all([
          api.get('/prescriptions/my').catch(e => ({ data: { medicines: [] } })), 
          api.get('/records').catch(e => ({ data: [] })), 
          api.get('/appointments').catch(e => ({ data: [] }))
        ]);
        
        const medicinesCount = Array.isArray(prescRes?.data) 
          ? prescRes.data.length 
          : (prescRes?.data?.medicines?.length || 0);

        setStats({
          medicines: medicinesCount,
          records: Array.isArray(recordRes?.data) ? recordRes.data.length : 0,
          appointments: Array.isArray(apptRes?.data) ? apptRes.data.length : 0,
          alerts: 3
        });
      } catch (error) { 
        console.error('Error fetching dashboard stats:', error); 
        setStats({ medicines: 0, records: 0, appointments: 0, alerts: 0 });
      }
      finally { setLoading(false); }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <PremiumLoader message="Syncing Health Records" />;

  const statCards = [
    { label: 'Saved Medicines', value: stats.medicines, trend: '+2 this week', up: true, icon: Pill, color: '#2A7FFF' },
    { label: 'Clinical Reports', value: stats.records, trend: '+1 this month', up: true, icon: FileText, color: '#2ECC71' },
    { label: 'Appointments', value: stats.appointments, trend: 'Next: Tomorrow', up: true, icon: CalendarCheck, color: '#8B5CF6' },
    { label: 'Active Alerts', value: stats.alerts, trend: '+1 urgent', up: false, icon: AlertTriangle, color: '#F59E0B' },
  ];

  const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <main className="flex-1 overflow-y-auto bg-[#ecf0f3] dark:bg-[#121826] transition-colors duration-300 p-6 lg:p-8 space-y-10 scrollbar-hide pb-24 md:pb-20">
      <div className="flex flex-col gap-10">
        
        {/* Main Welcome & Stats Layer */}
        <WelcomeBanner user={user} stats={stats} greeting={greeting} firstAidImg={firstAidImg} />
        
        <StatGrid statCards={statCards} loading={loading} />



        {/* Price Drop Alert Banner */}
        <div 
           onClick={() => navigate('/comparison')}
           className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] p-6 flex items-center justify-between cursor-pointer hover:bg-emerald-500/20 hover:scale-[1.01] transition-all group shadow-sm"
        >
           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-14 h-14 shrink-0 rounded-[1.2rem] bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
                 <TrendingDown size={28} />
              </div>
              <div>
                 <h3 className="text-[1.1rem] font-black text-emerald-700 dark:text-emerald-400 mb-1 leading-tight">PRICE DROP ALERT: Medicines now under ₹100!</h3>
                 <p className="text-[0.75rem] font-bold text-emerald-600/70 dark:text-emerald-400/70 uppercase tracking-widest">Click to view nearby pharmacy addresses & exact locations</p>
              </div>
           </div>
           <button className="hidden md:block px-6 py-3 bg-emerald-500 text-white rounded-[1rem] text-[0.75rem] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/30 group-hover:bg-emerald-600 group-active:scale-95 transition-all whitespace-nowrap">
              View Stores
           </button>
        </div>

        <PremiumHealthVault 
           medBoxImg={medBoxImg} 
           vitaminsImg={vitaminsImg} 
           firstAidImg={firstAidImg} 
           eyeDropsImg={eyeDropsImg} 
           inhalerImg={inhalerImg} 
           onSelectMedicine={(name) => {
              if (medCompRef.current) {
                 medCompRef.current.searchForMedicine(name);
                 const el = document.getElementById('price-intel-section');
                 if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
           }}
        />

        <div id="price-intel-section" className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          <div className="xl:col-span-8"><MedicineComparison ref={medCompRef} /></div>
          <div className="xl:col-span-4 flex flex-col gap-8">
             <SavingsInsights />
             <HealthActivity user={user} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <RecentRecordsPreview isUploading={isUploading} setIsUploading={setIsUploading} uploadSuccess={uploadSuccess} setUploadSuccess={setUploadSuccess} />
          <NearbyPharmacies />
          <DoctorConnect />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 py-10 border-t border-slate-200/50 dark:border-slate-800">
           {[
             { text: 'End-to-End Encrypted', icon: ShieldCheck },
             { text: 'HIPAA Compliant Protocol', icon: Check },
             { text: 'Biometric Secure Node', icon: ShieldCheck }
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/40 dark:bg-[#151E32]/40 backdrop-blur-xl rounded-2xl border border-white/20 text-[0.75rem] font-black text-slate-400 uppercase tracking-widest shadow-sm">
                <item.icon size={16} className="text-[#2ECC71]" /> {item.text}
             </div>
           ))}
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;
