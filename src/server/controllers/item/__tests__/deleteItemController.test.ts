import { type NextFunction, type Response } from "express";
import Item from "../../../../database/models/Item";
import { itemsMock } from "../../../../mocks/items";
import { type CustomRequest } from "../../../types";
import { deleteItem } from "../itemControllers";
import CustomError from "../../../CustomError/CustomError";

const itemId = "ddd";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteItem controller", () => {
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
    test("Then it should call response's method status with 200 and json with 'NFT deleted successfully'", async () => {
      const expectedStatusCode = 200;
      const expectedJsonResponse = {
        message: "NFT deleted successfully",
      };

      Item.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(itemsMock[0]),
      });

      await deleteItem(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });

  describe("When it receives a request and the NFT doesn't exist", () => {
    test("Then it should call next function with 'NFT not found' error", async () => {
      const expectedError = new CustomError(404, "NFT not found");

      Item.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deleteItem(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
