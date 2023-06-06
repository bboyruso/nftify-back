import { Router } from "express";
import {
  deleteItem,
  getItems,
} from "../../controllers/item/itemControllers.js";

const itemRouter = Router();

itemRouter.get("/", getItems);

itemRouter.delete("/:itemId", deleteItem);

export default itemRouter;
