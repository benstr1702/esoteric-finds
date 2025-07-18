import { getCurrentSession } from "@/lib/server/sessions";
import { globalGETRateLimit } from "@/lib/server/requests";
import Hero from "@/components/Hero";
import ProductsContainer from "@/components/products/ProductsContainer";
import { batchProductsByCategory } from "@/lib/server/get-products-on-sale";
export default async function Home() {
	if (!globalGETRateLimit()) return "Too many requests";
	const { user } = await getCurrentSession();

	//console.log("user:", user);
	if (user === null) {
		console.log("no user authenticated");
	} else console.log("user authenticated", user.username, user);

	const groupedProducts = await batchProductsByCategory();

	return (
		<div className="w-full h-full flex flex-col gap-5">
			<Hero grouped={groupedProducts} />
			<ProductsContainer />
		</div>
	);
}
