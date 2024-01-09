const customer = require("../models/customer");
const Treatment = require("../models/treatments");

exports.createCustomer = async (req, res) => {
  try {
    const { PhoneNumber, Name, Date, AmountPaid, totalTreatments } = req.body;
    console.log("here");
    const newRecord = await new customer({
      phoneNumber: PhoneNumber,
      name: Name,
      date: Date,
      paymentDetails: { amountPaid: AmountPaid },
    });
    newRecord.save();
    console.log(newRecord);
    res.status(200).json("sucess");
  } catch (err) {
    res.status(500).json("error making customer");
  }
};
