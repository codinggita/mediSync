import React from 'react';
import { Award, Activity, BookOpen } from 'lucide-react';

const DoctorClinicalBio = ({ doctor }) => {
  return (
    <div className="bg-white dark:bg-[#151E32] rounded-[4rem] p-12 lg:p-16 border border-white dark:border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2A7FFF]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="flex items-center gap-5 mb-12 relative z-10">
        <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl">
          <Award size={32} />
        </div>
        <div>
          <h2 className="text-[1.8rem] font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">Professional Protocol</h2>
          <p className="text-[0.7rem] font-black text-slate-400 uppercase tracking-[0.4em]">Verified Clinical Credential</p>
        </div>
      </div>

      <div className="space-y-12 relative z-10">
        <section>
          <h3 className="text-[0.75rem] font-black text-[#2A7FFF] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
            <Activity size={16} /> Expert Insight
          </h3>
          <p className="text-[1.25rem] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{doctor.about}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h3 className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Academic Foundation</h3>
            <div className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-[#0B1121]/50 border border-slate-100 dark:border-white/5 flex items-start gap-5 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#151E32] flex items-center justify-center text-[#2A7FFF] shadow-md shrink-0">
                <BookOpen size={24} />
              </div>
              <p className="text-[1.1rem] font-black text-slate-800 dark:text-white leading-tight">{doctor.education}</p>
            </div>
          </section>

          <section>
            <h3 className="text-[0.75rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Clinical Focus</h3>
            <div className="flex flex-wrap gap-4">
              {doctor.tags.map(tag => (
                <div key={tag} className="px-6 py-3 bg-white dark:bg-[#151E32] border border-slate-200 dark:border-white/10 rounded-[20px] text-[0.8rem] font-black text-slate-700 dark:text-slate-300 shadow-sm hover:border-[#2A7FFF] transition-all cursor-default">
                  {tag}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DoctorClinicalBio;
