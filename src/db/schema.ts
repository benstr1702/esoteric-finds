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
	id: text("id").primaryKey().notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => userTable.id, { onDelete: "cascade" }),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date",
	}).notNull(),
});

// Product Categories Table
export const productCategoryTable = pgTable(
	"product_category",
	{
		id: serial("id").primaryKey(),
		name: text("name").unique().notNull(),
		slug: text("slug").unique().notNull(),
		image: text("image").unique().notNull(),
	},
	(table) => [index("slug_index").on(table.slug)]
);
// Type Definitions
export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
