import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv-defaults";
import Team from "../models/team.js";
import Land from "../models/land.js";
import User from "../models/user.js";

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
    password: "admin",
  },
  {
    username: "npc",
    password: "npc",
  },
];

const rows = [
  {
    teamname: "第1小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    teamname: "第2小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    teamname: "第3小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    teamname: "第4小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    teamname: "第5小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    teamname: "第6小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    teamname: "第7小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
  {
    teamname: "第8小隊",
    occupation: "N/A",
    money: 100000,
    bonus: { value: 1.0, time: 0 },
    soulgem: { value: false, time: 0 },
  },
];

const grounds = [
  { id: 1, type: "Go", name: "GO 格", description: "真是夠格的啊！" },
  {
    id: 2,
    type: "Building",
    area: 1,
    name: "太空總部",
    owner: "N/A",
    level: 0,
  },
  {
    id: 3,
    type: "Building",
    area: 1,
    name: "航母總部",
    owner: "N/A",
    level: 0,
  },
  {
    id: 4,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  {
    id: 5,
    type: "Building",
    area: 1,
    name: "帝國大廈",
    owner: "N/A",
    level: 0,
  },
  { id: 6, type: "SpecialBuilding", name: "倫敦至聖所", owner: "N/A" },
  { id: 7, type: "Game", name: "跳左跳右", description: "細節略" },
  {
    id: 8,
    type: "Building",
    area: 2,
    name: "泰坦星",
    owner: "N/A",
    level: 0,
  },
  {
    id: 9,
    type: "Building",
    area: 2,
    name: "弗米爾星",
    owner: "N/A",
    level: 0,
  },
  {
    id: 10,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  { id: 11, type: "Jail", name: "探監", description: "去笑坐牢出來的人吧！" },
  {
    id: 12,
    type: "Building",
    area: 2,
    name: "虛無之地",
    owner: "N/A",
    level: 0,
  },
  { id: 13, type: "Store", name: "商店", description: "1次可購買1張卡片" },
  { id: 14, type: "Game", name: "吊死鬼", description: "細節略" },
  {
    id: 15,
    type: "Building",
    area: 3,
    name: "神盾局",
    owner: "N/A",
    level: 0,
  },
  { id: 16, type: "SpecialBuilding", name: "香港至聖所", owner: "N/A" },
  {
    id: 17,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  {
    id: 18,
    type: "Building",
    area: 3,
    name: "復聯總部",
    owner: "N/A",
    level: 0,
  },
  {
    id: 19,
    type: "Building",
    area: 3,
    name: "天劍局",
    owner: "N/A",
    level: 0,
  },
  { id: 20, type: "Game", name: "含水猜歌", description: "細節略" },
  { id: 21, type: "Event", name: "事件", description: "有大事要發生的樣子..." },
  {
    id: 22,
    type: "Building",
    area: 4,
    name: "瓦甘達",
    owner: "N/A",
    level: 0,
  },
  {
    id: 23,
    type: "Building",
    area: 4,
    name: "邊境部落",
    owner: "N/A",
    level: 0,
  },
  {
    id: 24,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  {
    id: 25,
    type: "Building",
    area: 4,
    name: "亞特蘭提斯",
    owner: "N/A",
    level: 0,
  },
  { id: 26, type: "SpecialBuilding", name: "紐約至聖所", owner: "N/A" },
  { id: 27, type: "Game", name: "各自表述", description: "細節略" },
  {
    id: 28,
    type: "Building",
    area: 5,
    name: "阿斯嘉",
    owner: "N/A",
    level: 0,
  },
  {
    id: 29,
    type: "Building",
    area: 5,
    name: "彩虹橋",
    owner: "N/A",
    level: 0,
  },
  {
    id: 30,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  { id: 31, type: "ToJail", name: "入獄", description: "哈哈下去囉~" },
  {
    id: 32,
    type: "Building",
    area: 5,
    name: "英靈殿",
    owner: "N/A",
    level: 0,
  },
  { id: 33, type: "Store", name: "商店", description: "1次可購買1張卡片" },
  { id: 34, type: "Game", name: "記憶tempo 2.0", description: "細節略" },
  {
    id: 35,
    type: "Building",
    area: 6,
    name: "史塔克總部",
    owner: "N/A",
    level: 0,
  },
  { id: 36, type: "SpecialBuilding", name: "卡瑪泰姬", owner: "N/A" },
  {
    id: 37,
    type: "Chance",
    name: "機會命運",
    description: "為你的未來重新洗牌！",
  },
  {
    id: 38,
    type: "Building",
    area: 6,
    name: "大羅",
    owner: "N/A",
    level: 0,
  },
  {
    id: 39,
    type: "Building",
    area: 6,
    name: "多摩",
    owner: "N/A",
    level: 0,
  },
  { id: 40, type: "Game", name: "倒轉猜字", description: "細節略" },
];

db.once("open", async () => {
  console.log("db connected");
  await Team.deleteMany({});
  await Land.deleteMany({});
  await User.deleteMany({});

  users.forEach(async (user) => {
    const { username, password } = user;
    const hash = await bcrypt.hash(password, 10);
    await new User({
      username,
      password: hash,
    }).save();
  });
  grounds.forEach(async (ground) => {
    await new Land(ground).save();
  });
  rows.forEach(async (row) => {
    await new Team(row).save();
  });
  console.log("finish saving data");
});
