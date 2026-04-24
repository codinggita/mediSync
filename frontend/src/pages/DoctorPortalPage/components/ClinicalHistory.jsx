import React from 'react';
import { FlaskConical, Stethoscope, Pill, FileText, ExternalLink } from 'lucide-react';

const HISTORY = [
  {
    icon: FlaskConical,
    iconBg: 'bg-blue-50 text-blue-500',
    title: 'Lab Report — HbA1c Test',
    date: '18 Apr 2026',
    summary: 'HbA1c level at 7.8%. Indicates poor glycemic control over past 3 months. Follow-up recommended.',
    cta: 'View Lab Report',
  },
  {
    icon: Stethoscope,
    iconBg: 'bg-green-50 text-[#2A7FFF]',
    title: 'Clinical Consultation',
    date: '02 Apr 2026',
    summary: 'Patient presented with dizziness and elevated BP (148/94). Adjusted antihypertensive dosage.',
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
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 doctor-card h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Clinical History</h3>
        <span className="text-xs text-[#2A7FFF] font-semibold cursor-pointer hover:underline">View All</span>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-100 rounded-full" />

        {HISTORY.map(({ icon: Icon, iconBg, title, date, summary, cta }, i) => (
          <div
            key={i}
            className="relative flex gap-4 pb-5 last:pb-0 group timeline-item"
          >
            {/* Icon node */}
            <div className={`relative z-10 w-10 h-10 rounded-[10px] ${iconBg} flex items-center justify-center flex-shrink-0 shadow-sm border border-white group-hover:scale-110 transition-transform duration-200`}>
              <Icon size={16} />
            </div>

            {/* Content card */}
            <div className="flex-1 min-w-0 bg-[#F8FAFC] rounded-[12px] border border-gray-100 p-4 group-hover:border-green-100 group-hover:shadow-sm transition-all duration-200">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-bold text-gray-800 leading-snug">{title}</p>
                <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap flex-shrink-0">{date}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{summary}</p>
              <button className="flex items-center gap-1.5 text-xs font-bold text-[#2A7FFF] hover:text-[#1A66CC] transition-colors duration-150">
                <ExternalLink size={11} />
                {cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicalHistory;
