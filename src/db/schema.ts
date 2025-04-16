import {
	pgTable,
	serial,
	text,
	index,
	timestamp,
	integer,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

// User Table
export const userTable = pgTable(
	"user",
	{
		id: serial("id").primaryKey(),
		googleId: text("google_id").notNull().unique(),
		email: text("email").notNull().unique(),
		username: text("username").notNull(),
		picture: text("picture").notNull(),
	},
	(table) => [index("google_id_index").on(table.googleId)]
);

// Session Table
export const sessionTable = pgTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

// Type Definitions
export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
