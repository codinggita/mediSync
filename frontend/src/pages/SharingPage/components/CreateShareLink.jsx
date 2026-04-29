import React, { useState } from 'react';
import { Link2, Mail, Clock, FileText, KeyRound, Send, ChevronDown } from 'lucide-react';

const records = [
  'Blood Test Report – Apr 2026',
  'X-Ray Chest – Mar 2026',
  'Prescription – Lisinopril',
  'HbA1c Lab Result – Apr 2026',
  'ECG Report – Feb 2026',
];

const durations = ['1 Hour', '6 Hours', '24 Hours', '3 Days', '7 Days'];

const CreateShareLink = () => {
  const [email, setEmail] = useState('');
  const [duration, setDuration] = useState('24 Hours');
  const [record, setRecord] = useState(records[0]);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [link, setLink] = useState('');

  const handleGenerate = () => {
    if (!email.trim()) return;
    const fake = `https://medisync.app/share/${Math.random().toString(36).substr(2, 12)}`;
    setLink(fake);
    setGenerated(true);
    setTimeout(() => setGenerated(false), 6000);
  };

  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-2xl p-5 shadow-sm transition-colors">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-[#2A7FFF]/10 flex items-center justify-center">
          <Link2 size={16} className="text-[#2A7FFF]" />
        </div>
        <div>
          <h3 className="text-[0.92rem] font-extrabold text-[#1F2937] dark:text-white leading-none">
            Create Access Link
          </h3>
          <p className="text-[0.65rem] text-gray-400 mt-0.5">
            Generate an encrypted link for a recipient
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {/* Email */}
        <div>
          <label className="text-[0.72rem] font-bold text-gray-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Mail size={12} /> Recipient Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="doctor@hospital.com"
            className="w-full text-[0.85rem] px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700/50 bg-[#F8FAFC] dark:bg-[#0B1121] text-[#1F2937] dark:text-slate-200 placeholder:text-gray-400 outline-none focus:border-[#2A7FFF] focus:ring-2 focus:ring-[#2A7FFF]/20 transition-all"
          />
        </div>

        {/* Record Selection */}
        <div>
          <label className="text-[0.72rem] font-bold text-gray-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <FileText size={12} /> Select Record
          </label>
          <div className="relative">
            <select
              value={record}
              onChange={(e) => setRecord(e.target.value)}
              className="w-full appearance-none text-[0.85rem] px-3.5 py-2.5 pr-9 rounded-xl border border-gray-200 dark:border-slate-700/50 bg-[#F8FAFC] dark:bg-[#0B1121] text-[#1F2937] dark:text-slate-200 outline-none focus:border-[#2A7FFF] focus:ring-2 focus:ring-[#2A7FFF]/20 transition-all cursor-pointer"
            >
              {records.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="text-[0.72rem] font-bold text-gray-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Clock size={12} /> Access Duration
          </label>
          <div className="flex gap-2 flex-wrap">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`px-3 py-1.5 rounded-xl text-[0.75rem] font-bold transition-all border ${
                  duration === d
                    ? 'bg-[#2A7FFF] text-white border-[#2A7FFF] shadow-sm'
                    : 'bg-gray-50 dark:bg-[#0B1121] text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700/50 hover:border-[#2A7FFF] hover:text-[#2A7FFF]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* PIN Toggle */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 dark:border-slate-700/50 bg-[#F8FAFC] dark:bg-[#0B1121]">
          <div className="flex items-center gap-2">
            <KeyRound size={14} className="text-[#8B5CF6]" />
            <div>
              <p className="text-[0.82rem] font-bold text-[#1F2937] dark:text-white">
                PIN Verification
              </p>
              <p className="text-[0.68rem] text-gray-400">Require PIN code to open link</p>
            </div>
          </div>
          <button
            onClick={() => setPinEnabled(!pinEnabled)}
            className={`relative w-11 h-6 rounded-full transition-all duration-300 ${pinEnabled ? 'bg-[#2A7FFF]' : 'bg-gray-200 dark:bg-slate-700'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${pinEnabled ? 'translate-x-5' : ''}`}
            />
          </button>
        </div>

        {/* Generated Link Preview */}
        {generated && link && (
          <div className="flex items-center gap-2 p-3 rounded-xl border border-[#2ECC71]/30 bg-[#2ECC71]/8 animate-pulse">
            <Link2 size={14} className="text-[#2ECC71] shrink-0" />
            <p className="text-[0.72rem] font-mono text-[#2ECC71] truncate">{link}</p>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#2A7FFF] hover:bg-[#1565C0] text-white text-[0.85rem] font-bold transition-all hover:shadow-lg hover:shadow-[#2A7FFF]/30 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Send size={15} />
          Generate Secure Link
        </button>
      </div>
    </div>
  );
};

export default CreateShareLink;
