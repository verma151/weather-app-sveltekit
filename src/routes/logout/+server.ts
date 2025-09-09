import type { RequestHandler } from "./$types";
import { redirect } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.delete("token", { path: "/" });
  throw redirect(302, "/login");
};
