import React, { useMemo, useState } from "react";
import Seo from "../components/Seo";

const DATA = [
  { cat: "Applications", q: "How do I apply for a scholarship or job?", a: "Create your profile, open an opportunity, and click Apply. Your profile data is reused." },
  { cat: "Applications", q: "Can I apply for more than one opportunity at once?", a: "Yes. Apply to multiple; track each application in your dashboard." },
  { cat: "Documents", q: "Which file formats are supported?", a: "PDF, JPG/PNG images, and DOC/DOCX where specified." },
  { cat: "Documents", q: "Do I need certified copies?", a: "Only when a sponsor explicitly requires it. Otherwise scanned copies are okay." },
  { cat: "Timelines", q: "How long does review take?", a: "Typically 2–6 weeks after the deadline, depending on the sponsor/employer." },
  { cat: "Accounts", q: "How do I reset my password?", a: "Use ‘Forgot password’ on the sign-in page; check your email for a link." },
  { cat: "Trust & Safety", q: "How does UYZN verify postings?", a: "Opportunities are screened and partners are vetted before publishing." },
  { cat: "Trust & Safety", q: "How do I report a fraudulent listing?", a: "Use the ‘Report’ link on the listing or contact support." },
];

export default function LearnFaq() {
  const [q, setQ] = useState("");
  const results = useMemo(
    () => DATA.filter(i => (i.q + i.a + i.cat).toLowerCase().includes(q.toLowerCase())),
    [q]
  );

  return (
    <>
      <Seo title="FAQs | UYZN" description="Answers to common questions about applications, documents, timelines and more." path="/learn/faq" />
      <main className="learn">
        <section className="l-hero">
          <div className="l-wrap py-10">
            <h1 className="l-h1">FAQs</h1>
            <p className="l-sub">Search answers or browse by topic.</p>
            <form className="l-search" onSubmit={e=>e.preventDefault()}>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search FAQs…" />
            </form>
          </div>
        </section>

        <section className="l-section">
          <div className="l-wrap l-faq">
            {results.map((item, i) => (
              <details key={i} className="l-faq-item">
                <summary><span className="l-faq-cat">{item.cat}</span>{item.q}</summary>
                <div className="l-faq-a">{item.a}</div>
              </details>
            ))}
            {results.length === 0 && <p className="muted">No results. Try another keyword.</p>}
          </div>
        </section>
      </main>
    </>
  );
}
