"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { validateApplicationFields, MAX_CV_BYTES } from "@/lib/apply/schema";
import { cvKindFromName } from "@/lib/apply/file";
import {
  startApplication,
  trackingCookies,
  captureFbclid,
} from "@/lib/client-tracking";
import { useConsent } from "./consent";
type Errors = Record<string, string>;
const utmKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;
export function ApplicationForm({
  lang,
  text,
}: {
  lang: Locale;
  text: Dictionary["form"];
}) {
  const form = useRef<HTMLFormElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const renderedAt = useRef(0);
  const router = useRouter();
  const { consent } = useConsent();
  const [file, setFile] = useState<File>();
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    renderedAt.current = Date.now();
    captureFbclid();
  }, []);
  function dataForForm() {
    const data = new FormData(form.current!);
    data.set("vacancy", "sales-consultant-legionowo");
    data.set("lang", lang);
    data.set("renderedAt", String(renderedAt.current));
    data.set("consent", consent === "granted" ? "granted" : "denied");
    const params = new URLSearchParams(window.location.search);
    for (const key of utmKeys) data.set(key, params.get(key) || "");
    if (!params.get("fbclid")) {
      try {
        data.set("fbclid", sessionStorage.getItem("kh_fbclid") || "");
      } catch {}
    }
    const tracking = trackingCookies();
    data.set("fbp", tracking.fbp || "");
    data.set("fbc", tracking.fbc || "");
    if (file) data.set("cvFile", file);
    else data.delete("cvFile");
    return data;
  }
  function validation(data: FormData) {
    const result = validateApplicationFields({
      ...Object.fromEntries(data),
      cvFile: file,
    });
    const next: Errors = {};
    if (!result.success)
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!(key in next))
          next[key] = issue.message === "cvMissing" ? "cvMissing" : key;
      }
    if (file && file.size > MAX_CV_BYTES) next.cvFile = "fileSize";
    else if (file && !cvKindFromName(file.name)) next.cvFile = "fileType";
    return next;
  }
  function validateBlur(field: string) {
    if (!form.current) return;
    const next = validation(dataForForm());
    setErrors((old) =>
      submitted ? next : { ...old, [field]: next[field] || "" },
    );
  }
  function message(key: string) {
    return text.errors[key as keyof typeof text.errors] || text.errors.server;
  }
  function error(field: string) {
    return errors[field] ? (
      <p id={`f-${field}-error`} className="field-error">
        <span className="error-mark" aria-hidden="true">
          !
        </span>
        {message(errors[field])}
      </p>
    ) : null;
  }
  const described = (field: string) =>
    errors[field] ? `f-${field}-error` : undefined;
  function focusSummary() {
    requestAnimationFrame(() => summary.current?.focus());
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSubmitted(true);
    setServerError("");
    const data = dataForForm();
    const next = validation(data);
    setErrors(next);
    if (Object.keys(next).length) {
      focusSummary();
      return;
    }
    if (!form.current?.checkValidity()) {
      form.current?.reportValidity();
      return;
    }
    setSending(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: data,
        signal: controller.signal,
      });
      if (response.status === 422) {
        const body = await response.json();
        setErrors(body.errors || {});
        focusSummary();
        return;
      }
      if (!response.ok) {
        setServerError(
          response.status === 403 || response.status === 429
            ? "rateLimit"
            : response.status === 413
              ? "fileSize"
              : "server",
        );
        focusSummary();
        return;
      }
      const body = await response.json();
      if (!body.ok) throw new Error("application_failed");
      const eventId = typeof body.eventId === "string" ? body.eventId : "";
      try {
        sessionStorage.setItem("kh_eid", eventId);
      } catch {}
      router.push(
        `/${lang}/thank-you${eventId ? `?eid=${encodeURIComponent(eventId)}` : ""}`,
      );
    } catch {
      setServerError("server");
      focusSummary();
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  }
  const labels: Record<string, string> = {
    name: text.name,
    phone: text.phone,
    email: text.email,
    cvFile: "CV",
    cvUrl: text.cvUrl,
    comment: text.comment,
  };
  return (
    <form
      ref={form}
      className="apply-form"
      noValidate
      onSubmit={submit}
      onFocusCapture={startApplication}
      aria-busy={sending}
    >
      <fieldset disabled={sending} className="form-fields">
        {(["name", "phone", "email"] as const).map((field) => (
          <div className="field" key={field}>
            <label htmlFor={`f-${field}`}>{text[field]}</label>
            <input
              id={`f-${field}`}
              name={field}
              type={
                field === "phone" ? "tel" : field === "email" ? "email" : "text"
              }
              autoComplete={field === "phone" ? "tel" : field}
              placeholder={field === "phone" ? "+48 …" : undefined}
              required
              minLength={field === "name" ? 2 : undefined}
              maxLength={field === "name" ? 100 : field === "phone" ? 20 : 254}
              aria-invalid={Boolean(errors[field])}
              aria-describedby={described(field)}
              onBlur={() => validateBlur(field)}
            />
            {error(field)}
          </div>
        ))}
        <fieldset className="cv-group">
          <legend>CV</legend>
          <label
            htmlFor="f-cvFile"
            className="file-zone"
            style={file ? { minHeight: 44 } : undefined}
          >
            <strong>{text.file}</strong>
            {!file && <small>{text.fileHint}</small>}
            <input
              ref={fileInput}
              id="f-cvFile"
              name="cvFile"
              type="file"
              accept=".pdf,.doc,.docx"
              aria-invalid={Boolean(errors.cvFile)}
              aria-describedby={[described("cvFile"), "cv-hint"]
                .filter(Boolean)
                .join(" ")}
              onChange={(e) => {
                setFile(e.target.files?.[0]);
                setErrors((old) => ({ ...old, cvFile: "", cvUrl: "" }));
              }}
              onBlur={() => validateBlur("cvFile")}
            />
          </label>
          {file && (
            <div className="file-selected">
              <span>
                {file.name}
                <br />
                <small>{Math.ceil(file.size / 1000)} KB</small>
              </span>
              <button
                type="button"
                onClick={() => {
                  setFile(undefined);
                  if (fileInput.current) fileInput.current.value = "";
                  setErrors((old) => ({ ...old, cvFile: "" }));
                }}
              >
                {text.removeFile}
              </button>
            </div>
          )}
          {error("cvFile")}
          <div className="k-or" aria-hidden="true">
            {text.or}
          </div>
          <div className="field">
            <label htmlFor="f-cvUrl">{text.cvUrl}</label>
            <input
              id="f-cvUrl"
              name="cvUrl"
              type="url"
              inputMode="url"
              placeholder="https://"
              maxLength={500}
              aria-invalid={Boolean(errors.cvUrl)}
              aria-describedby={[described("cvUrl"), "cv-hint"]
                .filter(Boolean)
                .join(" ")}
              onBlur={() => validateBlur("cvUrl")}
            />
            {error("cvUrl")}
          </div>
          <p id="cv-hint" className="k-small">
            {text.cvHint}
          </p>
        </fieldset>
        <div className="field">
          <label htmlFor="f-comment">{text.comment}</label>
          <textarea
            id="f-comment"
            name="comment"
            rows={4}
            maxLength={1000}
            placeholder={text.commentPlaceholder}
            aria-invalid={Boolean(errors.comment)}
            aria-describedby={described("comment")}
            onBlur={() => validateBlur("comment")}
          />
          {error("comment")}
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </fieldset>
      {(Object.values(errors).some(Boolean) || serverError) && (
        <div className="error-summary" ref={summary} tabIndex={-1} role="alert">
          <p>{serverError ? message(serverError) : text.errors.summary}</p>
          {!serverError && (
            <ul>
              {Object.entries(errors)
                .filter(([, v]) => v)
                .map(([field]) => (
                  <li key={field}>
                    <a
                      href={`#f-${field}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(`f-${field}`)?.focus();
                      }}
                    >
                      {labels[field] || text.errors.summary}
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
      <button className="k-btn apply-submit" type="submit" disabled={sending}>
        {sending && <span className="spinner" aria-hidden="true" />}
        {sending ? text.sending : text.submit}
      </button>
      <p className="k-small rodo">
        {text.rodo}
        <br />
        <a href={`/${lang}/privacy`}>{text.privacyLink}</a>
      </p>
    </form>
  );
}
