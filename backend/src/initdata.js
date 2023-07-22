import mongoose from "mongoose";
import dotenv from "dotenv-defaults";
import Team from "../models/team.js";
import Land from "../models/land.js";
import User from "../models/user.js";
import Resource from "../models/resource.js";
import Notification from "../models/notification.js";
import Broadcast from "../models/broadcast.js";
import Event from "../models/event.js";
import Pair from "../models/pair.js";
import Effect from "../models/effect.js";

dotenv.config();
console.log(process.env.MONGO_URL);

const db = mongoose.connection;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = [
  {
    username: "admin",
    password: "4mqLR8u2do5b",
  },
  {
    username: "NPC",
    password: "A7AdFQ87QXhG",
  },
  {
    username: "第01小隊",
    password: "656e1h",
  },
  {
    username: "第02小隊",
    password: "s376rj",
  },
  {
    username: "第03小隊",
    password: "e40um3",
  },
  {
    username: "第04小隊",
    password: "40ju1i",
  },
  {
    username: "第05小隊",
    password: "j9l71k",
  },
  {
    username: "第06小隊",
    password: "q61s5w",
  },
  {
    username: "第07小隊",
    password: "v2m4g8",
  },
  {
    username: "第08小隊",
    password: "9w137u",
  },
  {
    username: "第09小隊",
    password: "pt76w2",
  },
  {
    username: "第10小隊",
    password: "kk65j9",
  },
];

const teams = [
  {
    id: 1,
    teamname: "第01小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 2,
    teamname: "第02小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 3,
    teamname: "第03小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 4,
    teamname: "第04小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 5,
    teamname: "第05小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 6,
    teamname: "第06小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 7,
    teamname: "第07小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 8,
    teamname: "第08小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 9,
    teamname: "第09小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    id: 10,
    teamname: "第10小隊",
    // occupation: "N/A",
    money: 40000,
    dice: 2,
    resources: { gold: 0, meat: 0, cola: 0, wood: 0, metal: 0 },
    bonus: { value: 1.0, time: 0, duration: 0 },
    soulgem: { value: false, time: 0 },
  },
];

