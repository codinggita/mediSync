import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { useTheme } from '../../../context/ThemeContext';
import healthAbstractImg from '../../../assets/images/health_abstract.png';
import PremiumLoader from '../../../components/PremiumLoader';
import PriceModificationForm from './PriceModificationForm';
import MarketComparisonTable from './MarketComparisonTable';

const MOCK_MEDICINES_PRICE = [
  { _id: 'pm1', name: 'Paracetamol',   dosage: '500mg'  },
  { _id: 'pm2', name: 'Lisinopril',    dosage: '10mg'   },
  { _id: 'pm3', name: 'Metformin',     dosage: '500mg'  },
  { _id: 'pm4', name: 'Amoxicillin',   dosage: '250mg'  },
  { _id: 'pm5', name: 'Atorvastatin',  dosage: '20mg'   },
  { _id: 'pm6', name: 'Omeprazole',    dosage: '40mg'   },
  { _id: 'pm7', name: 'Aspirin',       dosage: '81mg'   },
  { _id: 'pm8', name: 'Ibuprofen',     dosage: '400mg'  },
  { _id: 'pm9', name: 'Azithromycin',  dosage: '500mg'  },
  { _id: 'pm10', name: 'Dolo 650',     dosage: '650mg'  },
];

const MOCK_PHARMACIES_PRICE = [
  { _id: 'pp1', name: 'Apollo Pharmacy'      },
  { _id: 'pp2', name: 'MedPlus'              },
  { _id: 'pp3', name: 'Wellness Forever'     },
  { _id: 'pp4', name: 'MediSync Central Hub' },
  { _id: 'pp5', name: 'CureAll Depot'        },
];

const MOCK_PRICES = [
  { _id: 'mock_pr1',  medicine: { name: 'Paracetamol',  dosage: '500mg'  }, pharmacy: { name: 'MediSync Central Hub' }, price: 123,  discount: 10 },
  { _id: 'mock_pr2',  medicine: { name: 'Paracetamol',  dosage: '500mg'  }, pharmacy: { name: 'Apollo Pharmacy'      }, price: 135,  discount: 5  },
  { _id: 'mock_pr3',  medicine: { name: 'Lisinopril',   dosage: '10mg'   }, pharmacy: { name: 'Apollo Pharmacy'      }, price: 210,  discount: 15 },
  { _id: 'mock_pr4',  medicine: { name: 'Lisinopril',   dosage: '10mg'   }, pharmacy: { name: 'Wellness Forever'     }, price: 195,  discount: 5  },
  { _id: 'mock_pr5',  medicine: { name: 'Metformin',    dosage: '500mg'  }, pharmacy: { name: 'MediSync Central Hub' }, price: 189,  discount: 10 },
  { _id: 'mock_pr6',  medicine: { name: 'Metformin',    dosage: '500mg'  }, pharmacy: { name: 'MedPlus'              }, price: 175,  discount: 8  },
  { _id: 'mock_pr7',  medicine: { name: 'Amoxicillin',  dosage: '250mg'  }, pharmacy: { name: 'CureAll Depot'        }, price: 187,  discount: 12 },
  { _id: 'mock_pr8',  medicine: { name: 'Amoxicillin',  dosage: '250mg'  }, pharmacy: { name: 'Wellness Forever'     }, price: 200,  discount: 8  },
  { _id: 'mock_pr9',  medicine: { name: 'Atorvastatin', dosage: '20mg'   }, pharmacy: { name: 'MediSync Central Hub' }, price: 340,  discount: 12 },
  { _id: 'mock_pr10', medicine: { name: 'Atorvastatin', dosage: '20mg'   }, pharmacy: { name: 'Apollo Pharmacy'      }, price: 360,  discount: 18 },
  { _id: 'mock_pr11', medicine: { name: 'Omeprazole',   dosage: '40mg'   }, pharmacy: { name: 'Apollo Pharmacy'      }, price: 150,  discount: 8  },
  { _id: 'mock_pr12', medicine: { name: 'Omeprazole',   dosage: '40mg'   }, pharmacy: { name: 'MedPlus'              }, price: 138,  discount: 5  },
  { _id: 'mock_pr13', medicine: { name: 'Aspirin',      dosage: '81mg'   }, pharmacy: { name: 'Wellness Forever'     }, price: 80,   discount: 0  },
  { _id: 'mock_pr14', medicine: { name: 'Aspirin',      dosage: '81mg'   }, pharmacy: { name: 'CureAll Depot'        }, price: 75,   discount: 5  },
  { _id: 'mock_pr15', medicine: { name: 'Ibuprofen',    dosage: '400mg'  }, pharmacy: { name: 'MedPlus'              }, price: 95,   discount: 5  },
  { _id: 'mock_pr16', medicine: { name: 'Ibuprofen',    dosage: '400mg'  }, pharmacy: { name: 'CureAll Depot'        }, price: 88,   discount: 0  },
  { _id: 'mock_pr17', medicine: { name: 'Azithromycin', dosage: '500mg'  }, pharmacy: { name: 'Apollo Pharmacy'      }, price: 290,  discount: 10 },
  { _id: 'mock_pr18', medicine: { name: 'Azithromycin', dosage: '500mg'  }, pharmacy: { name: 'MediSync Central Hub' }, price: 265,  discount: 15 },
  { _id: 'mock_pr19', medicine: { name: 'Dolo 650',     dosage: '650mg'  }, pharmacy: { name: 'Wellness Forever'     }, price: 30,   discount: 0  },
  { _id: 'mock_pr20', medicine: { name: 'Dolo 650',     dosage: '650mg'  }, pharmacy: { name: 'MedPlus'              }, price: 28,   discount: 5  },
];

