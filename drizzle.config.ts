import { defineConfig } from "drizzle-kit";

// Load environment variables from .env.development

console.log("Database URL:", process.env.DATABASE_URL); // Log to debug

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig({
	dialect: "postgresql",
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dbCredentials: {
		url: process.env.DATABASE_URL,
	},
});
