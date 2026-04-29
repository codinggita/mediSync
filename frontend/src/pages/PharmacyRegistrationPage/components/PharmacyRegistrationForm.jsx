import React from 'react';
import {
  Building2,
  User,
  Mail,
  Phone,
  FileBadge,
  MapPin,
  UploadCloud,
  Loader2,
  ArrowRight,
} from 'lucide-react';

const PharmacyRegistrationForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[4rem] p-16 shadow-[20px_20px_60px_#cbced1,-20px_-20px_60px_#ffffff] dark:shadow-[20px_20px_60px_#0a0f1d] border border-white/40">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Pharmacy Name */}
        <div className="space-y-3">
          <label className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
            <Building2 size={14} className="text-emerald-500" /> Pharmacy Name
          </label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. LifeCare Pharmacy"
            className="w-full px-8 py-5 bg-white dark:bg-[#0B1121] rounded-[1.8rem] border-none outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-700 dark:text-white font-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] dark:shadow-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Owner Name */}
        <div className="space-y-3">
          <label className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
            <User size={14} className="text-emerald-500" /> Owner Name
          </label>
          <input
            required
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Full Legal Name"
            className="w-full px-8 py-5 bg-white dark:bg-[#0B1121] rounded-[1.8rem] border-none outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-700 dark:text-white font-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] dark:shadow-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-3">
          <label className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
            <Mail size={14} className="text-emerald-500" /> Email Address
          </label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="contact@pharmacy.com"
            className="w-full px-8 py-5 bg-white dark:bg-[#0B1121] rounded-[1.8rem] border-none outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-700 dark:text-white font-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] dark:shadow-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-3">
          <label className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
            <Phone size={14} className="text-emerald-500" /> Phone Number
          </label>
          <input
            required
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-8 py-5 bg-white dark:bg-[#0B1121] rounded-[1.8rem] border-none outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-700 dark:text-white font-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] dark:shadow-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* License Number */}
        <div className="space-y-3">
          <label className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
            <FileBadge size={14} className="text-emerald-500" /> License Number
          </label>
          <input
            required
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="DL-XXXXX-2026"
            className="w-full px-8 py-5 bg-white dark:bg-[#0B1121] rounded-[1.8rem] border-none outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-700 dark:text-white font-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] dark:shadow-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
            <MapPin size={14} className="text-emerald-500" /> Pharmacy Location
          </label>
          <input
            required
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State, Full Address"
            className="w-full px-8 py-5 bg-white dark:bg-[#0B1121] rounded-[1.8rem] border-none outline-none focus:ring-4 focus:ring-emerald-500/10 text-slate-700 dark:text-white font-black shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)] dark:shadow-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Document Upload */}
        <div className="md:col-span-2 space-y-3">
          <label className="text-[0.75rem] font-black text-slate-500 uppercase tracking-widest ml-4">
            License Document (Optional)
          </label>
          <div className="w-full h-40 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all cursor-pointer group">
            <UploadCloud
              size={32}
              className="text-slate-300 group-hover:text-emerald-500 transition-colors"
            />
            <p className="text-[0.8rem] font-black text-slate-400 group-hover:text-emerald-600 transition-colors">
              Drag or click to upload license PDF/Image
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full py-6 bg-emerald-500 text-white rounded-[2rem] font-black text-[1.1rem] shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.4)] hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:translate-y-0"
          >
            {loading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <>
                Submit Registration Request <ArrowRight size={24} />
              </>
            )}
          </button>
          <p className="text-center text-[0.75rem] font-bold text-slate-400 mt-6 uppercase tracking-widest">
            Your request will be verified by the clinical administration team
          </p>
        </div>
      </form>
    </div>
  );
};

export default PharmacyRegistrationForm;
