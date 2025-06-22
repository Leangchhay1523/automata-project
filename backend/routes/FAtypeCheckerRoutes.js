import express from "express";
import { getFAType } from "../controller/checkFATypeController.js";
const router = express.Router();

// GET /api/fa/:id/type
router.get("/:id/type", getFAType);

export default router;
