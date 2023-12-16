import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { router } from "./routes/index.routes.js";
config();

import path from "path";

const app = express();

// app.use(cors({
//   origin: "http://127.0.0.1:5173/",
//   methods: ["GET", "POST", "PUT", "DELETE"]
// }));
// app.use(cors({ origin: "*" }));
app.use(cors());
app.use(express.json());
app.use("/", router);
app.use(express.static(path.resolve("src/public")));

app.listen(3001, () => {
  console.log("Server on port", 3001);
});
