import { NextRequest, NextResponse } from "next/server";

import {
	PUBLIC_ROUTES,
	ADMIN_ROUTE,
	LOGIN,
	SIGNIN,
	ROOT,
	PROTECTED_SUB_ROUTES,
} from "@/lib/routes";
import { fetcher } from "@/helpers/axios";

export async function middleware(request: NextRequest) {
	const { nextUrl } = request;
	const authCookie = request.cookies.get("auth");

	if (!authCookie) {
		console.log("Auth cookie is missing", authCookie);
	} else {
		console.log("Auth cookie found:", authCookie);
	}

	const res = await fetcher.get("/auth/current", {
		headers: {
			Cookie: `${authCookie?.name}=${authCookie?.value};`,
		},
	});

	const isAuthenticated = !!res?.data.data;
	const isAdmin = res?.data?.data?.role === "admin";

	const isPublicRoute =
		(PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
			nextUrl.pathname === ROOT) &&
		!PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

	const isAdminRoute = ADMIN_ROUTE.find((route) => nextUrl.pathname.startsWith(route));

	if (!isAuthenticated && !isPublicRoute) return NextResponse.redirect(new URL(LOGIN, nextUrl));
	if (isAuthenticated && (nextUrl.pathname === LOGIN || nextUrl.pathname === SIGNIN))
		return NextResponse.redirect(new URL(ROOT, request.nextUrl));

	if (isAuthenticated && !isAdmin && isAdminRoute) {
		return NextResponse.redirect(new URL(ROOT, request.nextUrl));
	}
}

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
