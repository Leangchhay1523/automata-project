// Function to read/write all datas into json File
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { checkFAType } from "../logic/checkFAType.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/fa.json");

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

async function writeAll(all) {
  await ensureFile();
  await fs.writeFile(filePath, JSON.stringify(all, null, 2), "utf8");
}

export async function addFA(fa) {
  const all = await readAll();
  const type = checkFAType(fa);
  all.push({
    id: fa.id,
    type,
    convert: false,
    minimize: false,
    ...fa,
  });
  await writeAll(all);
}

export async function getFAById(id) {
  const all = await readAll();
  return all.find((f) => f.id === id) || null;
}

export async function getAllFA() {
  return await readAll();
}

export async function updateFA(id, updates) {
  const all = await readAll();
  const idx = all.findIndex((f) => f.id === id);
  if (idx === -1) throw new Error(`FA ${id} not found`);
  all[idx] = { ...all[idx], ...updates };
  await writeAll(all);
  return all[idx];
}

export async function deleteFA(id) {
  let all = await readAll();
  all = all.filter((f) => f.id !== id);
  await writeAll(all);
}
