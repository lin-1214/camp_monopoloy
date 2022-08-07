import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
});

userSchema.statics.findAndValidate = async function (username, password) {
  const user = await User.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
};

const User = mongoose.model("User", userSchema);
export default User;
