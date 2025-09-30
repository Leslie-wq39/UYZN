import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";


export default function PartnersScholarships() {
  return (
    <>
      <Seo
        title="Sponsor a Scholarship | UYZN"
        description="Define criteria, invite applications, review with rubrics, and award with full audit trails."
        path="/partners/scholarships"
      />
      <main className="ps">
        <section className="ps-hero">
          <div className="ps-wrap">
            <h1 className="ps-h1">Sponsor a Scholarship</h1>
            <p className="ps-sub">Transparent criteria, secure documents, reviewer panels, and award management built-in.</p>
            <div className="ps-ctas">
              <Link to="/partners/scholarships/new" className="btn-primary">Create Scholarship</Link>
              <Link to="/contact" className="btn-ghost">Speak to CSR team</Link>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-wrap">
            <h2 className="ps-h2">Core features</h2>
            <div className="ps-grid">
              <article className="ps-card"><h3>Custom Criteria</h3><p>Academic level, discipline, location, financial need, gender, community.</p></article>
              <article className="ps-card"><h3>Secure Uploads</h3><p>Transcripts, essays, references — encrypted and controlled.</p></article>
              <article className="ps-card"><h3>Reviewer Panel</h3><p>Invite reviewers, assign rubrics, enable blind review to reduce bias.</p></article>
              <article className="ps-card"><h3>Award Management</h3><p>Select recipients, notify winners, and track disbursement.</p></article>
              <article className="ps-card"><h3>Audit Trail</h3><p>Every action is logged for accountability and compliance.</p></article>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-wrap">
            <h2 className="ps-h2">Benefits</h2>
            <ul className="ps-list">
              <li>Target funding to communities and disciplines that matter.</li>
              <li>Fulfil CSR objectives with measurable educational impact.</li>
              <li>Export-ready reports for donors, boards, and regulators.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
