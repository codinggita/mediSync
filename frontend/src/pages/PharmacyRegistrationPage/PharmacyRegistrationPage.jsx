import React, { useState } from 'react';
import { Pill, ShieldCheck } from 'lucide-react';
import api from '../../utils/api';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import RegistrationSuccess from './components/RegistrationSuccess';
import PharmacyRegistrationForm from './components/PharmacyRegistrationForm';

const PharmacyRegistrationPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    location: '',
    licenseNumber: '',
    document: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/pharmacies/register', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.response?.data?.message || 'Registration request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0f141f]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent)] pointer-events-none" />
        <TopBar />

        <main className="flex-1 overflow-y-auto px-6 py-12 scrollbar-hide pb-24 md:pb-6">
          {submitted ? (
            <RegistrationSuccess />
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Header Section */}
              <div className="flex flex-col items-center text-center mb-16">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm border border-emerald-500/20">
                  <Pill size={40} className="text-emerald-500" />
                </div>
                <h1 className="text-[2.8rem] font-black text-slate-900 dark:text-white leading-none tracking-tight">
                  Register Your <span className="text-emerald-500">Pharmacy</span>
                </h1>
                <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[0.85rem] mt-4 flex items-center gap-3">
                  <ShieldCheck size={16} className="text-emerald-500" /> Join our verified healthcare network
                </p>
              </div>

              <PharmacyRegistrationForm 
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PharmacyRegistrationPage;
