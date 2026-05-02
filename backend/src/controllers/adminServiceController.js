import Medicine from '../models/Medicine.js';
import Price from '../models/Price.js';
import Appointment from '../models/Appointment.js';




export const getAdminMedicines = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const medicines = await Medicine.find(filter).sort({ createdAt: -1 });
    res.json(medicines);
  } catch (error) {
    next(error);
  }
};


export const createAdminMedicine = async (req, res, next) => {
  try {
    const { name, dosage, category, manufacturer, description } = req.body;
    if (!name) {
      res.status(400);
      throw new Error('Medicine name is required');
    }
    const medicine = await Medicine.create({ name, dosage, category, manufacturer, description });
    res.status(201).json(medicine);
  } catch (error) {
    next(error);
  }
};


export const updateAdminMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!medicine) {
      res.status(404);
      throw new Error('Medicine not found');
    }
    res.json(medicine);
  } catch (error) {
    next(error);
  }
};


export const deleteAdminMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      res.status(404);
      throw new Error('Medicine not found');
    }
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    next(error);
  }
};




export const getAllPrices = async (req, res, next) => {
  try {
    const prices = await Price.find()
      .populate('medicine', 'name dosage category')
      .populate('pharmacy', 'name address')
      .sort({ createdAt: -1 });
    res.json(prices);
  } catch (error) {
    next(error);
  }
};


export const upsertPrice = async (req, res, next) => {
  try {
    const { medicineId, pharmacyId, price, discount } = req.body;
    const existing = await Price.findOne({ medicine: medicineId, pharmacy: pharmacyId });
    let result;
    if (existing) {
      existing.price = price;
      if (discount !== undefined) existing.discount = discount;
      result = await existing.save();
    } else {
      result = await Price.create({
        medicine: medicineId,
        pharmacy: pharmacyId,
        price,
        discount: discount || 0,
      });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};


export const comparePrices = async (req, res, next) => {
  try {
    const prices = await Price.find({ medicine: req.params.medicineId })
      .populate('pharmacy', 'name address')
      .sort({ price: 1 });
    res.json(prices);
  } catch (error) {
    next(error);
  }
};




export const getAnalytics = async (req, res, next) => {
  try {
    const medicineCategoryBreakdown = await Medicine.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    const appointmentsByMonth = await Appointment.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json({ medicineCategoryBreakdown, appointmentsByMonth });
  } catch (error) {
    next(error);
  }
};


export const getAlerts = async (req, res, next) => {
  try {
    const alerts = [];
    const outOfStock = await Medicine.find({ stockStatus: 'Out of Stock' }).select(
      'name category dosage'
    );
    outOfStock.forEach((m) =>
      alerts.push({
        id: m._id,
        type: 'low_stock',
        severity: 'critical',
        message: `${m.name} (${m.dosage}) is OUT OF STOCK`,
        category: m.category,
        timestamp: m.updatedAt,
      })
    );

    const severityOrder = { critical: 0, warning: 1, info: 2 };
    alerts.sort((a, b) => (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3));

    res.json({ total: alerts.length, alerts });
  } catch (error) {
    next(error);
  }
};
