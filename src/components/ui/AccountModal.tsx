"use client";
import { useSession } from "@/lib/hooks/useSession";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogoutButton } from "@/app/login/components";

export default function AccountModal() {
	const { user, status } = useSession();
	const router = useRouter();
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);
	if (status === "loading" || status === "unauthenticated") {
		return null;
	}

	function handleClickInsideModal(event: React.MouseEvent): void {
		event.stopPropagation();
	}

	return (
		<>
			<div className="fixed top-[64px] left-0 right-0 bottom-0 bg-black/50 z-40" />

			<div
				onClick={handleClickInsideModal}
				className="absolute top-full  mr-2 right-0 w-52 rounded-xl bg-white text-blue-900 font-semibold shadow-xl border border-black/10 p-4 z-50"
			>
				<LogoutButton />
			</div>
		</>
	);
}
