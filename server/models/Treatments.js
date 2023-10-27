//Services and Treatments.
const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  description: String,
  date: { type: Date, default: Date.now },
  cost: Number
});

const Treatment = mongoose.model('Treatment', treatmentSchema);
module.exports = Treatment;
