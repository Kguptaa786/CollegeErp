const express = require("express");
require("./connection/connection");
// const Admin = require("./models/admin");
// const Faculty = require("./models/faculty");
// const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");

// const Student=require('./models/student');
const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server started");
});

// app.use("/admin", adminRoutes);
app.get("/admin/addStudent", (req, res) => {
  console.log("chala");
});

app.post("/admin/addStudent", (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`connection at ${port}`);
});
