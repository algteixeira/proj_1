import { app } from "../../../src/server";
import * as request from "supertest";

describe("GET / - a simple api endpoint", () => {
  it("Hello API Request", async () => {
    const result = await request(app).get("/cidade");
    expect(result.text).toEqual("hello");
    expect(result.statusCode).toEqual(200);
  });
});