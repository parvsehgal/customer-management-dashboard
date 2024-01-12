const Treatment = require("../models/treatments");

exports.createTreatment = async (req, res) => {
  try {
    const { name, price } = req.body;
    console.log("here");
    const treatment = await Treatment.create({ name, price });
    res.status(200).json("added treatment sucessfully");
  } catch (err) {
    res.status(500).json("error creating treatment");
  }
};

exports.getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find();
    res.status(200).json(treatments);
  } catch (err) {
    res.status(500).json("error getting treatmetns");
  }
};
