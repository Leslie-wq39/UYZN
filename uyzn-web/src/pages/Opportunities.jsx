import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo"; // stub is fine (return null) if you don't have it

/** ------- Taxonomies (simple/constants for now) ------- */
const TYPES = [
  { key: "job", label: "Jobs" },
  { key: "scholarship", label: "Scholarships" },
  { key: "trainee", label: "Graduate Trainee" },
  { key: "nss", label: "NSS" },
];

const LOCATIONS = [
  "Tarkwa & Western Region",
  "Greater Accra",
  "Ashanti",
  "Northern",
  "All Ghana",
];

const DISCIPLINES = ["Mining", "Engineering", "ICT", "Finance", "Health", "Education", "Others"];

const DEADLINES = [
  { key: "this-week", label: "This Week" },
  { key: "this-month", label: "This Month" },
  { key: "next-3-months", label: "Next 3 Months" },
];

/** ------- Small dev-friendly mock if API isn't reachable ------- */
const MOCK = [
  {
    id: "m1",
    type: "job",
    title: "Graduate Mining Engineer — Tarkwa",
    org: "Vetted Employer",
    location: "Tarkwa & Western Region",
    discipline: "Mining",
    due: "2025-09-30",
    meta: "Full Time · Entry Level",
  },
  {
    id: "m2",
    type: "scholarship",
    title: "STEM Scholarship (Western Region)",
    org: "UYZN Partner",
    location: "All Ghana",
    discipline: "Engineering",
    due: "2025-10-05",
    meta: "Undergraduate · Tuition & Fees",
  },
  {
    id: "m3",
    type: "trainee",
    title: "Graduate Trainee Intake — ICT Track",
    org: "Industrial Group",
    location: "Greater Accra",
    discipline: "ICT",
    due: "2025-10-10",
    meta: "12-month program · Rotations",
  },
  {
    id: "m4",
    type: "nss",
    title: "NSS ICT Support — Western Region",
    org: "Regional Hospital",
    location: "Tarkwa & Western Region",
    discipline: "ICT",
    due: "2025-10-11",
    meta: "National Service · IT Department",
  },
];

/** Utilities */
const API_URL = import.meta.env.VITE_API_URL || ""; // e.g. http://localhost:8000
const fmtDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
};

