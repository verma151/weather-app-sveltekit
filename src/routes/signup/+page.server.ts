import type { Actions } from "./$types";
import { getUsers, saveUsers } from "$lib/server/db";
import crypto from "crypto";

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const users = getUsers();
    if (users.find((u: any) => u.email === email)) {
      return { error: "User already exists" };
    }

    const hashed = crypto.createHash("sha256").update(password).digest("hex");
    users.push({ name, email, password: hashed });
    saveUsers(users);

    return { success: true };
  }
};
