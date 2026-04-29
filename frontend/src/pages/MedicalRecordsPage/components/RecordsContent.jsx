import React from 'react';
import { Loader2 } from 'lucide-react';
import RecordsTimeline from './RecordsTimeline';
import RecordDetailCard from './RecordDetailCard';

const RecordsContent = ({
  loading,
  records,
  selectedId,
  setSelectedId,
  selectedRecord,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#2A7FFF]" size={40} />
        <p className="text-gray-400 font-bold">Synchronizing medical vault...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 pb-4">
      {/* Left Column: Timeline */}
      <div className="w-full lg:w-[320px] shrink-0">
        <RecordsTimeline records={records} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {/* Right Column: Detail View */}
      <div className="flex-1 min-w-0">
        <RecordDetailCard record={selectedRecord} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default RecordsContent;
