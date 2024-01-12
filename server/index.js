const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const customerRoutes = require("./routes/customerRoutes");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1", customerRoutes);

app.listen(4000, () => {
  console.log("server instantiated");
});

dbConnect();
