import http from "node:http";
import "dotenv/config";
import {
  httpGetUser,
  httpGetUsers,
  httpPostUser,
  httpPutUser,
} from "./controllers/user.controller";
import { getNewUUID, isValidUUID } from "./utils/user.util";
import { tUser } from "./types/user";
import { removeUser } from "./models/user.model";

const { PORT } = process.env;

const jsonContentType = { "Content-Type": "application/json" };

const server = http.createServer(async (req: http.IncomingMessage, res) => {
  const url = req.url?.split("/").splice(1) as string[] | undefined;
  const urlLen = url?.length;
  const method = req.method;

  if (url && url[0] === "api") {
    // GET all users DONE!
    if (method === "GET" && urlLen === 2 && url) {
      if (url[1] == "users") {
        const users = httpGetUsers();
        res.writeHead(200, jsonContentType);
        return res.end(JSON.stringify(users));
      }
    }

    // GET a user
    if (method === "GET" && urlLen === 3 && url) {
      if (url[1] == "user" && isValidUUID(url[1])) {
        const userId = url[1];
        const user = httpGetUser(userId);
        if (user) {
          res.writeHead(200, jsonContentType);
          return res.end(JSON.stringify(user));
        } else {
          res.writeHead(404, jsonContentType);
          return res.end(JSON.stringify({ error: "User Not Found" }));
        }
      } else {
        res.writeHead(400, jsonContentType);
        return res.end(JSON.stringify({ error: "Invalid user ID" }));
      }
    }

    // POST new user
    if (method === "POST" && urlLen === 2 && url) {
      if (url[1] === "user") {
        let user = "";
        req.on("data", (chunk) => {
          user += chunk.toString();
        });

        return req.on("end", () => {
          try {
            const { username, age, hobbies } = JSON.parse(user);

            if (username && !isNaN(age) && Array.isArray(hobbies)) {
              const newUser: tUser = {
                id: getNewUUID(),
                username,
                age,
                hobbies,
              };
              console.log(user);
              const newCreatedUser = httpPostUser(newUser);
              res.writeHead(201, jsonContentType);
              return res.end(JSON.stringify(newCreatedUser));
            }
            throw new Error("Request does not contain required fields");
          } catch (e: any) {
            res.writeHead(400, jsonContentType);
            return res.end(
              JSON.stringify({
                error: e.message,
              })
            );
          }
        });
      }
    }

    // PUT a user
    if (method === "PUT" && urlLen === 3 && url) {
      if (url[1] == "user" && isValidUUID(url[1])) {
        const userId = url[1];
        const user = httpGetUser(userId);
        if (user) {
          let user = "";
          req.on("data", (chunk) => {
            user += chunk.toString();
          });

          return req.on("end", () => {
            try {
              const { username, age, hobbies } = JSON.parse(user);
              const updatedUser = {
                id: userId,
                username,
                age,
                hobbies,
              };

              if (username && !isNaN(age) && Array.isArray(hobbies)) {
                httpPutUser(updatedUser);
                res.writeHead(200, jsonContentType);
                return res.end(
                  JSON.stringify({ message: "User updated successfully" })
                );
              }
              throw new Error("Request does not contain required fields");
            } catch (e: any) {
              res.writeHead(400, jsonContentType);
              return res.end(
                JSON.stringify({
                  error: e.message,
                })
              );
            }
          });
        } else {
          res.writeHead(404, jsonContentType);
          return res.end(JSON.stringify({ error: "User Not Found" }));
        }
      } else {
        res.writeHead(400, jsonContentType);
        return res.end(JSON.stringify({ error: "Invalid user ID" }));
      }
    }

    // DELETE a user
    if (method === "DELETE" && urlLen === 3 && url) {
      if (url[1] == "user" && isValidUUID(url[1])) {
        const userId = url[1];
        const user = httpGetUser(userId);
        if (user) {
          removeUser(userId);
          res.writeHead(204, jsonContentType);
          return res.end(
            JSON.stringify({ message: "User removed successfully" })
          );
        } else {
          res.writeHead(404, jsonContentType);
          return res.end(JSON.stringify({ error: "User Not Found" }));
        }
      } else {
        res.writeHead(400, jsonContentType);
        return res.end(JSON.stringify({ error: "Invalid user ID" }));
      }
    }
  }

  res.writeHead(404, jsonContentType);
  res.end(JSON.stringify({ error: "Not Found!" }));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
