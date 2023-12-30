const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1", customerRoutes);

app.listen(process.env.PORT, () => {
  console.log("server instantiated");
});

dbConnect();
