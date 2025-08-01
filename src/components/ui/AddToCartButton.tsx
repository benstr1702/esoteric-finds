"use client";
import { useCart } from "@/lib/hooks/useCart";
import type { Product } from "@/db/schema";
import { ShoppingCart } from "lucide-react";
export default function AddToCartButton({ product }: { product: Product }) {
	const { dispatch } = useCart();
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch({ type: "ADD_ITEM", payload: product });
		console.log("added item to cart:", product);

		setTimeout(() => {
			const cartData = localStorage.getItem("cart");
			if (cartData) {
				const cart = JSON.parse(cartData);
				console.log("cart in localStorage:", cart);
			}
		}, 100);
	};
	return (
		<button
			data-add-to-cart
			onClick={handleClick}
			className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-green-600 hover:cursor-pointer hover:bg-green-700 text-white font-bold text-sm px-4 py-2 transition-shadow hover:shadow-md"
		>
			<ShoppingCart color="white" className="w-5 h-5" />
			Add to Cart
		</button>
	);
}
