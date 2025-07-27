import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// cart context provider
import { CartProvider } from "./context/cart/CartContextProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Esoteric Finds",
	description: "Don't miss the deals!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistMono.variable} ${geistSans.variable}`}
		>
			<body className=" relative bg-white antialiased flex flex-col">
				<CartProvider>
					<Navbar />
					<main className="flex-grow">{children}</main>
					{/*<main>{children}</main>*/}
					<Footer />
				</CartProvider>
			</body>
		</html>
	);
}
