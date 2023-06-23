import { Router } from "express";
import {
  addItem,
  deleteItem,
  getItemsByPrice,
  getItemById,
  getItems,
  updateItem,
} from "../../controllers/item/itemControllers.js";

const itemRouter = Router();

itemRouter.get("/", getItems);

itemRouter.get("/filter", getItemsByPrice);

itemRouter.get("/:itemId", getItemById);

itemRouter.delete("/:itemId", deleteItem);

itemRouter.post("/", addItem);

itemRouter.put("/", updateItem);

export default itemRouter;
