const express = require("express");
const cors = require("cors");

//connection
require("./connection/connection");

const app = express();

const adminRoutes = require("./routes/adminRoutes");

const port = process.env.PORT || 4000;

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server started");
});

//routes middleware
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`connection at ${port}`);
});
