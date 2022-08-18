import express from "express";
import Team from "../models/team.js";
import Land from "../models/land.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";
import Event from "../models/event.js";
import Pair from "../models/pair.js";
import Effect from "../models/effect.js";
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

async function deleteTimeoutNotification() {
  // delete timeout notifications
  const notifications = await Notification.find();
  const time = Date.now() / 1000;
  // console.log(notifications);
  for (let i = 0; i < notifications.length; i++) {
    // console.log(notifications[i]);
    if (
      notifications[i].createdAt + notifications[i].duration < time &&
      notifications[i].duration > 0
    ) {
      await Notification.findByIdAndDelete(notifications[i]._id);
      // console.log("Deleted notification", notifications[i].id);
    }
  }
}

router.get("/phase", async (req, res) => {
  const phase = await Pair.findOne({ key: "phase" });
  res.json({ phase: phase.value }).status(200);
});

router.get("/team", async (req, res) => {
  const teams = await Team.find().sort({ teamname: 1 });
  res.json(teams).status(200);
});

router.get("/team/:teamId", async (req, res) => {
  const team = await Team.findOne({ id: req.params.teamId });
  res.json(team).status(200);
});

router.get("/land", async (req, res) => {
  const lands = await Land.find().sort({ id: 1 });
  res.json(lands).status(200);
});

router.get("/land/:id", async (req, res) => {
  const land = await Land.findOne({ id: req.params.id });
  res.json(land).status(200);
});

router.get("/property/:teamId", async (req, res) => {
  const properties = await Land.find({ owner: req.params.teamId });
  res.json(properties).status(200);
});

const calcSellPrice = (land) => {
  let price;
  if (land.type === "Building") {
    if (land.level === 0) {
      res
        .status(400)
        .json({ error: "Cannot sell a building that is not built" });
      return;
    }
    price = land.price.buy + land.price.upgrade * (land.level - 1);
  } else {
    price = land.price.buy;
  }
  return Math.round(price / 2);
};

router.post("/sell", async (req, res) => {
  const { teamId, landId } = req.body;
  const land = await Land.findOne({ id: landId });
  const team = await Team.findOne({ id: teamId });
  if (land.owner !== teamId) {
    res.status(400).json({ error: "Not your land" });
    return;
  }

  const price = calcSellPrice(land);
  team.money += price;
  await team.save();
  await Land.findOneAndUpdate({ id: landId }, { owner: 0, level: 0 });
  await updateHawkEye();
  res.status(200).json({ message: "Sell successful" });
});

router.get("/allEvents", async (req, res) => {
  const events = await Event.find().sort({ id: 1 });
  res.json(events).status(200);
});

