import { type NextFunction, type Response } from "express";
import Item from "../../../../database/models/Item";
import { itemsMock } from "../../../../mocks/items";
import { type CustomRequest } from "../../../types";
import { getItemById } from "../itemControllers";
import CustomError from "../../../CustomError/CustomError";

const itemId = "64710077b5f9829cfe43b677";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getItemByID controller", () => {
  const req: Partial<CustomRequest> = {
    params: {
      itemId,
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request and the Item exists", () => {
    test("Then it should call response's method status with 200", async () => {
      const expectedStatusCode = 200;

      Item.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(itemsMock[0]),
      });

      await getItemById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a request and the NFT doesn't exist", () => {
    test("Then it should call next function with 'NFT not found' error", async () => {
      const expectedError = new CustomError(404, "NFT not found");

      Item.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await getItemById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
