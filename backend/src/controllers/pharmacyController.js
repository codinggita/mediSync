import Pharmacy from '../models/Pharmacy.js';




const registerPharmacy = async (req, res, next) => {
  try {
    const { name, ownerName, email, phone, location, licenseNumber, document } = req.body;

    const pharmacyExists = await Pharmacy.findOne({
      $or: [{ email }, { licenseNumber }],
    });

    if (pharmacyExists) {
      res.status(400);
      throw new Error('Pharmacy with this email or license number already exists');
    }

    const pharmacy = await Pharmacy.create({
      name,
      ownerName,
      email,
      phone,
      location,
      licenseNumber,
      document,
      registeredBy: req.user._id,
      verificationStatus: 'Pending',
    });

    res.status(201).json({
      message:
        'Pharmacy registration request submitted successfully. It will be reviewed by the admin.',
      pharmacy,
    });
  } catch (error) {
    next(error);
  }
};




const getVerifiedPharmacies = async (req, res, next) => {
  try {
    const pharmacies = await Pharmacy.find({ verificationStatus: 'Verified' }).sort({
      createdAt: -1,
    });
    res.json(pharmacies);
  } catch (error) {
    next(error);
  }
};




const getPendingPharmacies = async (req, res, next) => {
  try {
    const pharmacies = await Pharmacy.find({ verificationStatus: 'Pending' })
      .populate('registeredBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(pharmacies);
  } catch (error) {
    next(error);
  }
};




const updatePharmacyStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['Verified', 'Rejected'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status update');
    }

    const pharmacy = await Pharmacy.findById(req.params.id);

    if (!pharmacy) {
      res.status(404);
      throw new Error('Pharmacy not found');
    }

    pharmacy.verificationStatus = status;
    await pharmacy.save();

    res.json({
      message: `Pharmacy request has been ${status}`,
      pharmacy,
    });
  } catch (error) {
    next(error);
  }
};

export { registerPharmacy, getVerifiedPharmacies, getPendingPharmacies, updatePharmacyStatus };
