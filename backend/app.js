import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Ensure __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, "models/data/fa");

// Import routers
import faRoutes from "./routes/FAinputRoutes.js";
import convertRoutes from "./routes/FAConversionRoutes.js";
import minimizeRoutes from "./routes/FAminimizeRoutes.js";
// ensure data directories exist
import fs from "fs/promises";
async function ensureDataDirs() {
  const base = path.join(__dirname, "data");
  for (const sub of ["fa", "convert", "minimize"]) {
    await fs.mkdir(path.join(base, sub), { recursive: true });
  }
}
await ensureDataDirs();

const app = express();
app.use(express.json());

// Mount your routers under /api
app.use("/api/fa", faRoutes);
app.use("/api/convert", convertRoutes);
app.use("/api/minimize", minimizeRoutes);

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend listening on port ${PORT}`));
