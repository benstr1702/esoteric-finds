// app/api/categories/route.ts
import { db } from "@/db";
import { productCategoryTable } from "@/db/schema";
import { NextResponse } from "next/server";

/**
 *
 * This API route returns all the categories from the categoryTable
 * returns an object with a categoryId and the categoryName
 */
export async function GET() {
	try {
		const result = await db
			.select({
				id: productCategoryTable.id,
				name: productCategoryTable.name,
			})
			.from(productCategoryTable);
		return NextResponse.json(result);
	} catch (error) {
		console.error("Error fetching categories:", error);
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 }
		);
	}
}
