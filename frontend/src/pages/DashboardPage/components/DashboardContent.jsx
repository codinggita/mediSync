import React, { useState, useEffect, useRef } from 'react';
import { Pill, FileText, AlertTriangle, CalendarCheck } from 'lucide-react';
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
import PriceAlertBanner from './PriceAlertBanner';
import DashboardFooter from './DashboardFooter';
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
        <WelcomeBanner user={user} stats={stats} greeting={greeting} firstAidImg={firstAidImg} />
        <StatGrid statCards={statCards} loading={loading} />
        <PriceAlertBanner />

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

        <DashboardFooter />
      </div>
    </main>
  );
};

export default DashboardContent;
