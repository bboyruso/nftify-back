import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true, min: 3, max: 22 },
  name: { type: String, min: 3 },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
