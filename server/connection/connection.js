const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/collegeErpDatabase"; // process.env.DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("connection is successful");
  })
  .catch((e) => {
    console.log("no connection");
  });
