import { getFAById, updateFA } from "../models/FaModel.js";
import { getConvertById, updateConvert } from "../models/convertModel.js";
import {
  addMin,
  getMinById,
  getAllMin,
  deleteMin as removeMin,
} from "../models/minimizeModel.js";
import { transformId } from "../utils/idGenerator.js";
import minimizeDfa from "../logic/minimizeDfaLogic.js";

// Function to create a new DFA as minimized DFA
export const createMinimize = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing FA id" });
  }

  try {
    let dfa = null;
    let converted = false;
    let faFound = true;

    // Try to get original FA first
    dfa = await getFAById(id);
    console.log("dfa", dfa);

    if (!dfa) {
      console.log(id);
      dfa = await getConvertById(id);
      console.log("DFA", dfa);
      faFound = false;
    }

    if (!dfa) {
      return res.status(404).json({ error: "DFA not found" });
    }

    const minId = transformId("M", id);

    const existing = await getMinById(minId);
    if (existing) {
      await updateFA(id, { minimize: true });
      return res.json({ ...existing, convert: converted, minimize: true });
    }

    const minData = minimizeDfa(dfa);
    const record = {
      id: minId,
      name: `${dfa.name} (Minimized)`,
      minimizedFrom: id,
      ...minData,
    };
    await addMin(record);
    console.log(faFound);
    if (faFound) {
      await updateFA(id, { minimize: true });
    } else {
      const convertId = transformId("D", id);
      await updateConvert(convertId, { minimize: true });
    }

    res.status(201).json(record);
  } catch (err) {
    console.error("createMinimize error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Funtion to get all the Minimimized FA
export const getAllMinimizations = async (_req, res) => {
  try {
    res.json(await getAllMin());
  } catch (err) {
    console.error("getAllMinimizations error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMinimization = async (req, res) => {
  try {
    const min = await getMinById(req.params.id);
    if (!min) {
      return res.status(404).json({ error: "Minimized DFA not found" });
    }
    res.json(min);
  } catch (err) {
    console.error("getMinimization error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a Minimized FA
export const deleteMinimize = async (req, res) => {
  try {
    await removeMin(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("deleteMinimize error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
