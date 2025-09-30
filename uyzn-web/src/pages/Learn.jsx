import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function Learn() {
  return (
    <>
      <Seo
        title="Learn | UYZN — Guides, Eligibility, FAQs"
        description="Learn how UYZN works, check eligibility, read application guides, and browse FAQs."
        path="/learn"
      />
      <main className="learn">
        {/* Hero */}
        <section className="l-hero">
          <div className="l-wrap py-10">
            <h1 className="l-h1">Learn. Prepare. Succeed.</h1>
            <p className="l-sub">
              Explore guides, check your eligibility, and master every step of the application process.
            </p>
            <div className="l-ctas">
              <Link to="/learn/guides" className="btn-primary">Explore Guides</Link>
              <Link to="/learn/eligibility" className="btn-ghost">Use Eligibility Checker</Link>
            </div>
          </div>
        </section>

        {/* Four tiles */}
        <section className="l-section">
          <div className="l-wrap">
            <div className="l-grid">
              <Link to="/learn/how-it-works" className="l-card">
                <h3>How UYZN Works</h3>
                <p>Profile once, apply everywhere. See the steps and why it matters.</p>
                <span className="l-card-cta">See How It Works →</span>
              </Link>
              <Link to="/learn/eligibility" className="l-card">
                <h3>Eligibility Checker</h3>
                <p>Instant checks for scholarships and NSS with clear next steps.</p>
                <span className="l-card-cta">Check My Eligibility →</span>
              </Link>
              <Link to="/learn/guides" className="l-card">
                <h3>Application Guides</h3>
                <p>CV templates, interview prep, cover letters, SOP tips, and more.</p>
                <span className="l-card-cta">Explore Guides →</span>
              </Link>
              <Link to="/learn/faq" className="l-card">
                <h3>FAQs</h3>
                <p>Deadlines, documents, timelines, accounts, and trust & safety.</p>
                <span className="l-card-cta">Browse FAQs →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
