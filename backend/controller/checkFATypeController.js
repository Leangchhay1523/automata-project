import { getFAById } from "../models/faModel.js";
import { checkFAType } from "../logic/checkFaTypeLogic.js";

// Function to get the type of the FA
export async function getFAType(req, res) {
  const { id } = req.params;
  const fa = await getFAById(id);
  if (!fa) {
    return res.status(404).json({ error: "FA not found" });
  }
  const type = checkFAType(fa);
  res.json({ id, type });
}
