"use client";
import { Input } from "./ui/input";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useSession } from "@/lib/hooks/useSession";
import { useCallback, useEffect, useRef } from "react";
import { logoutAction } from "@/app/actions";
import { useState } from "react";
const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat",
});

export default function Navbar() {
	const router = useRouter();
	const { user, status } = useSession();
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const accountButtonRef = useRef<HTMLButtonElement | null>(null);
	const [query, setQuery] = useState<string>("");

	useEffect(() => {
		function handleResize() {
			if (dialogRef.current?.open && accountButtonRef.current) {
				const rect = accountButtonRef.current.getBoundingClientRect();
				dialogRef.current.style.top = `${rect.bottom + 20}px`;
				dialogRef.current.style.left = `${rect.left - 100}px`;
			}
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const openDialog = useCallback(() => {
		if (dialogRef.current && accountButtonRef.current) {
			const buttonRect = accountButtonRef.current.getBoundingClientRect();
			dialogRef.current.style.position = "absolute";
			dialogRef.current.style.top = `${buttonRect.bottom + 20}px`;
			dialogRef.current.style.left = `${buttonRect.left - 100}px`;
			dialogRef.current.showModal();
		}
	}, []);

	const closeDialog = useCallback(() => {
		if (dialogRef.current) {
			dialogRef.current.close();
		}
	}, []);

	const handleClick = () => {
		closeDialog();
		redirect("/login");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		//console.log("query state:", query);
	};

	const handleBackdropClick = (event: React.MouseEvent) => {
		if (event.target === dialogRef.current) {
			closeDialog();
		}
	};
	return (
		<header
			className={`${montserrat.className} selection:bg-amber-500 font-bold px-4 py-3 bg-blue-900 sticky  top-0 z-50 h-16`}
		>
			<nav className="flex items-center justify-between w-full mx-auto px-4 ">
				{/* Left Section - Logo and Home */}
				<div className="flex items-center gap-4 text-white ">
					<button
						className="flex items-center gap-2 hover:opacity-80"
						onClick={() => router.push("/")}
					>
						<Image
							src="/icon.png"
							alt="Logo"
							width={30}
							height={30}
							className="inline-block"
						/>
						<span className="text-white text-base leading-none">
							EF
						</span>
					</button>
					<button
						className="hover:opacity-80 hidden sm:block"
						onClick={() => router.push("/")}
					>
						Home
					</button>
				</div>

				{/* Center Search Section */}
				<div className="flex items-center justify-center max-w-md w-full mx-auto px-4 flex-1">
					<div className="flex w-full">
						<div className="w-full max-[450px]:hidden">
							<form
								action="/search"
								method="GET"
								className="flex w-full"
							>
								<Input
									name="q"
									type="text"
									onChange={handleInputChange}
									value={query}
									placeholder="Search..."
									className="w-full border border-black rounded-l-full px-4 py-2 hover:bg-gray-50"
								/>

								<button
									type="submit"
									className="text-black w-12 h-9 bg-white border border-black border-l-0 rounded-r-full flex items-center justify-center hover:opacity-80 max-[450px]:w-9 max-[450px]:h-9 max-[450px]:rounded-full max-[450px]:border-none"
								>
									<Search className="w-5 h-5 " />
								</button>
							</form>
						</div>
					</div>
				</div>

				{/* Right Section - Account and Cart */}
				<div className="flex items-center gap-4 text-white relative">
					<dialog
						onClick={handleBackdropClick}
						className="rounded-xl backdrop:bg-black/30 bg-white p-4 shadow-xl border border-gray-200 w-60  text-black z-50"
						ref={dialogRef}
					>
						{user && (
							<div className="flex flex-col justify-center items-center">
								<button
									onClick={logoutAction}
									className="w-full text-center text-sm font-medium text-red-600 hover:underline"
								>
									Sign Out
								</button>
								<Link
									href={"/profile"}
									className="text-sm font-medium text-black hover:cursor-pointer"
								>
									Go to your Profile
								</Link>
							</div>
						)}
						{!user && (
							<div className="flex flex-col gap-2">
								<button
									onClick={handleClick}
									className="text-sm font-medium text-blue-600 hover:underline text-left"
								>
									Sign In or Create Account
								</button>
								<Link
									href="/track-your-order"
									className="text-sm text-gray-700 hover:underline text-left"
								>
									Get your purchase history
								</Link>
							</div>
						)}
					</dialog>
					<button
						ref={accountButtonRef}
						onClick={openDialog}
						className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors hover:bg-white/10 relative"
					>
						<User className="w-5 h-5" />
						{status === "loading" ? (
							<span className="text-xs">Loading...</span>
						) : user ? (
							<div className="text-xs flex flex-col items-start leading-tight">
								<span>Hello,</span>
								<span>{user.username}</span>
							</div>
						) : (
							<span className="text-sm"> Sign In</span>
						)}
					</button>

					{/* Cart Button */}
					<button
						className="rounded-full w-10 h-10 flex items-center justify-center transition-colors hover:bg-white/10"
						onClick={() => router.push("/cart")}
					>
						<ShoppingCart className="w-5 h-5" />
					</button>
				</div>
			</nav>
		</header>
	);
}
