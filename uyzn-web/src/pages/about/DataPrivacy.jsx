import React from "react";
import Seo from "../../components/Seo";

export default function DataPrivacy() {
  return (
    <>
      <Seo
        title="Data & Privacy — UYZN"
        description="Your data, your control. GDPR-aligned practices including consent-based sharing, encryption, and user rights."
        path="/privacy"
      />
      <section className="a-hero">
        <div className="a-wrap py-10">
          <h1 className="a-h1 a-h1--pill">Data & Privacy</h1>
          <p className="a-sub">Your data, your control.</p>
        </div>
      </section>

      <section className="a-section">
        <div className="a-wrap a-two">
          <article className="a-prose">
            <h2 className="a-h2">Key commitments</h2>
            <ul className="a-list">
              <li>Consent-based data sharing and clear purposes.</li>
              <li>Encryption in transit and at rest.</li>
              <li>Data minimisation—only what’s needed to process applications.</li>
              <li>User rights to access, correct, download, or close accounts.</li>
              <li>Alignment with GDPR and Ghana’s Data Protection Act.</li>
            </ul>
            <h3 className="a-h3">Privacy tools</h3>
            <ul className="a-list">
              <li>Privacy Dashboard (download/delete data)</li>
              <li>Cookie preferences</li>
              <li>Security alerts for unusual activity</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
