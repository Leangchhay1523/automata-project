import express from "express";
import { runTestString } from "../controller/testStringController.js";

const router = express.Router();

// Test an FA (NFA or DFA) against an input string
router.post("/test", runTestString);

export default router;
