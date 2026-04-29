import React from 'react';
import { Hospital, CalendarDays, Tag, StickyNote, ChevronDown } from 'lucide-react';

const UploadFormInputs = ({ form, set, categories, inputCls, labelCls }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <label className={labelCls}><StickyNote size={14} /> Report Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          placeholder="e.g. Cardiology Report, Blood Test"
          className={inputCls}
          required
        />
      </div>

      {/* Hospital */}
      <div>
        <label className={labelCls}><Hospital size={14} /> Source Institution</label>
        <input
          type="text"
          value={form.hospital}
          onChange={e => set('hospital', e.target.value)}
          placeholder="e.g. Apollo Hospital, Delhi"
          className={inputCls}
          required
        />
      </div>

      {/* Date + Category Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}><CalendarDays size={14} /> Chronology</label>
          <input
            type="date"
            value={form.date}
            onChange={e => set('date', e.target.value)}
            className={`${inputCls} cursor-pointer`}
            required
          />
        </div>
        <div>
          <label className={labelCls}><Tag size={14} /> Classification</label>
          <div className="relative">
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className={`${inputCls} appearance-none pr-10 cursor-pointer`}
            >
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelCls}><StickyNote size={14} /> Biological Observations</label>
        <word-wrap>
          <textarea
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            placeholder="e.g. Fasting blood test results..."
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </word-wrap>
      </div>
    </div>
  );
};

export default UploadFormInputs;
