"use server";
import { globalPOSTRateLimit } from "@/lib/server/requests";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/server/sessions";
import { redirect } from "next/navigation";

export async function logoutAction(): Promise<ActionResult | null> {
  if (!globalPOSTRateLimit()) {
    return {
      message: "Too many requests",
    };
  }
  const { session } = await getCurrentSession();
  if (session === null) {
    return {
      message: "Not authenticated",
    };
  }
  invalidateSession(session.id);
  deleteSessionTokenCookie();
  redirect("/login");
}

interface ActionResult {
  message: string;
}