router
  .post("/event", async (req, res) => {
    const { id } = req.body;
    const pair = await Pair.findOneAndUpdate(
      { key: "currentEvent" },
      { value: id }
    );
    if (pair) {
      switch (id) {
        default: // 4, 8, 14
          res.json("Success").status(200);
          break;
        case 1: // 持有蜘蛛人系列建築的隊伍須進監獄上跳舞課
          {
            const spiderSeries = await (
              await Land.find({ area: 1 })
            ).filter((land) => land.owner !== 0);
            const owners = await spiderSeries.map((land) => land.owner);
            const uniqueOwners = owners
              .filter(function (item, pos) {
                return owners.indexOf(item) == pos;
              })
              .sort();
            console.log(uniqueOwners);
            res.json(`Team: ${uniqueOwners}`).status(200);
          }
          break;
        case 2: // 面臨國喪，持有黑豹系列建築的隊伍可以選擇(1)在原地休息5分鐘默哀致意 或 (2)繳20000結束
          {
            const blackSeries = await (
              await Land.find({ area: 4 })
            ).filter((land) => land.owner !== 0);
            const owners = await blackSeries.map((land) => land.owner);
            const uniqueOwners = owners
              .filter(function (item, pos) {
                return owners.indexOf(item) == pos;
              })
              .sort();
            console.log(uniqueOwners);
            res.json(`Team: ${uniqueOwners}`).status(200);
          }
          break;
        case 3: // 購買房地產與升級的金額減半
        case 9:
          // TODO
          res.json("TODO").status(200);
          break;
        case 5: // 所有小隊手中現金減少10000。支付不出來視同破產
        case 12:
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money -= 10000;
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 6: // 所有人的房產下降一星級
          {
            const lands = await (
              await (
                await Land.find()
              ).filter(
                (land) =>
                  land.type === "Building" || land.type === "SpecialBuilding"
              )
            ).filter((land) => land.level > 0);
            for (let i = 0; i < lands.length; i++) {
              if (lands[i].level === 1) {
                const owner = await Team.findOne({ id: lands[i].owner });
                owner.money += Math.round(lands[i].price.buy / 2);
                lands[i].owner = 0;
                await owner.save();
              }
              lands[i].level -= 1;
              await lands[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 7: // 復聯系列的房產(與過路費)將提升1.5倍
          // TODO
          res.json("TODO").status(200);
          break;
        case 10: // 財產前4的小隊全部入獄
          {
            const teams = await Team.find().sort({ money: -1 });
            let count = 0;
            let top4 = [];
            for (let i = 0; i < teams.length; i++) {
              if (count < 4) {
                top4.push(teams[i]);
              } else if (teams[i].money === top4[count - 1].money) {
                top4.push(teams[i]);
              } else {
                break;
              }
              count++;
            }
            console.log(top4);
            const names = await top4.map((team) => team.id).sort();
            res.json(`Teams: ${names}`).status(200);
          }
          break;
        case 11: // 地球以外的房產格強制拋售, 並獲得50%價值的金額(地球以外:太空總部、泰坦星、佛米爾星、虛無之地、天劍局、阿斯嘉、彩虹橋、英靈殿、多摩)
          {
            const outsideEarthId = [2, 8, 9, 12, 19, 28, 29, 32, 39];
            const outsideEarthLands = await Land.find({
              id: { $in: outsideEarthId },
            });
            for (let i = 0; i < outsideEarthLands.length; i++) {
              // console.log(outsideEarthLands[i].name);
              if (outsideEarthLands[i].owner === 0) continue;
              const owner = await Team.findOne({
                id: outsideEarthLands[i].owner,
              });
              owner.money += Math.round(outsideEarthLands[i].price.buy / 2);
              if (outsideEarthLands[i].level > 1) {
                owner.money += Math.round(
                  ((outsideEarthLands[i].level - 1) *
                    outsideEarthLands[i].price.upgrade) /
                    2
                );
              }
              outsideEarthLands[i].owner = 0;
              outsideEarthLands[i].level = 0;
              await owner.save();
              await outsideEarthLands[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 13: // 手上持有現金翻倍
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money *= 2;
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
      }
    } else {
      res.json("Failed").status(403);
    }
  })
  .get("/event", async (req, res) => {
    const pair = await Pair.findOne({ key: "currentEvent" });
    const event = await Event.findOne({ id: pair.value });
    res.json(event).status(200);
  });

router.post("/occupation", async (req, res) => {
  const { teamname, occupation } = req.body;
  const team = await Team.findOne({ teamname });
  team.occupation = occupation;
  await team.save();

  if (occupation === "鷹眼") {
    const pair = await Pair.findOneAndUpdate(
      { key: "hawkEyeTeam" },
      { value: team.id }
    );
  }
  res.json(team).status(200);
});

router.post("/level", async (req, res) => {
  const { teamId, level } = req.body;
  const team = await Team.findOneAndUpdate({ id: teamId }, { level: level });
  console.log(team);
  res.json(team).status(200);
});

router.post("/add", async (req, res) => {
  const { id, teamname, dollar } = req.body;
  const team = await Team.findAndCheckValid(id);
  if (!team) {
    res.status(403).send();
    console.log("Team not found");
    return;
  }
  if (team.soulgem.value === true) {
    if (dollar < 0) {
      const newTeam = await Team.findOneAndUpdate(
        { id: id },
        { money: Math.round(team.money + dollar * 1.5) }
      );
      if (!newTeam) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    } else {
      const newTeam = await Team.findOneAndUpdate(
        { id: id },
        { money: team.money + dollar * 2 }
      );
      if (!newTeam) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    }
  } else {
    const newTeam = await Team.findOneAndUpdate(
      { id: id },
      { money: team.money + dollar }
    );
    console.log(team, newTeam);
    if (!newTeam) {
      res.status(403).send();
      console.log("Update failed");
      return;
    }
  }
  res.status(200).send("Update succeeded");
});

router.post("/series", async (req, res) => {
  const { teamId, area } = req.body;
  const count = await (
    await Land.find({ area, owner: teamId })
  ).filter((land) => land.owner > 0).length;
  res.json({ count }).status(200);
});

router.post("/transfer", async (req, res) => {
  const { from, to, IsEstate, dollar, equal } = req.body;
  const team1 = await Team.findAndCheckValid(from);
  if (!team1) {
    res.status(403).send();
    console.log("Team not found");
    return;
  }
  const team2 = await Team.findOne({ id: to });
  if (!team2) {
    res.status(403).send();
    console.log("Team not found");
    return;
  }
  if (equal) {
    const equalmoney = Math.round((team1.money + team2.money) / 2);
    const newTeam1 = await Team.findOneAndUpdate(
      { id: from },
      { money: equalmoney }
    );
    const newTeam2 = await Team.findOneAndUpdate(
      { id: to },
      { money: equalmoney }
    );
    if (!newTeam1 || !newTeam2) {
      res.status(403).send();
      console.log("Update failed");
      return;
    }
    res.status(200).send("Update succeeded");
    return;
  }

  if (!IsEstate) {
    if (team1.soulgem.value === true) {
      const newTeam1 = await Team.findOneAndUpdate(
        { id: from },
        { money: Math.round(team1.money - dollar * 1.5) }
      );
      if (!newTeam1) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    } else {
      const newTeam1 = await Team.findOneAndUpdate(
        { id: from },
        { money: team1.money - dollar }
      );
      if (!newTeam1) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    }
    if (team2.soulgem.value === true) {
      const newTeam2 = await Team.findOneAndUpdate(
        { id: to },
        { money: team2.money + dollar * 2 }
      );
      if (!newTeam2) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    } else {
      const newTeam2 = await Team.findOneAndUpdate(
        { id: to },
        { money: team2.money + dollar }
      );
      if (!newTeam2) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    }
  } else {
    if (team1.soulgem.value === true) {
      const newTeam1 = await Team.findOneAndUpdate(
        { id: from },
        { money: Math.round(team1.money - dollar * 1.5 * team2.bonus.value) }
      );
      if (!newTeam1) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    } else {
      const newTeam1 = await Team.findOneAndUpdate(
        { id: from },
        { money: team1.money - dollar * team2.bonus.value }
      );
      if (!newTeam1) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    }
    if (team2.soulgem.value === true) {
      const newTeam2 = await Team.findOneAndUpdate(
        { id: to },
        { money: team2.money + dollar * 2 * team2.bonus.value }
      );
      if (!newTeam2) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    } else {
      const newTeam2 = await Team.findOneAndUpdate(
        { id: to },
        { money: team2.money + dollar * team2.bonus.value }
      );
      if (!newTeam2) {
        res.status(403).send();
        console.log("Update failed");
        return;
      }
    }
  }
  res.status(200).send("Update succeeded");
});

async function updateHawkEye() {
  const { value: hawkEyeTeam } = await Pair.findOne({ key: "hawkEyeTeam" });
  if (hawkEyeTeam === 0) return;
  const hawkEyeBuildings = await Land.find({ owner: hawkEyeTeam });
  console.log(hawkEyeBuildings);
  for (let i = 0; i < hawkEyeBuildings.length; i++) {
    await Land.findOneAndUpdate(
      { id: hawkEyeBuildings[i].id - 1 },
      { hawkEye: 1 }
    );
    await Land.findOneAndUpdate(
      { id: hawkEyeBuildings[i].id + 1 },
      { hawkEye: 1 }
    );
  }
  for (let i = 0; i < hawkEyeBuildings.length; i++) {
    await Land.findOneAndUpdate({ id: hawkEyeBuildings[i].id }, { hawkEye: 2 });
  }
  console.log("hawkEye updated");
}

router.post("/ownership", async (req, res) => {
  const { teamId, land, level } = req.body;
  const tmp1 = await Land.findOneAndUpdate({ name: land }, { owner: teamId });
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
  await updateHawkEye(land);
  res.status(200).send("update succeeded");
});

router.get("/allEffects", async (req, res) => {
  const effects = await Effect.find({}).sort({ id: 1 });
  res.json(effects).status(200);
});

router.post("/effect", async (req, res) => {
  const { teamname, title } = req.body;
  const effect = await Effect.findOne({ title });
  if (!effect) {
    res.status(403).send();
    console.log("Effect not found");
    return;
  }
  const { id, description, trait, duration, bonus } = effect;
  const team = await Team.findOne({ teamname });
  const time = Date.now() / 1000;
  if (!team) {
    res.status(403).send("Team not found");
    console.log("Team not found");
    return;
  }
  if (bonus !== -1) {
    team.bonus = { value: bonus, duration, time };
  }
  if (id === 4) {
    // soulgem
    team.soulgem = { value: true, duration, time };
  }

  const pair = await Pair.findOne({ key: "lastNotificationId" });
  const type = trait ? "temporary" : "permanent";
  const notification = {
    id: pair.value,
    type,
    teamname,
    title,
    description: `${teamname}: ${description}`,
    duration,
    createdAt: time,
  };
  // await deleteTimeoutNotification();
  // save
  await new Notification(notification).save();
  await team.save();
  res.status(200).send("Update succeeded");
});

router.get("/notifications", async (req, res) => {
  await deleteTimeoutNotification();
  // save
  const newNotifications = await Notification.find();
  res.json(newNotifications).status(200);
});

// router.post("/bonus", async (req, res) => {
//   console.log(req.body);
//   const { teamname, bonus, duration } = req.body;
//   const time = Date.now() / 1000;
//   const team = await Team.findOneAndUpdate(
//     { teamname: teamname },
//     { bonus: { value: bonus, time: time, duration: duration } }
//   );
//   if (!team) {
//     res.status(403).send();
//     console.log("Update failed");
//     return;
//   }
//   res.status(200).send("update succeeded");
// });

// router.post("/soulgem", async (req, res) => {
//   const { teamname } = req.body;
//   const time = Date.now() / 1000;
//   const team = await Team.findOneAndUpdate(
//     { teamname: teamname },
//     { soulgem: { value: true, time: time } }
//   );
//   if (!team) {
//     res.status(403).send();
//     console.log("Update failed");
//     return;
//   }
//   res.status(200).send("update succeeded");
// });

// router.get("/checkvalid", async (req, res) => {
//   const { teamname } = req.query;
//   const team = await findAndCheckValid(teamname);
//   res.status(200).send(team);
// });

// Login
router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  // console.log(username);
  // console.log(password);
  const user = await User.findAndValidate(username, password);
  if (!user) {
    res.status(200).send(null);
    console.log("login failed");
    return;
  }
  // req.session.user = user;
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
