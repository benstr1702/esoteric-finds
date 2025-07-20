import { CartState, CartAction } from "./cartTypes";

export const initialCartState: CartState = {
	items: [],
};

export function cartReducer(state: CartState, action: CartAction) {
	switch (action.type) {
		case "ADD_ITEM":
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case "REMOVE_ITEM":
			return {
				...state,
				items: state.items.filter(
					(item) => item.id !== action.payload.id
				),
			};
		case "CLEAR_CART":
			return { items: [] };
		default:
			return state;
	}
}
