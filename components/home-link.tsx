"use client";
import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/locales";
import { localizedHref } from "@/lib/i18n/routes";

export function HomeLink({
  lang,
  label,
  children,
}: {
  lang: Locale;
  label: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const query = useSearchParams().toString();
  return (
    <a
      className="logo-link"
      href={localizedHref(lang, "", query)}
      aria-label={label}
      onClick={(event) => {
        if (
          pathname !== `/${lang}` ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      }}
    >
      {children}
    </a>
  );
}
