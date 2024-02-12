import request from "supertest";

import server from "../index";

describe("Simple-crud-api endpoints", () => {
  let userIdToTest: string;
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
    userIdToTest = response.body.id;
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

  test("PUT (update) user with ID", async () => {
    const updatedUser = {
      username: "Updated username",
      age: 23,
      hobbies: ["updated"],
    };
    const response = await request(server)
      .put(`/api/users/${userIdToTest}`)
      .send(updatedUser)
      .expect(200);

    delete response.body.id;

    expect(response.body).toEqual(updatedUser);
  });

  test("DELET user with ID", async () => {
    await request(server).delete(`/api/users/${userIdToTest}`).expect(204);
  });
});
