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
    <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm p-5 doctor-card flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Active Notes</h3>

      {/* Notes list */}
      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1 custom-scroll">
        {notes.map((n, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-[10px] border border-gray-100 hover:border-green-100 transition-colors duration-150">
            <div className={`w-8 h-8 rounded-full ${n.color} flex items-center justify-center text-[11px] font-bold flex-shrink-0`}>
              {n.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <p className="text-xs font-bold text-gray-700">{n.name}</p>
                <span className="text-[10px] text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{n.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-[1.5px] border-gray-200 rounded-[10px] px-3 py-2 focus-within:border-[#2A7FFF] focus-within:ring-2 focus-within:ring-[#2A7FFF]/10 transition-all duration-200 bg-white">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add a clinical note..."
          className="flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder:text-gray-400"
        />
        <button
          onClick={handleSend}
          className="w-7 h-7 bg-[#2A7FFF] rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-[#1A66CC] active:scale-95 transition-all duration-150 shadow-sm"
        >
          <Send size={13} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ActiveNotesPanel;
