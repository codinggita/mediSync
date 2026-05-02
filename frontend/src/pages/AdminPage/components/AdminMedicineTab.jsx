import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import { Plus, Search } from 'lucide-react';
import PremiumLoader from '../../../components/PremiumLoader';
import MedicineCard from './MedicineCard';
import MedicineModal from './MedicineModal';

const MOCK_MEDICINES = [
  { _id: 'mock_m1',  name: 'Lisinopril',      category: 'Blood Pressure',    dosage: '10mg',   manufacturer: 'CIPLA',        stockStatus: 'In Stock'    },
  { _id: 'mock_m2',  name: 'Metformin',        category: 'Diabetes',          dosage: '500mg',  manufacturer: 'SUN PHARMA',   stockStatus: 'In Stock'    },
  { _id: 'mock_m3',  name: 'Paracetamol',      category: 'Pain Relief',       dosage: '500mg',  manufacturer: 'GSK',          stockStatus: 'In Stock'    },
  { _id: 'mock_m4',  name: 'Amoxicillin',      category: 'Antibiotics',       dosage: '250mg',  manufacturer: 'PFIZER',       stockStatus: 'In Stock'    },
  { _id: 'mock_m5',  name: 'Atorvastatin',     category: 'Cholesterol',       dosage: '20mg',   manufacturer: 'DR REDDY',     stockStatus: 'Low Stock'   },
  { _id: 'mock_m6',  name: 'Omeprazole',       category: 'Gastrointestinal',  dosage: '40mg',   manufacturer: 'ASTRAZENECA',  stockStatus: 'In Stock'    },
  { _id: 'mock_m7',  name: 'Aspirin',          category: 'Blood Thinner',     dosage: '81mg',   manufacturer: 'BAYER',        stockStatus: 'Out of Stock'},
  { _id: 'mock_m8',  name: 'Ibuprofen',        category: 'Pain Relief',       dosage: '400mg',  manufacturer: 'ADVIL',        stockStatus: 'In Stock'    },
  { _id: 'mock_m9',  name: 'Cetirizine',       category: 'Allergy',           dosage: '10mg',   manufacturer: 'ZYRTEC',       stockStatus: 'In Stock'    },
  { _id: 'mock_m10', name: 'Losartan',         category: 'Blood Pressure',    dosage: '50mg',   manufacturer: 'MERCK',        stockStatus: 'Low Stock'   },
  { _id: 'mock_m11', name: 'Amlodipine',       category: 'Blood Pressure',    dosage: '5mg',    manufacturer: 'PFIZER',       stockStatus: 'In Stock'    },
  { _id: 'mock_m12', name: 'Albuterol',        category: 'Asthma',            dosage: '90mcg',  manufacturer: 'GSK',          stockStatus: 'In Stock'    },
  { _id: 'mock_m13', name: 'Gabapentin',       category: 'Nerve Pain',        dosage: '300mg',  manufacturer: 'PFIZER',       stockStatus: 'Low Stock'   },
  { _id: 'mock_m14', name: 'Vitamin D3',       category: 'Supplements',       dosage: '60K IU', manufacturer: 'ABBOTT',       stockStatus: 'In Stock'    },
  { _id: 'mock_m15', name: 'Azithromycin',     category: 'Antibiotics',       dosage: '500mg',  manufacturer: 'CIPLA',        stockStatus: 'In Stock'    },
  { _id: 'mock_m16', name: 'Pantoprazole',     category: 'Gastrointestinal',  dosage: '40mg',   manufacturer: 'SUN PHARMA',   stockStatus: 'In Stock'    },
  { _id: 'mock_m17', name: 'Montelukast',      category: 'Asthma',            dosage: '10mg',   manufacturer: 'MERCK',        stockStatus: 'In Stock'    },
  { _id: 'mock_m18', name: 'Clopidogrel',      category: 'Blood Thinner',     dosage: '75mg',   manufacturer: 'SANOFI',       stockStatus: 'Low Stock'   },
  { _id: 'mock_m19', name: 'Levothyroxine',    category: 'Thyroid',           dosage: '50mcg',  manufacturer: 'ABBOTT',       stockStatus: 'In Stock'    },
  { _id: 'mock_m20', name: 'Dolo 650',         category: 'Pain Relief',       dosage: '650mg',  manufacturer: 'MICRO LABS',   stockStatus: 'In Stock'    },
];

const AdminMedicineTab = () => {
  const [medicines, setMedicines] = useState(MOCK_MEDICINES); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const openModal = (medicine = null) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedicine(null);
    setIsModalOpen(false);
  };

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/medicines', { params: { search } });
      const realData = Array.isArray(data) ? data : [];

      
      const uniqueMocks = MOCK_MEDICINES.filter(
        (mm) => !realData.find((rm) => rm.name?.toLowerCase() === mm.name?.toLowerCase())
      );
      setMedicines([...realData, ...uniqueMocks]);
    } catch (e) {
      
      setMedicines(MOCK_MEDICINES);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (formData) => {
    if (selectedMedicine) {
      setMedicines((prev) =>
        prev.map((m) =>
          m._id === selectedMedicine._id ? { ...m, ...formData } : m
        )
      );
    } else {
      const newMed = {
        _id: `m${Date.now()}`,
        category: 'General',
        stockStatus: 'In Stock',
        ...formData,
      };
      setMedicines((prev) => [newMed, ...prev]);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    setMedicines((prev) => prev.filter((m) => m._id !== id));
    try {
      if (!id.toString().startsWith('m')) {
        await api.delete(`/admin/medicines/${id}`);
      }
    } catch (e) {
      console.error('Registry Sync Failed', e);
    }
  };

  if (loading) return <PremiumLoader message="Indexing Global Formulary" />;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1
            className={`text-[2.8rem] font-black leading-none tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Global <span className="text-[#F59E0B]">Formulary</span>
          </h1>
          <p className="text-slate-500 text-sm mt-3 font-black uppercase tracking-[0.2em] opacity-80">
            System-Wide Medicine Registry Control
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] bg-[#ecf0f3] dark:bg-[#0B1121] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] min-w-[300px] border border-white/20">
            <Search size={20} className="text-[#F59E0B]" />
            <input
              type="text"
              placeholder="Search registry..."
              className="bg-transparent border-none outline-none text-[0.85rem] font-black w-full text-slate-700 dark:text-slate-300 placeholder:text-slate-400 uppercase tracking-widest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-3 bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_10px_20px_rgba(245,158,11,0.3)] active:scale-95"
          >
            <Plus size={20} strokeWidth={3} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {medicines
          .filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
          .map((m) => (
            <MedicineCard
              key={m._id}
              medicine={m}
              isDarkMode={isDarkMode}
              onEdit={openModal}
              onDelete={handleDelete}
            />
          ))}
      </div>

      {isModalOpen && (
        <MedicineModal
          selectedMedicine={selectedMedicine}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminMedicineTab;
