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
const { checkBalance, deleteDues } = require("../controllers/duesController");

router.get("/getTreatments", getTreatments);
router.post("/makeTreatment", createTreatment);
router.post("/newCustomer", createCustomer);
router.post("/getRecords", getCustomerRecords);
router.post("/checkBalance", checkBalance);
router.post("/deleteBalance", deleteDues);

module.exports = router;
