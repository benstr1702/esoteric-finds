"use client";
import { useCart } from "@/lib/hooks/useCart";
export default function CartNotificationBadge() {
	const { state } = useCart();
	return (
		<div className="w-4 h-4 rounded-full bg-yellow-600 text-xs items-center justify-center fle flex  text-white">
			{state.items.length}
		</div>
	);
}
