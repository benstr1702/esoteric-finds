import { getCurrentSession } from "@/lib/server/sessions";
import { globalGETRateLimit } from "@/lib/server/requests";
import Hero from "@/components/Hero";
import ProductsContainer from "@/components/products/ProductsContainer";
export default async function Home() {
	if (!globalGETRateLimit()) return "Too many requests";
	const { user } = await getCurrentSession();
	console.log(user);

	if (user === null) {
		console.log("no user authenticated");
	} else console.log("user authenticated", user.username, user);

	return (
		<div className="w-full h-full flex flex-col gap-5">
			<Hero />
			<ProductsContainer />
		</div>
	);
}
