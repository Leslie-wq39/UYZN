import React from "react";
import { Link } from "react-router-dom";
import Seo from "../../components/Seo";

export default function About() {
  return (
    <>
      <Seo
        title="About UYZN — Mission, Governance, and Partners"
        description="Learn who UYZN is, how we are governed, and how we partner with employers and sponsors to open doors of opportunity for Ghana’s youth."
        path="/about"
      />

      {/* Hero */}
      <section className="a-hero">
        <div className="a-wrap py-12">
          <h1 className="a-h1">About UYZN</h1>
          <p className="a-sub">
            Building bridges between opportunity and Ghana’s youth—with
            transparency, trust, and accountability.
          </p>
          <div className="a-ctas">
            <Link to="/about/company" className="btn-primary">Learn About Our Mission</Link>
            <Link to="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Quick cards */}
      <section className="a-section">
        <div className="a-wrap">
          <div className="a-grid">
            <Link to="/about/company" className="a-card">
              <h3>About UYZN</h3>
              <p>Mission, governance, and partners.</p>
              <span className="a-card-cta">Read more →</span>
            </Link>
            <Link to="/trust" className="a-card">
              <h3>Trust & Safety</h3>
              <p>Verification, safeguarding, and reporting abuse.</p>
              <span className="a-card-cta">Our policy →</span>
            </Link>
            <Link to="/privacy" className="a-card">
              <h3>Data & Privacy</h3>
              <p>Your data, your control—GDPR-aligned practices.</p>
              <span className="a-card-cta">Privacy details →</span>
            </Link>
            <Link to="/contact" className="a-card">
              <h3>Contact</h3>
              <p>Support, partnerships, press & media.</p>
              <span className="a-card-cta">Get in touch →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why UYZN */}
      <section className="a-section a-section--tint">
        <div className="a-wrap">
          <h2 className="a-h2">Why UYZN?</h2>
          <ul className="a-bullets">
            <li><strong>One platform, four pillars:</strong> Jobs, Scholarships, Graduate Trainee, and NSS.</li>
            <li><strong>Verified partners:</strong> Employers, sponsors, and institutions are screened.</li>
            <li><strong>Transparent tracking:</strong> Clear application stages and timelines.</li>
          </ul>
        </div>
      </section>

      {/* Closing */}
      <section className="a-closing">
        <div className="a-wrap a-closing__inner">
          <Link to="/partners" className="btn-primary">Become a Partner</Link>
          <Link to="/opportunities" className="btn-ghost">Browse Opportunities</Link>
        </div>
      </section>
    </>
  );
}
