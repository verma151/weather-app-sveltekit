import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "weather.json");

// Get weather history for a specific user (by email)
export function getWeatherHistory(email: string) {
  if (!fs.existsSync(FILE)) return [];
  const allHistory = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  return allHistory[email] ?? [];
}

// Save a weather entry for a specific user (by email)
export function saveWeatherEntry(email: string, entry: any) {
  let allHistory: { [key: string]: any[] } = {};
  if (fs.existsSync(FILE)) {
    allHistory = JSON.parse(fs.readFileSync(FILE, "utf-8"));
  }

  if (!allHistory[email]) allHistory[email] = [];
  allHistory[email].push(entry);

  fs.writeFileSync(FILE, JSON.stringify(allHistory, null, 2));
}
