import React from "react";
import Seo from "../components/Seo";

export default function LearnGuides() {
  const guides = [
    { title: "CV & Resume Templates", blurb: "Download Word/PDF templates adapted for Ghanaian markets." },
    { title: "Interview Prep (STAR)", blurb: "Practice answers with Situation, Task, Action, Result." },
    { title: "Statement of Purpose (SOP)", blurb: "Step-by-step guidance for scholarships and motivation letters." },
    { title: "Cover Letter Writing", blurb: "Structure, tone, and examples for jobs & scholarships." },
    { title: "Professional Etiquette", blurb: "Email formats, LinkedIn basics, networking tips." },
    { title: "Graduate Trainee Readiness", blurb: "What employers look for in rotation programs." },
    { title: "NSS Preparation", blurb: "Required documents, expectations, and reporting." },
  ];

  return (
    <>
      <Seo title="Application Guides | UYZN" description="CV templates, interview prep, cover letters, SOP tips, and more." path="/learn/guides" />
      <main className="learn">
        <section className="l-hero">
          <div className="l-wrap py-10">
            <h1 className="l-h1">Application Guides</h1>
            <p className="l-sub">Resources to compete at international standards and present yourself professionally.</p>
          </div>
        </section>

        <section className="l-section">
          <div className="l-wrap">
            <div className="l-grid">
              {guides.map(g => (
                <article className="l-card" key={g.title}>
                  <h3>{g.title}</h3>
                  <p>{g.blurb}</p>
                  <span className="l-card-cta">Open guide →</span>
                </article>
              ))}
            </div>

            <div className="l-tools">
              <h2 className="l-h2 mt-8">Interactive tools</h2>
              <ul className="l-bullets">
                <li>CV Checker — upload and get feedback on missing info</li>
                <li>Mock Interview Prep — sample questions with AI suggestions</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
