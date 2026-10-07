"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import type { Dictionary } from "../lib/i18n/types";
import {
  captureFbclid,
  getPixelId,
  notifyPixelReady,
  readConsentCookie,
  revokePixelConsent,
  saveConsentCookie,
  type ConsentValue,
} from "../lib/client-tracking";

type ConsentContextValue = {
  consent: ConsentValue;
  bannerOpen: boolean;
  openSettings(): void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent(): ConsentContextValue {
  const value = useContext(ConsentContext);
  if (!value) throw new Error("useConsent must be used within ConsentProvider");
  return value;
}

export function ConsentProvider({
  children,
  lang,
  text,
}: {
  children: ReactNode;
  lang: string;
  text: Dictionary["cookies"];
}) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [pixelReady, setPixelReady] = useState(false);
  const lastPageView = useRef<string | null>(null);

  useEffect(() => {
    // Cookie state is client-only so the page shell can remain statically rendered.
    const saved = readConsentCookie();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(saved);
      setBannerOpen(false);
      if (saved === "denied") revokePixelConsent();
    }
    captureFbclid();
  }, []);

  useEffect(() => {
    captureFbclid();
  }, [pathname]);

  useEffect(() => {
    if (consent === "denied") {
      lastPageView.current = null;
    }
  }, [consent]);

  useEffect(() => {
    if (
      consent !== "granted" ||
      !pixelReady ||
      !pathname ||
      lastPageView.current === pathname
    )
      return;
    lastPageView.current = pathname;
    window.fbq?.("track", "PageView");
  }, [consent, pathname, pixelReady]);

  const chooseConsent = useCallback((value: Exclude<ConsentValue, null>) => {
    saveConsentCookie(value);
    setConsent(value);
    setBannerOpen(false);
    if (value === "denied") {
      revokePixelConsent();
    } else if (window.fbq) {
      window.fbq("consent", "grant");
      setPixelReady(true);
      notifyPixelReady();
    }
  }, []);

  const openSettings = useCallback(() => setBannerOpen(true), []);
  const pixelId = getPixelId();

  return (
    <ConsentContext.Provider value={{ consent, bannerOpen, openSettings }}>
      {children}
      {consent === "granted" && pixelId && (
        <>
          <Script
            id="kh-meta-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('consent','grant');fbq('init',${JSON.stringify(pixelId).replace(/</g, "\\u003c")});`,
            }}
          />
          <Script
            id="kh-meta-pixel"
            src="https://connect.facebook.net/en_US/fbevents.js"
            strategy="afterInteractive"
            onReady={() => {
              if (readConsentCookie() !== "granted") return;
              window.fbq?.("consent", "grant");
              setPixelReady(true);
              notifyPixelReady();
            }}
          />
        </>
      )}
      {bannerOpen && (
        <aside className="cookie-banner" aria-label={text.settings}>
          <div className="cookie-content">
            <p>{text.text}</p>
            <div className="cookie-actions">
              <button type="button" onClick={() => chooseConsent("granted")}>
                {text.accept}
              </button>
              <button type="button" onClick={() => chooseConsent("denied")}>
                {text.reject}
              </button>
            </div>
            <a href={`/${lang}/privacy`}>{text.privacy}</a>
          </div>
        </aside>
      )}
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton({ children }: { children: ReactNode }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings}>
      {children}
    </button>
  );
}
