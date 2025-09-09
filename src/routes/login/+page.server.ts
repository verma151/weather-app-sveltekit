import type { Actions } from "./$types";
import { getUsers } from "$lib/server/db";
import crypto from "crypto";
import { redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import {  SECRET_KEY } from "$env/static/private"

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    const users = getUsers();
    const hashed = crypto.createHash("sha256").update(password).digest("hex");
    const user = users.find((u: any) => u.email === email && u.password === hashed);

    if (!user) {
      return { error: "Invalid credentials" };
    }

    // Create a JWT token containing the email
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60
    });

    throw redirect(302, "/");
  }
};
