"use server";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface ProductData {
	name: string;
	description: string;
	price: number; // in cents
	volumeOrQuantity: string;
	stockCount: number;
	isOnSale: boolean;
	discountedPrice: number | null; // in cents
	categoryId: number;
	manufacturer: string;
	image: string;
	slug: string;
}

export async function addProduct(productData: ProductData) {
	try {
		// Validate required fields
		if (
			!productData.name ||
			!productData.description ||
			!productData.manufacturer
		) {
			return { success: false, error: "Missing required fields" };
		}

		if (productData.price <= 0) {
			return { success: false, error: "Price must be greater than 0" };
		}

		if (productData.stockCount < 0) {
			return { success: false, error: "Stock count cannot be negative" };
		}

		if (
			productData.isOnSale &&
			(!productData.discountedPrice || productData.discountedPrice <= 0)
		) {
			return {
				success: false,
				error: "Discounted price is required when product is on sale",
			};
		}

		if (
			productData.isOnSale &&
			productData.discountedPrice &&
			productData.discountedPrice >= productData.price
		) {
			return {
				success: false,
				error: "Discounted price must be less than regular price",
			};
		}

		// Check if slug already exists
		const existingProduct = await db
			.select({ id: productTable.id })
			.from(productTable)
			.where(eq(productTable.slug, productData.slug))
			.limit(1);

		if (existingProduct.length > 0) {
			// Generate a unique slug by appending a number
			let counter = 1;
			const baseSlug = productData.slug;
			let newSlug = `${baseSlug}-${counter}`;

			while (true) {
				const slugExists = await db
					.select({ id: productTable.id })
					.from(productTable)
					.where(eq(productTable.slug, newSlug))
					.limit(1);

				if (slugExists.length === 0) {
					productData.slug = newSlug;
					break;
				}

				counter++;
				newSlug = `${baseSlug}-${counter}`;
			}
		}

		// Insert the product
		const result = await db
			.insert(productTable)
			.values({
				name: productData.name,
				description: productData.description,
				price: productData.price,
				volumeOrQuantity: productData.volumeOrQuantity,
				stockCount: productData.stockCount,
				isOnSale: productData.isOnSale,
				discountedPrice: productData.discountedPrice,
				categoryId: productData.categoryId,
				manufacturer: productData.manufacturer,
				image: productData.image,
				slug: productData.slug,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.returning({ id: productTable.id });

		// Revalidate relevant paths
		revalidatePath("/admin");
		revalidatePath("/products");

		return {
			success: true,
			productId: result[0].id,
			message: "Product added successfully",
		};
	} catch (error) {
		console.error("Error adding product:", error);

		// Handle specific database errors
		if (error instanceof Error) {
			if (error.message.includes("unique constraint")) {
				return {
					success: false,
					error: "A product with this name or slug already exists",
				};
			}
			if (error.message.includes("foreign key constraint")) {
				return { success: false, error: "Invalid category selected" };
			}
		}

		return {
			success: false,
			error: "Failed to add product. Please try again.",
		};
	}
}

export async function updateProduct(
	productId: number,
	productData: Partial<ProductData>
) {
	try {
		// Check if product exists
		const existingProduct = await db
			.select({ id: productTable.id })
			.from(productTable)
			.where(eq(productTable.id, productId))
			.limit(1);

		if (existingProduct.length === 0) {
			return { success: false, error: "Product not found" };
		}

		// Validate data if provided
		if (productData.price !== undefined && productData.price <= 0) {
			return { success: false, error: "Price must be greater than 0" };
		}

		if (
			productData.stockCount !== undefined &&
			productData.stockCount < 0
		) {
			return { success: false, error: "Stock count cannot be negative" };
		}

		if (
			productData.isOnSale &&
			productData.discountedPrice &&
			productData.discountedPrice >= (productData.price || 0)
		) {
			return {
				success: false,
				error: "Discounted price must be less than regular price",
			};
		}

		// Update the product
		await db
			.update(productTable)
			.set({
				...productData,
				updatedAt: new Date(),
			})
			.where(eq(productTable.id, productId));

		// Revalidate relevant paths
		revalidatePath("/admin");
		revalidatePath("/products");

		return {
			success: true,
			message: "Product updated successfully",
		};
	} catch (error) {
		console.error("Error updating product:", error);
		return {
			success: false,
			error: "Failed to update product. Please try again.",
		};
	}
}

export async function deleteProduct(productId: number) {
	try {
		// Check if product exists
		const existingProduct = await db
			.select({ id: productTable.id })
			.from(productTable)
			.where(eq(productTable.id, productId))
			.limit(1);

		if (existingProduct.length === 0) {
			return { success: false, error: "Product not found" };
		}

		// Delete the product
		await db.delete(productTable).where(eq(productTable.id, productId));

		// Revalidate relevant paths
		revalidatePath("/admin");
		revalidatePath("/products");

		return {
			success: true,
			message: "Product deleted successfully",
		};
	} catch (error) {
		console.error("Error deleting product:", error);
		return {
			success: false,
			error: "Failed to delete product. Please try again.",
		};
	}
}

export async function getProductById(productId: number) {
	try {
		const product = await db
			.select()
			.from(productTable)
			.where(eq(productTable.id, productId))
			.limit(1);

		if (product.length === 0) {
			return { success: false, error: "Product not found" };
		}

		return {
			success: true,
			product: product[0],
		};
	} catch (error) {
		console.error("Error fetching product:", error);
		return {
			success: false,
			error: "Failed to fetch product. Please try again.",
		};
	}
}
