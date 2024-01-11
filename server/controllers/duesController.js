const dues = require("../models/dues");

exports.checkBalance = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber, "here");
    const duesObj = await dues.findOne({ phoneNumber: phoneNumber });
    console.log(duesObj);
    res.status(200).json(duesObj);
  } catch (err) {
    res.status(500).json("error fetching balance information");
  }
};
