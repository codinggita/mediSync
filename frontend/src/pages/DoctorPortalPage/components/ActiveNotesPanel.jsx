import React, { useState } from 'react';
import { StickyNote, Send, Clock, User, Trash2, Edit2, Plus } from 'lucide-react';

const initialNotes = [
  {
    id: 1,
    doctor: 'Dr. Anjali Mehta',
    time: '2 hours ago',
    text: 'Patient reports mild fatigue after morning walk. Monitoring glucose closely.',
    type: 'Clinical',
  },
  {
    id: 2,
    doctor: 'Dr. Anjali Mehta',
    time: '1 day ago',
    text: 'Metformin adjusted to 500mg BID. Next lab test scheduled for May 15.',
    type: 'Medication',
  },
];

const ActiveNotesPanel = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [input, setInput] = useState('');

  const addNote = () => {
    if (!input.trim()) return;
    const newNote = {
      id: Date.now(),
      doctor: 'Dr. Anjali Mehta',
      time: 'Just now',
      text: input,
      type: 'Clinical',
    };
    setNotes([newNote, ...notes]);
    setInput('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="bg-white dark:bg-[#151E32] border border-gray-100 dark:border-slate-700/50 rounded-[14px] flex flex-col h-full shadow-sm overflow-hidden transition-colors">
      <div className="p-5 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
            <StickyNote size={18} className="text-[#F59E0B]" />
          </div>
          <div>
            <h3 className="font-black text-[#1F2937] dark:text-white text-[0.92rem]">Active Notes</h3>
            <p className="text-[0.6rem] text-gray-400 font-bold uppercase tracking-wider">Clinical Observations</p>
          </div>
        </div>
        <button className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#0B1121] flex items-center justify-center text-gray-400 hover:text-[#2A7FFF] transition-all">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[350px] scrollbar-thin scrollbar-thumb-gray-200">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 opacity-40">
            <StickyNote size={32} className="mb-2" />
            <p className="text-[0.8rem] font-bold">No notes yet</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="group relative bg-[#F8FAFC] dark:bg-[#0B1121]/50 border border-transparent hover:border-gray-200 dark:hover:border-slate-700 p-4 rounded-xl transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#2A7FFF]/10 flex items-center justify-center">
                    <User size={12} className="text-[#2A7FFF]" />
                  </div>
                  <span className="text-[0.75rem] font-bold text-[#1F2937] dark:text-white">{note.doctor}</span>
                </div>
                <span className="text-[0.65rem] text-gray-400 font-medium flex items-center gap-1">
                  <Clock size={10} /> {note.time}
                </span>
              </div>
              <p className="text-[0.78rem] text-gray-600 dark:text-slate-400 leading-relaxed italic">
                "{note.text}"
              </p>
              
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="w-6 h-6 rounded-md bg-white dark:bg-[#151E32] shadow-sm flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <Trash2 size={10} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-[#151E32]">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), addNote())}
            placeholder="Add a clinical note..."
            className="w-full bg-[#F8FAFC] dark:bg-[#0B1121] border border-gray-100 dark:border-slate-700/50 rounded-xl px-4 py-3 text-[0.8rem] text-gray-600 dark:text-slate-200 focus:border-[#2A7FFF] focus:ring-4 focus:ring-[#2A7FFF]/5 outline-none transition-all resize-none min-h-[80px]"
          />
          <button
            onClick={addNote}
            disabled={!input.trim()}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-[#2A7FFF] hover:bg-[#1565C0] text-white flex items-center justify-center shadow-lg shadow-[#2A7FFF]/20 transition-all transform active:scale-90 disabled:opacity-50 disabled:grayscale"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveNotesPanel;
