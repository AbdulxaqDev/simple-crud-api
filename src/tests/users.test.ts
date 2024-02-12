import request from "supertest";

import server from "../index";
import { getNewUUID } from "../utils/user.util";

describe("Simple-crud-api endpoints", () => {
  afterAll(() => {
    server.close();
  });
  test("GET /users returns users with status code 200", async () => {
    const response = await request(server).get("/api/users").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /user creates new user", async () => {
    const newUser = {
      username: "TestName",
      age: 66,
      hobbies: ["cycling"],
    };
    const response = await request(server)
      .post("/api/user")
      .send(newUser)
      .expect(201);
    delete response.body.id;
    expect(response.body).toEqual(newUser);
  });

  test("GET user with invalid ID", async () => {
    const invalidUserId = "invalidId";
    const response = await request(server)
      .get(`/api/users/${invalidUserId}`)
      .expect(400);

    expect(response.body.error).toBe("Invalid user ID");
  });

  test("GET user with noexisting ID", async () => {
    const nonExistentUserId = "d78d7072-bc6d-4be7-a7d6-8eeafc42efdd";

    const response = await request(server)
      .get(`/api/users/${nonExistentUserId}`)
      .expect(404);

    expect(response.body.error).toBe("User Not Found");
  });

  test("DELET user with ID", async () => {
    const newUser = {
      username: "TestName",
      age: 66,
      hobbies: ["cycling"],
    };
    const postedUser = await request(server)
      .post("/api/user")
      .send(newUser)
      .expect(201);

    const postUserId = postedUser.body.id;
    console.log(postUserId);
    

    await request(server).delete(`/api/users/${postUserId}`).expect(204);
  });
});
