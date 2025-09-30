import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function PartnersPortal() {
  return (
    <>
      <Seo
        title="Partner Portal | UYZN"
        description="Manage cohorts, scholarships, listings, and communication with role-based access."
        path="/partners/portal"
      />
      <main className="ps">
        <section className="ps-hero">
          <div className="ps-wrap">
            <h1 className="ps-h1">Partner Portal</h1>
            <p className="ps-sub">A secure dashboard for HR, CSR, and institutional teams to run everything in one place.</p>
            <div className="ps-ctas">
              <Link to="/login" className="btn-primary">Partner Sign-in</Link>
              <Link to="/contact" className="btn-ghost">Request access</Link>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-wrap">
            <h2 className="ps-h2">What you can manage</h2>
            <div className="ps-grid">
              <article className="ps-card"><h3>Cohorts</h3><p>Graduate trainee & NSS rotation progress with supervisor feedback.</p></article>
              <article className="ps-card"><h3>Scholarships</h3><p>Applications, reviewer progress, award decisions, disbursement.</p></article>
              <article className="ps-card"><h3>Listings</h3><p>Edit active jobs/trainee programs/scholarships; archive completed.</p></article>
              <article className="ps-card"><h3>Communication</h3><p>Bulk messages and updates to applicants and cohorts.</p></article>
              <article className="ps-card"><h3>Security & Roles</h3><p>Role-based access for HR, CSR, and Finance with audit logs.</p></article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
