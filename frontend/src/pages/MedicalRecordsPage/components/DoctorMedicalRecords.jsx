import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter } from 'lucide-react';
import api from '../../../utils/api';
import SharedPatientSidebar from './SharedPatientSidebar';
import ClinicalHistoryTimeline from './ClinicalHistoryTimeline';

const DoctorMedicalRecords = () => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/api/records');
        const patientMap = {};
        data.forEach(record => {
          if (!record.patient) return;
          const p = record.patient;
          if (!patientMap[p._id]) {
            patientMap[p._id] = {
              id: p._id,
              name: p.name,
              patientId: p.patientId,
              gender: p.gender || 'Not Specified',
              age: p.age || '—',
              conditions: p.conditions || [],
              lastUpdate: new Date(record.createdAt).toLocaleDateString(),
              records: []
            };
          }
          patientMap[p._id].records.push({
            id: record._id,
            date: new Date(record.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            type: record.type,
            title: record.title,
            description: record.description,
            fileUrl: record.fileUrl,
            hospital: record.hospital
          });
        });

        const groupedPatients = Object.values(patientMap);
        setPatients(groupedPatients);
        if (groupedPatients.length > 0) setSelectedPatientId(groupedPatients[0].id);
      } catch (err) {
        console.error('Failed to fetch records', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const activePatient = patients.find(p => p.id === selectedPatientId);

  return (
    <main className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5 pb-24 md:pb-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47]">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
            <FileText size={30} className="text-[#2A7FFF] drop-shadow-[0_4px_8px_rgba(42,127,255,0.3)]" />
          </div>
          <div>
            <h1 className="text-[1.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
              Clinical Records
            </h1>
            <p className="text-[0.8rem] font-bold text-gray-400 mt-1 uppercase tracking-widest">
              Shared Patient Data Explorer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="pl-12 pr-6 py-3.5 bg-white dark:bg-[#0B1121] border-none rounded-2xl text-[0.85rem] text-slate-800 dark:text-white w-full sm:w-64 outline-none shadow-sm focus:ring-2 focus:ring-[#2A7FFF]/50"
            />
          </div>
          <button className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1A2642] border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 shadow-sm hover:text-[#2A7FFF] transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {loading ? (
         <div className="flex-1 flex flex-col items-center justify-center gap-4">
           <div className="w-12 h-12 border-4 border-[#2A7FFF] border-t-transparent rounded-full animate-spin"></div>
           <p className="text-gray-400 font-bold uppercase tracking-widest">Loading Patient Records...</p>
         </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 pb-4">
          <SharedPatientSidebar 
            patients={patients}
            selectedPatientId={selectedPatientId}
            onSelectPatient={setSelectedPatientId}
          />
          <ClinicalHistoryTimeline activePatient={activePatient} />
        </div>
      )}
    </main>
  );
};

export default DoctorMedicalRecords;
