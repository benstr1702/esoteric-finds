import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { ilike } from "drizzle-orm";
/**
 * This API route returns search results from the database based on keywords ,
 * categories or product names
 *
 */

async function getProductsThatMatchQuery(query: string) {
	const products = await db
		.select()
		.from(productTable)
		.where(ilike(productTable.name, query));
	return products;
}
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const query = searchParams.get("q")?.trim() ?? "";

		if (!query)
			return NextResponse.json({
				products: [],
			});

		const response = await getProductsThatMatchQuery(query);

		return NextResponse.json({
			products: response,
		});
	} catch (error) {
		console.error("An error has occurred: ", error);
		return NextResponse.json({
			message: "Internal server error",
			status: 500,
		});
	}
}
