import type { Metadata } from "next";
import ProductCard from "@/components/products/ProductCard";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/db";
import { productCategoryTable, productTable } from "@/db/schema";
import { Sansita } from "next/font/google";
//import ProductModal from "@/components/products/ProductModal";

const sansita = Sansita({
	weight: ["400", "700"],
	variable: "--font-sansita",
});

type Props = {
	params: Promise<{ slug: string }>; // Update type to reflect async params
};

const imageDimensionsByCategory: Record<
	string,
	{ width: number; height: number }
> = {
	books: { width: 129, height: 196 },
	"fruits-vegetables": { width: 160, height: 160 },
	"dairy-eggs": { width: 150, height: 150 },
	"meat-chicken-fish": { width: 180, height: 140 },
	"bread-pastry": { width: 160, height: 130 },
	beverages: { width: 120, height: 200 },
	"frozen-foods": { width: 160, height: 160 },
	"snacks-cereal": { width: 150, height: 150 },
};

const defaultImageDimensions = { width: 150, height: 150 };

async function getCategoryBySlug(slug: string) {
	const category = await db
		.select()
		.from(productCategoryTable)
		.where(eq(productCategoryTable.slug, slug))
		.limit(1);
	console.log(category[0]);
	return category[0] || null;
}

async function getProductsByCategoryId(categoryId: number) {
	return await db
		.select()
		.from(productTable)
		.where(eq(productTable.categoryId, categoryId));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const category = await getCategoryBySlug(slug);
	return {
		title: category?.name
			? `${category.name} | Esoteric Finds`
			: "Esoteric Finds",
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
	const category = await getCategoryBySlug(slug);

	if (!category) return <div>No Category Found</div>;
	const products = await getProductsByCategoryId(category.id);
	console.log(products);

	if (!category) return <div>Category Not Found</div>;

	const imageDimensions =
		imageDimensionsByCategory[slug] || defaultImageDimensions;

	return (
		<main
			className={`${sansita.className} w-full flex flex-col gap-3.5 min-h-screen p-6 bg-white`}
		>
			<h2 className="font-sans font-semibold">
				<Link href="/">
					<span className="underline">Category/</span>
				</Link>
				{category.name}
			</h2>
			<h1 className="text-4xl text-blue-950">{category.name}</h1>
			<br />
			<h3 className="font-stretch-75% text-blue-900">
				Recommended Products for you in this category
			</h3>

			{/* Grid Container - 4 products per row */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
				{products.length === 0 ? (
					<div className="col-span-full">
						<p>No products found in this category.</p>
					</div>
				) : (
					products.map((product) => (
						<div key={product.id} className="flex justify-center">
							<ProductCard
								product={{
									...product,
									price:
										product.isOnSale &&
										product.discountedPrice
											? product.discountedPrice / 100
											: product.price / 100,
								}}
								imageWidth={imageDimensions.width}
								imageHeight={imageDimensions.height}
							/>
						</div>
					))
				)}
			</div>
		</main>
	);
}
