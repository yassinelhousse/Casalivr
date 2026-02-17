import request from "supertest";
import app from "../app.js";
import { describe, it, expect, afterAll } from "@jest/globals";
import { sequelize } from "../models/index.js";

describe("Auth API", () => {
  it("should login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

afterAll(async () => {
  await sequelize.close();
});
