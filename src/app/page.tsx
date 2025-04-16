import { getCurrentSession } from "@/lib/server/sessions";
import { globalGETRateLimit } from "@/lib/server/requests";
import Hero from "@/components/Hero";
export default async function Home() {
	if (!globalGETRateLimit()) return "Too many requests";
	const { user } = await getCurrentSession();
	if (user === null) {
		console.log("no user authenticated");
	} else console.log("user authenticated", user.name);

	return (
		<div className="w-full h-full">
			<Hero />
		</div>
	);
}
