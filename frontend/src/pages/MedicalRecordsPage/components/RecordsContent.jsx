import React from 'react';
import { SkeletonCard } from '../../../components/SkeletonLoader';
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
      <div className="flex flex-col lg:flex-row gap-5 pb-4">
        <div className="w-full lg:w-[320px] shrink-0 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="flex-1">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 pb-4">
      {}
      <div className="w-full lg:w-[320px] shrink-0">
        <RecordsTimeline records={records} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {}
      <div className="flex-1 min-w-0">
        <RecordDetailCard record={selectedRecord} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default RecordsContent;
