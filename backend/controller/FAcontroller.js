import {
  addFA,
  getAllFA,
  getFAById,
  updateFA,
  deleteFA,
} from "../models/faModel.js";
import { transformId } from "../utils/idGenerator.js";

// Function to add a new FA
export const createFA = async (req, res) => {
  const data = req.body;
  if (!data.states || !data.transitions) {
    return res
      .status(400)
      .json({ error: "Missing FA definition (states/transitions)" });
  }
  const id = transformId("A");
  const fa = { id, ...data };

  try {
    await addFA(fa);
    res.status(201).json(fa);
  } catch (err) {
    console.error("createFA error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get all FAs

export const getAllFAs = async (_req, res) => {
  try {
    const list = await getAllFA();
    res.json(list);
  } catch (err) {
    console.error("getAllFAs error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to get a FA by id
export const getFA = async (req, res) => {
  try {
    const fa = await getFAById(req.params.id);
    if (!fa) return res.status(404).json({ error: "FA not found" });
    res.json(fa);
  } catch (err) {
    console.error("getFA error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a FA
export const deleteFAController = async (req, res) => {
  try {
    await deleteFA(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("deleteFA error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
