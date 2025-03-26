import { Input } from "./ui/input";
import { ShoppingCart, User } from "lucide-react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat",
});

export default function Navbar() {
	return (
		<header
			className={`${montserrat.variable} font-[var(--font-montserrat)] m-6`}
		>
			<ul className="flex w-full justify-between items-center">
				{/* Logo Section */}
				<li className="flex gap-4 items-center border">
					<button className="hover:cursor-pointer">Logo</button>
					<button className="hover:cursor-pointer p-2">Home</button>
				</li>

				{/* Home & Search Section */}
				<li className="flex gap-4 items-center border w-96">
					<Input
						type="text"
						placeholder="Search..."
						className="w-full"
					/>
				</li>

				{/* Cart & Account Section */}
				<li className="flex border gap-2 items-center">
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
