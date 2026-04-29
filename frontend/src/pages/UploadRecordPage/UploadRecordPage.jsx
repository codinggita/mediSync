import React, { useState } from 'react';
import Sidebar from '../DashboardPage/components/Sidebar';
import TopBar from '../DashboardPage/components/TopBar';
import UploadMetaForm from './components/UploadMetaForm';
import UploadHeader from './components/UploadHeader';
import UploadDecorations from './components/UploadDecorations';
import UploadSelectionContainer from './components/UploadSelectionContainer';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const UploadRecordPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (meta) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      let fileDataUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

      if (file) {
        fileDataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      const recordData = {
        title: meta.title || 'Medical Record',
        type: meta.category,
        description: meta.notes,
        hospital: meta.hospital,
        date: meta.date,
        fileUrl: fileDataUrl
      };
      
      await api.post('/records', recordData);
      navigate('/records');
    } catch (error) {
      console.error('Error in upload flow:', error);
      alert('Clinical synchronization failed. Please verify your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => navigate('/dashboard');

  return (
    <div className="flex h-screen overflow-hidden bg-[#ecf0f3] dark:bg-[#0B1121] transition-colors duration-300 font-sans relative">
      <UploadDecorations />

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0 relative z-10">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-8 scrollbar-hide pb-24 md:pb-6">
          <UploadHeader />

          {/* Main Layout - Neumorphic Cards */}
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full pb-20">
            {/* Left: Tactical Drop Zone */}
            <div className="flex-1 min-w-0">
              <UploadSelectionContainer 
                file={file} 
                setFile={setFile} 
              />
            </div>

            {/* Right: Metadata Form */}
            <div className="w-full lg:w-[480px] shrink-0">
              <UploadMetaForm
                file={file}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadRecordPage;
