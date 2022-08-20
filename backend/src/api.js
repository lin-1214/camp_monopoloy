import express from "express";
import Team from "../models/team.js";
import Land from "../models/land.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";
import Event from "../models/event.js";
import Pair from "../models/pair.js";
import Effect from "../models/effect.js";
import Broadcast from "../models/broadcast.js";
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

// async function calcmoney(teamname, money, estate) {
//   const team = await Team.findOne({ teamname });
//   if (money > 0) {
//     if (team.soulgem.value) {
//       money *= 2;
//     }
//     if (estate) {
//       money *= team.bonus.value;
//     }
//   } else {
//     if (team.soulgem.value) {
//       money *= 1.5;
//     }
//   }
//   return money;
// }

async function updateTeam(team, io) {
  if (team.money < 0) {
    const message = { title: "破產!!!", description: team.teamname, level: 0 };
    io.emit("broadcast", message);
  }
  await team.save();
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

router
  .get("/phase", async (req, res) => {
    const phase = await Pair.findOne({ key: "phase" });
    res.json({ phase: phase.value }).status(200);
  })
  .post("/phase", async (req, res) => {
    const phase = await Pair.findOne({ key: "phase" });
    phase.value = req.body.phase;
    await phase.save();
    res.json({ phase: phase.value }).status(200);
    req.io.emit("broadcast", {
      title: `Phase Changed to ${phase.value}`,
      description: "",
      level: 0
    });
  });

router.get("/team", async (req, res) => {
  const teams = await Team.find().sort({ teamname: 1 });
  res.json(teams).status(200);
});

router.get("/team/hawkeye", async (req, res) => {
  const team = await Team.findOne({ occupation: "鷹眼" });
  console.log(team);
  res.json(team).status(200);
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

router.post("/set", async (req, res) => {
  const { id, amount } = req.body;
  await Team.findOneAndUpdate({ id: parseInt(id) }, { money: amount });
  res.json({ success: true }).status(200);
});

const calcSellPrice = (land, forced) => {
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
  if (!forced) {
    return Math.round(price / 2);
  } else {
    return price * 2;
  }
};

router.post("/sell", async (req, res) => {
  const { teamId, landId, forced } = req.body;
  const land = await Land.findOne({ id: landId });
  if (land.owner !== teamId && teamId < 10) {
    res.status(400).json({ error: "Not your land" });
    return;
  }
  const team = await Team.findOne({ id: land.owner });

  const price = calcSellPrice(land, forced);
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
    const pair = await Pair.findOne({ key: "currentEvent" });
    if (pair) {
      const currentEvent = parseInt(pair.value);
      let note = "";
      // console.log(currentEvent);
      switch (currentEvent) {
        default:
          break;
        case 7:
          {
            const buildings = await (
              await Land.find()
            ).filter((land) => land.type === "Building" && land.area === 3);
            for (let i = 0; i < buildings.length; i++) {
              buildings[i].price.buy = Math.round(buildings[i].price.buy / 1.5);
              buildings[i].price.upgrade = Math.round(
                buildings[i].price.upgrade / 1.5
              );
              for (let j = 0; j < 3; j++) {
                buildings[i].rent[j] = Math.round(buildings[i].rent[j] / 1.5);
              }
              await buildings[i].save();
            }
            console.log("Updated prices");
          }
          break;
        case 3:
        case 9:
          {
            const buildings = await (
              await Land.find()
            ).filter(
              (land) =>
                land.type === "Building" || land.type === "SpecialBuilding"
            );
            for (let i = 0; i < buildings.length; i++) {
              buildings[i].price.buy = buildings[i].price.buy * 2;
              buildings[i].price.upgrade = buildings[i].price.upgrade * 2;
              await buildings[i].save();
            }
            console.log("Updated prices");
          }
          break;
      }

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
            note = `Team: ${uniqueOwners.length ? uniqueOwners : "None"}`;
            res.json(note).status(200);
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
            note = `Team: ${uniqueOwners.length ? uniqueOwners : "None"}`;
            res.json(note).status(200);
          }
          break;
        case 3: // 購買房地產與升級的金額減半
        case 9:
          {
            const buildings = await (
              await Land.find()
            ).filter(
              (land) =>
                land.type === "Building" || land.type === "SpecialBuilding"
            );
            for (let i = 0; i < buildings.length; i++) {
              buildings[i].price.buy = Math.round(buildings[i].price.buy / 2);
              buildings[i].price.upgrade = Math.round(
                buildings[i].price.upgrade / 2
              );
              await buildings[i].save();
            }
            res.json("Success").status(200);
          }
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
              await Land.find()
            ).filter((land) => land.type === "Building" && land.level > 0);
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

            const special = await Land.find({ type: "SpecialBuilding" });
            for (let i = 0; i < special.length; i++) {
              if (special[i].owner !== 0) {
                const owner = await Team.findOne({ id: special[i].owner });
                owner.money += Math.round(special[i].price.buy / 2);
                special[i].owner = 0;
                await owner.save();
                await special[i].save();
              }
            }
            await updateHawkEye();
            res.json("Success").status(200);
          }
          break;
        case 7: // 復聯系列的房產(與過路費)將提升1.5倍
          {
            const buildings = await (
              await Land.find()
            ).filter((land) => land.type === "Building" && land.area === 3);
            for (let i = 0; i < buildings.length; i++) {
              buildings[i].price.buy *= 1.5;
              buildings[i].price.upgrade *= 1.5;
              for (let j = 0; j < 3; j++) {
                buildings[i].rent[j] *= 1.5;
              }
              await buildings[i].save();
            }
            res.json("Success").status(200);
          }
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
            note = `Team: ${names}`;
            res.json(note).status(200);
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
              await updateHawkEye();
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
        case 15: // 所有小隊增加10000塊
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money += 10000;
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 16: // 所有小隊增加30000塊
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money += 30000;
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 17: // 所有小隊增加50000塊
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money += 50000;
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 18: // 薩諾斯吸取所有小隊持有金錢的一半
          {
            const teams = await Team.find();
            const thanos = await Team.findOne({ occupation: "薩諾斯" });
            for (let i = 0; i < teams.length; i++) {
              if (teams[i].id === thanos.id) continue;
              thanos.money += Math.round(teams[i].money / 2);
              teams[i].money = Math.round(teams[i].money / 2);
              await teams[i].save();
            }
            await thanos.save();
            res.json("Success").status(200);
          }
          break;
      }
      pair.value = id;
      await pair.save();

      const newEvent = await Event.findOne({ id });
      newEvent.note = note;
      newEvent.level = 0;
      await newEvent.save();
      req.io.emit("broadcast", newEvent);
      console.log("broadcast");
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
  let newMoney = 0;
  if (team.soulgem.value === true) {
    if (dollar < 0) {
      newMoney = Math.round(team.money + dollar * 1.5);
    } else {
      newMoney = Math.round(team.money + dollar * 2);
    }
  } else {
    newMoney = Math.round(team.money + dollar);
  }
  team.money = newMoney;
  await updateTeam(team, req.io);
  res.status(200).send("Update succeeded");
});

