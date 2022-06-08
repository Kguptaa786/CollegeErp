if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 4000;

const express = require("express");
const cors = require("cors");
const http = require("http");
const passport = require("passport");
const { Server } = require("socket.io");

//all routes import
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
const facultyRoutes = require("./routes/facultyRoutes");
const Fake = require("./models/fake");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//passport middleware
app.use(passport.initialize());

require("./config/passport");

const saveMsg = async (message) => {
  const newData = await new Fake({
    sender: message.sender,
    message: message.message,
    room: message.room,
  });
  await newData.save();
};

//socket.io implementation
io.on("connection", (socket) => {
  socket.on("join room", ({ room1, room2 }) => {
    socket.join(room1);
    socket.join(room2);
  });
  socket.on("private message", (message) => {
    io.to(message.room).emit("new Message", {
      message: message.message,
      sender: message.sender,
    });
    console.log(message);
    saveMsg(message);
  });
  socket.on("disconnect", function () {
    console.log("Socket disconnected");
  });
});

//routes middleware
app.use("/", adminRoutes);
app.use("/", studentRoutes);
app.use("/", facultyRoutes);

//db connection
require("./connection/connection");

server.listen(port, () => {
  console.log(`connection at ${port}`);
});
