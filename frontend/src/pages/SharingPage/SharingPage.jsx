import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import { 
  Stethoscope, Search, AlertCircle
} from 'lucide-react';
import DoctorSharingPage from './components/DoctorSharingPage';
import SharingHeader from './components/SharingHeader';
import DoctorSharingModal from './components/DoctorSharingModal';
import SharingDecorations from './components/SharingDecorations';
import DoctorSharingCard from './components/DoctorSharingCard';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const SharingPage = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sharingRecord, setSharingRecord] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (user?.role === 'Doctor') return;
      try {
        const [docRes, recRes] = await Promise.all([
          api.get('/users/doctors'),
          api.get('/records')
        ]);
        setDoctors(docRes.data);
        setRecords(recRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleShareClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSharingRecord(true);
    if (records.length > 0) {
      setSelectedRecordId(records[0]._id);
    }
  };

  const handleConfirmShare = async () => {
    if (!selectedRecordId) return;
    setIsSharing(true);
    try {
      await api.post('/records/share', {
        recordId: selectedRecordId,
        doctorId: selectedDoctor._id
      });

      const sharedRec = records.find(r => r._id === selectedRecordId);
      const recordTitle = sharedRec ? sharedRec.title : 'Medical Record';

      setSuccessMessage(`Report successfully shared with Dr. ${selectedDoctor.name}`);
      
      const doctorPhone = selectedDoctor.whatsapp || selectedDoctor.phone || '';
      if (doctorPhone) {
        const cleanPhone = doctorPhone.replace(/\D/g, '');
        const message = encodeURIComponent(`Hello Dr. ${selectedDoctor.name},\n\nI have shared my medical report *"${recordTitle}"* with you on MediSync. Please review it in your "Shared Archives" dashboard.\n\nThank you,\n${user.name}`);
        const waUrl = `https://wa.me/${cleanPhone}?text=${message}`;
        
        setTimeout(() => {
          window.open(waUrl, '_blank');
        }, 1500);
      }

      setTimeout(() => {
        setSuccessMessage('');
        setSharingRecord(false);
        setSelectedDoctor(null);
      }, 4000);
    } catch (error) {
      console.error('Error sharing record:', error);
      alert('Failed to share record. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f] transition-colors duration-500 font-sans relative text-slate-800 dark:text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(42,127,255,0.03),transparent)] pointer-events-none" />
      
      <SharingDecorations />
      
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />
        {user?.role === 'Doctor' ? (
          <DoctorSharingPage />
        ) : (
          <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-10 scrollbar-hide pb-24 md:pb-20">
            <SharingHeader />

            <div className="grid grid-cols-1 gap-10">
              <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-12 shadow-[16px_16px_32px_#cbced1,-16px_-16px_32px_#ffffff] dark:shadow-[16px_16px_32px_#0a0f1d] border border-white/40">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-[1.6rem] font-black text-slate-900 dark:text-white flex items-center gap-4">
                      <Stethoscope size={24} className="text-[#2A7FFF]" />
                      Verified Specialists
                   </h3>
                   <div className="relative w-72">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search doctors..." 
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#0B1121] rounded-2xl border-none outline-none text-[0.9rem] font-bold shadow-inner"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                   {loading ? (
                     [1, 2, 3].map(i => (
                       <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-[3rem] animate-pulse" />
                     ))
                   ) : doctors.length > 0 ? (
                     doctors.map((doctor) => (
                       <DoctorSharingCard 
                         key={doctor._id} 
                         doctor={doctor} 
                         onShareClick={handleShareClick} 
                       />
                     ))
                   ) : (
                     <div className="col-span-full py-20 text-center bg-[#0B1121]/5 rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center gap-4">
                        <AlertCircle size={48} className="text-slate-300" />
                        <p className="text-slate-400 font-black uppercase tracking-widest">No specialists found</p>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </main>
        )}
      </div>

      <DoctorSharingModal 
        show={sharingRecord}
        onClose={() => setSharingRecord(false)}
        selectedDoctor={selectedDoctor}
        records={records}
        selectedRecordId={selectedRecordId}
        setSelectedRecordId={setSelectedRecordId}
        onConfirm={handleConfirmShare}
        isSharing={isSharing}
        successMessage={successMessage}
      />
    </div>
  );
};

export default SharingPage;
