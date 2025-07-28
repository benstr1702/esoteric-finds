import { getProductById } from "@/lib/server/add-product";
type ProductPageProps = {
	params: Promise<{
		id: string;
	}>;
};
export default async function Page({ params }: ProductPageProps) {
	const { id } = await params;
	const productId = Number(id);
	const productInfo = await getProductById(productId);
	if (!productInfo.product) return <div>{productInfo.error}</div>;
	return (
		<div className="w-full h-screen">
			<h1>Product ID:</h1>
			<div>
				{Object.entries(productInfo.product).map(([key, value]) => (
					<p key={key}>
						{" "}
						{key}: {String(value)}
					</p>
				))}
			</div>
		</div>
	);
}
