import { type NextFunction, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Item from "../../../database/models/Items";

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await Item.find().exec();

    if (!item) {
      const error = new CustomError(401, "Item not found");

      throw error;
    }

    res.status(200);
    res.json({ item });
  } catch (error) {
    next(error);
  }
};
