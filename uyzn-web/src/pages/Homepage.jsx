import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { DESCRIPTIONS } from "../config/seo";
import { getHealth, getStatus } from '../lib/api';

import heroBg from "../assets/hero-bg.jpg";
import amaImg from "../assets/IMG_0092-1.jpg";
import lesImg from "../assets/les.jpg";

// Partner logos (swap for real)
import pAbsa from "../assets/partners/absa.svg";
import pWorldBank from "../assets/partners/world-bank.svg";
import pUnicef from "../assets/partners/unicef.svg";
import pMtn from "../assets/partners/mtn.svg";
import pKnust from "../assets/partners/knust.png";
import pCedi from "../assets/partners/cedi-bank.png";

const TABS = ["jobs", "scholarships", "trainee", "nss"];

const FEATURED_DATA = {
  jobs: [
    { title: "Junior Data Analyst", org: "Vetted Employer", location: "Accra", due: "12 Oct 2025", chips: ["Full-time"], href: "/jobs" },
    { title: "Operations Assistant", org: "Local NGO", location: "Kumasi", due: "25 Sep 2025", chips: ["Entry-level"], href: "/jobs" },
    { title: "Finance Intern", org: "Regional Bank", location: "Takoradi", due: "30 Sep 2025", chips: ["Stipend"], href: "/jobs" },
    { title: "Community Officer", org: "Health Initiative", location: "Tamale", due: "05 Oct 2025", chips: ["Field"], href: "/jobs" },
  ],
  scholarships: [
    { title: "STEM Undergraduate Scholarship — 2025", org: "UYZN Partner", location: "Ghana", due: "15 Sep 2025", chips: ["Merit"], href: "/scholarships" },
    { title: "Women in Tech Fund", org: "Tech Foundation", location: "National", due: "10 Nov 2025", chips: ["Need"], href: "/scholarships" },
    { title: "Arts & Culture Award", org: "Creative Council", location: "National", due: "01 Oct 2025", chips: ["Portfolio"], href: "/scholarships" },
    { title: "Rural Access Grant", org: "Education Trust", location: "Nationwide", due: "20 Oct 2025", chips: ["Need"], href: "/scholarships" },
  ],
  trainee: [
    { title: "Engineering Trainee — 2026 Cohort", org: "Industrial Group", location: "Tarkwa", due: "30 Nov 2025", chips: ["12–24 mo"], href: "/graduate-trainee" },
    { title: "Business Graduate Programme", org: "FMCG", location: "Accra", due: "18 Oct 2025", chips: ["Rotation"], href: "/graduate-trainee" },
    { title: "IT Trainee Pathway", org: "Telecom", location: "Accra", due: "28 Oct 2025", chips: ["Certification"], href: "/graduate-trainee" },
    { title: "Field Engineering Trainee", org: "Energy", location: "Takoradi", due: "09 Nov 2025", chips: ["On-site"], href: "/graduate-trainee" },
  ],
  nss: [
    { title: "NSS: Mining & Industrial (Tarkwa)", org: "Host Institutions", location: "Tarkwa", due: "—", chips: ["Placement"], href: "/national-service" },
    { title: "NSS: Health Facilities", org: "Regional Hospitals", location: "Nationwide", due: "—", chips: ["Placement"], href: "/national-service" },
    { title: "NSS: Education (STEM)", org: "Senior High Schools", location: "Nationwide", due: "—", chips: ["Teaching"], href: "/national-service" },
    { title: "NSS: Local Government", org: "District Assemblies", location: "Nationwide", due: "—", chips: ["Public Sector"], href: "/national-service" },
  ],
};

