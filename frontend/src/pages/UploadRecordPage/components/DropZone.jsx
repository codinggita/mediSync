import React, { useState, useRef, useCallback } from 'react';
import FileUploadHeader from './FileUploadHeader';
import UploadedFileCard from './UploadedFileCard';

const ACCEPTED = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
const FORMATS = 'PDF, PNG, JPG, JPEG, WEBP';

const DropZone = ({ onFileSelected, file, onClear }) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const inputRef = useRef();

  const validate = (f) => {
    if (!ACCEPTED.includes(f.type)) {
      setError(`Unsupported format. Please use: ${FORMATS}`);
      return false;
    }
    if (f.size > 20 * 1024 * 1024) {
      setError('File exceeds 20 MB limit.');
      return false;
    }
    return true;
  };

  const processFile = useCallback(
    (f) => {
      setError('');
      if (!validate(f)) return;
      setProgress(0);
      onFileSelected(f);
      
      let p = 0;
      const timer = setInterval(() => {
        p += Math.random() * 18 + 5;
        if (p >= 100) {
          p = 100;
          clearInterval(timer);
        }
        setProgress(Math.min(Math.round(p), 100));
      }, 120);
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) processFile(f);
    },
    [processFile]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => setDragging(false);
  const handleInput = (e) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const handleClear = () => {
    onClear();
    setProgress(0);
    setError('');
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !file && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-6 rounded-[2.5rem] border-2 border-dashed transition-all duration-500 cursor-pointer select-none overflow-hidden
          ${
            file
              ? 'border-[#2ECC71]/30 bg-[#ecf0f3] dark:bg-[#151E32] shadow-[inset_6px_6px_12px_#cbced1,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0f1d,inset_-6px_-6px_12px_#202d47]'
              : dragging
                ? 'border-[#2A7FFF] bg-[#2A7FFF]/5 scale-[1.02] shadow-[20px_20px_40px_rgba(42,127,255,0.1)]'
                : 'border-slate-300 dark:border-slate-700 bg-[#ecf0f3] dark:bg-[#151E32] shadow-[8px_8px_16px_#cbced1,-8px_-8px_16px_#ffffff] dark:shadow-[8px_8px_16px_#0a0f1d,-8px_-8px_16px_#202d47] hover:shadow-[12px_12px_24px_#cbced1,-12px_-12px_24px_#ffffff]'
          }
          ${file ? 'py-8 px-8' : 'py-20 px-8'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED.join(',')}
          className="hidden"
          onChange={handleInput}
        />

        {!file ? (
          <FileUploadHeader dragging={dragging} />
        ) : (
          <UploadedFileCard file={file} progress={progress} onClear={handleClear} />
        )}
      </div>

      {error && (
        <p className="text-[0.75rem] text-red-500 font-semibold flex items-center gap-1.5 px-1">
          ⚠ {error}
        </p>
      )}
    </div>
  );
};

export default DropZone;
