import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { expensesRouter } from "./routes/expenses.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  // API routes
  app.use("/api", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/profile", profileRouter);
  app.use("/api/expenses", expensesRouter);

  // OpenAPI contract is shipped with the repo under /openapi/openapi.yaml.
  // We intentionally do not serve Swagger UI yet, to keep the runtime minimal.

  app.use((_req, res) => res.status(404).json({ error: "Not found" }));
  return app;
}
