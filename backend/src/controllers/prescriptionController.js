import Prescription from '../models/Prescription.js';

export const getMyPrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findOne({
      patient: req.user._id,
      status: 'Active',
    });

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

export const addMedication = async (req, res) => {
  try {
    const { name, brand, type, pharmacy, price } = req.body;
    let prescription = await Prescription.findOne({ patient: req.user._id, status: 'Active' });

    if (!prescription) {
      prescription = await Prescription.create({
        patient: req.user._id,
        doctor: req.user._id, // Self-managed for now
        medicines: [],
      });
    }

    prescription.medicines.push({
      name,
      brand,
      frequency: 'As needed',
      dosage: 'Standard',
      instructions: `Sourced from ${pharmacy} at $${price}`,
    });

    await prescription.save();
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
