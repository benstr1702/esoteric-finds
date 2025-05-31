import { db } from "@/db";
import { InferSelectModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { userTable } from "@/db/schema";
export type User = InferSelectModel<typeof userTable>;

export async function createUser(
	googleId: string,
	email: string,
	name: string,
	picture: string
): Promise<User> {
	const [row] = await db
		.insert(userTable)
		.values({
			googleId: googleId,
			email: email,
			username: name,
			picture: picture,
			role: "user",
		})
		.returning({ id: userTable.id });

	if (row === null) {
		throw new Error("Unexpected error");
	}
	const user: User = {
		id: row.id,
		googleId,
		email,
		username: name,
		picture,
		role: "user",
	};
	return user;
}

export async function getUserFromGoogleId(
	googleId: string
): Promise<User | null> {
	const rows = await db
		.select({
			id: userTable.id,
			googleId: userTable.googleId,
			email: userTable.email,
			name: userTable.username,
			picture: userTable.picture,
			role: userTable.role,
		})
		.from(userTable)
		.where(eq(userTable.googleId, googleId));
	//console.log("rows", rows);
	if (rows.length === 0) {
		//console.log("nightmare nightmare nightmare");
		return null;
	}
	const row = rows[0];
	const user: User = {
		id: row.id,
		googleId: row.googleId,
		email: row.email,
		username: row.name,
		picture: row.picture,
		role: row.role,
	};
	return user;
}

//export interface User {
//	id: number;
//	email: string;
//	googleId: string;
//	name: string;
//	picture: string;
//	role: string;
//}
