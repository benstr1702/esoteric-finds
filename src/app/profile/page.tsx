import { getCurrentSession } from "@/lib/server/sessions";
import { globalGETRateLimit } from "@/lib/server/requests";

export default async function Page() {
	if (!globalGETRateLimit()) return "Too many requests";
	const { user } = await getCurrentSession();

	//console.log("user:", user);
	if (user === null) {
		console.log("no user authenticated");
		// redirect to login page
	} else console.log("user authenticated", user.username, user);

	return <div className="h-screen w-full">hellow world</div>;
}
