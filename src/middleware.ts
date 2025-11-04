import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/studio(.*)"]);
const isPublicRoute = createRouteMatcher([
  "/api/videos/webhook",
  "/api/users/webhook",
  "/api/uploadthing",
]);

export default clerkMiddleware(async (auth, request) => {
  // Skip authentication for webhook routes
  if (isPublicRoute(request)) return;

  if (isProtectedRoute(request)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
