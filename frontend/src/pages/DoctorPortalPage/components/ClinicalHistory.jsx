import React from 'react';
import { FlaskConical, Stethoscope, Pill, FileText, ExternalLink } from 'lucide-react';

const HISTORY = [
  {
    icon: FlaskConical,
    iconBg: 'bg-blue-50 text-blue-500',
    title: 'Lab Report — HbA1c Test',
    date: '18 Apr 2026',
    summary:
      'HbA1c level at 7.8%. Indicates poor glycemic control over past 3 months. Follow-up recommended.',
    cta: 'View Lab Report',
  },
  {
    icon: Stethoscope,
    iconBg: 'bg-green-50 text-[#2A7FFF]',
    title: 'Clinical Consultation',
    date: '02 Apr 2026',
    summary:
      'Patient presented with dizziness and elevated BP (148/94). Adjusted antihypertensive dosage.',
    cta: 'View Consultation',
  },
  {
    icon: Pill,
    iconBg: 'bg-amber-50 text-amber-500',
    title: 'Prescription Update',
    date: '15 Mar 2026',
    summary: 'Metformin 1000mg twice daily added. Lisinopril 10mg continued. Dietary advice given.',
    cta: 'View Prescription',
  },
  {
    icon: FileText,
    iconBg: 'bg-violet-50 text-violet-500',
    title: 'ECG Report',
    date: '28 Feb 2026',
    summary: 'Sinus rhythm. No significant ST-segment changes. Left ventricular hypertrophy noted.',
    cta: 'View ECG Report',
  },
];

const ClinicalHistory = () => {
  return (
    <div className="relative flex flex-col gap-0 h-full">
      {/* Vertical line */}
      <div className="absolute left-[27px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800 rounded-full" />

      {HISTORY.map(({ icon: Icon, iconBg, title, date, summary, cta }, i) => (
        <div key={i} className="relative flex gap-6 pb-8 last:pb-0 group timeline-item">
          {/* Icon node */}
          <div
            className={`relative z-10 w-14 h-14 rounded-2xl bg-[#ecf0f3] dark:bg-[#151E32] flex items-center justify-center flex-shrink-0 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] border border-white/40 dark:border-white/5 group-hover:-translate-y-1 transition-transform duration-300`}
          >
            <Icon size={20} className={iconBg.split(' ')[1]} />
          </div>

          {/* Content card */}
          <div className="flex-1 min-w-0 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2rem] border border-white/40 dark:border-white/5 p-6 shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <p className="text-[1rem] font-black text-slate-800 dark:text-white leading-snug">
                {title}
              </p>
              <span className="text-[0.7rem] text-[#2A7FFF] font-black uppercase tracking-widest whitespace-nowrap flex-shrink-0 bg-[#2A7FFF]/10 px-3 py-1 rounded-lg">
                {date}
              </span>
            </div>
            <p className="text-[0.85rem] text-slate-500 font-bold leading-relaxed mb-4">
              {summary}
            </p>
            <button className="flex items-center gap-2 text-[0.75rem] font-black uppercase tracking-widest text-[#2A7FFF] hover:text-[#1A66CC] transition-colors duration-150 group/btn">
              <ExternalLink
                size={14}
                className="group-hover/btn:translate-x-0.5 transition-transform"
              />
              {cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClinicalHistory;
