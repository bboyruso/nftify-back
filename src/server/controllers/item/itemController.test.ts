import { getItems } from "./itemControllers.js";
import Item from "../../../database/models/Items.js";
import { itemsMock } from "../../../mocks/items.js";
import { type NextFunction, type Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getItems controller", () => {
  const req = {};
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receive a response", () => {
    Item.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(itemsMock) });

    test("Then it should call the response's method status code with 200", async () => {
      const expectedStatusCode = 200;

      await getItems(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receive a response without Items", () => {
    test("Then it should call the received next function with a error", async () => {
      const expectedError = new TypeError("NFTs not found");

      Item.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockRejectedValue(expectedError) });

      await getItems(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
