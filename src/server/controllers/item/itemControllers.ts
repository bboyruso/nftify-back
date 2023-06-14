import { type NextFunction, type Response } from "express";
import Item from "../../../database/models/Item.js";
import CustomError from "../../CustomError/CustomError.js";
import { type CustomUpdateRequest, type CustomRequest } from "../../types.js";

export const getItems = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    query: { limit, skip },
  } = req;

  const reqLimit = Number(limit);
  const reqSkip = Number(skip);

  try {
    const nfts = await Item.find()
      .sort({ _id: -1 })
      .skip(reqSkip)
      .limit(reqLimit)
      .exec();

    const length = await Item.countDocuments();

    res.status(200);
    res.json({ nfts, length });
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

    if (!itemToDelete) {
      throw new CustomError(404, "NFT not found");
    }

    res.status(200).json({ message: "NFT deleted successfully" });
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

export const getItemById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findById(itemId).exec();

    if (!item) {
      throw new CustomError(404, "NFT not found");
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: CustomUpdateRequest,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const { _id } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(_id, { ...body }).exec();

    if (!item) {
      throw new CustomError(404, "NFT not found");
    }

    res.status(200).json({ message: "NFT updated successfully" });
  } catch (error) {
    next(error);
  }
};
