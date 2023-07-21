import express from "express";
import Team from "../models/team.js";
import Land from "../models/land.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";
import Event from "../models/event.js";
import Pair from "../models/pair.js";
import Effect from "../models/effect.js";
import Broadcast from "../models/broadcast.js";
import Resource from "../models/resource.js";
const router = express.Router();

const buffBuildings = async (building_1, building_2) => {
  building_1.buffed = 1;
  building_2.buffed = 1;
  for (let i = 0; i < 3; i++) {
    building_1.rent[i] *= 1.5;
    building_2.rent[i] *= 1.5;
  }

  await building_1.save();
  await building_2.save();
};

const debuffBuildings = async (building_1, building_2) => {
  building_1.buffed = 0;
  building_2.buffed = 0;
  for (let i = 0; i < 3; i++) {
    building_1.rent[i] /= 1.5;
    building_2.rent[i] /= 1.5;
  }

  await building_1.save();
  await building_2.save();
};

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

async function updateTeam(team, moneyChanged, io, saved) {
  const teamObj = await Team.findOne({ id: team });
  var ratio = 1;
  if (teamObj.soulgem.value === true) {
    if (moneyChanged > 0) ratio = 2;
    else ratio = 1.5;
  }
  // console.log(ratio);
  // console.log(teamObj.money);
  // console.log(teamObj.money + moneyChanged * ratio);
  let final = Math.round(teamObj.money + moneyChanged * ratio);
  // console.log("final: ", final);
  if (saved && final < 0) {
    const message = {
      title: "破產!!!",
      description: teamObj.teamname,
      level: 0,
      createdAt: Date.now(),
    };
    await new Broadcast(message).save();
    io.emit("broadcast", message);
  }
  if (saved) {
    const temp = await Team.findOneAndUpdate(
      { id: team },
      { money: final },
      { new: true } //return the item after update
    );
    return temp;
  } else {
    return { money: final };
  }
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

// router
//   .get("/phase", async (req, res) => {
//     const phase = await Pair.findOne({ key: "phase" });
//     res.json({ phase: phase.value }).status(200);
//   })
//   .post("/phase", async (req, res) => {
//     const phase = await Pair.findOne({ key: "phase" });
//     phase.value = req.body.phase;
//     await phase.save();
//     res.json({ phase: phase.value }).status(200);
//     req.io.emit("broadcast", {
//       title: `Phase Changed to ${phase.value}`,
//       description: "",
//       level: 0,
//     });
//   });

router.get("/team", async (req, res) => {
  const teams = await Team.find().sort({ teamname: 1 });
  res.json(teams).status(200);
});

router.get("/teamRich", async (req, res) => {
  const teams = await Team.find().sort({ money: -1 });
  const team = teams[0];
  console.log(team);
  res.json(team).status(200);
});

router.post("/checkPropertyCost", async (req, res) => {
  const { team, building } = req.body;

  const targetBuilding = await Land.find({ id: building });
  const targetTeam = await Team.find({ id: team });
  const surplus = targetTeam[0].money;
  const checkOwned = targetBuilding[0].owner;
  if (checkOwned === 0) {
    const checkPropertyCost = targetBuilding[0].price.buy;
    console.log(`surplus: ${surplus}`);
    console.log(`cost: ${checkPropertyCost}`);
    if (surplus >= checkPropertyCost) res.json({ message: "OK" }).status(200);
    else {
      res.json({ message: "FUCK" }).status(200);
    }
  } else {
    const checkPropertyCost = targetBuilding[0].price.upgrade;
    console.log(checkPropertyCost);
    if (surplus >= checkPropertyCost) res.json({ message: "OK" }).status(200);
    else res.json({ message: "FUCK" }).status(200);
  }
});

// router.get("/team/hawkeye", async (req, res) => {
//   const team = await Team.findOne({ occupation: "鷹眼" });
//   console.log(team);
//   res.json(team).status(200);
// });

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

router.get("/getRent", async (req, res) => {
  const building = req.query.building;
  const targetBuilding = await Land.find({ id: building });
  if (targetBuilding === undefined) res.json(0).status(200);

  const rent = targetBuilding[0].rent[targetBuilding[0].level - 1];
  res.json(rent).status(200);
});

router.get("/resourceInfo", async (req, res) => {
  const resources = await Resource.find().sort({ id: 1 });
  res.json(resources).status(200);
});

router.post("/sellResource", async (req, res) => {
  const { teamId, resourceId, number, mode } = req.body;

  const team = await Team.find({ id: teamId });
  const resource = await Resource.find({ id: resourceId });

  if (mode === 0) {
    await Team.findOneAndUpdate(
      { id: teamId },
      {
        money: team[0].money + resource[0].price * number,
      }
    );
  } else if (mode === 1) {
    await Team.findOneAndUpdate(
      { id: teamId },
      {
        money: team[0].money - resource[0].price * number,
      }
    );
  }
  res.json("Success").status(200);
});

// update resource
router.post("/resource", async (req, res) => {
  const resources = await Resource.find();
  for (let i = 0; i < resources.length; i++) {
    await Resource.findOneAndUpdate(
      { name: resources[i].name },
      {
        price:
          resources[i].price *
          Math.floor(
            ((Math.floor(Math.random() * 200) + 1) / 8) *
              ((Math.floor(Math.random() * 10) + 1) / 50)
          ),
      }
    );
  }
  // check whether price > 0
  const check = await Resource.find().sort({ id: 1 });
  for (let i = 0; i < check.length; i++) {
    if (check[i].price < 1) {
      await Resource.findOneAndUpdate(
        { name: check[i].name },
        {
          price: 100,
        }
      );
    } else if (check[i].price < 80000) {
      await Resource.findOneAndUpdate(
        { name: check[i].name },
        {
          price: 80000,
        }
      );
    }
  }
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
  // team.money += price;
  // await team.save();
  await updateTeam(land.owner, price, req.io, true);
  await Land.findOneAndUpdate({ id: landId }, { owner: 0, level: 0 });
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
      // switch (currentEvent) {
      //   default:
      //     break;
      //   case 7:
      //     {
      //       const buildings = await (
      //         await Land.find()
      //       ).filter((land) => land.type === "Building" && land.area === 3);
      //       for (let i = 0; i < buildings.length; i++) {
      //         buildings[i].price.buy = Math.round(buildings[i].price.buy / 1.5);
      //         buildings[i].price.upgrade = Math.round(
      //           buildings[i].price.upgrade / 1.5
      //         );
      //         for (let j = 0; j < 3; j++) {
      //           buildings[i].rent[j] = Math.round(buildings[i].rent[j] / 1.5);
      //         }
      //         await buildings[i].save();
      //       }
      //       console.log("Updated prices");
      //     }
      //     break;
      //   case 3:
      //   case 9:
      //     {
      //       const buildings = await (
      //         await Land.find()
      //       ).filter(
      //         (land) =>
      //           land.type === "Building" || land.type === "SpecialBuilding"
      //       );
      //       for (let i = 0; i < buildings.length; i++) {
      //         buildings[i].price.buy = buildings[i].price.buy * 2;
      //         buildings[i].price.upgrade = buildings[i].price.upgrade * 2;
      //         await buildings[i].save();
      //       }
      //       console.log("Updated prices");
      //     }
      //     break;
      // }

      switch (id) {
        default: // 7, 8, 9, 11, 14, 15, 20
          res.json("Success").status(200);
          break;
        case 1: // 遭遇打劫, 各組金錢資源減少30%
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money *= 0.7;
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 2: // 船隻航行能力受限, 骰子數量減為1, 抵達水之七島房產格方可修復
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].dice -= 1;
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 3:
          {
            // 戰爭後重建, 擁有馬林福特房產格之隊伍歸還地權
            const buildings = await (
              await Land.find()
            ).filter((land) => land.id === 25 || land.id === 26);

            for (let i = 0; i < buildings.length; i++) {
              buildings[i].owner = 0;
              buildings[i].level = 0;
              if (buildings[i].buffed === 1) {
                debuffBuildings(buildings[0], buildings[1]);
              }
              await buildings[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 4:
          {
            let [team1, team2, team3] = [0, 0, 0];
            team1 = Math.floor(Math.random() * 10) + 1;
            while (team1 === team2 || team2 === 0) {
              team2 = Math.floor(Math.random() * 10) + 1;
            }
            while (team3 === team2 || team3 === team1 || team3 === 0) {
              team3 = Math.floor(Math.random() * 10) + 1;
            }
            res
              .json(
                `Teams going to jail: team${team1}, team${team2}, team${team3}`
              )
              .status(200);
          }
          break;
        case 5: // 眾島嶼遭聖母烈焰攻擊，位於1~12之房產格房子數 -1
          {
            const lands = await (
              await Land.find()
            ).filter(
              (land) =>
                land.type === "Building" && land.level > 0 && land.id <= 12
            );
            console.log(lands);
            for (let i = 0; i < lands.length; i++) {
              if (lands === []) break;
              if (lands[i].level === 1) {
                await updateTeam(
                  lands[i].owner,
                  Math.round(lands[i].price.buy / 2),
                  req.io,
                  true
                );
                lands[i].owner = 0;
                // await owner.save();
                if (lands[i].buffed === 1) lands[i].buffed = 0;
              }

              lands[i].level -= 1;
              await lands[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 6: // 人民最黑暗的一天，房產價格增加30%
          {
            const buildings = await (
              await Land.find()
            ).filter((land) => land.type === "Building");
            for (let i = 0; i < buildings.length; i++) {
              buildings[i].price *= 1.3;
              await buildings[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 10: // 馬林福特附近遭受波及，位於15~30之房產格房子數 -1
          {
            const lands = await (
              await Land.find()
            ).filter(
              (land) =>
                land.type === "Building" &&
                land.level > 0 &&
                land.id >= 15 &&
                land.id <= 30
            );
            for (let i = 0; i < lands.length; i++) {
              if (lands[i].level === 1) {
                await updateTeam(
                  lands[i].owner,
                  Math.round(lands[i].price.buy / 2),
                  req.io,
                  true
                );
                lands[i].owner = 0;
                // await owner.save();
                if (lands[i].buffed === 1) lands[i].buffed = 0;
              }
              lands[i].level -= 1;

              await lands[i].save();
            }
            res.json("Success").status(200);
          }
          break;

        case 12: // 靠邀被套牢了！所有資源價錢下跌50%
          {
            const resources = await Resource.find();
            for (let i = 0; i < resources.length; i++) {
              resources[i].price *= 0.5;
              resources[i].price = Math.round(resources[i].price / 10) * 10;
              await resources[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 13:
          {
            // 回到各隊初始格，金錢增加50%
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money *= 1.5;
              teams[i].money = Math.round(teams[i].money / 100) * 100;
              // console.log(teams[i].money);
              await teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        // case 16: // 海域不平靜，各組暫停行動5分鐘，擁有龍宮城、漁人島房產格隊伍不受影響
        //   {
        //     let teams = [];
        //     const lands = await (
        //       await Land.find()
        //     ).filter(
        //       (land) =>
        //         land.type === "Building" &&
        //         (land.id === 29 ||
        //           land.id === 30 ||
        //           land.id === 33 ||
        //           land.id === 34)
        //     );
        //     for (let i = 0; i < lands.length; i++) {
        //       if (!teams.includes(lands[i].owner)) {
        //         teams.push(lands[i].owner);
        //       }
        //     }
        //     teams.sort(function (a, b) {
        //       return a - b;
        //     });
        //     const names = await teams.map((team) => team.id);
        //     res.json(`Teams ${names} aren't affected.`).status(200);
        //   }

        //   break;
        case 16: // 仇富心態爆發，財產前4的小隊入獄
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
            const names = await top4
              .map((team) => team.id)
              .sort((a, b) => {
                return a - b;
              });
            note = `Team: ${names}`;
            res.json(note).status(200);
          }
          break;
        case 17: // 同盟共享資源，當前金錢變為2倍
          {
            const teams = await Team.find();
            for (let i = 0; i < teams.length; i++) {
              teams[i].money *= 2;
              teams[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 18:
          {
            const buildings = await Land.find({ type: "Building" });
            for (let i = 0; i < buildings.length; i++) {
              for (let j = 0; j < 3; j++) {
                buildings[i].rent[j] *= -1;
              }
              await buildings[i].save();
            }
            res.json("Success").status(200);
          }
          break;
        case 19:
          {
            const buildings = await Land.find({ type: "Building" });
            for (let i = 0; i < buildings.length; i++) {
              for (let j = 0; j < 3; j++) {
                buildings[i].rent[j] *= -1;
              }
              await buildings[i].save();
            }
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
      // await new Notification(newEvent).save();
      // console.log(newEvent);
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

// router.post("/occupation", async (req, res) => {
//   const { teamname, occupation } = req.body;
//   const team = await Team.findOne({ teamname });
//   team.occupation = occupation;
//   await team.save();

//   if (occupation === "鷹眼") {
//     const pair = await Pair.findOneAndUpdate(
//       { key: "hawkEyeTeam" },
//       { value: team.id }
//     );
//   }
//   res.json(team).status(200);
// });

// router.post("/level", async (req, res) => {
//   const { teamId, level } = req.body;
//   const team = await Team.findOneAndUpdate({ id: teamId }, { level: level });
//   console.log(team);
//   res.json(team).status(200);
// });

router
  .post("/add", async (req, res) => {
    const { id, dollar, jeff, jeffTeam } = req.body;
    const team = await Team.findAndCheckValid(id);
    const targetTeam = await Team.find({ id: jeffTeam });
    if (!team) {
      res.status(403).send();
      console.log("Team not found");
      return;
    }
    await updateTeam(id, dollar, req.io, true);
    if (dollar < 0) {
      req.io.emit("broadcast", {
        title: "扣錢",
        description: `第${id}小隊遭扣除${-dollar}元！！`,
      });
    }

    if (jeff) {
      req.io.emit("broadcast", {
        title: "劫富卡發動",
        description: `第${jeffTeam}小隊遭到劫富！！`,
      });
      await Team.findOneAndUpdate(
        { id: jeffTeam },
        { money: targetTeam[0].money * 0.75 }
      );
    }
    res.status(200).send("Update succeeded");
  })
  .get("/add", async (req, res) => {
    console.log(req.query);
    const { id, dollar } = req.query;
    console.log(id, dollar);
    const data = await updateTeam(id, dollar, req.io, false);
    console.log(data);
    res.json(data).status(200);
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

  var FromAmount = parseInt(FromTeam.money);
  var ToAmount = parseInt(ToTeam.money);
  var TransferAmount = parseInt(amount);
  console.log(TransferAmount, ToTeam.bonus.value);
  if (isEstate && ToTeam.bonus.value !== 0)
    TransferAmount *= ToTeam.bonus.value;

  console.log(TransferAmount);
  if (FromTeam.soulgem.value)
    FromAmount -= parseInt(Math.round(TransferAmount * 1.5));
  else FromAmount -= TransferAmount;

  if (ToTeam.soulgem.value)
    ToAmount += parseInt(Math.round(TransferAmount * 2));
  else ToAmount += TransferAmount;
  console.log({ from: FromAmount, to: ToAmount });
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

router.get("/transfer", async (req, res) => {
  let from = req.query.from;
  let to = req.query.to;
  let IsEstate = req.query.IsEstate;
  let dollar = req.query.dollar;
  const data = await calcTransfer(from, to, dollar, IsEstate);
  console.log(data);
  if (data !== null) res.json(data).status(200);
  else res.status(403).send();
});

// async function updateHawkEye() {
//   const { value: hawkEyeTeam } = await Pair.findOne({ key: "hawkEyeTeam" });
//   if (hawkEyeTeam === 0) return;
//   // may delete some building need to clear and fill(?)
//   for (let i = 1; i <= 40; i++) {
//     await Land.findOneAndUpdate({ id: i }, { hawkEye: 0 });
//   }
//   const hawkEyeBuildings = await Land.find({ owner: hawkEyeTeam });
//   console.log(hawkEyeBuildings);
//   for (let i = 0; i < hawkEyeBuildings.length; i++) {
//     await Land.findOneAndUpdate(
//       { id: hawkEyeBuildings[i].id - 1 },
//       { hawkEye: hawkEyeBuildings[i].id }
//     );
//     await Land.findOneAndUpdate(
//       { id: hawkEyeBuildings[i].id + 1 },
//       { hawkEye: hawkEyeBuildings[i].id }
//     );
//   }
//   for (let i = 0; i < hawkEyeBuildings.length; i++) {
//     await Land.findOneAndUpdate(
//       { id: hawkEyeBuildings[i].id },
//       { hawkEye: hawkEyeBuildings[i].id }
//     );
//   }
//   console.log("hawkEye updated");
// }

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

  // await updateHawkEye(land);
  res.status(200).send("update succeeded");
});

router.post("/calcbonus", async (req, res) => {
  const { teamId, land, level } = req.body;
  const buildings = await Land.find({}).sort({ id: 1 });
  console.log(req.body);
  const targetBuilding = await Land.find({ name: land });

  if (targetBuilding[0].id === 2 || targetBuilding[0].id === 3) {
    if (buildings[1].owner === buildings[2].owner) {
      buffBuildings(buildings[1], buildings[2]);
    } else if (
      buildings[1].buffed === 1 &&
      buildings[1].owner !== buildings[2].owner
    ) {
      debuffBuildings(buildings[1], buildings[2]);
    }
  } else if (targetBuilding[0].id === 6 || targetBuilding[0].id === 7) {
    if (buildings[5].owner === buildings[6].owner) {
      buffBuildings(buildings[5], buildings[6]);
    } else if (
      buildings[5].buffed === 1 &&
      buildings[5].owner !== buildings[6].owner
    ) {
      debuffBuildings(buildings[5], buildings[6]);
    }
  } else if (targetBuilding[0].id === 10 || targetBuilding[0].id === 11) {
    if (buildings[9].owner === buildings[10].owner) {
      buffBuildings(buildings[9], buildings[10]);
    } else if (
      buildings[9].buffed === 1 &&
      buildings[9].owner !== buildings[10].owner
    ) {
      debuffBuildings(buildings[9], buildings[10]);
    }
  } else if (targetBuilding[0].id === 15 || targetBuilding[0].id === 16) {
    if (buildings[14].owner === buildings[15].owner) {
      buffBuildings(buildings[14], buildings[15]);
    } else if (
      buildings[14].buffed === 1 &&
      buildings[14].owner !== buildings[15].owner
    ) {
      debuffBuildings(buildings[9], buildings[10]);
    }
  } else if (targetBuilding[0].id === 20 || targetBuilding[0].id === 21) {
    if (buildings[19].owner === buildings[20].owner) {
      buffBuildings(buildings[19], buildings[20]);
    } else if (
      buildings[19].buffed === 1 &&
      buildings[19].owner !== buildings[20].owner
    ) {
      debuffBuildings(buildings[19], buildings[20]);
    }
  } else if (targetBuilding[0].id === 25 || targetBuilding[0].id === 26) {
    if (buildings[24].owner === buildings[25].owner) {
      buffBuildings(buildings[24], buildings[25]);
    } else if (
      buildings[24].buffed === 1 &&
      buildings[24].owner !== buildings[25].owner
    ) {
      debuffBuildings(buildings[24], buildings[25]);
    }
  } else if (targetBuilding[0].id === 29 || targetBuilding[0].id === 30) {
    if (buildings[28].owner === buildings[29].owner) {
      buffBuildings(buildings[28], buildings[29]);
    } else if (
      buildings[28].buffed === 1 &&
      buildings[28].owner !== buildings[29].owner
    ) {
      debuffBuildings(buildings[28], buildings[29]);
    }
  } else if (targetBuilding[0].id === 33 || targetBuilding[0].id === 34) {
    if (buildings[32].owner === buildings[33].owner) {
      buffBuildings(buildings[32], buildings[33]);
    } else if (
      buildings[32].buffed === 1 &&
      buildings[32].owner !== buildings[33].owner
    ) {
      debuffBuildings(buildings[32], buildings[33]);
    }
  } else if (targetBuilding[0].id === 37 || targetBuilding[0].id === 38) {
    if (buildings[36].owner === buildings[37].owner) {
      buffBuildings(buildings[36], buildings[37]);
    } else if (
      buildings[36].buffed === 1 &&
      buildings[36].owner !== buildings[37].owner
    ) {
      debuffBuildings(buildings[36], buildings[37]);
    }
  } else if (targetBuilding[0].id === 41 || targetBuilding[0].id === 42) {
    if (buildings[40].owner === buildings[41].owner) {
      buffBuildings(buildings[40], buildings[41]);
    } else if (
      buildings[40].buffed === 1 &&
      buildings[40].owner !== buildings[41].owner
    ) {
      debuffBuildings(buildings[40], buildings[41]);
    }
  } else if (targetBuilding[0].id === 46 || targetBuilding[0].id === 47) {
    if (buildings[45].owner === buildings[46].owner) {
      buffBuildings(buildings[45], buildings[46]);
    } else if (
      buildings[45].buffed === 1 &&
      buildings[45].owner !== buildings[46].owner
    ) {
      debuffBuildings(buildings[45], buildings[46]);
    }
  }
});

router.post("/aquire", async (req, res) => {
  const { land, teamId } = req.body;
  const target = await Land.find({ name: land });
  const originOwner = target[0].owner;
  const originTeam = await Team.find({ id: originOwner });
  const newTeam = await Team.find({ id: teamId });
  originTeam[0].money +=
    target[0].price.buy + (target[0].level - 1) * target[0].price.upgrade;
  newTeam[0].money -=
    target[0].price.buy + (target[0].level - 1) * target[0].price.upgrade;
  target[0].owner = teamId;

  await originTeam[0].save();
  await newTeam[0].save();
  await target[0].save();
  res.json("Success").status(200);
});

router.get("/aquireBuilding", async (req, res) => {
  const targetBuilding = Land.find({ type: "Building" }).sort({ id: 1 });
  res.json(targetBuilding).status(200);
});

router.post("/exchange", async (req, res) => {
  const { land, otherLand, teamId, otherTeamId } = req.body;
  const land_1 = await Land.find({ name: land });
  const land_2 = await Land.find({ name: otherLand });
  land_1[0].owner = otherTeamId;
  land_2[0].owner = teamId;
  await land_1[0].save();
  await land_2[0].save();
  res.json("Success").status(200);
});

router.post("/shipRepair", async (req, res) => {
  const { teamId } = req.body;
  console.log(teamId);
  const team = await Team.find({ id: teamId });
  team[0].dice = 2;
  await team[0].save();
  res.json("Success").status(200);
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
  console.log(notification);
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
