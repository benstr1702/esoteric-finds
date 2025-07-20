"use client";
import AddToCartButton from "../ui/AddToCartButton";
import type { Product } from "@/db/schema";

export default function ClientAddToCartButton({
	product,
}: {
	product: Product;
}) {
	return <AddToCartButton product={product} />;
}
