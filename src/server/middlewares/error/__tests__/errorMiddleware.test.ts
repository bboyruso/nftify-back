import { type NextFunction, type Request, type Response } from "express";
import { generalError } from "../../errorMiddlewares";
import CustomError from "../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const req = {};

describe("Given a generalError middleware", () => {
  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives an error with statusCode 401", () => {
    const expectedStatus = 401;
    const expectedMessage = "Error";
    const error = new CustomError(expectedStatus, expectedMessage);

    test("Then it should call the response's method status with 401", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
    test("Then it should call the response's method json with the message 'Error'", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
  describe("When it receives an error without statusCode nor message", () => {
    const error = new Error();

    test("Then it should call the response's method status with 500", () => {
      const expectedStatus = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
    test("Then it should call the response's method json with the message 'General error'", () => {
      const expectedMessage = "General error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
