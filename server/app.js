if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const passport = require("passport");

//connection
require("./connection/connection");

const app = express();

//all routes import
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("server started");
});

//routes middleware
app.use("/", adminRoutes);
app.use("/", studentRoutes);
app.use("/", facultyRoutes);

app.listen(port, () => {
  console.log(`connection at ${port}`);
});
