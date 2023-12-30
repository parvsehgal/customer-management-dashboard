const customer = require("../models/customer");
const Treatment = require("../models/treatments");
exports.createCustomer = async (req, res) => {
  try {
    const { phoneNumber, name, date } = req.body;
    const response = await customer.create({ phoneNumber, name, date });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json("error making customer");
  }
};

exports.findCustomer = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json("error finding customer");
  }
};
