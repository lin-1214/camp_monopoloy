import { Server } from "socket.io";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import express from "express";
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

db.once("open", () => {
  console.log("MongoDB connected");
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("getMessage", (arg) => {
      console.log(arg);
    });
  });
  const PORT = process.env.port || 5000;
  server.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
  });
});
