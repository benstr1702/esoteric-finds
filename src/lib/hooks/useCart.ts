import { useContext } from "react";
import { CartContext } from "@/app/context/cart/CartContextProvider";

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart hook must be within a cart provider");
	}
	return context;
}
