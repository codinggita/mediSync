import React from 'react';
import AiAnalysisModal from './AiAnalysisModal';
import PrescriptionModal from './PrescriptionModal';

const ClinicalModals = ({
  showAiModal,
  setShowAiModal,
  showPrescriptionModal,
  setShowPrescriptionModal,
  prescriptionData,
  setPrescriptionData,
  handlePrescriptionSubmit,
  activePatient,
}) => {
  return (
    <>
      <AiAnalysisModal show={showAiModal} onClose={() => setShowAiModal(false)} />
      <PrescriptionModal
        show={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        prescriptionData={prescriptionData}
        setPrescriptionData={setPrescriptionData}
        handleSubmit={handlePrescriptionSubmit}
      />
    </>
  );
};

export default ClinicalModals;
