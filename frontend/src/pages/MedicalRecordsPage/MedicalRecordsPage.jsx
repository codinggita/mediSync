import React, { useState, useEffect } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import DoctorMedicalRecords from './components/DoctorMedicalRecords';
import RecordsHeader from './components/RecordsHeader';
import RecordsContent from './components/RecordsContent';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const MedicalRecordsPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [records, setRecords] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
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
            <RecordsHeader />
            
            <RecordsContent 
              loading={loading}
              records={records}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              selectedRecord={selectedRecord}
            />
          </main>
        )}
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
