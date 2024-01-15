import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit"
import topicsRouter from "./apps/topics.js"
async function init() {
  const app = express();
  const port = 4000;
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5174"],
    })
  );
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      limit: 20,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
app.use("/topics",topicsRouter)
  app.get("/", (req, res) => {
    return res.json("Hello Skill Checkpoint #2");
  });

  app.get("*", (req, res) => {
    return res.status(404).json("Not found");
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

init();
