const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/userdb", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connection is sucessfull");
    })
    .catch(() => {
      console.log("error");
    });
};
module.exports = dbConnect;
