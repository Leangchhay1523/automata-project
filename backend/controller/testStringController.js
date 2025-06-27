import { getFAById } from "../models/faModel.js";
import { getConvertById } from "../models/convertModel.js";
import { getMinById } from "../models/minimizeModel.js";
import testString from "../logic/testStringLogic.js";

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
      // check if it's a minimized DFA
      fa = await getMinById(id);
      if (!fa) {
        // check if it's a converted DFA
        fa = await getConvertById(id);
        if (!fa) {
          return res.status(404).json({ error: "FA not found" });
        }
      }
    }
    let automaton = fa;
    const accepted = testString(automaton, input);
    res.json({ id, input, accepted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
