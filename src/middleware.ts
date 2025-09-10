import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",                 // home
    "/login(.*)",
    "/register(.*)",
    "/favicon.ico",
    "/post/:id",
    "/tag/:tag_slug",
    "/api/posts(.*)",
    "/api/tags(.*)",
    "/(.*\\..*)",        // static files
    "/_next/(.*)",       // next internals
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)", // all pages
        "/",                           // root
        "/(api)(.*)",                  // and all API routes
    ],
};
