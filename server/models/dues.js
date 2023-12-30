const mongoose = require("mongoose");
const duesSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  advance: {
    type: Number,
  },
  debt: {
    type: Number,
  },
});

module.exports = mongoose.model("dues", duesSchema);
