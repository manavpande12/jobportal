import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidRole, ROLE_DASHBOARD, RoleType } from "./common/types/role.types";
import { ROUTES } from "./common/config/routes";
import { decodeToken } from "./common/lib/jwt";


export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const origin = process.env.NEXT_PUBLIC_API_URL;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const url = request.nextUrl.clone();
    const isPublicRoute = ROUTES.public.some(route =>
        pathname === route || pathname.startsWith(route + "/")
    );
    const isGuestRoute = ROUTES.guest.includes(pathname);
    const isProtectedRoute = ROUTES.protected.some(route =>
        pathname.startsWith(route)
    );
    let refreshed = false;

    // Try refresh if access token missing
    try {
        if (!accessToken && refreshToken) {
            const refreshResponse = await fetch(
                `${origin}/auth/refresh`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        cookie:
                            request.headers.get("cookie") || "",
                    },
                }
            );
            if (refreshResponse.ok) {
                refreshed = true;

                console.log("REFRESH SUCCESS");
                const res = NextResponse.next();
                const setCookie = refreshResponse.headers.get("set-cookie");
                if (setCookie) {
                    res.headers.set("set-cookie", setCookie);
                }
                return res;
            }
        }
    }
    catch {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // No auth after refresh attempt
    if (!accessToken && !refreshed) {
        if (isPublicRoute || isGuestRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // Skip decode immediately after refresh
    if (refreshed) {
        return NextResponse.next();
    }



    try {
        // INVALID ROLE OR JWT DECODE NULL -> REJECT
        const decoded = decodeToken(accessToken!);
        if (!decoded || !isValidRole(decoded.role)) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        const role = decoded.role as RoleType;
        const expectedRoute = ROLE_DASHBOARD[role];

        // AGAIN NO ACCESS LOGIN AND REGISTER
        if (isGuestRoute) {
            url.pathname = expectedRoute;
            return NextResponse.redirect(url);
        }

        if (isPublicRoute) {
            return NextResponse.next();
        }

        // ROOT -> DASHBIOARD
        if (pathname === "/") {
            url.pathname = expectedRoute;
            return NextResponse.redirect(url);
        }

        // ROLE PROTECTION
        if (!expectedRoute) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
        if (isProtectedRoute) {
            if (!pathname.startsWith(expectedRoute)) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        }

        return NextResponse.next();

    } catch (err) {
        // INVALID TOKEN → CLEAR + REDIRECT
        const res = NextResponse.redirect(new URL("/login", request.url));
        res.cookies.delete("accessToken");
        return res;
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/contact",
        "/pricing",
        "/jobs",
        "/jobs/:path*",
        "/job-seeker/:path*",
        "/recruiter/:path*",
        "/admin/:path*",
    ],
};