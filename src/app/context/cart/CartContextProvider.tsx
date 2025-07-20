"use client";

import { createContext, useReducer, useEffect, type ReactNode } from "react";
import { CartContextType, CartState } from "./cartTypes";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext<CartContextType | undefined>(
	undefined
);

function getInitialCartState(): CartState {
	if (typeof window !== "undefined") {
		try {
			const stored = localStorage.getItem("cart");
			if (stored) return JSON.parse(stored);
		} catch (e) {
			console.error("Failed to parse cart from localStorage", e);
		}
	}
	return { items: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(
		cartReducer,
		undefined,
		getInitialCartState
	);

	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state));
	}, [state]);

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
}
