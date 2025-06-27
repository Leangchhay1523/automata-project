// Function to read/write all datas into the JSON File
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../data/minimize.json");

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
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeAll(arr) {
  await ensureFile();
  await fs.writeFile(filePath, JSON.stringify(arr, null, 2), "utf8");
}

export async function addMin(minimized) {
  const all = await readAll();
  all.push(minimized);
  await writeAll(all);
}

export async function getMinById(id) {
  const all = await readAll();
  console.log(all);
  return all.find((m) => m.id === id) || null;
}

export async function getAllMin() {
  return await readAll();
}

export async function deleteMin(id) {
  let all = await readAll();
  all = all.filter((m) => m.id !== id);
  await writeAll(all);
}
