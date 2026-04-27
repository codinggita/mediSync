import React, { useState } from 'react';
import { Mail, Lock, User, Building, BadgeCheck, Stethoscope, Briefcase, FileText, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

const DoctorForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    hospitalName: '',
    institutionalEmail: '',
    licenseNumber: '',
    yearsExperience: '',
    termsAccepted: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError(null);
  };

  const nextStep = () => {
    setError(null);
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.password || !formData.confirmPassword) {
        return setError('Please fill in all fields.');
      }
      if (formData.password !== formData.confirmPassword) {
        return setError('Passwords do not match.');
      }
    }
    if (step === 2) {
      if (!formData.specialization || !formData.hospitalName || !formData.institutionalEmail) {
        return setError('Please complete your professional details.');
      }
    }
    setStep(s => s + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep(s => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }
    
    setError(null);
    if (!formData.licenseNumber || !formData.yearsExperience || !formData.termsAccepted) {
      return setError('Please provide license details and accept terms.');
    }

    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));
      console.log('Doctor Signup Data:', formData);
    } catch (err) {
      setError(err.message || 'Verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 relative min-h-[360px]">
      
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Step {step} of 3</span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-4 bg-[#2A7FFF]' : 'w-1.5 bg-gray-200'}`} />
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-2 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-[#D32F2F] animate-slideUp shadow-sm">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}

      <div className="flex-1">
        {step === 1 && (
          <div className="flex flex-col gap-3.5 animate-slideUp">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">First Name</label>
                <div className="relative flex items-center group">
                  <User className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First" className="w-full py-3 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Last Name</label>
                <div className="relative flex items-center group">
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last" className="w-full py-3 px-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                <div className="relative flex items-center group">
                  <Lock className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create password" className="w-full py-3 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Confirm</label>
                <div className="relative flex items-center group">
                  <Lock className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm" className="w-full py-3 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
                </div>
              </div>
            </div>
            
            {/* Google Signup for Doctors */}
            <div className="flex items-center gap-4 mt-2 mb-1 text-gray-300 text-[0.75rem] font-bold uppercase tracking-wider">
              <div className="flex-1 h-[1.5px] bg-gray-100"></div>
              OR
              <div className="flex-1 h-[1.5px] bg-gray-100"></div>
            </div>
            <button type="button" className="flex items-center justify-center gap-3 w-full bg-white border-[1.5px] border-gray-200 py-3 rounded-xl font-bold text-[0.9rem] text-gray-700 shadow-sm hover:bg-gray-50 hover:-translate-y-[1px] transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3.5 animate-slideUp">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Specialization</label>
              <div className="relative flex items-center group">
                <Stethoscope className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                <select name="specialization" value={formData.specialization} onChange={handleChange} className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all appearance-none cursor-pointer">
                  <option value="" disabled>Select Specialization</option>
                  <option value="General">General Practice</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Hospital / Clinic Name</label>
              <div className="relative flex items-center group">
                <Building className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                <input type="text" name="hospitalName" value={formData.hospitalName} onChange={handleChange} placeholder="City General Hospital" className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Institutional Email</label>
              <div className="relative flex items-center group">
                <Mail className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                <input type="email" name="institutionalEmail" value={formData.institutionalEmail} onChange={handleChange} placeholder="doctor@hospital.org" className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3.5 animate-slideUp">
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-[1.5]">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Medical License No.</label>
                <div className="relative flex items-center group">
                  <BadgeCheck className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                  <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} placeholder="MD-123456" className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Experience</label>
                <div className="relative flex items-center group">
                  <Briefcase className="absolute left-3.5 text-gray-400 group-focus-within:text-[#2A7FFF] transition-colors" size={18} />
                  <input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} placeholder="Years" className="w-full py-2.5 pl-10 pr-4 border-[1.5px] border-gray-200 rounded-xl text-sm bg-gray-50 focus:bg-white outline-none focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/10 transition-all" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Upload ID Proof</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-white hover:border-[#2A7FFF] transition-all cursor-pointer">
                <FileText className="text-gray-400" size={24} />
                <span className="text-[0.8rem] font-medium text-gray-500">Click to upload license document</span>
              </div>
            </div>

            <label className="flex items-start gap-2.5 text-sm mt-1 cursor-pointer group">
              <div className="relative flex items-center mt-0.5">
                <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="peer sr-only" />
                <div className="w-4 h-4 bg-white border-[1.5px] border-gray-300 rounded-[4px] peer-checked:bg-[#2A7FFF] peer-checked:border-[#2A7FFF] transition-all group-hover:border-[#2A7FFF] flex items-center justify-center shadow-sm">
                  <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <span className="text-gray-600 font-medium leading-tight text-[0.8rem]">
                I verify that the information is accurate and agree to the <a href="#" className="text-[#2A7FFF] hover:underline">Provider Terms</a>
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-4">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="px-4 py-3 rounded-xl border-[1.5px] border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all">
            <ArrowLeft size={18} />
          </button>
        )}
        <button type="submit" disabled={isLoading} className="flex-1 flex items-center justify-center gap-2 bg-[#2A7FFF] text-white py-3 rounded-xl font-bold text-[0.95rem] shadow-[0_4px_12px_rgba(46,125,50,0.25)] hover:bg-[#1B5E20] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(46,125,50,0.35)] active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none transition-all duration-200">
          {isLoading ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : (
            <>{step === 3 ? 'Complete Verification' : 'Continue'} {step < 3 && <ArrowRight size={18} />}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default DoctorForm;
