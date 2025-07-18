// app/api/products-on-sale/route.js
import { batchProductsByCategory } from "@/lib/server/get-products-on-sale";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const grouped = await batchProductsByCategory();
		return NextResponse.json(grouped);
	} catch (error) {
		console.error("Error fetching products on sale:", error);
		return NextResponse.json(
			{ error: "Failed to fetch products" },
			{ status: 500 }
		);
	}
}
