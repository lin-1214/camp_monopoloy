import express from "express";
import Team from "../models/team.js";
import Land from "../models/land.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ a: 1, b: 2 });
});
router.post("/add", async (req, res) => {
  const { teamname, dollar } = req.body;
  const team = await Team.findOne({ teamname: teamname });
  if (!team) {
    res.status(403).send();
    console.log("Team not found");
    return;
  }
  const newTeam = await Team.findOneAndUpdate(
    { teamname: teamname },
    { money: team.money + dollar }
  );
  if (!newTeam) {
    res.status(403).send();
    console.log("Update failed");
    return;
  }
  res.status(200).send("Update succeeded");
});
router.post("/transfer", async (req, res) => {
  const { from, to, dollar } = req.body;
  const team1 = await Team.findOne({ teamname: from });
  if (!team1) {
    res.status(403).send();
    console.log("Team not found");
    return;
  }
  const team2 = await Team.findOne({ teamname: to });
  if (!team2) {
    res.status(403).send();
    console.log("Team not found");
    return;
  }
  const newTeam1 = await Team.findOneAndUpdate(
    { teamname: from },
    { money: team1.money - dollar }
  );
  if (!newTeam1) {
    res.status(403).send();
    console.log("Update failed");
    return;
  }
  const newTeam2 = await Team.findOneAndUpdate(
    { teamname: to },
    { money: team2.money + dollar }
  );
  if (!newTeam2) {
    res.status(403).send();
    console.log("Update failed");
    return;
  }
  res.status(200).send("Update succeeded");
});
router.post("/ownership", async (req, res) => {
  const { team, land, level } = req.body;
  const tmp1 = await Land.findOneAndUpdate({ name: land }, { owner: team });
  if (!tmp1) {
    res.status(403).send();
    console.log("Update failed");
    return;
  }
  const tmp2 = await Land.findOneAndUpdate({ name: land }, { level: level });
  if (!tmp2) {
    res.status(403).send();
    console.log("Update failed");
    return;
  }
  console.log(200).send("update succeeded");
});

export default router;
