import { type NextFunction, type Response } from "express";
import Item from "../../../../database/models/Item";
import { itemsMock } from "../../../../mocks/items";
import { type CustomUpdateRequest } from "../../../types";
import { updateItem } from "../itemControllers";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteItem controller", () => {
  const req: Partial<CustomUpdateRequest> = {
    body: {
      _id: "1234",
      author: "Bob",
      description: "",
      image: "someImage.jpeg",
      price: 4,
      title: "NFt",
    },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request to update and the Item and Item exists", () => {
    test("Then it should call response's method status with 200 and json with 'NFT updated successfully'", async () => {
      const expectedStatusCode = 200;
      const expectedJsonResponse = {
        message: "NFT updated successfully",
      };

      Item.findOneAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(itemsMock[0]),
      });

      await updateItem(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedJsonResponse);
    });
  });

  describe("When it receives a request to update and the NFT doesn't exist", () => {
    test("Then it should call next function with 'NFT not found' error", async () => {
      const expectedError = new CustomError(404, "NFT not found");

      Item.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await updateItem(
        req as CustomUpdateRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
