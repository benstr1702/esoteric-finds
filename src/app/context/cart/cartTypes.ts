import type { Product } from "@/db/schema";
import React from "react";

export type CartState = {
	items: Product[];
};

export type CartAction =
	| { type: "ADD_ITEM"; payload: Product }
	| { type: "REMOVE_ITEM"; payload: { id: number } }
	| { type: "INCREMENT_QUANTITY"; payload: { id: number } }
	| { type: "DECREMENT_QUANTITY"; payload: { id: number } }
	| { type: "SET_CART"; payload: CartState }
	| { type: "CLEAR_CART" };

export type CartContextType = {
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
};
