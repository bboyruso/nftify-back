import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserCredentials {
  username: string;
  password: string;
}
export interface ItemStructure {
  title: string;
  description: string;
  price: number;
  image: string;
  author: string;
  user: Types.ObjectId;
}

export interface ItemDataStructure extends ItemStructure {
  _id: Types.ObjectId;
}

export interface UserCredentialsStructure extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export type UserData = {
  _id: Types.ObjectId;
} & UserCredentials;

export interface MockUserCredentials {
  username: string;
  password: number;
}
