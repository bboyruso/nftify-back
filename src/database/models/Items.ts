import mongoose, { Types } from "mongoose";
import User from "./User";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
  user: {
    type: Types.ObjectId,
    ref: User,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema, "nfts");

export default Item;
