import { NextRequest, NextResponse } from "next/server";
import { hasLocale, preferredLocale } from "./lib/i18n/locales";
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];
  if (hasLocale(segment) || /^[a-z]{2}$/i.test(segment))
    return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language");
  return response;
}
export const config = {
  matcher: [
    "/((?!api(?:/|$)|_next(?:/|$)|brand(?:/|$)|.*\\..*|.*opengraph-image).*)",
  ],
};
