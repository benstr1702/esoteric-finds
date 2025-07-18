import { db } from "@/db";
import { productCategoryTable, productTable } from "@/db/schema";
import { eq, getTableColumns } from "drizzle-orm";
import type { ProductWithCategory } from "@/db/schema";

export async function getProductsOnSale(): Promise<ProductWithCategory[]> {
	const products = await db
		.select({
			...getTableColumns(productTable),
			categorySlug: productCategoryTable.slug,
			categoryName: productCategoryTable.name,
		})
		.from(productTable)
		.where(eq(productTable.isOnSale, true))
		.leftJoin(
			productCategoryTable,
			eq(productTable.categoryId, productCategoryTable.id)
		);
	//console.log("products:", products);

	return products;
}

export async function batchProductsByCategory(): Promise<
	Record<string, ProductWithCategory[]>
> {
	const products = await getProductsOnSale();

	const grouped: Record<string, ProductWithCategory[]> = {};

	for (const product of products) {
		const category = product.categorySlug || "uncategorized";

		if (!grouped[category]) {
			grouped[category] = [];
		}

		if (grouped[category].length < 3) {
			grouped[category].push(product);
		}
	}
	//console.log("grouped:", grouped);

	return grouped;
}
