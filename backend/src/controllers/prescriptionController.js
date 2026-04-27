import Prescription from '../models/Prescription.js';

export const getMyPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({ 
      patient: req.user._id, 
      status: 'Active' 
    }).populate('medicines.medicine');
    
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMedicationStatus = async (req, res) => {
  try {
    const { medId, taken } = req.body;
    const prescription = await Prescription.findOneAndUpdate(
      { patient: req.user._id, 'medicines._id': medId },
      { $set: { 'medicines.$.taken': taken } },
      { new: true }
    );
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
