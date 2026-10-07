"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  hasPixelId,
  onPixelReady,
  readConsentCookie,
} from "../lib/client-tracking";
import { useConsent } from "./consent";

export function ThankYouTracker() {
  const { consent } = useConsent();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasPixelId() || consent !== "granted" || typeof window === "undefined")
      return;
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("eid");
    if (!eventId) return;

    let fired = false;
    const fire = () => {
      if (fired || readConsentCookie() !== "granted") return;
      try {
        if (window.sessionStorage.getItem("kh_eid") !== eventId) return;
        if (window.sessionStorage.getItem("kh_eid_sent") === eventId) return;
        if (!window.fbq || !window.__khPixelReady) return;
        window.sessionStorage.setItem("kh_eid_sent", eventId);
        fired = true;
        window.fbq("track", "SubmitApplication", {}, { eventID: eventId });
      } catch {
        // Session storage is required for matching and deduplicating this event.
      }
    };

    const unsubscribe = onPixelReady(fire);
    window.addEventListener("pageshow", fire);
    return () => {
      unsubscribe();
      window.removeEventListener("pageshow", fire);
    };
  }, [consent, pathname]);

  return null;
}
