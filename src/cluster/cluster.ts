import cluster from "node:cluster";
import { fork } from "child_process";
import { availableParallelism } from "os";
import server from "src";

console.log(availableParallelism);
console.log(availableParallelism);

if (cluster.isPrimary) {
  // Create a worker process for each CPU core
  for (let i = 0; i < availableParallelism(); i++) {
    cluster.fork();
  }

  // Event listener for when a worker process exits
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Fork a new worker to replace the exited one
    cluster.fork();
  });
} else {
  server;
  process.on("SIGTERM", () => {
    server.close(() => {
      console.log(`Worker ${process.pid} terminated`);
      process.exit(0);
    });
  });
}
