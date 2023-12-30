const express = require("express");
const router = express.Router();

router.post("/testRoute", (req, res) => {
  res.status(200).json({ msg: "testRoute working" });
});

const { createCustomer } = require("../controllers/customerController");
router.post("/newCustomer", createCustomer);

module.exports = router;
