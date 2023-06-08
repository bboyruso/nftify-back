import { Router } from "express";
import {
  addItem,
  deleteItem,
  getItems,
} from "../../controllers/item/itemControllers.js";

const itemRouter = Router();

itemRouter.get("/", getItems);

itemRouter.delete("/:itemId", deleteItem);

itemRouter.post("/", addItem);

export default itemRouter;
