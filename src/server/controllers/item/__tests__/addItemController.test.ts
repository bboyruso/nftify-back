import Item from "../../../../database/models/Item";
import { addItemBodyMock } from "../../../../mocks/items";
import { type CustomRequest } from "../../../types";
import { addItem } from "../itemControllers";
import { type NextFunction, type Response } from "express";

beforeEach(() => {
  jest.clearAllMocks();
});

const body = addItemBodyMock;

describe("Given a addItems controller", () => {
  const req: Partial<CustomRequest> = { body };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receive a request to add item", () => {
    test("Then it should call the response's method status code with 201", async () => {
      const expectedStatusCode = 201;

      Item.create = jest.fn().mockReturnValue(undefined);

      await addItem(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receive a request to add item and rejects", () => {
    test("Then it should call the received next function with an error", async () => {
      const expectedError = new Error("Cant add Item");

      Item.create = jest.fn().mockRejectedValueOnce(expectedError);

      await addItem(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
