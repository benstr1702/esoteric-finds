"use client";
import { useEffect, useState } from "react";
import { SessionValidationResult } from "@/lib/server/sessions";

export interface SessionState extends SessionValidationResult {
	status: "loading" | "authenticated" | "unauthenticated";
}

export function useSession() {
	const [sessionData, setSessionData] = useState<SessionState>({
		session: null,
		user: null,
		status: "loading",
	});

	useEffect(() => {
		const fetchSession = async () => {
			try {
				const response = await fetch("/api/auth/session");
				const data: SessionValidationResult = await response.json();

				setSessionData({
					...data,
					status: data.user ? "authenticated" : "unauthenticated",
				});
			} catch (error) {
				console.error("Failed to fetch session:", error);
				setSessionData({
					session: null,
					user: null,
					status: "unauthenticated",
				});
			}
		};

		fetchSession();
	}, []);

	return sessionData;
}
