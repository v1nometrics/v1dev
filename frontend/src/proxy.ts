import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  // URL is the source of truth. Do not redirect /blog/... to /en/...
  // based on Accept-Language or NEXT_LOCALE cookie.
  localeDetection: false,
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - Static files (images, fonts, etc.)
    // - Next.js internals
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
