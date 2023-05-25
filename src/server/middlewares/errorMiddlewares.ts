import { type Request, type Response, type NextFunction } from "express";
import createDebug from "debug";
import type CustomError from "../CustomError/CustomError.js";

const debug = createDebug("nftify-api:server:middlewares:errorMiddlewares");

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(error.message);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "General error";

  res.status(statusCode).json({ message });
};
