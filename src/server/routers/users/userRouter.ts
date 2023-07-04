import { Router } from "express";
import { validate } from "express-validation";
import loginSchema from "../../../utils/schemas/loginSchema.js";
import {
  loginUser,
  registerUser,
} from "../../controllers/user/userControllers.js";
import registerSchema from "../../../utils/schemas/registerSchema.js";

const userRouter = Router();

userRouter.post(
  "/login",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

userRouter.post(
  "/register",
  validate(registerSchema, {}, { abortEarly: false }),
  registerUser
);

export default userRouter;
