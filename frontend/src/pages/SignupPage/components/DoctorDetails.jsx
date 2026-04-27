import React from 'react';
import { Stethoscope, Building2, FileText, Mail, UploadCloud } from 'lucide-react';

const DoctorDetails = ({ formik }) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Specialty</label>
          <div className="relative flex items-center group">
            <Stethoscope className={`absolute left-4 transition-colors ${formik.errors.specialty && formik.touched.specialty ? 'text-red-400' : 'text-slate-400'}`} size={16} />
            <input 
              {...formik.getFieldProps('specialty')}
              placeholder="Cardiologist"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.specialty && formik.errors.specialty && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.specialty}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Hospital</label>
          <div className="relative flex items-center group">
            <Building2 className={`absolute left-4 transition-colors ${formik.errors.hospital && formik.touched.hospital ? 'text-red-400' : 'text-slate-400'}`} size={16} />
            <input 
              {...formik.getFieldProps('hospital')}
              placeholder="City Hospital"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.hospital && formik.errors.hospital && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.hospital}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">License ID</label>
          <div className="relative flex items-center group">
            <FileText className={`absolute left-4 transition-colors ${formik.errors.medicalLicenseId && formik.touched.medicalLicenseId ? 'text-red-400' : 'text-slate-400'}`} size={16} />
            <input 
              {...formik.getFieldProps('medicalLicenseId')}
              placeholder="MED-12345"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.medicalLicenseId && formik.errors.medicalLicenseId && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.medicalLicenseId}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Org Email</label>
          <div className="relative flex items-center group">
            <Mail className={`absolute left-4 transition-colors ${formik.errors.orgEmail && formik.touched.orgEmail ? 'text-red-400' : 'text-slate-400'}`} size={16} />
            <input 
              {...formik.getFieldProps('orgEmail')}
              placeholder="dr.smith@hospital.com"
              className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
            />
          </div>
          {formik.touched.orgEmail && formik.errors.orgEmail && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.orgEmail}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Upload Certificate</label>
        <div className="relative flex items-center group">
          <UploadCloud className={`absolute left-4 transition-colors ${formik.errors.licenseCertificateUrl && formik.touched.licenseCertificateUrl ? 'text-red-400' : 'text-slate-400'}`} size={16} />
          <input 
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => {
              const file = e.currentTarget.files[0];
              if (file) {
                formik.setFieldValue('licenseCertificateUrl', file.name);
              } else {
                formik.setFieldValue('licenseCertificateUrl', '');
              }
            }}
            className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.75rem] text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-[0.7rem] file:font-bold file:bg-[#2A7FFF] file:text-white hover:file:bg-blue-600 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff]"
          />
        </div>
        {formik.touched.licenseCertificateUrl && formik.errors.licenseCertificateUrl && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.licenseCertificateUrl}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Doctor Profile Image (URL)</label>
        <div className="relative flex items-center group">
          <UploadCloud className={`absolute left-4 transition-colors ${formik.errors.profilePic && formik.touched.profilePic ? 'text-red-400' : 'text-slate-400'}`} size={16} />
          <input 
            {...formik.getFieldProps('profilePic')}
            placeholder="https://image-link.com/photo.jpg"
            className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff] placeholder-slate-400"
          />
        </div>
        {formik.touched.profilePic && formik.errors.profilePic && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.profilePic}</span>}
      </div>
    </div>
  );
};

export default DoctorDetails;
