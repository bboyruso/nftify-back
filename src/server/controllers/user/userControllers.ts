import { type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import { type UserCredentialsRequest } from "../../types";
import { type JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(401, "Username or password wrong");

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    jwt.verify(token, process.env.JWT_SECRET!);

    res.status(200).json({ token });
  } catch (error: unknown) {
    next(error);
  }
};

export default loginUser;