export default function Opportunities() {
  const [sp, setSp] = useSearchParams();

  // --- read/seed URL params
  const type = sp.get("type") || "job";
  const location = sp.get("location") || "All Ghana";
  const discipline = sp.get("discipline") || "All";
  const deadline = sp.get("deadline") || "this-month";
  const page = Number(sp.get("page") || 1);

  // --- local state
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ page, per_page: 12, total: 0, last_page: 1 });
  const [error, setError] = useState("");

  // --- build query string for the API
  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("type", type);
    if (location && location !== "All Ghana") params.set("location", location);
    if (discipline && discipline !== "All") params.set("discipline", discipline);
    if (deadline) params.set("deadline", deadline);
    params.set("page", String(page));
    params.set("per_page", "12");
    return params.toString();
  }, [type, location, discipline, deadline, page]);

  // --- fetch data (with graceful mock)
  useEffect(() => {
    let abort = new AbortController();
    setLoading(true);
    setError("");

    if (!API_URL) {
      // Dev mode without backend: filter MOCK locally to match the UI
      const filtered = MOCK.filter((it) => it.type === type);
      setTimeout(() => {
        setItems(filtered);
        setMeta({ page: 1, per_page: 12, total: filtered.length, last_page: 1 });
        setLoading(false);
      }, 350);
      return () => abort.abort();
    }

    const url = `${API_URL}/api/opportunities?${query}`;
    fetch(url, { signal: abort.signal, credentials: "include" })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        // expect { data: [...], meta: { page, per_page, total, last_page } }
        setItems(json.data || []);
        setMeta(json.meta || { page, per_page: 12, total: (json.data || []).length, last_page: 1 });
      })
      .catch((e) => setError(e.message || "Failed to load opportunities"))
      .finally(() => setLoading(false));

    return () => abort.abort();
  }, [query, type, page]);

  // --- handlers to keep URL the source of truth
  function updateParam(key, val) {
    const next = new URLSearchParams(sp);
    if (val === "All" || val === "All Ghana" || !val) next.delete(key);
    else next.set(key, val);
    next.delete("page"); // reset page on any filter change
    setSp(next, { replace: true });
  }
  function setType(t) {
    const next = new URLSearchParams(sp);
    next.set("type", t);
    next.delete("page");
    setSp(next, { replace: true });
  }
  function setPage(n) {
    const next = new URLSearchParams(sp);
    next.set("page", String(n));
    setSp(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Seo
        title="Opportunities | UYZN — Jobs, Scholarships, Graduate Trainee & NSS"
        description="Explore verified opportunities across Ghana. Apply for jobs, scholarships, graduate trainee intakes, and National Service placements—track every step from application to onboarding."
        path="/opportunities"
      />

      <main className="opps">
        {/* ===== Hero ===== */}
        <section className="opps-hero" role="banner">
          <div className="opps-hero__inner">
            <h1 className="opps-hero__title">Find verified opportunities and track every step.</h1>
            <p className="opps-hero__sub">
              Explore <strong>Jobs</strong>, <strong>Scholarships</strong>, <strong>Graduate Trainee programs</strong>, and <strong>National Service placements</strong>—all in one trusted hub.
            </p>
            <div className="opps-hero__cta">
              <a href="#results" className="btn-primary">Browse Opportunities</a>
              <Link to="/register" className="btn-ghost">Create Your Profile</Link>
            </div>
          </div>
        </section>

        {/* ===== Filters + Content ===== */}
        <section className="opps-wrap">
          <div className="opps-grid">
            {/* left/main */}
            <div className="opps-main">
              {/* type tabs */}
              <div className="opps-tabs" role="tablist" aria-label="Opportunity Type">
                {TYPES.map((t) => (
                  <button
                    key={t.key}
                    role="tab"
                    aria-selected={type === t.key}
                    className={`opps-tab ${type === t.key ? "is-active" : ""}`}
                    onClick={() => setType(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* section intros (copy varies by type) */}
              <TypeIntro type={type} />

              {/* results */}
              <div id="results" className="opps-results">
                {loading && <SkeletonRows />}
                {!loading && error && (
                  <div className="opps-error" role="alert">Something went wrong. Please try again.</div>
                )}
                {!loading && !error && items.length === 0 && (
                  <div className="opps-empty">No opportunities match your filters. Try adjusting your location or deadline.</div>
                )}
                {!loading && !error && items.length > 0 && (
                  <ul className="opps-cards" aria-live="polite">
                    {items.map((it) => (
                      <li key={it.id} className="opps-card card">
                        <div className="opps-card__top">
                          <span className="opps-card__org">{it.org}</span>
                          <span className="opps-card__loc">{it.location}</span>
                        </div>
                        <h3 className="opps-card__title">{it.title}</h3>
                        <div className="opps-card__meta">
                          {it.meta ? it.meta : `${toHumanType(it.type)}${it.discipline ? " · " + it.discipline : ""}`}
                        </div>
                        <div className="opps-card__due">
                          {it.due ? `Closes ${fmtDate(it.due)}` : "Ongoing"}
                        </div>
                        <div className="opps-card__actions">
                          <Link to={`/opportunity/${it.id}`} className="btn-secondary">Apply Now</Link>
                          <Link to={`/opportunity/${it.id}`} className="opps-card__more">View details →</Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {/* pagination */}
                {!loading && !error && meta.last_page > 1 && (
                  <div className="opps-pager" role="navigation" aria-label="Pagination">
                    <button
                      className="btn-ghost"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page <= 1}
                    >
                      ← Prev
                    </button>
                    <span className="opps-pager__info">Page {page} of {meta.last_page}</span>
                    <button
                      className="btn-ghost"
                      onClick={() => setPage(Math.min(meta.last_page, page + 1))}
                      disabled={page >= meta.last_page}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* right rail filters (stacks on mobile) */}
            <aside className="opps-filters" aria-label="Filters">
              <div className="filter">
                <label className="filter__label">Location</label>
                <select
                  className="filter__input"
                  value={location}
                  onChange={(e) => updateParam("location", e.target.value)}
                >
                  {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div className="filter">
                <label className="filter__label">Discipline</label>
                <select
                  className="filter__input"
                  value={discipline}
                  onChange={(e) => updateParam("discipline", e.target.value)}
                >
                  <option>All</option>
                  {DISCIPLINES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="filter">
                <label className="filter__label">Deadline</label>
                <select
                  className="filter__input"
                  value={deadline}
                  onChange={(e) => updateParam("deadline", e.target.value)}
                >
                  {DEADLINES.map((d) => <option key={d.key} value={d.key}>{d.label}</option>)}
                </select>
              </div>

              <div className="filter-actions">
                <button
                  className="btn-ghost w-full"
                  onClick={() => {
                    const next = new URLSearchParams();
                    next.set("type", type);
                    setSp(next, { replace: true });
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* ===== Why UYZN / Impact (CSR tie-in) ===== */}
        <section className="opps-impact">
          <div className="opps-impact__inner">
            <h2 className="opps-impact__title">Building Local Talent Pipelines</h2>
            <p className="opps-impact__lead">
              UYZN is trusted by employers and sponsors to source, train, and track youth talent. Our transparent dashboards make CSR and impact reporting seamless.
            </p>
            <Link to="/partners" className="btn-primary">Partner With Us</Link>
          </div>
        </section>

        {/* ===== Closing CTA ===== */}
        <section className="opps-closing">
          <div className="opps-closing__inner">
            <h2 className="opps-closing__title">Ready to take your next step?</h2>
            <div className="opps-closing__cta">
              <Link to="/register" className="btn-primary">Create Your Account</Link>
              <Link to="/partners" className="btn-ghost">For Employers & Sponsors</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/** --------- Small presentational bits --------- */
function TypeIntro({ type }) {
  switch (type) {
    case "job":
      return (
        <header className="opps-intro">
          <h2 className="opps-intro__title">Verified Jobs Across Ghana</h2>
          <p className="opps-intro__lead">
            Apply confidently to verified roles across industries—engineering, ICT, finance, operations, healthcare, and more. Every posting is screened for authenticity.
          </p>
          <Link to="/jobs" className="opps-intro__link">Browse All Jobs</Link>
        </header>
      );
    case "scholarship":
      return (
        <header className="opps-intro">
          <h2 className="opps-intro__title">Access Scholarships with Clarity</h2>
          <p className="opps-intro__lead">
            Check eligibility in seconds, upload required documents securely, and track award decisions in real time.
          </p>
          <Link to="/scholarships" className="opps-intro__link">Explore Scholarships</Link>
        </header>
      );
    case "trainee":
      return (
        <header className="opps-intro">
          <h2 className="opps-intro__title">Graduate Trainee Programs Built for Growth</h2>
          <p className="opps-intro__lead">
            Join structured programs with clear rotations, supervisor feedback, and milestones that prepare you for a full-time career.
          </p>
          <Link to="/graduate-trainee" className="opps-intro__link">Graduate Trainee Intakes</Link>
        </header>
      );
    default:
      return (
        <header className="opps-intro">
          <h2 className="opps-intro__title">National Service Made Simple</h2>
          <p className="opps-intro__lead">
            Match to verified NSS placements, submit required documents, and manage onboarding—all in one place.
          </p>
          <Link to="/national-service" className="opps-intro__link">Find NSS Placements</Link>
        </header>
      );
  }
}

function toHumanType(t) {
  const m = TYPES.find((x) => x.key === t);
  return m ? m.label : "Opportunity";
}

function SkeletonRows() {
  return (
    <ul className="opps-cards" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <li className="opps-card card is-skel" key={i}>
          <div className="skel skel--sm" />
          <div className="skel skel--lg" />
          <div className="skel skel--md" />
          <div className="skel skel--sm" />
        </li>
      ))}
    </ul>
  );
}
