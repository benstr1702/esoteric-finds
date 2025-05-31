import type { Metadata } from "next";
import ProductCard from "@/components/products/ProductCard";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { productCategoryTable } from "@/db/schema";
import { Sansita } from "next/font/google";

const sansita = Sansita({
	weight: ["400", "700"],
	variable: "--font-sansita",
});

type Props = {
	params: Promise<{ slug: string }>; // Update type to reflect async params
};

async function getCategoryBySlug(slug: string) {
	const category = await db
		.select()
		.from(productCategoryTable)
		.where(eq(productCategoryTable.slug, slug))
		.limit(1);

	return category[0] || null;
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
	// TODO: Fetch all the products for this category
	if (!category) return <div>Category Not Found</div>;
	return (
		<main
			className={`${sansita.className} w-full flex flex-col gap-3.5 min-h-screen p-6 bg-white`}
		>
			<h2 className="font-sans font-semibold ">
				Category / {category.name}
			</h2>
			<h1 className="text-4xl text-blue-950">{category.name}</h1>
			<br />
			<h3 className="font-stretch-75% text-blue-900">
				Recommended Products for you in this category
			</h3>
			<div className="bg-white flex flex-row flex-wrap gap-3 ">
				{Array.from({ length: 5 }).map((_, i) => (
					<ProductCard
						key={i}
						productImage="/milk-eggs.png"
						productName={`Eggs ${i + 1}`}
						productPrice={10.34}
						productQuantity={12}
						perKilo={null}
					/>
				))}
			</div>
		</main>
	);
}
