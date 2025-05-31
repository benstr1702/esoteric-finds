import {
	pgTable,
	serial,
	pgEnum,
	text,
	index,
	timestamp,
	integer,
	varchar,
	bigserial,
	boolean,
} from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const enumRoles = pgEnum("roles", ["guest", "user", "admin"]);
// User Table
export const userTable = pgTable(
	"user",
	{
		id: serial("id").primaryKey(),
		googleId: text("google_id").notNull().unique(),
		email: text("email").notNull().unique(),
		username: text("username").notNull(),
		picture: text("picture").notNull(),
		role: enumRoles().default("guest").notNull(),
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

export const productsTable = pgTable("products_table", {
	id: bigserial("id", { mode: "number" }).primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	image: text("image").default("/file.svg"),
	description: text("description").notNull(),
	price: integer("price").notNull(),
	volumeOrQuantity: text("volume_or_quantity").notNull(),
	stockCount: integer("stock_count").notNull().default(0),
	isOnSale: boolean("is_on_sale").notNull(),
	discountedPrice: integer("discounted_price"),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "date",
	}).defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "date",
	}).defaultNow(),

	categoryId: integer("category_id").references(
		() => productCategoryTable.id,
		{ onDelete: "set null" }
	),
	slug: text("slug").unique().notNull(),
	manufacturer: text("manufacturer").notNull(),
});

// Type Definitions
export type User = InferSelectModel<typeof userTable>;
export type Session = InferSelectModel<typeof sessionTable>;
