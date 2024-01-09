const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  Treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment",
    },
  ],
  paymentDetails: {
    amountCalculated: Number,
    amountPaid: Number,
    dues: Number,
  },
});
module.exports = mongoose.model("customer", customerSchema);
