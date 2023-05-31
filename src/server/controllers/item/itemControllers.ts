import { type NextFunction, type Response, type Request } from "express";
import Item from "../../../database/models/Items";

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await Item.find().limit(10).exec();

    res.status(200);
    res.json({ item });
  } catch (error) {
    next(error);
  }
};
