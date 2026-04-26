import Medicine from '../models/Medicine.js';
import Price from '../models/Price.js';

export const getMedicines = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { name: { $regex: search, $options: 'i' } };
    }
    const medicines = await Medicine.find(query);
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedicinePrices = async (req, res) => {
  try {
    const { id } = req.params;
    const prices = await Price.find({ medicine: id }).populate('pharmacy');
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMedicine = async (req, res) => {
  try {
    const newMedicine = new Medicine(req.body);
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
