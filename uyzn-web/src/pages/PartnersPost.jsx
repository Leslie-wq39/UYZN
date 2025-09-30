import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function PartnersPost() {
  return (
    <>
      <Seo
        title="Post a Job or Trainee Intake | UYZN"
        description="Create verified job listings and graduate trainee intakes. Manage applications, shortlists, and interviews — all in one place."
        path="/partners/post"
      />
      <main className="ps">
        <section className="ps-hero">
          <div className="ps-wrap">
            <h1 className="ps-h1">Post a Job or Trainee Intake</h1>
            <p className="ps-sub">Create listings in minutes, manage shortlists, schedule interviews, and keep a transparent audit trail.</p>
            <div className="ps-ctas">
              <Link to="/partners/post/new" className="btn-primary">Post a Role</Link>
              <Link to="/contact" className="btn-ghost">Talk to our team</Link>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-wrap">
            <h2 className="ps-h2">Core features</h2>
            <div className="ps-grid">
              <article className="ps-card"><h3>Smart Job Form</h3><p>Title, description, requirements, location, deadline — with validation.</p></article>
              <article className="ps-card"><h3>Trainee Intake Setup</h3><p>Rotations, supervisors, learning outcomes, assessment criteria.</p></article>
              <article className="ps-card"><h3>Applicant Management</h3><p>Filter, rank, and shortlist with scoring rubrics and notes.</p></article>
              <article className="ps-card"><h3>Interview Tools</h3><p>Schedule interviews, send invites, capture outcomes in the same system.</p></article>
              <article className="ps-card"><h3>Compliance</h3><p>All postings are verified by UYZN to prevent fraudulent listings.</p></article>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-wrap">
            <h2 className="ps-h2">Why it works</h2>
            <ul className="ps-list">
              <li>Reduce time-to-hire with a structured funnel.</li>
              <li>Fair, transparent, and auditable selection.</li>
              <li>Consistent employer brand visible to Ghana’s youth.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
