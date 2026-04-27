import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import { 
  Share2, UserCheck, Clock, Stethoscope, Search, AlertCircle, Activity
} from 'lucide-react';
import securityImg from '../../assets/images/security.png';
import medicineBoxImg from '../../assets/images/medicine_box.png';
import DoctorSharingPage from './components/DoctorSharingPage';
import SharingHeader from './components/SharingHeader';
import DoctorSharingModal from './components/DoctorSharingModal';
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
      
      <div className="absolute top-[10%] right-[10%] animate-float opacity-30 pointer-events-none">
        <img src={securityImg} alt="" className="w-56 object-contain drop-shadow-2xl grayscale-[0.2]" />
      </div>
      <div className="absolute bottom-[5%] left-[25%] animate-float-slow opacity-10 pointer-events-none">
        <img src={medicineBoxImg} alt="" className="w-40 object-contain drop-shadow-2xl -rotate-12" />
      </div>

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
                       <div key={doctor._id} className="bg-white dark:bg-[#0B1121] p-8 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform">
                             <Stethoscope size={100} />
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                             <div className="w-24 h-24 rounded-[2.5rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center border-4 border-white dark:border-[#151E32] shadow-2xl mb-6">
                                <UserCheck className="text-[#2A7FFF]" size={40} />
                             </div>
                             <h4 className="text-[1.4rem] font-black text-slate-900 dark:text-white leading-tight mb-2">{doctor.name}</h4>
                             <p className="text-[0.8rem] font-black text-[#2A7FFF] uppercase tracking-[0.2em] mb-4">{doctor.specialty}</p>
                             <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 text-emerald-500 rounded-full text-[0.7rem] font-black uppercase tracking-widest mb-8 border border-emerald-500/10">
                                <Clock size={14} /> Available Now
                             </div>
                             
                             <button 
                               onClick={() => handleShareClick(doctor)}
                               className="w-full py-4 bg-[#2A7FFF] text-white rounded-[1.8rem] font-black text-[0.9rem] uppercase tracking-widest shadow-lg shadow-[#2A7FFF]/25 hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                             >
                                <Share2 size={18} /> Share Report
                             </button>
                          </div>
                       </div>
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
