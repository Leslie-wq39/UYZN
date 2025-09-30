import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function PartnersReports() {
  return (
    <>
      <Seo
        title="Impact & CSR Reports | UYZN"
        description="Board-ready dashboards and downloadable reports for CSR/ESG disclosures."
        path="/partners/reports"
      />
      <main className="ps">
        <section className="ps-hero">
          <div className="ps-wrap">
            <h1 className="ps-h1">Impact & CSR Reports</h1>
            <p className="ps-sub">Transparent metrics that show applications, awards, placements, demographics, and year-on-year impact.</p>
            <div className="ps-ctas">
              <Link to="/partners/reports/dashboard" className="btn-primary">Open Impact Dashboard</Link>
              <Link to="/contact" className="btn-ghost">Ask about integrations</Link>
            </div>
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-wrap">
            <h2 className="ps-h2">What’s inside</h2>
            <div className="ps-grid">
              <article className="ps-card"><h3>Dashboard Metrics</h3><p>Applications, fills, awards, NSS completions.</p></article>
              <article className="ps-card"><h3>Demographics</h3><p>Gender, region, education level, socio-economic background.</p></article>
              <article className="ps-card"><h3>Impact Over Time</h3><p>Growth of opportunities and beneficiaries year-on-year.</p></article>
              <article className="ps-card"><h3>Downloads</h3><p>PDF/Excel reports for CSR/ESG and donor submissions.</p></article>
              <article className="ps-card"><h3>Custom Branding</h3><p>Apply partner logo and CSR language to reports.</p></article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
