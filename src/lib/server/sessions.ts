"use server";
import { db } from "@/db";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { encodeBase32, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cache } from "react";

import type { User } from "./user";
import { sessionTable, userTable } from "@/db/schema";

export async function validateSessionToken(
	token: string
): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(
		sha256(new TextEncoder().encode(token))
	);
	try {
		const row = await db
			.select({
				sessionId: sessionTable.id,
				sessionUserId: sessionTable.userId,
				sessionExpiresAt: sessionTable.expiresAt,
				userId: userTable.id,
				userGoogleId: userTable.googleId,
				userEmail: userTable.email,
				userName: userTable.username,
				userPicture: userTable.picture,
				userRole: userTable.role,
			})
			.from(sessionTable)
			.innerJoin(userTable, eq(sessionTable.userId, userTable.id))
			.where(eq(sessionTable.id, sessionId))
			.then((rows) => rows[0]);

		if (row === null) {
			return { session: null, user: null };
		}
		const session: Session = {
			id: row.sessionId,
			userId: row.userId,
			expiresAt: new Date(row.sessionExpiresAt),
		};
		const user: User = {
			id: row.userId,
			googleId: row.userGoogleId,
			email: row.userEmail,
			username: row.userName,
			picture: row.userPicture,
			role: row.userRole,
		};
		if (Date.now() >= session.expiresAt.getTime()) {
			db.delete(sessionTable)
				.where(eq(sessionTable.id, sessionId))
				.catch((error) =>
					console.error("Failed to delete expired session", error)
				);
			return { session: null, user: null };
		}
		if (
			Date.now() >=
			session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
		) {
			session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
			db.update(sessionTable)
				.set({
					expiresAt: new Date(
						Math.floor(session.expiresAt.getTime() / 1000) * 1000
					),
				})
				.where(eq(sessionTable.id, sessionId))
				.catch((error) =>
					console.error(
						"failed to update session expiration date",
						error
					)
				);
		}
		return { session, user };
	} catch (error) {
		console.error(
			"something done fucked up (prob db not turned on)",
			error
		);
		throw new Error(
			"error with getting the session and user, probably db not turned on or something "
		);
	}
}

export const getCurrentSession = cache(
	async (): Promise<SessionValidationResult> => {
		const cookieStore = await cookies();
		const token = cookieStore.get("session")?.value ?? null;
		if (token === null) {
			return { session: null, user: null };
		}
		const result = await validateSessionToken(token);
		return result;
	}
);

export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateUserSessions(userId: number): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export async function setSessionTokenCookie(
	token: string,
	expiresAt: Date
): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set("session", token, {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		expires: expiresAt,
	});
}

export async function deleteSessionTokenCookie(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.set("session", "", {
		httpOnly: true,
		path: "/",
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 0,
	});
}

export async function generateSessionToken(): Promise<string> {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32(tokenBytes).toLowerCase();
	return token;
}

export async function createSession(
	token: string,
	userId: number
): Promise<Session> {
	const sessionId = encodeHexLowerCase(
		sha256(new TextEncoder().encode(token))
	);
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
	};
	await db.insert(sessionTable).values({
		id: session.id as string,
		userId: session.userId,
		expiresAt: new Date(session.expiresAt),
	});
	return session;
}

export interface Session {
	id: string;
	expiresAt: Date;
	userId: number;
}

export interface SessionValidationResult {
	session: Session | null;
	user: User | null;
}
