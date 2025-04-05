"use client";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat",
});

export default function Navbar() {
	const router = useRouter();
	return (
		<header
			className={`${montserrat.variable} font-bold p-6 bg-gradient-to-b bg-blue-900 sticky top-0 z-50`}
		>
			<ul className="flex w-full justify-between items-center">
				{/* Logo Section */}
				<li className="flex gap-4 items-center text-white p-2 w-auto">
					<button
						className="hover:cursor-pointer"
						type="button"
						onClick={() => {
							router.push("/");
						}}
					>
						Logo
					</button>
					<button
						className="hover:cursor-pointer"
						type="button"
						onClick={() => router.push("/")}
					>
						Home
					</button>
				</li>
				<li className="flex gap-0 items-center sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
					<Input
						type="text"
						placeholder="Search..."
						className="w-full border border-black rounded-l-full px-4 py-2"
					/>
					<button className="text-black w-14 pr-1 hover:cursor-pointer hover:opacity-70 h-9 bg-white border border-black border-l-0 rounded-r-full flex items-center justify-center">
						<Search className="w-5 h-5" />
					</button>
				</li>
				{/* Cart & Account Section */}
				<li className="flex gap-4 text-white items-center w-auto p-2">
					<button className="hover:cursor-pointer">
						<ShoppingCart />
					</button>
					<button className="hover:cursor-pointer">
						<User />
					</button>
				</li>
			</ul>
		</header>
	);
}
