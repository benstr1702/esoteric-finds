"use client";
import { logoutAction } from "../actions";

export function LogoutButton() {
	async function handleClick() {
		const result = await logoutAction();
		console.log(result);
	}

	return (
		<button
			className="hover:cursor-pointer"
			type="submit"
			onClick={handleClick}
		>
			LogOut
		</button>
	);
}
