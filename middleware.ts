import { NextRequest, NextResponse } from "next/server";
import { i18nConfig, isValidLocale, type Locale } from "@/lib/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): Locale {
  // 1. Check cookie first (user's explicit preference)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get("Accept-Language");
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "ar-SA,ar;q=0.9,en;q=0.8")
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [code, qValue] = lang.trim().split(";q=");
        return {
          code: code.split("-")[0].toLowerCase(), // Get primary language code
          quality: qValue ? parseFloat(qValue) : 1,
        };
      })
      .sort((a, b) => b.quality - a.quality);

    // Find first matching locale
    for (const lang of languages) {
      if (isValidLocale(lang.code)) {
        return lang.code;
      }
    }
  }

  // 3. Fallback to default locale
  return i18nConfig.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") || // Files with extensions (images, etc.)
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname and set cookie if not already set
    const locale = pathname.split("/")[1] as Locale;
    const response = NextResponse.next();

    // Update cookie with current locale (keeps user preference synced)
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });

    return response;
  }

  // Pathname doesn't have locale - redirect to localized version
  const preferredLocale = getPreferredLocale(request);

  // Build the redirect URL
  const newUrl = new URL(request.url);
  newUrl.pathname = `/${preferredLocale}${pathname === "/" ? "" : pathname}`;

  // Create redirect response
  const response = NextResponse.redirect(newUrl);

  // Set locale cookie
  response.cookies.set(LOCALE_COOKIE, preferredLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });

  return response;
}

export const config = {
  // Match all paths except static files and API
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
