import React, { useState } from 'react';
import { Send } from 'lucide-react';

const NOTES = [
  {
    avatar: 'DR',
    color: 'bg-blue-100 text-blue-700',
    name: 'Dr. Raj Verma',
    time: '10:42 AM',
    note: 'Adjusted Metformin dosage to 1000mg BID. Monitor fasting glucose weekly.',
  },
  {
    avatar: 'DK',
    color: 'bg-blue-100 text-blue-700',
    name: 'Dr. Kavita Nair',
    time: 'Yesterday',
    note: 'BP remains elevated despite medication. Consider adding Amlodipine 5mg.',
  },
  {
    avatar: 'DS',
    color: 'bg-violet-100 text-violet-700',
    name: 'Dr. Siddharth A.',
    time: '2 days ago',
    note: 'ECG showed LVH changes. Referred to cardiologist for further evaluation.',
  },
];

const ActiveNotesPanel = () => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState(NOTES);

  const handleSend = () => {
    if (!note.trim()) return;
    setNotes([
      {
        avatar: 'ME',
        color: 'bg-amber-100 text-amber-700',
        name: 'You',
        time: 'Just now',
        note: note.trim(),
      },
      ...notes,
    ]);
    setNote('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[3.5rem] p-8 shadow-[20px_20px_40px_#cbced1,-20px_-20px_40px_#ffffff] dark:shadow-[20px_20px_40px_#0a0f1d,-20px_-20px_40px_#202d47] border border-white/40 dark:border-white/5 relative overflow-hidden flex flex-col gap-6">
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#8B5CF6]/5 rounded-full blur-2xl pointer-events-none" />

      <h3 className="text-[1.1rem] font-black text-slate-900 dark:text-white uppercase tracking-widest relative z-10 flex items-center gap-3">
        Active Notes
      </h3>

      {}
      <div className="flex flex-col gap-5 max-h-64 overflow-y-auto pr-2 scrollbar-hide relative z-10">
        {notes.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-5 bg-[#ecf0f3] dark:bg-[#151E32] rounded-[1.5rem] shadow-[inset_4px_4px_8px_#cbced1,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#0a0f1d,inset_-4px_-4px_8px_#202d47] border border-white/40 dark:border-white/5 transition-all"
          >
            <div
              className={`w-10 h-10 rounded-2xl ${n.color.replace('bg-', 'bg-opacity-20 bg-')} bg-white/50 flex items-center justify-center text-[0.75rem] font-black flex-shrink-0 shadow-sm border border-white/40`}
            >
              {n.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p className="text-[0.85rem] font-black text-slate-800 dark:text-white">{n.name}</p>
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest">
                  {n.time}
                </span>
              </div>
              <p className="text-[0.8rem] text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                {n.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="flex items-center gap-3 bg-[#ecf0f3] dark:bg-[#0B1121] rounded-[1.5rem] p-2 shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0f1d,inset_-6px_-6px_12px_#202d47] relative z-10">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add a clinical note..."
          className="flex-1 text-[0.85rem] font-medium text-slate-700 dark:text-white outline-none bg-transparent placeholder:text-slate-400 px-4"
        />
        <button
          onClick={handleSend}
          className="w-12 h-12 bg-[#ecf0f3] dark:bg-[#151E32] rounded-xl flex items-center justify-center flex-shrink-0 shadow-[4px_4px_8px_#cbced1,-4px_-4px_8px_#ffffff] dark:shadow-[4px_4px_8px_#0a0f1d,-4px_-4px_8px_#202d47] hover:text-[#2A7FFF] text-slate-500 active:shadow-[inset_2px_2px_4px_#cbced1,inset_-2px_-2px_4px_#ffffff] dark:active:shadow-[inset_2px_2px_4px_#0a0f1d,inset_-2px_-2px_4px_#202d47] transition-all duration-150 border border-white/40 dark:border-white/5"
        >
          <Send size={16} className="ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default ActiveNotesPanel;
