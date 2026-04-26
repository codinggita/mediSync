import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import RecordsTimeline from './components/RecordsTimeline';
import RecordDetailCard from './components/RecordDetailCard';
import DoctorMedicalRecords from './components/DoctorMedicalRecords';
import { History, Search, Filter, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const MedicalRecordsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await api.get('/records');
        setRecords(data);
        if (data.length > 0) setSelectedId(data[0]._id);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const selectedRecord = records.find(r => r._id === selectedId);

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#121826] transition-colors duration-300 font-sans relative">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />

        {user?.role === 'Doctor' ? (
          <DoctorMedicalRecords />
        ) : (
          <main className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5 pb-24 md:pb-6">
            {/* Header Section - Premium Vault Style */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
                  <History size={30} className="text-[#2A7FFF] drop-shadow-[0_4px_8px_rgba(42,127,255,0.3)]" />
                </div>
                <div>
                  <h1 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
                    Medical Vault
                  </h1>
                  <p className="text-[0.8rem] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                    Secure Biological Data History
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative group">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search vault..." 
                    className="pl-12 pr-6 py-3.5 neu-input text-[0.85rem] text-slate-800 dark:text-white w-full sm:w-64"
                  />
                </div>
                <button className="w-12 h-12 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center text-slate-500 shadow-[6px_6px_12px_#cbced1,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#0a0f1d,-6px_-6px_12px_#202d47] hover:text-[#2A7FFF] transition-all active:shadow-[inset_3px_3px_6px_#cbced1]">
                  <Filter size={20} />
                </button>
                <button 
                  onClick={() => navigate('/upload-record')}
                  className="flex items-center gap-3 px-8 py-3.5 bg-[#2A7FFF] text-white text-[0.9rem] font-black rounded-[1.8rem] shadow-[0_12px_24px_rgba(42,127,255,0.4)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Plus size={20} />
                  <span className="tracking-tight">Add Record</span>
                </button>
              </div>
            </div>

            {/* Main Content Layout */}
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-[#2A7FFF]" size={40} />
                <p className="text-gray-400 font-bold">Synchronizing medical vault...</p>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-5 pb-4">
                {/* Left Column: Timeline */}
                <div className="w-full lg:w-[320px] shrink-0">
                  <RecordsTimeline 
                    records={records}
                    selectedId={selectedId} 
                    onSelect={setSelectedId} 
                  />
                </div>

                {/* Right Column: Detail View */}
                <div className="flex-1 min-w-0">
                  <RecordDetailCard record={selectedRecord} />
                </div>
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
