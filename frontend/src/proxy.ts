import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
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
