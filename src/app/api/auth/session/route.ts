// app/api/auth/session/route.ts
import { getCurrentSession } from "@/lib/server/sessions";
import { NextResponse } from "next/server";

export async function GET() {
	const result = await getCurrentSession();
	return NextResponse.json(result);
}