const lands = [
  { id: 1, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 2,
    type: "Building",
    area: 1,
    name: "羅格鎮 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 10000, upgrade: 6000 },
    rent: [2000, 4000, 10000],
  },
  {
    id: 3,
    type: "Building",
    area: 1,
    name: "羅格鎮 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 10000, upgrade: 6000 },
    rent: [2000, 4000, 10000],
  },
  {
    id: 4,
    type: "Event",
    name: "大型事件格",
    description: "好像有大事要發生了！",
  },
  {
    id: 5,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  {
    id: 6,
    type: "Building",
    area: 1,
    name: "阿拉巴斯坦 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 11000, upgrade: 7000 },
    rent: [2200, 4400, 11000],
  },
  {
    id: 7,
    type: "Building",
    area: 1,
    name: "阿拉巴斯坦 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 11000, upgrade: 7000 },
    rent: [2200, 4400, 11000],
  },
  { id: 8, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 9,
    type: "Transport",
    name: "風來砲",
    description: "準備啟航！",
  },
  {
    id: 10,
    type: "Building",
    area: 1,
    name: "水之七島 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 12000, upgrade: 8000 },
    rent: [2400, 4800, 12000],
  },
  {
    id: 11,
    type: "Building",
    area: 1,
    name: "水之七島 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 12000, upgrade: 8000 },
    rent: [2400, 4800, 12000],
  },
  {
    id: 12,
    type: "Jail",
    name: "海底監獄-推進城",
    description: "進監獄囉，真爽",
  },
  { id: 13, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 14,
    type: "Store",
    name: "魔谷鎮市集",
    description: "多種卡片任君挑選",
  },
  {
    id: 15,
    type: "Building",
    area: 1,
    name: "黃金鐘 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 14000, upgrade: 9000 },
    rent: [2800, 5600, 14000],
  },
  {
    id: 16,
    type: "Building",
    area: 1,
    name: "黃金鐘 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 14000, upgrade: 9000 },
    rent: [2800, 5600, 14000],
  },
  { id: 17, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 18,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  {
    id: 19,
    type: "Arena",
    name: "鬥牛鬥技場",
    description: "Yo Battle!",
  },
  {
    id: 20,
    type: "Building",
    area: 1,
    name: "千陽號 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 16000, upgrade: 10000 },
    rent: [3200, 6400, 16000],
  },
  {
    id: 21,
    type: "Building",
    area: 1,
    name: "千陽號 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 16000, upgrade: 10000 },
    rent: [3200, 6400, 16000],
  },
  { id: 22, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 23,
    type: "Event",
    name: "大型事件格",
    description: "好像有大事要發生了！",
  },
  {
    id: 24,
    type: "Hint",
    name: "成就提示",
    description: "告訴你們一個小秘密",
  },
  {
    id: 25,
    type: "Building",
    area: 1,
    name: "馬林福特 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 18000, upgrade: 12000 },
    rent: [3600, 7200, 18000],
  },
  {
    id: 26,
    type: "Building",
    area: 1,
    name: "馬林福特 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 18000, upgrade: 12000 },
    rent: [3600, 10400, 31200],
  },
  { id: 27, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 28,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  {
    id: 29,
    type: "Building",
    area: 1,
    name: "漁人島 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 20000, upgrade: 14000 },
    rent: [4000, 8000, 20000],
  },
  {
    id: 30,
    type: "Building",
    area: 1,
    name: "漁人島 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 20000, upgrade: 14000 },
    rent: [4000, 8000, 20000],
  },
  {
    id: 31,
    type: "Transport",
    name: "風來砲",
    description: "準備啟航！",
  },
  { id: 32, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 33,
    type: "Building",
    area: 1,
    name: "龍宮城 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 22000, upgrade: 14000 },
    rent: [4400, 8800, 22000],
  },
  {
    id: 34,
    type: "Building",
    area: 1,
    name: "龍宮城 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 22000, upgrade: 14000 },
    rent: [4400, 8800, 22000],
  },
  { id: 35, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 36,
    type: "Building",
    name: "隨機格 - 恐怖三桅帆船",
    owner: 0,
    level: 0,
    price: { buy: 22000, upgrade: 12000 },
    rent: [8800, 17600, 44000],
  },
  {
    id: 37,
    type: "Building",
    area: 1,
    name: "龐克哈薩特 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 25000, upgrade: 14000 },
    rent: [5000, 10000, 25000],
  },
  {
    id: 38,
    type: "Building",
    area: 1,
    name: "龐克哈薩特 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 25000, upgrade: 14000 },
    rent: [5000, 10000, 25000],
  },
  {
    id: 39,
    type: "Store",
    name: "魔谷鎮市集",
    description: "多種卡片任君挑選",
  },
  { id: 40, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 41,
    type: "Building",
    area: 1,
    name: "多雷斯羅薩 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 26000, upgrade: 15000 },
    rent: [5200, 10400, 26000],
  },
  {
    id: 42,
    type: "Building",
    area: 1,
    name: "多雷斯羅薩 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 26000, upgrade: 15000 },
    rent: [5200, 10400, 26000],
  },
  {
    id: 43,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  { id: 44, type: "Game", name: "遊戲格", description: "認真聽規則！" },
  {
    id: 45,
    type: "Arena",
    name: "天空鬥技場",
    description: "Yo Battle!",
  },
  {
    id: 46,
    type: "Building",
    area: 1,
    name: "九里城 I",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 28000, upgrade: 16000 },
    rent: [5600, 11200, 28000],
  },
  {
    id: 47,
    type: "Building",
    area: 1,
    name: "九里城 II",
    owner: 0,
    level: 0,
    buffed: 0,
    price: { buy: 28000, upgrade: 16000 },
    rent: [5600, 11200, 28000],
  },
  {
    id: 48,
    type: "Hint",
    name: "成就提示",
    description: "告訴你們一個小秘密",
  },
];

const resources = [
  {
    id: 1,
    name: "gold",
    price: 4000,
  },
  {
    id: 2,
    name: "meat",
    price: 3000,
  },
  {
    id: 3,
    name: "cola",
    price: 2000,
  },
  {
    id: 4,
    name: "wood",
    price: 1000,
  },
  {
    id: 5,
    name: "metal",
    price: 2000,
  },
];

const events = [
  {
    id: 0,
    title: "無",
    description: "",
  },
  {
    id: 1,
    title: "山賊入侵",
    description: "遭遇打劫, 各組金錢減少30%",
  },
  {
    id: 2,
    title: "船身被毀",
    description:
      "船隻航行能力受限, 骰子數量減為1, 經過水之七島(10, 11)房產格方可修復",
  },
  {
    id: 3,
    title: "頂上戰爭",
    description: "戰爭後重建, 擁有馬林福特房產格之隊伍歸還地權",
  },
  {
    id: 4,
    title: "逃犯越獄",
    description: "海軍氣憤不已, 隨機抽取3支隊伍前往監獄代罪(優先序最高)",
  },
  {
    id: 5,
    title: "聖母烈焰",
    description: "眾島嶼遭聖母烈焰攻擊, 位於1~12之房產格房子數 -1",
  },
  {
    id: 6,
    title: "房價上漲",
    description: "人民最黑暗的一天, 房產價格增加30%",
  },
  {
    id: 7,
    title: "同伴遇難",
    description:
      "隊隨遭敵人抓走，小隊須前往遊戲格用 5000 塊賄賂遊戲格 NPC 來幫忙營救。每個遊戲格只會接受第一個到來的小隊的賄賂。10 分鐘內沒有成功解救隊隨的小隊會被強制送入監獄",
  },
  {
    id: 8,
    title: "尋獲歷史正文",
    description: "獲得歷史線索, 各組獲得一項隱藏成就的敘述",
  },
  {
    id: 9,
    title: "屠魔令",
    description: "各組消耗大量資源躲避追緝，各組所有資源-1",
  },
  {
    id: 10,
    title: "震震果實",
    description: "馬林福特附近遭受波及, 位於15~30之房產格房子數 -1",
  },
  { id: 11, title: "八國革命", description: "各國響應革命, NPC 同時呼口號" },
  {
    id: 12,
    title: "股市崩盤",
    description: "靠邀被套牢了! 所有資源價錢下跌50%",
  },
  {
    id: 13,
    title: "3D2Y",
    description: "回到各隊初始格(優先序最高), 金錢增加50%",
  },
  {
    id: 14,
    title: "暗水",
    description: "全部特殊技能失效, 小隊10分鐘內無法使用卡片",
  },
  {
    id: 15,
    title: "霸國",
    description: "受巨人族協助, 各組同時前進15格(優先序最高)",
  },
  // {
  //   id: 16,
  //   title: "海王類失控",
  //   description:
  //     "海域不平靜, 各組暫停行動5分鐘, 擁有龍宮城、漁人島房產格隊伍不受影響",
  // },
  {
    id: 16,
    title: "人民的法槌",
    description: "仇富心態爆發, 財產前4的小隊入獄",
  },
  {
    id: 17,
    title: "締結同盟",
    description: "同盟共享資源, 當前金錢增加一倍",
  },
  {
    id: 18,
    title: "政權交替",
    description: "政策變革：踩到他人房產格時，獲得與過路費等價之金錢",
  },
  {
    id: 19,
    title: "政權二次交替",
    description: "政策再度改變：賺扣錢制度回復原狀",
  },
  {
    id: 20,
    title: "天下太平",
    description: "海域回到最初的平靜, 往後不再發生大型事件",
  },
];

// const effects = [
//   {
//     id: 1,
//     title: "地產增值(I)",
//     description: "房地產租金提升至150%, 效果持續10分鐘。不可疊加使用",
//     trait: 1,
//     duration: 600,
//     bonus: 1.5,
//   },
//   {
//     id: 2,
//     title: "財產凍結",
//     description: "其他小隊踩到此小隊的房產無須付租金, 效果持續5分鐘",
//     trait: 1,
//     duration: 300,
//     bonus: 0,
//   },
//   {
//     id: 3,
//     title: "量子領域",
//     description:
//       "選擇一個區域, 若其他小隊停在此區域會損失10%手上的金錢, 效果持續10分鐘",
//     trait: 1,
//     duration: 600,
//     bonus: -1,
//   },
//   {
//     id: 4,
//     title: "靈魂寶石",
//     description:
//       "所需支付的金錢提升至150%, 但同時所獲得的金錢提升至200%, 效果持續10分鐘",
//     trait: 1,
//     duration: 600,
//     bonus: -1,
//   },
//   {
//     id: 5,
//     title: "地產增值(II)",
//     description: "房地產租金提升至200%, 效果持續10分鐘。不可疊加使用",
//     trait: 1,
//     duration: 600,
//     bonus: 2,
//   },
//   {
//     id: 6,
//     title: "double一下",
//     description:
//       "選擇一個區域。若持有該區域數量-1的房產即可獲得double效果, 此效果沒有時間限制",
//     trait: 0,
//     duration: -1,
//     bonus: -1,
//   },
//   {
//     id: 7,
//     title: "時間寶石",
//     description: "強制其他小隊接下來的3回合內必須倒著走, GO格沒錢領",
//     trait: 1,
//     duration: 300,
//     bonus: -1,
//   },
// ];

const notifications = [
  {
    id: 0,
    title: "歡迎遊玩大富翁",
    description: "衝啊",
    type: "temporary",
    duration: 1800,
    createdAt: 0,
  },
  // {
  //   id: 1,
  //   title: "Test temporary",
  //   description: "temporary",
  //   type: "temporary",
  //   duration: 10,
  //   createdAt: Date.now() / 1000,
  // },
];

const pairs = [
  {
    key: "currentEvent",
    value: 0,
  },
  {
    key: "lastNotificationId",
    value: 0,
  },
  {
    key: "hawkEyeTeam",
    value: 0,
  },
  {
    key: "phase",
    value: 1,
  },
];

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("db connected");
  await Team.deleteMany({});
  await Land.deleteMany({});
  await Resource.deleteMany({});
  await User.deleteMany({});
  await Event.deleteMany({});
  await Pair.deleteMany({});
  await Notification.deleteMany({});
  await Effect.deleteMany({});
  await Broadcast.deleteMany({});
  console.log("delete done");

  users.forEach(async (user) => {
    await new User(user).save();
  });
  console.log("users created");

  lands.forEach(async (ground) => {
    await new Land(ground).save();
  });
  console.log("lands created");

  resources.forEach(async (resource) => {
    await new Resource(resource).save();
  });
  console.log("resources created");

  teams.forEach(async (row) => {
    await new Team(row).save();
  });
  console.log("teams created");

  events.forEach(async (row) => {
    await new Event(row).save();
  });
  console.log("events created");

  pairs.forEach(async (row) => {
    await new Pair(row).save();
  });
  console.log("pairs created");

  notifications.forEach(async (row) => {
    await new Notification(row).save();
  });
  console.log("notifications created");

  // effects.forEach(async (row) => {
  //   await new Effect(row).save();
  // });
  // console.log("effects created");

  console.log("finish saving data");
});
