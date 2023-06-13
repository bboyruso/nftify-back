import { type NextFunction, type Response } from "express";
import { itemsMock } from "../../../../mocks/items.js";
import { getItems } from "../itemControllers.js";
import Item from "../../../../database/models/Item.js";
import { type CustomRequest } from "../../../types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getItems controller", () => {
  const next = jest.fn();

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req = {
    query: {
      limit: 5,
      skip: 0,
    },
    params: {
      itemId: "jhgf",
    },
  };
  describe("When it receive a response", () => {
    test("Then it should call the response's method status code with 200", async () => {
      const expectedStatusCode = 200;

      Item.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(itemsMock),
          }),
        }),
      });

      Item.countDocuments = jest.fn().mockReturnValue({
        countDocuments: jest.fn().mockReturnValue({
          exec: jest.fn().mockReturnValue(itemsMock.length),
        }),
      });

      await getItems(
        req as unknown as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receive a response without Items", () => {
    test("Then it should call the received next function with a error", async () => {
      const expectedError = new Error("Error connecting database to get nfts");

      Item.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            exec: jest.fn().mockRejectedValue(expectedError),
          }),
        }),
      });

      await getItems(
        req as unknown as CustomRequest,
        res as Response,
        next as NextFunction
      );
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
