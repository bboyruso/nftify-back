import { type NextFunction, type Response, type Request } from "express";
import Item from "../../../database/models/Item.js";
import CustomError from "../../CustomError/CustomError.js";
import { type CustomRequest } from "../../types.js";

export const getItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await Item.find().limit(10).exec();

    res.status(200);
    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { itemId } = req.params;

  try {
    const itemToDelete = await Item.findByIdAndDelete(itemId).exec();

    if (itemToDelete) {
      return res.status(200).json({ message: "NFT deleted successfully" });
    }

    throw new CustomError(404, "NFT not found");
  } catch (error) {
    next(error);
  }
};

export const addItem = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  try {
    const item = await Item.create({ ...body });

    res.status(201);
    res.json({ item });
  } catch (error) {
    next(error);
  }
};
