import express from "express";
import Team from "../models/team.js";
import Land from "../models/land.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ a: 1, b: 2 });
});

// const requireAdmin = (req, res, next) => {
//   if (!req.session.user) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }
//   if (req.session.user.username !== "admin") {
//     res.status(403).json({ error: "Forbidden" });
//     return;
//   }
//   next();
// };

// const requireNPC = (req, res, next) => {
//   if (!req.session.user) {
//     res.status(401).json({ error: "Unauthorized" });
//     return;
//   }
//   next();
// };

async function checkvalid(teamname) {
  const team = await Team.findOne({ teamname });
  const currtime = Date.now() / 1000;
  const duration = 10;
  console.log(currtime - team.bonus.time);
  if (currtime - team.bonus.time > duration) {
    console.log("bonus time over");
    team.bonus.value = 1.0;
  }
  if (currtime - team.soulgem.time > duration) {
    console.log("soulgem time over");
    team.soulgem.value = false;
  }
  await team.save();
  return team;
}

async function calcmoney(teamname, money, estate) {
  const team = await Team.findOne({ teamname });
  if (money > 0) {
    if (team.soulgem.value) {
      money *= 2;
    }
    if (estate) {
      money *= team.bonus.value;
    }
  } else {
    if (team.soulgem.value) {
      money *= 1.5;
    }
  }
  return money;
}

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
  res.status(200).send("update succeeded");
});

router.post("/bonus", async (req, res) => {
  const { teamname, bonus } = req.body;
  const time = Date.now() / 1000;
  const team = await Team.findOneAndUpdate(
    { teamname: teamname },
    { bonus: { value: bonus, time: time } }
  );
  if (!team) {
    res.status(403).send();
    console.log("Update failed");
    return;
  }
  res.status(200).send("update succeeded");
});

router.post("/soulgem", async (req, res) => {
  const { teamname } = req.body;
  const time = Date.now() / 1000;
  const team = await Team.findOneAndUpdate(
    { teamname: teamname },
    { soulgem: { value: true, time: time } }
  );
  if (!team) {
    res.status(403).send();
    console.log("Update failed");
    return;
  }
  res.status(200).send("update succeeded");
});

router.get("/checkvalid", async (req, res) => {
  const { teamname } = req.query;
  const team = await checkvalid(teamname);
  res.status(200).send(team);
});

// Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = await User.findAndValidate(username, password);
  console.log(user);
  if (!user) {
    res.status(200).send(null);
    console.log("login failed");
    return;
  }
  req.session.user = user;
  res.status(200).send({ username: user.username });
  // null, npc, admin: String
});

// router.post("/logout", async (req, res) => {
//   req.session.destroy();
//   res.status(200).send("logout success");
// });

// router.get("/adminsecret", requireAdmin, async (req, res) => {
//   res.status(200).send("admin secret");
// });

// router.get("/npcsecret", requireNPC, async (req, res) => {
//   res.status(200).send("npc secret");
// });

export default router;
