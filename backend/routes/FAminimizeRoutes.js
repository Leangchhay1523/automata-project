import express from "express";
import {
  createMinimize,
  getAllMinimizations,
  getMinimization,
  deleteMinimize,
} from "../controller/minimizeController.js";

const router = express.Router();
// Minimize a DFA               POST /api/minimize
router.post("/", createMinimize);

// Get all minimized DFAs         GET /api/minize
router.get("/", getAllMinimizations);

// Get a minimized DFA by ID            GET /api/minimize/:id
router.get("/:id", getMinimization);

// Delete a minimized DFA by ID         DELETE /api/minimize/:id
router.delete("/:id", deleteMinimize);

export default router;
