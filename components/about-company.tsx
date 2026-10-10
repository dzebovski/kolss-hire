import type { Dictionary } from "@/lib/i18n/types";

export function AboutCompany({ text }: { text: Dictionary["about"] }) {
  return (
    <section className="k-wrap" id="about" aria-labelledby="about-title">
      <div className="k-rule" />
      <div className="k-section k-grid">
        <div className="k-side">
          <p className="k-eyebrow k-muted">{text.eyebrow}</p>
          <h2 id="about-title" className="k-h2 k-serif">
            {text.title}
          </h2>
        </div>
        <div className="k-main about-text">
          {text.paragraphs.map((paragraph, i) => (
            <p key={paragraph} className={i === 0 ? "k-lead" : "k-body"}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
