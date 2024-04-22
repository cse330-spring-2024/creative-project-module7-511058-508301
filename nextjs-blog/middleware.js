import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;   // Get the path of the request

    // Allow request if following conditions are met
    // 1) Its a request for a next-auth session & provider fetching
    // 2) token exists
    if(pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

      // Check if the request is a navigation request
      const isNavigationRequest = req.headers.get('Accept').includes('text/html');

    // Redirect to login page if token doesn't exist and request is a navigation request
    if(!token && pathname !== '/' && isNavigationRequest) {
        return NextResponse.redirect("http://localhost:3000/");
    }

    // For non-mavigation requests, continue
    return NextResponse.next();
}