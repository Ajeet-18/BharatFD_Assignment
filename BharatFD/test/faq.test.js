const request = require("supertest");
const { app, redisClient } = require("../server");

describe("FAQ API Tests", () => {
  afterAll(async () => {
    await redisClient.quit(); 
  });

  it("should return FAQs", async () => {
    const res = await request(app).get("/api/faqs/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
