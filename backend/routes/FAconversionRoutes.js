import express from "express";
import {
  createConvert,
  getAllConverts,
  getConvert,
  deleteConvert,
} from "../controller/convertController.js";

const router = express.Router();

// Convert NFA to DFA                 POST /api/convert
router.post("/", createConvert);

// Get all converted DFAs             GET /api/convert
router.get("/", getAllConverts);

// Get a converted DFA by ID          GET /api/convert/:id
router.get("/:id", getConvert);

// Delete a converted DFA by ID         DELETE /api/convert/:id
router.delete("/:id", deleteConvert);

export default router;
