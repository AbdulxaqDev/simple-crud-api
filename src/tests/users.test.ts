import request from "supertest";

import server from "src/index";

describe("CRUD API endpoints", () => {
  test("GET /items returns listing message", async () => {
    const response = await request(server).get("/items").expect(200);

    expect(response.body.message).toBe("Listing items...");
  });

  test("POST /items creates new item", async () => {
    const newItem = { name: "New Item" };
    const response = await request(server)
      .post("/items")
      .send(newItem)
      .expect(201);

    expect(response.body.message).toBe("Creating item...");
  });

  // Similar tests for PUT and DELETE endpoints
});
