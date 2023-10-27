const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  pastTreatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  }],
  currentTreatments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  }],
  paymentDetails: {
    advancePaid: Number,
    remainingAmount: Number,
    totalAmount: Number
  }
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
