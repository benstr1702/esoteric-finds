import { CartState, CartAction } from "./cartTypes";

export const initialCartState: CartState = {
	items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_ITEM": {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);

			if (existingItem) {
				return {
					...state,
					items: state.items.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				};
			}

			// Add new item with quantity 1
			return {
				...state,
				items: [...state.items, { ...action.payload, quantity: 1 }],
			};
		}

		case "REMOVE_ITEM":
			return {
				...state,
				items: state.items.filter(
					(item) => item.id !== action.payload.id
				),
			};

		case "INCREMENT_QUANTITY":
			return {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				),
			};

		case "DECREMENT_QUANTITY":
			return {
				...state,
				items: state.items
					.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity - 1 }
							: item
					)
					.filter((item) => item.quantity > 0),
			};

		case "CLEAR_CART":
			return { items: [] };

		case "SET_CART":
			return action.payload;

		default:
			return state;
	}
}
