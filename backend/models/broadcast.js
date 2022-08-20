import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BroadcastSchema = new Schema({
  createdAt: Number,
  title: String,
  description: String,
});

const Broadcast = mongoose.model("broadcast", BroadcastSchema);
export default Broadcast;
