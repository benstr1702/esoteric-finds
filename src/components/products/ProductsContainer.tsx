import ProductCategoryCard from "./ProductCategoryCard";
import { db } from "@/db";
import { productCategoryTable } from "@/db/schema";
export default async function ProductsContainer() {
	const productCategories = await db.select().from(productCategoryTable);

	//console.log(productCategories);

	if (!productCategories || productCategories.length === 0) {
		return <div>No product categories found</div>;
	}
	return (
		<div className="flex flex-row flex-wrap gap-9 justify-evenly w-full h-auto ">
			{productCategories.map((product, index) => (
				<ProductCategoryCard
					key={index + product.id}
					productCategoryImage={product.image || "/icon.png"}
					productCategoryName={product.name || "Product"}
					productSlug={product.slug}
				/>
			))}
		</div>
	);
}
