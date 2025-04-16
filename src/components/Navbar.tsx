"use client";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useSession } from "@/lib/hooks/useSession";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat",
});

export default function Navbar() {
	const router = useRouter();
	const { user, status } = useSession();

	return (
		<header
			className={`${montserrat.variable} font-bold px-4 py-3 bg-blue-900 sticky top-0 z-50`}
		>
			<nav className="flex items-center justify-between w-full mx-auto px-4">
				{/* Left Section - Logo and Home */}
				<div className="flex items-center gap-4 text-white">
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
					{/* Input hidden under 450px */}
					<div className="flex w-full">
						<div className="w-full max-[450px]:hidden">
							<Input
								type="text"
								placeholder="Search..."
								className="w-full border border-black rounded-l-full px-4 py-2"
							/>
						</div>
						<button className="text-black w-12 h-9 bg-white border border-black border-l-0 rounded-r-full flex items-center justify-center hover:opacity-80 max-[450px]:w-9 max-[450px]:h-9 max-[450px]:rounded-full max-[450px]:border-none">
							<Search className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* Right Section - Account and Cart */}
				<div className="flex items-center gap-4 text-white">
					{/* Account Button */}
					<button
						className="flex items-center gap-2 px-3 py-2 rounded-full transition-colors hover:bg-white/10"
						onClick={() =>
							user
								? router.push("/profile")
								: router.push("/login")
						}
					>
						<User className="w-5 h-5" />
						{status === "loading" ? (
							<span className="text-xs">Loading...</span>
						) : user ? (
							<div className="text-xs flex flex-col items-start leading-tight">
								<span>Hello,</span>
								<span>{user.name}</span>
							</div>
						) : (
							<span className="text-xs">Sign in</span>
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
