import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
});

const Item = mongoose.model("Item", itemSchema, "items");

export default Item;
