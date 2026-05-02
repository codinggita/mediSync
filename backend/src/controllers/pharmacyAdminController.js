import Pharmacy from '../models/Pharmacy.js';




export const getAllPharmacies = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { verificationStatus: status } : {};
    const pharmacies = await Pharmacy.find(filter).sort({ createdAt: -1 });
    res.json(pharmacies);
  } catch (error) {
    next(error);
  }
};


export const verifyPharmacy = async (req, res, next) => {
  try {
    const { action } = req.body; 
    const pharmacy = await Pharmacy.findById(req.params.id);
    if (!pharmacy) {
      res.status(404);
      throw new Error('Pharmacy not found');
    }
    pharmacy.verificationStatus = action;
    await pharmacy.save();
    res.json({ message: `Pharmacy ${action}`, pharmacy });
  } catch (error) {
    next(error);
  }
};


export const deletePharmacy = async (req, res, next) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!pharmacy) {
      res.status(404);
      throw new Error('Pharmacy not found');
    }
    res.json({ message: 'Pharmacy deleted' });
  } catch (error) {
    next(error);
  }
};
