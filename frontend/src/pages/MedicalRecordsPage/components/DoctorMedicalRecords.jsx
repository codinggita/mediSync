import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Search, Filter, FolderOpen, X } from 'lucide-react';
import api from '../../../utils/api';
import SharedPatientSidebar from './SharedPatientSidebar';
import ClinicalHistoryTimeline from './ClinicalHistoryTimeline';

const DoctorMedicalRecords = () => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/records');
        const patientMap = {};

        data.forEach((record) => {
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
              records: [],
            };
          }
          patientMap[p._id].records.push({
            id: record._id,
            date: new Date(record.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            }),
            type: record.type,
            title: record.title,
            description: record.description,
            fileUrl: record.fileUrl,
            hospital: record.hospital,
          });
        });

        let groupedPatients = Object.values(patientMap);

        if (groupedPatients.length === 0) {
          groupedPatients = [
            {
              id: 'mock_1',
              name: 'James Wilson',
              patientId: 'MS-891-W',
              gender: 'Male',
              age: 42,
              conditions: ['Hypertension', 'Type 2 Diabetes'],
              lastUpdate: 'Today, 09:30 AM',
              records: [
                {
                  id: 'r1',
                  date: 'Today',
                  type: 'Lab Report',
                  title: 'HbA1c & Lipid Panel',
                  hospital: 'City General',
                },
                {
                  id: 'r2',
                  date: '15 Mar 2026',
                  type: 'Clinical Note',
                  title: 'Cardiology Follow-up',
                  hospital: 'HeartCare Clinic',
                },
              ],
            },
            {
              id: 'mock_2',
              name: 'Sarah Connor',
              patientId: 'MS-442-C',
              gender: 'Female',
              age: 34,
              conditions: ['Asthma'],
              lastUpdate: 'Yesterday',
              records: [
                {
                  id: 'r3',
                  date: 'Yesterday',
                  type: 'Imaging',
                  title: 'Chest X-Ray (PA View)',
                  hospital: 'MediSync Central',
                },
              ],
            },
          ];
        }

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

  const filteredPatients = useMemo(() => {
    if (!searchQuery) return patients;
    const lowerQuery = searchQuery.toLowerCase().trim();

    return patients.filter((p) => {
      
      const matchName = p.name?.toLowerCase().includes(lowerQuery);
      const matchId = p.patientId?.toLowerCase().includes(lowerQuery);
      const matchCondition = p.conditions?.some((c) => c.toLowerCase().includes(lowerQuery));

      
      const matchRecord = p.records?.some(
        (r) =>
          r.title?.toLowerCase().includes(lowerQuery) ||
          r.type?.toLowerCase().includes(lowerQuery) ||
          r.hospital?.toLowerCase().includes(lowerQuery)
      );

      return matchName || matchId || matchCondition || matchRecord;
    });
  }, [patients, searchQuery]);

  
  useEffect(() => {
    if (filteredPatients.length > 0) {
      if (!filteredPatients.find((p) => p.id === selectedPatientId)) {
        setSelectedPatientId(filteredPatients[0].id);
      }
    } else {
      setSelectedPatientId(null);
    }
  }, [filteredPatients, selectedPatientId]);

  const activePatient = filteredPatients.find((p) => p.id === selectedPatientId);

  return (
    <main className="flex-1 overflow-y-auto bg-[#ecf0f3] dark:bg-[#0B1121] px-6 lg:px-8 py-6 flex flex-col gap-8 pb-24 md:pb-6 scrollbar-hide">
      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2A7FFF]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border border-white/40 dark:border-white/5">
            <FileText
              size={30}
              className="text-[#2A7FFF] drop-shadow-[0_4px_8px_rgba(42,127,255,0.3)]"
            />
          </div>
          <div>
            <h1 className="text-[1.8rem] md:text-[2.2rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
              Clinical Records
            </h1>
            <p className="text-[0.8rem] font-bold text-[#2A7FFF] mt-1.5 uppercase tracking-widest">
              Shared Patient Data Explorer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
          <div className="relative group w-full md:w-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2A7FFF] transition-colors"
            />
            <input
              type="text"
              placeholder="Search by name, ID, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-10 py-4 bg-[#ecf0f3] dark:bg-[#0B1121] border-none rounded-2xl text-[0.85rem] text-slate-800 dark:text-white w-full sm:w-96 outline-none shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] focus:ring-2 focus:ring-[#2A7FFF]/30 transition-all font-medium"
            />
            {searchQuery && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="text-[0.6rem] font-bold text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded shadow-sm pointer-events-none">
                  ENTER
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
          <button className="w-14 h-14 shrink-0 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] text-slate-500 hover:text-[#2A7FFF] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:active:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] transition-all border border-white/40 dark:border-white/5">
            <Filter size={22} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 mt-10">
          <div className="w-16 h-16 border-4 border-[#ecf0f3] dark:border-[#151E32] border-t-[#2A7FFF] shadow-[0_0_20px_rgba(42,127,255,0.3)] rounded-full animate-spin"></div>
          <p className="text-[#2A7FFF] font-black uppercase tracking-widest text-[0.85rem]">
            Loading Patient Records...
          </p>
        </div>
      ) : patients.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-10 p-10 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-[inset_10px_10px_20px_#0a0f1d,inset_-10px_-10px_20px_#202d47] border border-white/20 dark:border-white/5">
          <div className="w-24 h-24 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center justify-center mb-6">
            <FolderOpen size={40} className="text-slate-400" />
          </div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            No Shared Patients Yet
          </h2>
          <p className="text-slate-500 font-bold text-[0.9rem] max-w-md text-center">
            When patients share their clinical records or imaging data with you, they will appear
            here in your centralized medical directory.
          </p>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center mt-10 p-10 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3rem] shadow-[inset_10px_10px_20px_#cbced1,inset_-10px_-10px_20px_#ffffff] dark:shadow-[inset_10px_10px_20px_#0a0f1d,inset_-10px_-10px_20px_#202d47] border border-white/20 dark:border-white/5">
          <div className="w-24 h-24 rounded-[2rem] bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] flex items-center justify-center mb-6">
            <Search size={40} className="text-slate-400" />
          </div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            No Matching Patients
          </h2>
          <p className="text-slate-500 font-bold text-[0.9rem] max-w-md text-center mb-8">
            We couldn't find any patients matching "{searchQuery}". Try adjusting your search
            criteria.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="px-8 py-3 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] text-[#2A7FFF] font-black uppercase tracking-widest text-[0.8rem] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] active:shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:active:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] transition-all border border-white/40 dark:border-white/5"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 pb-4 h-[calc(100vh-280px)] min-h-[500px]">
          <SharedPatientSidebar
            patients={filteredPatients}
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
