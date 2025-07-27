"use client";
import { useCart } from "@/lib/hooks/useCart";
export default function CartNotificationBadge() {
	const { state } = useCart();
	if (state.items.length < 1) return null;
	return (
		<div className="w-4 h-4 rounded-full absolute top-1 right-1 bg-yellow-600 text-xs items-center justify-center fle flex  text-white">
			{state.items.length}
		</div>
	);
}
