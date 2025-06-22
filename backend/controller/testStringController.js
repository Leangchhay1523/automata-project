import { getFAById } from "../models/faModel.js";
import { getConvertById } from "../models/convertModel.js";
import testString from "../logic/testString.js";

// Function to testing the inputed string
export async function runTestString(req, res) {
  const { id, input } = req.body;
  if (!id || typeof input !== "string") {
    return res.status(400).json({ error: "Missing id or input string" });
  }
  try {
    // fetch original FA
    let fa = await getFAById(id);
    if (!fa) {
      return res.status(404).json({ error: "FA not found" });
    }
    let automaton = fa;
    // if NFA, auto-convert to DFA first
    if (fa.type === "NFA") {
      const convId = `D${id}`;
      const dfa = await getConvertById(convId);
      if (!dfa) {
        return res.status(404).json({ error: "Converted DFA not found" });
      }
      automaton = dfa;
    }
    const accepted = testString(automaton, input);
    res.json({ id, input, accepted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
