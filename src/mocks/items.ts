import { Types } from "mongoose";
import { type ItemDataStructure } from "../server/types";

export const itemsMock: ItemDataStructure[] = [
  {
    _id: new Types.ObjectId("64710077b5f9829cfe43b6d9"),
    title: "First NFT",
    description: "best nft",
    price: 1,
    image: "url.webp",
    author: "Bob",
    user: new Types.ObjectId("64710077b5f9829cfe43b6c9"),
  },
  {
    _id: new Types.ObjectId("64710077b5f9829cfe43b677"),
    title: "Another NFT",
    description: "best nft witch you never see before",
    price: 3.5,
    image: "url/1.webp",
    author: "Angelina",
    user: new Types.ObjectId("64710077b5f9829cfe43b677"),
  },
];
