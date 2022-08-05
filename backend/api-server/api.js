import express from "express";
import Team from "../models/team.js";
import Land from "../models/land.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ a: 1, b: 2 });
});
