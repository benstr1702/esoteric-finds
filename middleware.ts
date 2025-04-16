// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
	// CSRF protection
	if (request.method !== "GET") {
		const originHeader = request.headers.get("Origin");
		const hostHeader = request.headers.get("Host");
		if (originHeader === null || hostHeader === null) {
			return new NextResponse(null, { status: 403 });
		}
		let origin: URL;
		try {
			origin = new URL(originHeader);
		} catch {
			return new NextResponse(null, { status: 403 });
		}
		if (origin.host !== hostHeader) {
			return new NextResponse(null, { status: 403 });
		}
	}

	// Cookie extension for GET requests
	if (request.method === "GET") {
		const response = NextResponse.next();
		const token = request.cookies.get("session")?.value ?? null;
		if (token !== null) {
			response.cookies.set("session", token, {
				path: "/",
				maxAge: 60 * 60 * 24 * 30, // 30 days
				sameSite: "lax",
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
			});
		}
		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/:path*"], // Apply to all routes
};
