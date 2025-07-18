import ProductModal from "@/components/products/ProductModal";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
	const product = await db
		.select()
		.from(productTable)
		.where(eq(productTable.id, 4));

	return (
		<div>
			<div className="flex justify-center items-center w-full h-screen">
				<ProductModal product={product[0]} />
			</div>
		</div>
	);
}
