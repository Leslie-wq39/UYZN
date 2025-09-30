import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { DESCRIPTIONS } from "../config/seo";

// (Optional) logos you already have — safe to remove if you don’t want the strip
import pAbsa from "../assets/partners/absa.svg";
import pWorldBank from "../assets/partners/world-bank.svg";
import pUnicef from "../assets/partners/unicef.svg";
import pMtn from "../assets/partners/mtn.svg";
import pKnust from "../assets/partners/knust.png";
import pCedi from "../assets/partners/cedi-bank.png";

const logos = [pAbsa, pWorldBank, pUnicef, pMtn, pKnust, pCedi].filter(Boolean);

export default function Employers() {
  const [notice, setNotice] = useState(null);

  // Optional lightweight CTA submit (posts to /api/partners/inquiry if you build it)
  async function handleQuickInquiry(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      org: fd.get("org")?.trim(),
      email: fd.get("email")?.trim(),
      interest: fd.get("interest") || "general",
    };
    if (!payload.org || !payload.email) {
      setNotice({ type: "err", text: "Please enter your organization and email." });
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/partners/inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setNotice({ type: "ok", text: "Thanks — our team will reach out shortly." });
      e.currentTarget.reset();
    } catch {
      setNotice({ type: "err", text: "Couldn’t send right now. Please try again or email us." });
    }
  }

  return (
    <>
      <Seo
        title="For Employers & Sponsors | UYZN — Build Ghana’s Local Talent Pipeline"
        description={
          DESCRIPTIONS?.partners ||
          "Post jobs, sponsor scholarships, run graduate trainee intakes, and track impact with UYZN. Built for HR, CSR, and institutional partners."
        }
        path="/partners"
      />

      <main className="partners-page">
        {/* ========== HERO ========== */}
        <section className="p-hero" role="banner">
          <div className="p-hero__inner">
            <h1 className="p-hero__title">Build a stronger local talent pipeline.</h1>
            <p className="p-hero__sub">
              Partner with UYZN to source talent, sponsor scholarships, and support graduate trainee
              and National Service programs — with transparent dashboards for impact reporting.
            </p>
            <div className="p-hero__ctas">
              <Link to="/contact" className="btn-primary">Partner With Us</Link>
              <Link to="/partners/post" className="btn-ghost">Post an Opportunity</Link>
            </div>
          </div>
        </section>

        {/* ========== WHY PARTNER ========== */}
        <section className="p-why">
          <div className="p-wrap">
            <h2 className="p-h2">Why partner with UYZN?</h2>
            <ul className="p-why__grid">
              <li className="p-card">
                <div className="p-icon" aria-hidden>✅</div>
                <h3>Verified Reach</h3>
                <p>Connect with thousands of verified youth applicants across Ghana.</p>
              </li>
              <li className="p-card">
                <div className="p-icon" aria-hidden>📋</div>
                <h3>Structured Process</h3>
                <p>From posting to shortlisting and interviews — all in one system.</p>
              </li>
              <li className="p-card">
                <div className="p-icon" aria-hidden>📈</div>
                <h3>CSR & Impact</h3>
                <p>Track scholarships, trainee cohorts, and NSS placements with reports.</p>
              </li>
              <li className="p-card">
                <div className="p-icon" aria-hidden>🔐</div>
                <h3>Compliance</h3>
                <p>Audit trails, eligibility checks, and secure data handling by design.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ========== CORE SERVICES ========== */}
        <section className="p-services">
          <div className="p-wrap">
            <h2 className="p-h2">Core services</h2>

            <div className="p-services__grid">
              <article className="p-card p-service">
                <div className="p-service__head">
                  <span className="p-icon" aria-hidden>🛠️</span>
                  <h3>Post a Job or Trainee Intake</h3>
                </div>
                <p>Create listings in minutes. Manage applications, shortlists, and interviews inside your secure dashboard.</p>
                <Link className="p-link" to="/partners/post">Post a Role →</Link>
              </article>

              <article className="p-card p-service">
                <div className="p-service__head">
                  <span className="p-icon" aria-hidden>🎓</span>
                  <h3>Sponsor a Scholarship</h3>
                </div>
                <p>Define criteria, review candidates, and make awards with transparent, exportable audit trails.</p>
                <Link className="p-link" to="/partners/scholarships">Sponsor a Scholarship →</Link>
              </article>

              <article className="p-card p-service">
                <div className="p-service__head">
                  <span className="p-icon" aria-hidden>🔎</span>
                  <h3>Talent Pools</h3>
                </div>
                <p>Search by skills, education, and location to build pipelines. Export shortlists as needed.</p>
                <Link className="p-link" to="/partners/talent">View Talent Pools →</Link>
              </article>

              <article className="p-card p-service">
                <div className="p-service__head">
                  <span className="p-icon" aria-hidden>🗂️</span>
                  <h3>Partner Portal</h3>
                </div>
                <p>Manage cohorts, placements, and awards with permissions for HR/CSR teams.</p>
                <Link className="p-link" to="/partners/portal">Partner Sign-in →</Link>
              </article>

              <article className="p-card p-service">
                <div className="p-service__head">
                  <span className="p-icon" aria-hidden>📊</span>
                  <h3>Impact & CSR Reports</h3>
                </div>
                <p>Generate board-ready impact reports for ESG/CSR disclosures with one click.</p>
                <Link className="p-link" to="/partners/reports">Impact Dashboard →</Link>
              </article>
            </div>
          </div>
        </section>

        {/* ========== IMPACT / ANGLOGOLD TIE-IN ========== */}
        <section className="p-impact">
          <div className="p-wrap p-impact__wrap">
            <div className="p-impact__copy">
              <h2 className="p-h2">A platform designed for local impact</h2>
              <p>
                UYZN helps organizations like AngloGold strengthen local communities. From Tarkwa to nationwide reach,
                your partnership opens verified jobs, scholarships, and service placements that lead to long-term growth.
              </p>

              <dl className="p-stats">
                <div><dt>Applicants reached</dt><dd>12,000+</dd></div>
                <div><dt>Scholarships awarded</dt><dd>1,500+</dd></div>
                <div><dt>NSS placements managed</dt><dd>2,300+</dd></div>
              </dl>

              <div className="p-impact__ctas">
                <Link to="/partners" className="btn-primary">Become a Partner</Link>
                <Link to="/contact" className="btn-ghost">Contact Our Team</Link>
              </div>
            </div>

            {/* Visual placeholder (map / region highlight) */}
            <div className="p-impact__visual" aria-hidden="true">
              <div className="p-map">
                <div className="p-map__badge">Tarkwa & Western Region</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="p-flow">
          <div className="p-wrap">
            <h2 className="p-h2">How it works</h2>
            <ol className="p-flow__list">
              <li><span className="p-badge">1</span><strong>Create a Partner Account</strong> — set up your organization.</li>
              <li><span className="p-badge">2</span><strong>Post or Sponsor</strong> — add jobs, scholarships, or intakes with your criteria.</li>
              <li><span className="p-badge">3</span><strong>Review & Select</strong> — manage applications with scorecards and filters.</li>
              <li><span className="p-badge">4</span><strong>Track Impact</strong> — access dashboards and export reports.</li>
            </ol>
          </div>
        </section>

        {/* ========== (OPTIONAL) TRUSTED BY STRIP ========== */}
        {logos.length > 0 && (
          <section className="p-logos" aria-labelledby="p-logos-title">
            <div className="p-wrap">
              <h3 id="p-logos-title" className="p-logos__title">Trusted by respected institutions</h3>
              <div className="p-logos__grid">
                {logos.map((src, i) => (
                  <div className="p-logos__card" key={i}>
                    <img src={src} alt="Partner logo" loading="lazy" decoding="async" width="96" height="96"/>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========== QUICK INQUIRY (optional, uses /api/partners/inquiry) ========== */}
        <section className="p-inquiry">
          <div className="p-wrap">
            <div className="p-inquiry__panel">
              <div className="p-inquiry__copy">
                <h3>Ready to talk?</h3>
                <p>Drop your details and we’ll reach out with a short intro call.</p>
              </div>
              <form className="p-inquiry__form" onSubmit={handleQuickInquiry} noValidate>
                <label className="p-field">
                  <span>Organization</span>
                  <input name="org" placeholder="e.g., AngloGold Ashanti" />
                </label>
                <label className="p-field">
                  <span>Work Email</span>
                  <input type="email" name="email" placeholder="you@company.com" />
                </label>
                <label className="p-field">
                  <span>Interest</span>
                  <select name="interest" defaultValue="general">
                    <option value="general">General</option>
                    <option value="jobs">Jobs / Intakes</option>
                    <option value="scholarships">Scholarships</option>
                    <option value="reports">Impact / CSR</option>
                  </select>
                </label>
                <button className="btn-primary">Request Intro</button>
              </form>
              {notice && (
                <p className={`p-inquiry__note ${notice.type === "ok" ? "is-ok" : "is-err"}`} role="status" aria-live="polite">
                  {notice.text}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========== FOOTER MICROCOPY ========== */}
        <section className="p-footnote" aria-label="Context">
          <div className="p-wrap">
            <p>
              UYZN partners with employers, sponsors, and institutions to create verified pathways for Ghana’s youth.
              All opportunities are pre-screened for quality and compliance.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
