import React from 'react';
import { FileText, Pill, Activity, Plus } from 'lucide-react';
import TimelineHeader from './TimelineHeader';
import TimelineNode from './TimelineNode';

const RecordsTimeline = ({ records, selectedId, onSelect }) => {
  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription':
        return Pill;
      case 'lab report':
        return Activity;
      case 'radiology':
        return FileText;
      case 'cardiology':
        return Activity;
      default:
        return FileText;
    }
  };

  const getColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'prescription':
        return '#8B5CF6';
      case 'lab report':
        return '#F59E0B';
      case 'radiology':
        return '#2A7FFF';
      case 'cardiology':
        return '#2ECC71';
      default:
        return '#2A7FFF';
    }
  };

  return (
    <div className="bg-[#ecf0f3] dark:bg-[#151E32] rounded-[2.5rem] p-7 shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] h-full flex flex-col transition-all duration-500">
      <TimelineHeader count={records.length} />

      {/* Timeline */}
      <div className="flex flex-col relative flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-hide">
        {records.length > 0 ? (
          records.map((rec, i) => (
            <TimelineNode
              key={rec._id}
              rec={rec}
              isSelected={selectedId === rec._id}
              isLast={i === records.length - 1}
              onSelect={onSelect}
              Icon={getIcon(rec.type)}
              color={getColor(rec.type)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
              <Plus size={32} className="text-slate-400" />
            </div>
            <p className="text-[0.8rem] font-black text-slate-400 uppercase tracking-widest">
              No artifacts detected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsTimeline;
