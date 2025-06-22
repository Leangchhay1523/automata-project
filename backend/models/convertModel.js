// Function to read/write all data into the json File

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/convert.json");

async function ensureFile() {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf8");
  }
}

async function readAll() {
  await ensureFile();
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function writeAll(arr) {
  await ensureFile();
  await fs.writeFile(filePath, JSON.stringify(arr, null, 2), "utf8");
}

export async function addConvert(record) {
  const all = await readAll();
  all.push({
    ...record,
    type: "DFA",
  });
  await writeAll(all);
}

export async function getConvertById(id) {
  const all = await readAll();
  return all.find((r) => r.id === id) || null;
}

export async function getAllConvert() {
  return await readAll();
}

export async function deleteConvert(id) {
  let all = await readAll();
  all = all.filter((r) => r.id !== id);
  await writeAll(all);
}
