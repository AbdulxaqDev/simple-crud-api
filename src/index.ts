import http from "node:http";
import "dotenv/config";

const { PORT } = process.env;

const server = http.createServer((req: http.IncomingMessage, res) => {
  console.log(req.url?.split("/").slice(2));
  console.log(req.method);
  res.end("requested");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
