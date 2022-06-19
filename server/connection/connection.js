const mongoose = require("mongoose");
// || "mongodb://localhost:27017/collegeErpDatabase";
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connection is successful");
  })
  .catch((e) => {
    console.log("no connection");
  });
