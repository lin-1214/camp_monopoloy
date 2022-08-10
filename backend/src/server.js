import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import express from "express";
import Land from "../models/land.js";
import Team from "../models/team.js";
import User from "../models/user.js";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const db = mongoose.connection;

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateLand() {
  await Land.find({})
    .exec()
    .then((data) => {
      io.emit("updateLand", data);
    })
    .catch((e) => console.error(e));
}

async function updateTeam() {
  await Team.find({})
    .exec()
    .then((data) => {
      io.emit("updateTeam", data);
    })
    .catch((e) => console.error(e));
}

async function updateUser() {
  await User.find({})
    .exec()
    .then((data) => {
      io.emit("updateUser", data);
    })
    .catch((e) => console.error(e));
}

db.once("open", () => {
  console.log("MongoDB connected");
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("getMessage", (arg) => {
      console.log(arg);
    });
    updateLand();
    updateTeam();
    updateUser();
    socket.on("disconnect", (socket) => {
      console.log("a user disconnected");
    });
  });
  const PORT = process.env.port || 5000;
  server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });
});
