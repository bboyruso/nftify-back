import { Router } from "express";
import { getItems } from "../../controllers/item/itemControllers.js";

const itemRouter = Router();

itemRouter.get("/items", getItems);

export default itemRouter;
