import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LandSchema = new Schema({
  id: Number,
  type: String,
  name: String,
  area: Number,
  owner: String,
  description: String,
  level: Number,
});

const Land = mongoose.model("Land", LandSchema);
export default Land;