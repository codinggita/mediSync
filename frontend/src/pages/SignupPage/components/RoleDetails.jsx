import React from 'react';
import { Droplets, Users, ShieldCheck, Stethoscope, Building2, FileText, Mail, UploadCloud } from 'lucide-react';

const RoleDetails = ({ formik, step }) => {
  if (step !== 2) return null;

  return (
    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
      {(formik.values.role === 'Patient' || formik.values.role === 'Admin') && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {formik.values.role === 'Patient' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Blood Group</label>
                <div className="relative flex items-center group">
                  <Droplets className={`absolute left-4 transition-colors ${formik.errors.bloodGroup && formik.touched.bloodGroup ? 'text-red-400' : 'text-slate-400'}`} size={16} />
                  <select 
                    {...formik.getFieldProps('bloodGroup')}
                    className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all appearance-none shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff]"
                  >
                    <option value="" className="text-slate-400">Select</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                {formik.touched.bloodGroup && formik.errors.bloodGroup && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.bloodGroup}</span>}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-black text-slate-500 uppercase tracking-widest pl-1">Gender</label>
                <div className="relative flex items-center group">
                  <Users className={`absolute left-4 transition-colors ${formik.errors.gender && formik.touched.gender ? 'text-red-400' : 'text-slate-400'}`} size={16} />
                  <select 
                    {...formik.getFieldProps('gender')}
                    className="w-full py-3 pl-11 pr-4 bg-[#ecf0f3] border-none rounded-xl text-[0.85rem] text-slate-700 outline-none transition-all appearance-none shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_10px_#cbced1,inset_-6px_-6px_10px_#ffffff]"
                  >
                    <option value="" className="text-slate-400">Select</option>
                    {['Male', 'Female', 'Other'].map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                {formik.touched.gender && formik.errors.gender && <span className="text-[0.6rem] font-bold text-red-500 ml-2">{formik.errors.gender}</span>}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-[#ecf0f3] rounded-[2rem] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff]">
              <ShieldCheck size={48} className="mx-auto text-[#2A7FFF] mb-4 opacity-40" />
              <p className="text-[0.8rem] font-bold text-slate-500 uppercase tracking-widest">Admin Credentials Required</p>
              <p className="text-[0.65rem] text-slate-400 mt-2">No additional biological data needed for Admin tier.</p>
            </div>
          )}
        </div>
      )}

      {formik.values.role === 'Doctor' && (
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
      )}
    </div>
  );
};

export default RoleDetails;
