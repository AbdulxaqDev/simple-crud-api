import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
  output: {
    filename: "bundle.js",
    clean: true,
    path: path.resolve(__dirname, "public"),
  },
};

export default config;
