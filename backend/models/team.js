import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  teamname: String,
  occupation: String,
  money: Number,
  bonus: { value: Number, time: Number },
  soulgem: { value: Boolean, time: Number },
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;
