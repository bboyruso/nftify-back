import request from "supertest";
import app from "./app.js";

describe("Given a GET '/ping' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a ", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = { message: "Entered" };

      const response = await request(app)
        .get("/ping")
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedMessage);
    });
  });
});
