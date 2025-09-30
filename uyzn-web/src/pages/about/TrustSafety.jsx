import React from "react";
import Seo from "../../components/Seo";

export default function TrustSafety() {
  return (
    <>
      <Seo
        title="Trust & Safety — UYZN"
        description="Verification, safeguarding, fair reviews, and reporting tools that protect applicants and partners."
        path="/trust"
      />
      <section className="a-hero">
        <div className="a-wrap py-10">
          <h1 className="a-h1 a-h1--pill">Trust & Safety</h1>
          <p className="a-sub">Verification, safeguarding, and reporting abuse.</p>
        </div>
      </section>

      <section className="a-section">
        <div className="a-wrap a-two">
          <article className="a-prose">
            <h2 className="a-h2">Core principles</h2>
            <ul className="a-list">
              <li>All listings are verified before publication.</li>
              <li>Safeguarding policies protect youth from exploitation.</li>
              <li>Fair reviews with anonymisation where possible.</li>
              <li>Transparent status updates throughout the process.</li>
              <li>In-app reporting for suspicious content or misconduct.</li>
            </ul>
            <h3 className="a-h3">Safety measures</h3>
            <ul className="a-list">
              <li>Vetting of employers and sponsors.</li>
              <li>Two-factor authentication on accounts.</li>
              <li>Encrypted document checks and audit trails.</li>
              <li>Rapid response to abuse reports.</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