const AdminPriceTab = () => {
  const [prices, setPrices] = useState(MOCK_PRICES);         
  const [medicines, setMedicines] = useState(MOCK_MEDICINES_PRICE);
  const [pharmacies, setPharmacies] = useState(MOCK_PHARMACIES_PRICE);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ medicineId: MOCK_MEDICINES_PRICE[0]._id, pharmacyId: MOCK_PHARMACIES_PRICE[0]._id, price: '', discount: '' });
  const [saving, setSaving] = useState(false);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.get('/admin/prices'),
      api.get('/admin/medicines'),
      api.get('/admin/pharmacies'),
    ])
      .then(([p, m, ph]) => {
        const realPrices     = Array.isArray(p.data)  ? p.data  : [];
        const realMeds       = Array.isArray(m.data)  ? m.data  : [];
        const realPharmacies = Array.isArray(ph.data) ? ph.data : [];

        
        const uniqueMockPrices = MOCK_PRICES.filter(
          (mp) => !realPrices.find((rp) => rp._id === mp._id)
        );
        const finalMeds       = realMeds.length       ? realMeds       : MOCK_MEDICINES_PRICE;
        const finalPharmacies = realPharmacies.length ? realPharmacies : MOCK_PHARMACIES_PRICE;

        setPrices([...realPrices, ...uniqueMockPrices]);
        setMedicines(finalMeds);
        setPharmacies(finalPharmacies);
        if (finalMeds[0])       setForm((f) => ({ ...f, medicineId: finalMeds[0]._id }));
        if (finalPharmacies[0]) setForm((f) => ({ ...f, pharmacyId: finalPharmacies[0]._id }));
      })
      .catch(() => {
        
        setPrices(MOCK_PRICES);
        setMedicines(MOCK_MEDICINES_PRICE);
        setPharmacies(MOCK_PHARMACIES_PRICE);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpsert = async (e) => {
    e.preventDefault();
    if (!form.price) return;
    setSaving(true);
    try {
      
      const selectedMed = medicines.find((m) => m._id === form.medicineId);
      const selectedPharma = pharmacies.find((p) => p._id === form.pharmacyId);

      const newPriceEntry = {
        _id: `pr${Date.now()}`,
        medicine: selectedMed,
        pharmacy: selectedPharma,
        price: parseFloat(form.price),
        discount: parseFloat(form.discount || 0),
      };

      
      setPrices((prev) => {
        const index = prev.findIndex(
          (p) => p.medicine?._id === form.medicineId && p.pharmacy?._id === form.pharmacyId
        );
        if (index > -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            price: parseFloat(form.price),
            discount: parseFloat(form.discount || 0),
          };
          return updated;
        }
        return [newPriceEntry, ...prev];
      });

      
      if (!form.medicineId.toString().startsWith('m')) {
        await api.post('/admin/prices', form);
      }

      setForm((f) => ({ ...f, price: '', discount: '' }));
      setSaving('success');
      setTimeout(() => setSaving(false), 2000);
    } catch (e) {
      console.error('Failed to commit price', e);
      setSaving(false);
    }
  };

  const getPriceHighlight = (price) => {
    const related = prices
      .filter((p) => p.medicine?._id === price.medicine?._id)
      .map((p) => p.price);
    if (related.length < 2) return 'normal';
    if (price.price === Math.min(...related)) return 'lowest';
    if (price.price === Math.max(...related)) return 'highest';
    return 'normal';
  };

  if (loading) return <PremiumLoader message="Indexing Market Trends" />;

  return (
    <div className="flex flex-col gap-10 relative overflow-hidden min-h-[600px]">
      <div className="absolute -right-20 top-20 w-[600px] h-[600px] opacity-[0.02] pointer-events-none scale-150">
        <img src={healthAbstractImg} alt="Abstract" className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col gap-10 relative z-10">
        <div>
          <h1
            className={`text-[3rem] font-black leading-none ${isDarkMode ? 'text-white' : 'text-[#1F2937]'}`}
          >
            Market <span className="text-[#8B5CF6]">Dynamics</span>
          </h1>
          <p className="text-slate-500 text-sm mt-4 font-bold uppercase tracking-[0.2em] opacity-80">
            Overseeing system-wide pharmaceutical pricing governance
          </p>
        </div>

        <PriceModificationForm
          form={form}
          setForm={setForm}
          medicines={medicines}
          pharmacies={pharmacies}
          onUpsert={handleUpsert}
          saving={saving}
          isDarkMode={isDarkMode}
        />

        <MarketComparisonTable
          prices={prices}
          getPriceHighlight={getPriceHighlight}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default AdminPriceTab;
