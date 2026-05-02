import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import {
  Building2,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import PremiumLoader from '../../../components/PremiumLoader';
import PharmacyVerificationTable from './PharmacyVerificationTable';

const MOCK_PHARMACIES = [
  { id: 'mock_ph1',  name: 'Apollo Care Pharmacy',       email: 'contact@apollocare.com',      location: 'Connaught Place, New Delhi',    date: '30 Apr 2026', status: 'Verified',  verificationStatus: 'Verified'  },
  { id: 'mock_ph2',  name: 'Global Pharma Node',         email: 'node1@globalpharma.com',      location: 'BKC, Mumbai',                  date: '29 Apr 2026', status: 'Verified',  verificationStatus: 'Verified'  },
  { id: 'mock_ph3',  name: 'LifeLine Meds',              email: 'info@lifelinemeds.net',       location: 'MG Road, Bengaluru',           date: '29 Apr 2026', status: 'Pending',   verificationStatus: 'Pending'   },
  { id: 'mock_ph4',  name: 'Wellness Dispense',          email: 'sales@wellnessdispense.org',  location: 'Jubilee Hills, Hyderabad',     date: '28 Apr 2026', status: 'Rejected',  verificationStatus: 'Rejected'  },
  { id: 'mock_ph5',  name: 'City Central Dispensary',    email: 'city@dispensary.com',         location: 'Park Street, Kolkata',         date: '28 Apr 2026', status: 'Verified',  verificationStatus: 'Verified'  },
  { id: 'mock_ph6',  name: 'Prime Health Apothecary',    email: 'prime@healthapoth.com',       location: 'Anna Nagar, Chennai',          date: '27 Apr 2026', status: 'Pending',   verificationStatus: 'Pending'   },
  { id: 'mock_ph7',  name: 'CureAll Depot',              email: 'depot@cureall.co',            location: 'Koregaon Park, Pune',          date: '27 Apr 2026', status: 'Verified',  verificationStatus: 'Verified'  },
  { id: 'mock_ph8',  name: 'QuickMeds Supply',           email: 'support@quickmeds.com',       location: 'Satellite, Ahmedabad',         date: '26 Apr 2026', status: 'Rejected',  verificationStatus: 'Rejected'  },
  { id: 'mock_ph9',  name: 'Harmony Medications',        email: 'hello@harmonymeds.com',       location: 'Civil Lines, Jaipur',          date: '26 Apr 2026', status: 'Verified',  verificationStatus: 'Verified'  },
  { id: 'mock_ph10', name: 'Apex Clinical Pharmacy',     email: 'apex@clinicalpharm.org',      location: 'Sector 17, Chandigarh',        date: '25 Apr 2026', status: 'Pending',   verificationStatus: 'Pending'   },
  { id: 'mock_ph11', name: 'MedSync Central Hub',        email: 'hub@medsyncrx.com',           location: 'Gomti Nagar, Lucknow',         date: '25 Apr 2026', status: 'Verified',  verificationStatus: 'Verified'  },
  { id: 'mock_ph12', name: 'NovaCare Pharmacy',          email: 'info@novacareameds.com',      location: 'IT Park, Indore',              date: '24 Apr 2026', status: 'Pending',   verificationStatus: 'Pending'   },
  { id: 'mock_ph13', name: 'EasyMeds Online Dispensary', email: 'orders@easymeds.in',          location: 'VIP Road, Bhopal',             date: '24 Apr 2026', status: 'Verified',  verificationStatus: 'Verified'  },
  { id: 'mock_ph14', name: 'ZenHealth Pharmaceuticals',  email: 'zenhealth@pharm.net',         location: 'Frazer Town, Bengaluru',       date: '23 Apr 2026', status: 'Rejected',  verificationStatus: 'Rejected'  },
  { id: 'mock_ph15', name: 'UrbanDose Pharma Solutions', email: 'connect@urbandose.com',       location: 'Vashi, Navi Mumbai',           date: '22 Apr 2026', status: 'Pending',   verificationStatus: 'Pending'   },
];

const AdminPharmacyTab = () => {
  const [pharmacies, setPharmacies] = useState(MOCK_PHARMACIES); 
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/pharmacies');
      const realPharmacies = Array.isArray(data) ? data : [];

      
      const uniqueMocks = MOCK_PHARMACIES.filter(
        (mp) => !realPharmacies.find((rp) => rp.email === mp.email)
      );
      setPharmacies([...realPharmacies, ...uniqueMocks]);
    } catch (e) {
      
      setPharmacies(MOCK_PHARMACIES);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id, action) => {
    try {
      await api.patch(`/admin/pharmacies/${id}/verify`, { action });
      fetchPharmacies();
    } catch (e) {
      alert('Action failed');
    }
  };

  const filtered = pharmacies.filter((p) => filter === 'All' || p.verificationStatus === filter);

  if (loading) return <PremiumLoader message="Syncing Pharmacy Network" />;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1
            className={`text-[2.5rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}
          >
            Pharmacy <span className="text-[#2ECC71]">Nexus</span>
          </h1>
          <p className="text-slate-500 text-sm mt-3 font-bold uppercase tracking-wider opacity-80">
            Verification & Global Network Management
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#ecf0f3] dark:bg-[#0B1121] p-2 rounded-[2rem] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47]">
          {['All', 'Pending', 'Verified', 'Rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-full text-[0.75rem] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center min-w-[120px] ${
                filter === f
                  ? 'bg-white dark:bg-[#2ECC71] text-[#2ECC71] dark:text-white shadow-[4px_4px_12px_#cbced1,-4px_-4px_12px_#ffffff] dark:shadow-[0_8px_20px_rgba(46,204,113,0.3)] scale-105 z-10'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/40'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`rounded-[3.5rem] overflow-hidden bg-[#ecf0f3] dark:bg-[#151E32] shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 transition-all`}
      >
        <PharmacyVerificationTable
          pharmacies={filtered}
          onVerify={handleVerify}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default AdminPharmacyTab;
