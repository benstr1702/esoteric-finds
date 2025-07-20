"use client";
import { useCart } from "@/lib/hooks/useCart";
export default function TestButton() {
	const { state } = useCart();
	const handleClick = () => {
		console.log("cart state:", state);
	};
	return <button onClick={handleClick}>Click to see state</button>;
}
