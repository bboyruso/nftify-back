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

export interface CustomRequest extends Request {
  params: {
    itemId: string;
  };

  query: {
    skip: string;
    limit: string;
  };

  body: RequestBodyItemStructure;
}

export interface CustomReqRequest extends Request {
  query: {
    skip: string;
    limit: string;
  };
  body: RequestBodyItemStructure;
}
export interface CustomReqRequest1 extends Request {
  query: {
    skip: string;
    limit: string;
  };
}

export interface RequestBodyItemStructure {
  title: string;
  description: string;
  price: number;
  image: string;
  author: string;
}

export interface CustomUpdateRequest extends Request {
  body: {
    _id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    author: string;
  };
}
