const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomerRecords,
} = require("../controllers/customerController");
const {
  createTreatment,
  getTreatments,
} = require("../controllers/treatmentController");
const { checkBalance } = require("../controllers/duesController");

router.get("/getTreatments", getTreatments);
router.post("/newCustomer", createCustomer);
router.post("/getRecords", getCustomerRecords);
router.post("/checkBalance", checkBalance);

module.exports = router;
