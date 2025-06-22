import express from "express";
import {
  createFA,
  getAllFAs,
  getFA,
  deleteFAController,
} from "../controller/FAcontroller.js";
const router = express.Router();

// Create a new FA        POST /api/fa
router.post("/", createFA);

// Get all FAs            GET /api/fa
router.get("/", getAllFAs);

// Get a single FA by ID  GET /api/fa/:id
router.get("/:id", getFA);

// Delete a FA by ID    DELETE /api/fa/:id
router.delete("/:id", deleteFAController);

export default router;
