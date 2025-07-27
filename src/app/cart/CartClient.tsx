"use client";
import { useCart } from "@/lib/hooks/useCart";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { CartItem } from "../context/cart/cartTypes";

export default function CartClient() {
	const { state, dispatch } = useCart();

	if (state.items.length === 0) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-gray-500 text-lg">Your cart is empty.</p>
			</div>
		);
	}

	const handleDecrease = (product: CartItem) => {
		console.log("- click");

		try {
			dispatch({ type: "DECREMENT_QUANTITY", payload: product });
		} catch (error) {
			console.error("failed to decrement count", error);
		}
	};

	const handleIncrease = (product: CartItem) => {
		console.log("+ click");

		try {
			dispatch({ type: "INCREMENT_QUANTITY", payload: product });
			console.log("successfully incremented count");
		} catch (error) {
			console.error("failed to increment count", error);
		}
	};

	return (
		<div className="flex flex-col p-4 max-w-4xl mx-auto">
			<h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
			<div className="space-y-4">
				{state.items.map((item) => (
					<div
						key={item.id}
						className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
					>
						<div className="flex items-center gap-4">
							<Image
								src={item.image || "/preview.webp"}
								alt={item.name}
								width={60}
								height={60}
								className="rounded object-cover"
							/>
							<div className="flex flex-col">
								<p className="font-medium text-lg">
									{item.name}
								</p>
								<p className="text-sm text-gray-600">
									{item.manufacturer}
								</p>
								<p className="text-sm font-semibold text-blue-700">
									${(item.price / 100).toFixed(2)}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<button
								className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
								aria-label="Decrease quantity"
								onClick={() => handleDecrease(item)}
							>
								<Minus className="w-4 h-4" />
							</button>
							<span className="min-w-[24px] text-center font-medium text-sm">
								{item.quantity}
							</span>
							<button
								className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition"
								aria-label="Increase quantity"
								onClick={() => handleIncrease(item)}
							>
								<Plus className="w-4 h-4" />
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
