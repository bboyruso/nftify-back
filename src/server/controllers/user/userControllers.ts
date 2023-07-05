import { type NextFunction, type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { type UserCredentialsRequest } from "../../types";
import User from "../../../database/models/User.js";
import CustomError from "../../CustomError/CustomError.js";

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new CustomError(
        401,
        "Wrong Credentials",
        "You try to login with Wrong Credentials"
      );

      throw error;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, name } = req.body;

  try {
    if (!username || !email || !password) {
      throw new CustomError(400, "Please, check the registration data.");
    }

    const existingEmail = await User.findOne({ email }).exec();
    const existingUser = await User.findOne({ username }).exec();

    if (existingEmail) {
      throw new CustomError(
        409,
        `An account with email ${email} already exists.`
      );
    }

    if (existingUser) {
      throw new CustomError(
        409,
        `An account with username ${username} already exists.`
      );
    }

    const newUser = new User({ username, email, password, name });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    next(error);
  }
};
