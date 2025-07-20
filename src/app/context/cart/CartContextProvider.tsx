"use client";

import { createContext, useReducer, useEffect, type ReactNode } from "react";
import { CartContextType } from "./cartTypes";
import { cartReducer, initialCartState } from "./cartReducer";

export const CartContext = createContext<CartContextType | undefined>(
	undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialCartState);

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				const stored = localStorage.getItem("cart");
				if (stored)
					dispatch({
						type: "SET_CART",
						payload: JSON.parse(stored),
					});
			} catch (e) {
				console.error("Failed to parse cart from localStorage", e);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state));
	}, [state]);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
}
