import { type NextFunction, type Response, type Request } from "express";
import { itemsMock } from "../../../mocks/items.js";
import { getItems } from "./itemControllers.js";
import Item from "../../../database/models/Item.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getItems controller", () => {
  const next = jest.fn();

  const req = {};

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receive a response", () => {
    Item.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(itemsMock),
      }),
    });

    test("Then it should call the response's method status code with 200", async () => {
      const expectedStatusCode = 200;

      await getItems(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receive a response without Items", () => {
    test("Then it should call the received next function with a error", async () => {
      const expectedError = new Error(
        "Error connecting database to get routes"
      );

      Item.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(expectedError),
        }),
      });

      await getItems(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
