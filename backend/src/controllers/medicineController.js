import Medicine from '../models/Medicine.js';
import Price from '../models/Price.js';

export const getMedicines = async (req, res) => {
  try {
    const { search, includePrices } = req.query;
    console.log(`📡 [SOURCING ENGINE]: Search Query: "${search}", IncludePrices: ${includePrices}`);
    
    let query = {};
    if (search && search.trim() !== '') {
      query = { name: { $regex: search, $options: 'i' } };
    }
    
    let medicines = await Medicine.find(query).lean();
    console.log(`📡 [SOURCING ENGINE]: Found ${medicines.length} medicines`);
    
    if (includePrices === 'true' && medicines.length > 0) {
      medicines = await Promise.all(medicines.map(async (med) => {
        try {
          const prices = await Price.find({ medicine: med._id }).populate('pharmacy').lean();
          return { ...med, prices };
        } catch (priceErr) {
          console.error(`❌ [SOURCING ERROR]: Failed to fetch prices for ${med.name}:`, priceErr.message);
          return { ...med, prices: [] };
        }
      }));
    }

    res.status(200).json(medicines);
  } catch (error) {
    console.error('💥 [CRITICAL SOURCING CRASH]:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
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
