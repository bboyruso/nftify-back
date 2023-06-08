import express from "express";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import { pingController } from "./controllers/ping/pingController.js";
import userRouter from "./routers/users/userRouter.js";
import itemRouter from "./routers/items/itemsRouter.js";

const app = express();

const trustedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
  process.env.ALLOWED_ORIGIN_DEV1!,
];

app.use(compression());

app.use(cors({ origin: trustedOrigins }));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(express.json());

app.get("/ping", pingController);

app.use("/user", userRouter);

app.use("/nfts", itemRouter);

app.use(generalError);

app.use(notFoundError);

export default app;
