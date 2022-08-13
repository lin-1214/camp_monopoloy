import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  id: Number,
  teamname: String,
  occupation: String,
  money: Number,
  bonus: { value: Number, time: Number, duration: Number },
  soulgem: { value: Boolean, time: Number },
});

TeamSchema.statics.findAndCheckValid = async function (teamname) {
  console.log(teamname);
  const team = await this.findOne({ teamname });
  console.log(team);
  if (!team) {
    return null;
  }
  const currtime = Date.now() / 1000;
  console.log(currtime - team.bonus.time);
  if (currtime - team.bonus.time > team.bonus.duration) {
    console.log("bonus time over");
    team.bonus.value = 1.0;
  }
  if (currtime - team.soulgem.time > 600) {
    console.log("soulgem time over");
    team.soulgem.value = false;
  }
  await team.save();
  return team;
};

const Team = mongoose.model("Team", TeamSchema);
export default Team;
