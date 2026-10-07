"use client";
import { useEffect, useState } from "react";
import { useConsent } from "./consent";
export function focusForm() {
  document
    .getElementById("form")
    ?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  document.getElementById("f-name")?.focus({ preventScroll: true });
}
export function ApplicationCta({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <a
      href="#form"
      id={id}
      className="k-btn"
      onClick={(e) => {
        e.preventDefault();
        focusForm();
      }}
    >
      {children}
    </a>
  );
}
export function StickyCta({ text }: { text: string }) {
  const { bannerOpen } = useConsent();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const form = document.getElementById("form");
    if (!hero || !form) return;
    let heroVisible = true,
      formVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === form) formVisible = entry.isIntersecting;
      }
      setVisible(!heroVisible && !formVisible);
    });
    observer.observe(hero);
    observer.observe(form);
    return () => observer.disconnect();
  }, []);
  if (!visible || bannerOpen) return null;
  return (
    <div className="sticky-cta">
      <ApplicationCta>{text}</ApplicationCta>
    </div>
  );
}