router.post("/series", async (req, res) => {
  const { teamId, area } = req.body;
  const count = await (
    await Land.find({ area, owner: teamId })
  ).filter((land) => land.owner > 0).length;
  res.json({ count }).status(200);
});

const calcTransfer = async (from, to, amount, isEstate) => {
  if (from === to) return null;

  const FromTeam = await Team.findOne({ id: from }); //minus
  const ToTeam = await Team.findOne({ id: to }); //add
  if (!FromTeam || !ToTeam) {
    console.log("error finding teams in func: calcTransfer");
    return null;
  }

  let FromAmount = FromTeam.money;
  let ToAmount = ToTeam.money;
  let TransferAmount = amount;

  if (isEstate && ToTeam.bonus.value !== 1)
    TransferAmount *= ToTeam.bonus.value;
  if (FromTeam.soulgem.value) FromAmount -= TransferAmount * 1.5;
  else FromAmount -= TransferAmount;

  if (ToTeam.soulgem.value) ToAmount += TransferAmount *= 2;
  else ToAmount += TransferAmount;

  return { from: FromAmount, to: ToAmount };
};

router.post("/transfer", async (req, res) => {
  const { from, to, IsEstate, dollar } = req.body;
  //update team status
  await Team.findAndCheckValid(from);
  await Team.findAndCheckValid(to);

  const data = await calcTransfer(from, to, dollar, IsEstate);
  if (!data) {
    console.log("Transfer failed");
    res.status(403).send("Transfer failed");
  } else {
    await Team.findOneAndUpdate({ id: from }, { money: data.from });
    await Team.findOneAndUpdate({ id: to }, { money: data.to });
    res.status(200).send("Update succeeded");
  }
});

async function updateHawkEye() {
  const { value: hawkEyeTeam } = await Pair.findOne({ key: "hawkEyeTeam" });
  if (hawkEyeTeam === 0) return;
  const hawkEyeBuildings = await Land.find({ owner: hawkEyeTeam });
  console.log(hawkEyeBuildings);
  for (let i = 0; i < hawkEyeBuildings.length; i++) {
    await Land.findOneAndUpdate(
      { id: hawkEyeBuildings[i].id - 1 },
      { hawkEye: hawkEyeBuildings[i].id }
    );
    await Land.findOneAndUpdate(
      { id: hawkEyeBuildings[i].id + 1 },
      { hawkEye: hawkEyeBuildings[i].id }
    );
  }
  for (let i = 0; i < hawkEyeBuildings.length; i++) {
    await Land.findOneAndUpdate(
      { id: hawkEyeBuildings[i].id },
      { hawkEye: hawkEyeBuildings[i].id }
    );
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
  req.io.emit("broadcast", notification);
  res.status(200).send("Update succeeded");
});

router
  .post("/broadcast", async (req, res) => {
    const { title, description, level } = req.body;
    let time = Date.now();
    const broadcast = {
      createdAt: time,
      title: title,
      description: description,
      level: level,
    };
    await new Broadcast(broadcast).save();
    req.io.emit("broadcast", { title, description, level });
    res.status(200).send("Broadcast succeeded");
    console.log("broadcast sent");
  })
  .get("/broadcast", async (req, res) => {
    const data = await Broadcast.find({}).sort({ createdAt: -1 });
    res.json(data).status(200);
  })
  .delete("/broadcast/:createdAt", async (req, res) => {
    const { createdAt } = req.params;
    const data = await Broadcast.findOneAndDelete({ createdAt });
    res.json(data).status(200);
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
    res.status(200).send({ username: "" });
    console.log("login failed");
    return;
  }
  res.status(200).send({ username: user.username });
  // null, npc, admin: String
});

router.get("/room", async (req, res) => {
  res.status(200).send(req.io.room);
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
