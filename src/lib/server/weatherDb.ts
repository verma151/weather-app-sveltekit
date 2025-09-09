import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "weather.json");

export function getWeatherHistory() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function saveWeatherEntry(entry: any) {
  const history = getWeatherHistory();
  history.push(entry);
  fs.writeFileSync(FILE, JSON.stringify(history, null, 2));
}
