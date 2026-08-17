import { NextResponse, NextRequest } from "next/server";
export function middleware(request: NextRequest) { 
    console.log("Middleware executed for: ", request.nextUrl.pathname);
    return NextResponse.next();
}

export const config = {
    matcher: ["/appointments/:path*"],
}