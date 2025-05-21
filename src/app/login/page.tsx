"use client";
import { useSession } from "@/lib/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
	const router = useRouter();
	const { user, status } = useSession();

	useEffect(() => {
		if (user !== null) {
			router.push("/");
		}
	}, [user, router]);

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
				<h1 className="text-2xl font-semibold mb-6 text-gray-800">
					Sign in
				</h1>
				<a
					href="/login/google"
					className="inline-flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium"
				>
					<svg
						className="w-5 h-5 mr-2"
						aria-hidden="true"
						focusable="false"
						data-prefix="fab"
						data-icon="google"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 488 512"
					>
						<path
							fill="currentColor"
							d="M488 261.8c0-17.8-1.6-35.1-4.6-51.8H249v98h135c-5.8 31.2-23.3 57.5-49.5 75.2l79.7 62.1c46.5-42.9 73.3-106.2 73.3-183.5zM249 488c66.2 0 121.7-21.9 162.3-59.3l-79.7-62.1c-22.3 15-51 23.8-82.6 23.8-63.5 0-117.4-42.8-136.7-100.4H30.6v62.9C70.6 442 153.7 488 249 488zM112.3 294.1c-4.8-14.2-7.6-29.4-7.6-45.1s2.7-30.9 7.6-45.1v-62.9H30.6C11 180.4 0 213.1 0 249s11 68.6 30.6 94.9l81.7-62.9zM249 100.9c35.9 0 68.3 12.4 93.7 36.5l70.2-70.2C375.7 28.4 322.3 0 249 0 153.7 0 70.6 45.9 30.6 117.1l81.7 62.9c19.3-57.6 73.2-100.4 136.7-100.4z"
						/>
					</svg>
					Sign in with Google
				</a>
			</div>
		</main>
	);
}
