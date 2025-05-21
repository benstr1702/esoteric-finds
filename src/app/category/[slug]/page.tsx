import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { productCategoryTable } from "@/db/schema";

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
		<div>
			<h1>Welcome to {category.name}</h1>
		</div>
	);
}
