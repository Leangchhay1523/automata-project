import { getFAById, updateFA } from "../models/FaModel.js";
import {
  addConvert,
  getConvertById,
  getAllConvert,
  deleteConvert as removeConvert,
} from "../models/convertModel.js";
import { transformId } from "../utils/idGenerator.js";
import nfaToDfa from "../logic/nfaToDfaLogic.js";

// Function to create a new FA as converted
export const createConvert = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing FA id" });
  }

  try {
    const original = await getFAById(id);
    if (!original) {
      return res.status(404).json({ error: "Original FA not found" });
    }

    // Decide if we even need to convert
    let dfaData;
    dfaData = nfaToDfa(original);
    let converted = true;

    // Avoid duplicates
    const newId = transformId("D", id);
    const existing = await getConvertById(newId);
    if (existing) {
      // Make sure FA store flags are up‐to‐date
      await updateFA(id, { convert: converted });
      return res.json({ ...existing, convert: converted });
    }

    // Persist
    const record = {
      id: newId,
      type: "DFA",
      name: `${original.name} (Converted)`,
      convertedFrom: id,
      ...dfaData,
    };
    await addConvert(record);

    // Flip flag in fa.json
    await updateFA(id, { convert: converted });

    res.status(201).json(record);
  } catch (err) {
    console.error("createConvert error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to print all converted FAs
export const getAllConverts = async (_req, res) => {
  try {
    res.json(await getAllConvert());
  } catch (err) {
    console.error("getAllConverts error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to print the converted DFA
export const getConvert = async (req, res) => {
  try {
    const conv = await getConvertById(req.params.id);
    if (!conv) {
      return res.status(404).json({ error: "Converted DFA not found" });
    }
    res.json(conv);
  } catch (err) {
    console.error("getConvert error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to delete a converted DFA
export const deleteConvert = async (req, res) => {
  try {
    await removeConvert(req.params.id);
    res.status(204).send();
  } catch (err) {
    console.error("deleteConvert error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
