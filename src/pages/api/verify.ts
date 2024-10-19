import type { NextApiRequest, NextApiResponse } from "next";
import { cors, runMiddleware } from "./cors";

export default async function verifyCookie(req: NextApiRequest, res: NextApiResponse) {
	await runMiddleware(req, res, cors);

	// Run the middleware
	const body = req.body;

	const { auth } = req.cookies;

	if (auth) {
		return res.status(200).json({ message: "Cookie is already set" });
	}

	// req.cookies.set("auth", body.token, {
	// 	httpOnly: true,
	// 	path: "/",
	// 	secure: true,
	// 	maxAge: 60 * 60 * 6,
	// 	sameSite: "none",
	// });

	return auth;
}
