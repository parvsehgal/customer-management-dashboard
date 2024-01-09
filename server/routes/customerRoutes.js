const express = require("express");
const router = express.Router();
const { createCustomer } = require("../controllers/customerController");
const {
  createTreatment,
  getTreatments,
} = require("../controllers/treatmentController");

router.post("/newCustomer", createCustomer);

router.get("/getTreatments", getTreatments);

module.exports = router;
