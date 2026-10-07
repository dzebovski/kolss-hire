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

type BannerView = "closed" | "summary" | "settings";

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
  const [view, setView] = useState<BannerView>("summary");
  const bannerOpen = view !== "closed";
  const [pixelReady, setPixelReady] = useState(false);
  const lastPageView = useRef<string | null>(null);
  const settingsOpener = useRef<HTMLElement | null>(null);
  const closeSettings = useCallback(() => {
    setView("closed");
    requestAnimationFrame(() => {
      if (settingsOpener.current?.isConnected) settingsOpener.current.focus();
      settingsOpener.current = null;
    });
  }, []);

  useEffect(() => {
    // Cookie state is client-only so the page shell can remain statically rendered.
    const saved = readConsentCookie();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(saved);
      setView("closed");
      if (saved === "denied") revokePixelConsent();
    }
    captureFbclid();
  }, []);

  useEffect(() => {
    captureFbclid();
  }, [pathname]);

  useEffect(() => {
    if (view === "closed" || consent === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSettings();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, consent, closeSettings]);

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

  const chooseConsent = useCallback(
    (value: Exclude<ConsentValue, null>) => {
      saveConsentCookie(value);
      setConsent(value);
      closeSettings();
      if (value === "denied") {
        revokePixelConsent();
        return;
      }
      // Ad click IDs are stored only after marketing consent.
      captureFbclid();
      if (window.fbq) {
        window.fbq("consent", "grant");
        setPixelReady(true);
        notifyPixelReady();
      }
    },
    [closeSettings],
  );

  const openSettings = useCallback(() => {
    settingsOpener.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setView("settings");
  }, []);
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
        <CookieBanner
          key={view}
          lang={lang}
          text={text}
          view={view}
          consent={consent}
          onChoose={chooseConsent}
          onCustomize={() => setView("settings")}
          onClose={closeSettings}
        />
      )}
    </ConsentContext.Provider>
  );
}

export function CookieSettingsButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { openSettings } = useConsent();
  return (
    <button type="button" className={className} onClick={openSettings}>
      {children}
    </button>
  );
}

function CookieBanner({
  lang,
  text,
  view,
  consent,
  onChoose,
  onCustomize,
  onClose,
}: {
  lang: string;
  text: Dictionary["cookies"];
  view: BannerView;
  consent: ConsentValue;
  onChoose(value: Exclude<ConsentValue, null>): void;
  onCustomize(): void;
  onClose(): void;
}) {
  const [marketing, setMarketing] = useState(consent === "granted");
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (view === "settings") heading.current?.focus();
  }, [view]);

  if (view === "settings") {
    return (
      <aside
        className="cookie-banner cookie-banner--settings"
        aria-labelledby="kh-cookie-settings-title"
      >
        <div className="cookie-settings">
          <div className="cookie-settings-head">
            <h2
              id="kh-cookie-settings-title"
              className="k-serif"
              ref={heading}
              tabIndex={-1}
            >
              {text.settings}
            </h2>
            {consent !== null && (
              <button type="button" className="cookie-close" onClick={onClose}>
                {text.close}
              </button>
            )}
          </div>
          <p className="cookie-muted">{text.settingsLead}</p>
          <ul className="cookie-categories">
            <li>
              <div>
                <h3>{text.necessaryTitle}</h3>
                <p className="cookie-muted">{text.necessaryText}</p>
              </div>
              <span className="cookie-always">{text.alwaysOn}</span>
            </li>
            <li>
              <div>
                <h3 id="kh-cookie-marketing">{text.marketingTitle}</h3>
                <p className="cookie-muted" id="kh-cookie-marketing-text">
                  {text.marketingText}
                </p>
              </div>
              <input
                type="checkbox"
                role="switch"
                className="cookie-switch"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                aria-labelledby="kh-cookie-marketing"
                aria-describedby="kh-cookie-marketing-text"
              />
            </li>
          </ul>
          <div className="cookie-actions">
            <button
              type="button"
              onClick={() => onChoose(marketing ? "granted" : "denied")}
            >
              {text.save}
            </button>
            <button type="button" onClick={() => onChoose("granted")}>
              {text.acceptAll}
            </button>
          </div>
          <a href={`/${lang}/privacy#cookies`}>{text.privacy}</a>
        </div>
      </aside>
    );
  }

  return (
    <aside className="cookie-banner" aria-label={text.settings}>
      <div className="cookie-content">
        <p>{text.text}</p>
        <div className="cookie-actions">
          <button type="button" onClick={() => onChoose("granted")}>
            {text.accept}
          </button>
          <button type="button" onClick={() => onChoose("denied")}>
            {text.reject}
          </button>
          <button
            type="button"
            className="cookie-customize"
            onClick={onCustomize}
          >
            {text.customize}
          </button>
        </div>
        <a href={`/${lang}/privacy#cookies`}>{text.privacy}</a>
      </div>
    </aside>
  );
}
