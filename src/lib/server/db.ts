import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "users.json");

export function getUsers() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

export function saveUsers(users: any[]) {
  fs.writeFileSync(FILE, JSON.stringify(users, null, 2));
}
