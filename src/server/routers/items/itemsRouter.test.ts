import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase.js";
import app from "../../app.js";
import mongoose from "mongoose";
import Item from "../../../database/models/Item.js";
import { itemsMock } from "../../../mocks/items.js";
import request from "supertest";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a GET 'user/items' endpoint", () => {
  beforeEach(async () => {
    await Item.create(itemsMock);
  });

  describe("Given a POST 'user/login' endpoint", () => {
    test("Given a POST 'user/login' endpoint", async () => {
      const expectedStatus = 200;
      const response = await request(app).get("/nfts").expect(expectedStatus);

      expect(response.body).toHaveLength(2);
    });
  });
});
