import { db } from "@/db";
import { productTable } from "@/db/schema";
import { ilike } from "drizzle-orm";
import { Sansita } from "next/font/google";
import ProductCard from "@/components/products/ProductCard";
const sansita = Sansita({
	weight: ["400", "700"],
	variable: "--font-sansita",
	subsets: ["latin"],
	preload: true,
});

type Props = {
	searchParams: {
		q?: string;
	};
};

export default async function SearchPage({ searchParams }: Props) {
	const query = searchParams.q?.trim();
	if (!query) {
		return <p className="p-6">No search query provided.</p>;
	}

	const products = await db
		.select()
		.from(productTable)
		.where(ilike(productTable.name, `%${query}%`));

	return (
		<main
			className={`${sansita.className} w-full flex flex-col gap-3.5 min-h-screen p-6 bg-white`}
		>
			<h1 className="text-xl mb-4">
				Search Results for:{" "}
				<span className="font-semibold">{query}</span>
			</h1>
			{products.length === 0 ? (
				<p>No products found.</p>
			) : (
				//<ul className="grid grid-cols-2 gap-4">
				<ul className="flex  gap-4 ">
					{products.map((product) => (
						<li key={product.id}>
							<ProductCard product={product} />
						</li>
					))}
				</ul>
			)}
		</main>
	);
}
