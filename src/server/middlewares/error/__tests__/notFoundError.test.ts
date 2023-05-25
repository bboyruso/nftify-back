import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { notFoundError } from "../../errorMiddlewares.js";

describe("Given a notFoundError middleware", () => {
  describe("When it receives a next function", () => {
    test("Then it should call the next function with an error with status 404 and message 'Endpoint not found'", () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const expectedMessage = "Endpoint not found";
      const expectedStatus = 404;

      const expectedError = new CustomError(expectedStatus, expectedMessage);

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
