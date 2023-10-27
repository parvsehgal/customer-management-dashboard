const router = require("express").Router();
const Customer = require('../models/Customer');
const Treatment = require('../models/Treatments');


router.post('/add', async (req, res) => { // Add a new customer or update existing ones
  const { phoneNumber, ...rest } = req.body;

    try {
        let customer = await Customer.findOne({ phoneNumber });
        if (customer) {
            customer = await Customer.findOneAndUpdate({ phoneNumber }, { $set: rest }, { new: true });
        } else {
            customer = new Customer(req.body);
            await customer.save();
        }
        res.json(customer);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error adding/updating customer' });
    }
});

router.get('/:phoneNumber', async (req, res) => {// Get customer data based on phone number
  try {
    const customer = await Customer.findOne({ phoneNumber: req.params.phoneNumber })
      .populate('pastTreatments')
      .populate('currentTreatments');

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(customer);
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:phoneNumber/addTreatment', async (req, res) => { // Add treatment for a specific customer
  const { phoneNumber } = req.params;
  const { description, amount, current = true } = req.body; // Current flag indicates if treatment is current or past.

  try {
      let customer = await Customer.findOne({ phoneNumber });
      if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
      }

      const treatment = { description, amount };

      if (current) {
          customer.currentTreatments.push(treatment);
      } else {
          customer.pastTreatments.push(treatment);
      }
      
      await customer.save();
      res.json(customer);
  } catch (error) {
      res.status(500).json({ message: 'Error adding treatment' });
  }
});


router.post('/:phoneNumber/updatePayment', async (req, res) => {
  const { phoneNumber } = req.params;
  const { paidAmount } = req.body;

  try {
      let customer = await Customer.findOne({ phoneNumber });
      if (!customer) {
          return res.status(404).json({ message: 'Customer not found' });
      }

      customer.totalPaid += paidAmount;
      const currentTreatmentsCost = customer.currentTreatments.reduce((acc, treatment) => acc + treatment.amount, 0);
      customer.totalDue = currentTreatmentsCost - customer.totalPaid;

      await customer.save();
      res.json(customer);
  } catch (error) {
      res.status(500).json({ message: 'Error updating payment' });
  }
});


module.exports = router;
