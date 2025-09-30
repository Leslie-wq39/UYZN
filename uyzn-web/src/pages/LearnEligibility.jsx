import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function LearnEligibility() {
  const [age, setAge] = useState("");
  const [gpa, setGpa] = useState("");
  const [region, setRegion] = useState("");
  const [result, setResult] = useState(null);

  function onQuickCheck(e) {
    e.preventDefault();
    // Tiny demo logic (replace with API later)
    const eligible = Number(age) >= 17 && Number(gpa) >= 2.5 && !!region;
    setResult(eligible ? "Eligible (estimate). See next steps below." :
                         "Not eligible (estimate). See tips below.");
  }

  return (
    <>
      <Seo title="Eligibility Checker | UYZN" description="Instant self-checks for scholarships and NSS." path="/learn/eligibility" />
      <main className="learn">
        <section className="l-hero">
          <div className="l-wrap py-10">
            <h1 className="l-h1">Eligibility Checker</h1>
            <p className="l-sub">Get a quick, anonymous estimate before you apply.</p>
          </div>
        </section>

        <section className="l-section">
          <div className="l-wrap l-two">
            <div>
              <h2 className="l-h2">Quick Scholarship Check</h2>
              <form className="l-form" onSubmit={onQuickCheck} aria-describedby="elig-note">
                <label className="l-field">
                  <span>Age</span>
                  <input type="number" min="10" max="60" value={age} onChange={e=>setAge(e.target.value)} required />
                </label>
                <label className="l-field">
                  <span>GPA (4.0 scale)</span>
                  <input type="number" step="0.01" min="0" max="4" value={gpa} onChange={e=>setGpa(e.target.value)} required />
                </label>
                <label className="l-field l-field--full">
                  <span>Region</span>
                  <select value={region} onChange={e=>setRegion(e.target.value)} required>
                    <option value="">Choose your region</option>
                    {["Greater Accra","Ashanti","Central","Eastern","Northern","Upper East","Upper West","Western","Western North","Volta","Bono","Bono East","Ahafo","Oti","Savannah","North East"].map(r => <option key={r}>{r}</option>)}
                  </select>
                </label>
                <button className="btn-primary">Run Check</button>
                <small id="elig-note" className="l-note">We don’t store answers. This is an estimate—final decisions are by sponsors.</small>
              </form>

              {result && <div className="l-result">{result}</div>}

              <div className="l-links">
                <Link to="/opportunities?type=scholarship" className="btn-ghost">Browse Scholarships</Link>
                <Link to="/resources/eligibility" className="btn-link">Open full checker →</Link>
              </div>
            </div>

            <aside className="l-aside">
              <h3 className="l-h3">Also check</h3>
              <ul className="l-bullets">
                <li>NSS: age, graduation status, location prefs</li>
                <li>Jobs/Trainee: minimum qualifications & skills</li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
