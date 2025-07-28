import { Google } from "arctic";

const DEV_BASE_URL = "http://localhost:3000";
const PROD_BASE_URL = "https://esoteric-finds.vercel.app/";

const DEV_REDIRECT_URL = "http://localhost:3000/login/google/callback";
const PROD_REDIRECT_URL =
	"https://esoteric-finds.vercel.app/login/google/callback";

const CURRENT_BASE_URL =
	process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;

const CURRENT_REDIRECT_URL =
	process.env.NODE_ENV === "development"
		? DEV_REDIRECT_URL
		: PROD_REDIRECT_URL;

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID ?? "",
	process.env.GOOGLE_CLIENT_SECRET ?? "",
	CURRENT_REDIRECT_URL
	//"http://localhost:3000/login/google/callback"
);
