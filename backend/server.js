import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import faRoutes from "./routes/FAinputRoutes.js";
import convertRoutes from "./routes/FAconversionRoutes.js";
import minimizeRoutes from "./routes/FAminimizeRoutes.js";
import typeRoutes from "./routes/FAtypeCheckerRoutes.js";
import logger from "./middleware/logger.js";
import testStringRoutes from "./routes/FAtestingRoutes.js";
async function ensureDataDirs() {
  const base = path.join(__dirname, "data");
  for (const sub of ["fa", "convert", "minimize"]) {
    await fs.mkdir(path.join(base, sub), { recursive: true });
  }
}

(async () => {
  await ensureDataDirs();
  const app = express();
  app.use(logger);

  app.use(cors());
  app.use(express.json());

  // mount each chunk
  app.use("/api/fa", faRoutes);
  app.use("/api/fa", typeRoutes);
  app.use("/api/convert", convertRoutes);
  app.use("/api/minimize", minimizeRoutes);
  app.use("/api/fa", testStringRoutes);

  app.use((_, res) => res.status(404).json({ error: "Route not found" }));

  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
