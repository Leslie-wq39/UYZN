import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function PartnersTalent() {
  return (
    <>
      <Seo
        title="Talent Pools | UYZN"
        description="Search skills, education, and location; save searches and export shortlists."
        path="/partners/talent"
      />
      <main className="ps">
        <section className="ps-hero">
          <div className="ps-wrap">
            <h1 className="ps-h1">Talent Pools</h1>
            <p className="ps-sub">A structured, searchable database of verified youth talent for hiring and cohort building.</p>
            <div className="ps-ctas">
              <Link to="/partners/talent/search" className="btn-primary">View Talent Pools</Link>
              <Link to="/contact" className="btn-ghost">Request a demo</Link>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-wrap">
            <h2 className="ps-h2">Core features</h2>
            <div className="ps-grid">
              <article className="ps-card"><h3>Advanced Filters</h3><p>Skills, education, experience, certifications, and location.</p></article>
              <article className="ps-card"><h3>Saved Searches</h3><p>Reuse queries like “Mining engineering graduates — Western Region”.</p></article>
              <article className="ps-card"><h3>Shortlist Export</h3><p>Download CSV/Excel or share securely with hiring managers.</p></article>
              <article className="ps-card"><h3>Profile Previews</h3><p>Summarized candidate profiles with verified credentials.</p></article>
              <article className="ps-card"><h3>Pipeline Tracking</h3><p>Mark candidates as watchlist, interview, or offer across roles.</p></article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