export default function Homepage() {
  const navigate = useNavigate();
  const loc = useLocation();
  const flash = loc.state?.flash;
  const [showFlash, setShowFlash] = useState(Boolean(flash));
  useEffect(() => {
    if (!flash) return;
    setShowFlash(true);
    const t = setTimeout(() => setShowFlash(false), 3500);
    return () => clearTimeout(t);
  }, [flash]);

  const [tab, setTab] = useState("jobs");
  const [q, setQ] = useState("");

  const partners = [
    { src: pAbsa, alt: "ABSA Bank" },
    { src: pWorldBank, alt: "World Bank" },
    { src: pUnicef, alt: "UNICEF" },
    { src: pMtn, alt: "MTN Foundation" },
    { src: pKnust, alt: "KNUST" },
    { src: pCedi, alt: "Cedi Bank" },
  ];

    const [apiUp, setApiUp] = useState(null); // null | 'ok' | 'down'
    const [apiVersion, setApiVersion] = useState(null);

    useEffect(() => {
      (async () => {
        try {
          await getHealth();
          const s = await getStatus();
          setApiUp('ok');
          setApiVersion(s?.version ?? 'dev');
        } catch {
          setApiUp('down');
        }
      })();
    }, []);

  return (
    <>
      <Seo
        title="Home | UYZN — Youth Opportunities in Ghana"
        description={
          DESCRIPTIONS?.home ||
          "Discover verified jobs, scholarships, graduate trainee programs, and National Service placements. Apply once, track everything, grow faster."
        }
        path="/"
      />

      {apiUp && (
        <div
          style={{
            position: 'fixed', bottom: 12, right: 12, zIndex: 50,
            background: apiUp === 'ok' ? '#e7f8ed' : '#feecec',
            color: apiUp === 'ok' ? '#137a2a' : '#a31212',
            border: '1px solid rgba(0,0,0,.08)',
            borderRadius: 10, padding: '6px 10px', boxShadow: '0 6px 18px rgba(16,24,40,.08)',
            fontSize: 12, fontWeight: 600
          }}
        >
          API: {apiUp === 'ok' ? 'connected' : 'down'}
          {apiUp === 'ok' && apiVersion ? ` • ${apiVersion}` : ''}
        </div>
      )}

      <main className="home">
        {showFlash && <div className="flash-banner">{flash}</div>}

        {/* ================= Hero ================= */}
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(65deg, rgba(15,39,66,.85) 0%, rgba(15,39,66,.65) 30%, rgba(212,175,55,.18) 80%), url(${heroBg})`,
          }}
          role="banner"
        >
          <div className="hero__content">
            <h1 className="hero__title">Opening doors to opportunity</h1>
            <p className="hero__subtitle">
              One trusted hub for <strong>Jobs</strong>, <strong>Scholarships</strong>, <strong>Graduate Trainee</strong>,
              and <strong>National Service (NSS)</strong>—built for Ghana’s youth and local industry.
            </p>

            <div className="hero__cta">
              <Link to="/register" className="hero__btn hero__btn--primary">Get Started</Link>
              <Link to="/partners" className="hero__btn hero__btn--outline">For Employers & Sponsors</Link>
            </div>

            {/* Quick links */}
            <div className="hero__quick">
              <Link to="/opportunities?type=job" className="chip">Browse Jobs</Link>
              <Link to="/opportunities?type=scholarship" className="chip">Explore Scholarships</Link>
              <Link to="/opportunities?type=trainee" className="chip">Graduate Trainee Intakes</Link>
              <Link to="/opportunities?type=nss" className="chip">Find NSS Placements</Link>
            </div>

            {/* Finder search */}
            <form
              className="hero__search"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
              }}
            >
              <input
                className="hero__search-input"
                placeholder="Search jobs, scholarships, NSS…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="btn btn-primary h-10 px-4">Search</button>
            </form>
          </div>
        </section>

        {/* ================= Value props ================= */}
        <section className="pillars" aria-labelledby="pillars-title">
          <div className="pillars__inner">
            <h2 id="pillars-title" className="pillars__heading">
              Opening doors to <span>opportunity</span>
            </h2>
            <div className="pillars__grid">
              <article className="pillars__card card p-6">
                <h3 className="uyzn-card-title">Verified & Local</h3>
                <p className="muted">Opportunities screened for authenticity and relevance—starting with Tarkwa & Western Region.</p>
              </article>
              <article className="pillars__card card p-6">
                <h3 className="uyzn-card-title">One Profile, Many Paths</h3>
                <p className="muted">Create one profile and apply across jobs, scholarships, trainee and NSS.</p>
              </article>
              <article className="pillars__card card p-6">
                <h3 className="uyzn-card-title">Transparent Tracking</h3>
                <p className="muted">See your status, deadlines, and required documents in real time.</p>
              </article>
            </div>
          </div>
        </section>

        <hr className="section-hr" />

        {/* ================= Featured (Tabbed) ================= */}
        <section className="featured" aria-labelledby="featured-title">
          <h2 id="featured-title" className="featured__heading">
            Featured <span>opportunities</span>
          </h2>

          <div className="tabs" role="tablist" aria-label="Featured categories">
            {TABS.map((key) => (
              <button
                key={key}
                id={`tab-${key}`}
                role="tab"
                aria-selected={tab === key}
                aria-controls={`panel-${key}`}
                className={`tabs__tab ${tab === key ? "is-active" : ""}`}
                onClick={() => setTab(key)}
              >
                {key === "jobs" ? "Jobs" : key === "scholarships" ? "Scholarships" : key === "trainee" ? "Graduate Trainee" : "NSS"}
              </button>
            ))}
          </div>

          {TABS.map((key) => (
            <div
              key={key}
              id={`panel-${key}`}
              role="tabpanel"
              aria-labelledby={`tab-${key}`}
              hidden={tab !== key}
              className="featured__panel"
            >
              <div className="featured__grid">
                {FEATURED_DATA[key].map((item, i) => (
                  <article className="fcard card p-4" key={`${key}-${i}`}>
                    <div className="fcard__meta">
                      <span className="fcard__org">{item.org}</span>
                      <span className="fcard__loc">{item.location}</span>
                    </div>
                    <h3 className="fcard__title">{item.title}</h3>
                    <div className="fcard__chips">
                      {item.chips.map((c) => (
                        <span key={c} className="chip">{c}</span>
                      ))}
                    </div>
                    <div className="fcard__due">{item.due !== "—" ? `Deadline: ${item.due}` : "Ongoing"}</div>
                    <Link to={item.href} className="btn-ghost mt-3">View details →</Link>
                  </article>
                ))}
              </div>
              <div className="featured__all">
                <Link
                  className="btn-ghost"
                  to={
                    key === "jobs"
                      ? "/jobs"
                      : key === "scholarships"
                      ? "/scholarships"
                      : key === "trainee"
                      ? "/graduate-trainee"
                      : "/national-service"
                  }
                >
                  View all
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* ================= How UYZN works ================= */}
        <section className="steps">
          <div className="steps__inner card p-6">
            <h2 className="uyzn-h2">How UYZN works</h2>
            <ol className="steps__list">
              <li><strong>Create your profile</strong> — education, skills, documents.</li>
              <li><strong>Get matched</strong> — personalized listings across the four pillars.</li>
              <li><strong>Apply with confidence</strong> — clear steps, required docs, timelines.</li>
              <li><strong>Track progress</strong> — interviews, reviews, and decisions in one dashboard.</li>
              <li><strong>Onboard & grow</strong> — download offer letters and onboarding packs.</li>
            </ol>
            <Link to="/register" className="btn-primary mt-3">Create your account (free)</Link>
          </div>
        </section>

        {/* ================= Eligibility Checker ================= */}
        <section className="elig">
          <div className="elig__inner">
            <div className="elig__copy">
              <p className="elig__eyebrow">Quick Check</p>
              <h2 className="elig__heading">Do you <span>qualify</span>?</h2>
              <p className="elig__lead">Answer a few questions to estimate your scholarship eligibility.</p>
              <ul className="elig__bullets">
                <li>Takes under a minute</li>
                <li>Doesn’t affect your application</li>
                <li>Shows next best action</li>
              </ul>
              <p id="elig-disclaimer" className="elig__disclaimer">We do not store these answers. Using this tool is optional and anonymous.</p>
            </div>

            <form className="elig__form" onSubmit={(e)=>e.preventDefault()} aria-describedby="elig-disclaimer">
              <div className="elig__grid">
                <label className="elig__field">
                  <span className="elig__label">Age</span>
                  <input className="elig__input" type="number" min="10" max="60" placeholder="e.g., 18" required />
                </label>
                <label className="elig__field">
                  <span className="elig__label">GPA (4.0 scale)</span>
                  <input className="elig__input" type="number" step="0.01" min="0" max="4" placeholder="e.g., 3.2" required />
                </label>
                <label className="elig__field elig__field--full">
                  <span className="elig__label">Region</span>
                  <select className="elig__input" required>
                    <option value="" disabled>Choose your region</option>
                    <option>Greater Accra</option><option>Ashanti</option><option>Central</option><option>Eastern</option>
                    <option>Northern</option><option>Upper East</option><option>Upper West</option><option>Western</option>
                    <option>Western North</option><option>Volta</option><option>Bono</option><option>Bono East</option>
                    <option>Ahafo</option><option>Oti</option><option>Savannah</option><option>North East</option>
                  </select>
                </label>
              </div>
              <div className="elig__actions">
                <Link to="/resources/eligibility" className="elig__btn">Open full checker</Link>
                <small className="elig__legal">
                  By using this tool you agree to our <Link to="/legal/terms">Terms</Link> and <Link to="/legal/privacy">Privacy Notice</Link>.
                </small>
              </div>
            </form>
          </div>
        </section>

        {/* ================= Video ================= */}
        <section className="video">
          <div className="video__inner">
            {/* badge now *inside* the copy block for proper alignment */}
            <div className="video__copy">
              <div className="video__badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path d="M2 9.5l10-4 10 4-10 4-10-4z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 12.5v3c0 1.2 3.6 2.5 6 2.5s6-1.3 6-2.5v-3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M22 11.5v3" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <p className="video__eyebrow">Inside UYZN</p>
              <h2 className="video__heading">Get to know <span>UYZN</span></h2>
              <p className="video__lead">A quick look at how our platform works and our impact.</p>
              <ul className="video__bullets">
                <li>Platform overview</li>
                <li>Success stories</li>
                <li>How to get started</li>
              </ul>
              <a
                className="video__link"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube →
              </a>
            </div>

            <div className="video__frame">
              <div className="video__ratio">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&playsinline=1"
                  title="About UYZN — Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= Partners / Sponsors (single grid) ================= */}
        <section className="partners" aria-labelledby="partners-title">
          <div className="partners__inner">
            <h2 id="partners-title" className="partners__heading">Proudly supported by trusted institutions</h2>
            <div className="partners__grid">
              {partners.map((p) => (
                <div className="partners__card" key={p.alt} title={p.alt}>
                  <img
                    className="partners__logo"
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    onError={(e)=>{ e.currentTarget.style.visibility='hidden'; }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= Success stories ================= */}
        <section className="story">
          <figure className="story__media">
            <img src={amaImg} alt="Ama, Scholarship Awardee" loading="lazy" decoding="async" width="320" height="320" className="story__img"/>
            <blockquote className="story__quote story__quote--inline">
              “UYZN’s eligibility checker saved me weeks.”
              <cite className="story__cite"> — Ama, Scholarship Awardee</cite>
            </blockquote>
          </figure>
          <div className="story__content">
            <div className="story__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true" width="24" height="24">
                <path d="M2 9.5l10-4 10 4-10 4-10-4z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M6 12.5v3c0 1.2 3.6 2.5 6 2.5s6-1.3 6-2.5v-3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M22 11.5v3" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h2 className="story__heading">Your #1 resource for <span>navigating opportunities</span></h2>
            <p className="story__lead">We help you discover and win jobs, scholarships, trainee programs, and NSS placements in one place.</p>
            <div className="story__cta">
              <Link to="/opportunities" className="story__btn story__btn--primary">Explore Opportunities →</Link>
              <Link to="/about/news" className="story__btn story__btn--secondary">Read more stories →</Link>
            </div>
            <div className="story__quotes">
              <figure className="tquote">
                <img src={lesImg} alt="Efua, Graduate Trainee" decoding="async" width="320" height="320" className="tquote__img" loading="lazy" />
                <figcaption className="tquote__text">“The trainee track clarified my path into engineering.” — <strong>Efua</strong></figcaption>
              </figure>
              <figure className="tquote">
                <div className="tquote__avatar" aria-hidden>🛠️</div>
                <figcaption className="tquote__text">“I got my NSS placement in Tarkwa through UYZN.” — <strong>Kojo</strong></figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ================= FAQ Teaser ================= */}
        <section className="faq" aria-labelledby="faq-title">
          <div className="faq__inner">
            <p className="faq__eyebrow">FAQs</p>
            <h2 id="faq-title" className="faq__heading">Answers to common <span>questions</span></h2>
            <div className="faq__grid">
              <details className="faq__item">
                <summary className="faq__q">How do I apply for National Service placements?<span className="faq__chev" aria-hidden>▸</span></summary>
                <div className="faq__a">Browse placements on the National Service page and follow the listed requirements.</div>
              </details>
              <details className="faq__item">
                <summary className="faq__q">How does the eligibility checker work?<span className="faq__chev" aria-hidden>▸</span></summary>
                <div className="faq__a">It estimates your fit using simple criteria; final decisions are made by awarding bodies.</div>
              </details>
              <details className="faq__item">
                <summary className="faq__q">Can partners post jobs or scholarships?<span className="faq__chev" aria-hidden>▸</span></summary>
                <div className="faq__a">Yes. Head to Partners → Employers to post an opportunity.</div>
              </details>
              <details className="faq__item">
                <summary className="faq__q">How soon do I get updates?<span className="faq__chev" aria-hidden>▸</span></summary>
                <div className="faq__a">Most updates arrive 2–6 weeks after deadlines; you’ll also see status in your dashboard.</div>
              </details>
            </div>
            <div className="faq__cta">
              <Link to="/learn/faq" className="faq__btn">See All FAQs</Link>
            </div>
          </div>
        </section>

        {/* ================= Compliance & Closing ================= */}
        <section className="compliance" aria-label="Compliance & disclaimers">
          <div className="compliance__inner">
            <p>We verify postings, protect your data, and provide clear reporting channels. Scholarship awards are determined by sponsors. NSS placements follow national guidelines.</p>
          </div>
        </section>

        <section className="closing">
          <div className="closing__inner">
            <Link to="/register" className="btn-primary">Create your account</Link>
            <Link to="/partners" className="btn-ghost">For Employers & Sponsors</Link>
          </div>
        </section>
      </main>
    </>
  );
}
