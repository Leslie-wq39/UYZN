// src/components/Header.jsx
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../api/auth";
import uyznLogo from "../assets/brand/uyzn-logo.jpg";

/** Minimal inline icons */
const Icon = {
  Menu: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.29 6.3 1.41-1.41-6.3-6.3 6.3-6.29z"/>
    </svg>
  ),
  Chevron: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.505 4.505 0 0 1 9.5 14z"/>
    </svg>
  ),
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 'opps' | 'employers' | 'learn' | 'about'
  const [authed, setAuthed] = useState(!!localStorage.getItem("token"));
  const navRef = useRef(null);
  const navigate = useNavigate();

   // ❗ Lock body scroll while mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : original || "";
    return () => { document.body.style.overflow = original; };
  }, [mobileOpen]);

  // ❗ If we cross up into desktop, close the drawer
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Central logout handler
  async function handleLogout() {
    try {
      await apiLogout(); // safe even if backend lacks /logout
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("auth:changed"));
      navigate("/login");
    }
  }

  // React to auth changes (this tab + other tabs)
  useEffect(() => {
    const onAuth = () => setAuthed(!!localStorage.getItem("token"));
    window.addEventListener("storage", onAuth);
    window.addEventListener("auth:changed", onAuth);
    return () => {
      window.removeEventListener("storage", onAuth);
      window.removeEventListener("auth:changed", onAuth);
    };
  }, []);

  // Scroll style
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside / Escape to close menus
  useEffect(() => {
    const onClick = (e) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <header ref={navRef} role="banner" className={`uyzn-header ${isScrolled ? "uyzn-header--scrolled" : ""}`}>
      <div className={`uyzn-bar ${isScrolled ? "uyzn-bar--compact" : ""}`}>
        {/* Left: Logo/Wordmark */}
        <div className="uyzn-logo">
          <Link to="/" className="uyzn-logo-link" aria-label="Unity Youth Zone Network (UYZN) — Home">
            {uyznLogo ? (
              <img
                src={uyznLogo}
                alt="UYZN logo"
                width="32"
                height="32"
                className="uyzn-logo-img"
                decoding="async"
              />
            ) : (
              <span aria-hidden="true" className="uyzn-logo-dot" />
            )}
            <span className="uyzn-logo-word">UYZN</span>
          </Link>
        </div>

        {/* Center: Primary nav (desktop) */}
        <nav className="uyzn-primary" aria-label="Primary">
          <button
            id="btn-opps"
            className="uyzn-nav-link"
            aria-haspopup="true"
            aria-expanded={openMenu === "opps"}
            aria-controls="menu-opps"
            onClick={() => setOpenMenu(openMenu === "opps" ? null : "opps")}
            title="Jobs, Scholarships, Graduate Trainee, National Service"
          >
            Opportunities <Icon.Chevron className={`uyzn-chevron ${openMenu === "opps" ? "rotate-180" : ""}`} />
          </button>
          <button
            id="btn-employers"
            className="uyzn-nav-link"
            aria-haspopup="true"
            aria-expanded={openMenu === "employers"}
            aria-controls="menu-employers"
            onClick={() => setOpenMenu(openMenu === "employers" ? null : "employers")}
            title="For employers, sponsors, and institutions"
          >
            For Employers & Sponsors <Icon.Chevron className={`uyzn-chevron ${openMenu === "employers" ? "rotate-180" : ""}`} />
          </button>
          <button
            id="btn-learn"
            className="uyzn-nav-link"
            aria-haspopup="true"
            aria-expanded={openMenu === "learn"}
            aria-controls="menu-learn"
            onClick={() => setOpenMenu(openMenu === "learn" ? null : "learn")}
          >
            Learn <Icon.Chevron className={`uyzn-chevron ${openMenu === "learn" ? "rotate-180" : ""}`} />
          </button>
          <button
            id="btn-about"
            className="uyzn-nav-link"
            aria-haspopup="true"
            aria-expanded={openMenu === "about"}
            aria-controls="menu-about"
            onClick={() => setOpenMenu(openMenu === "about" ? null : "about")}
          >
            About <Icon.Chevron className={`uyzn-chevron ${openMenu === "about" ? "rotate-180" : ""}`} />
          </button>
        </nav>

        {/* Right: Utilities (desktop) */}
        <div className="uyzn-utility" aria-label="Utility">
          <form role="search" aria-label="Site search" onSubmit={handleSearch} className="uyzn-search-form">
            <input name="q" placeholder="Search jobs, scholarships, NSS…" className="uyzn-search-input" />
            <Icon.Search className="uyzn-search-icon" />
          </form>

          {authed ? (
            <>
              <NavLink to="/applications" className="uyzn-nav-link">My Applications</NavLink>
              <NavLink to="/account" className="uyzn-nav-link">Profile</NavLink>
              <button type="button" className="uyzn-nav-link" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="uyzn-nav-link">Sign in</NavLink>
              <NavLink to="/register" className="uyzn-cta">Create account</NavLink>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="uyzn-burger"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Icon.Menu />
        </button>
      </div>

      {/* Mega menus (desktop) */}
      <div className="uyzn-menu-wrap">
        {openMenu === "opps" && (
          <div id="menu-opps" className="uyzn-menu-panel" aria-labelledby="btn-opps">
            <div className="uyzn-menu-grid">
              <div className="uyzn-menu-cols">
                <MenuCard title="Jobs" desc="Apply to verified roles across Ghana—engineering, ICT, finance, operations, and more." to="/opportunities?type=job" />
                <MenuCard title="Scholarships" desc="Check eligibility, upload required documents, and track award decisions." to="/opportunities?type=scholarship" />
                <MenuCard title="Graduate Trainee" desc="Structured rotations with supervisor feedback and growth milestones." to="/opportunities?type=trainee" />
                <MenuCard title="National Service (NSS)" desc="Match to service placements and manage onboarding in one place." to="/opportunities?type=nss" />
              </div>
              <aside className="uyzn-filters">
                <h4 className="uyzn-filters-title">Quick filters</h4>
                <div className="uyzn-chips">
                  {["Tarkwa & Western", "Mining", "Engineering", "ICT", "Finance", "Deadline: This month"].map((f) => (
                    <span key={f} className="uyzn-chip">{f}</span>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        )}

        {openMenu === "employers" && (
          <div id="menu-employers" className="uyzn-menu-panel" aria-labelledby="btn-employers">
            <div className="uyzn-menu-grid uyzn-menu-grid-simple">
              <MenuLink title="Post a Job or Trainee Intake" desc="Create listings, manage shortlists, schedule interviews." to="/partners/post" />
              <MenuLink title="Sponsor a Scholarship" desc="Define criteria, review applicants, and award with audit trails." to="/partners/scholarships" />
              <MenuLink title="Talent Pools" desc="Search by skill, education, and location—export shortlists." to="/partners/talent" />
              <MenuLink title="Partner Portal" desc="Secure dashboard for cohorts, placements, and reports." to="/partners" />
              <MenuLink title="Impact & CSR Reports" desc="Track outcomes for board reporting and ESG disclosures." to="/partners/reports" />
            </div>
          </div>
        )}

        {openMenu === "learn" && (
          <div id="menu-learn" className="uyzn-menu-panel" aria-labelledby="btn-learn">
            <div className="uyzn-menu-grid uyzn-menu-grid-simple">
              <MenuLink title="How UYZN Works" desc="Profile once, apply everywhere." to="/learn/how-it-works" />
              <MenuLink title="Eligibility Checker" desc="Instant checks for scholarships and NSS." to="/learn/eligibility" />
              <MenuLink title="Application Guides" desc="CV templates, interview prep, statement of purpose tips." to="/learn/guides" />
              <MenuLink title="FAQs" desc="Deadlines, documents, and review timelines." to="/learn/faq" />
            </div>
          </div>
        )}

        {openMenu === "about" && (
          <div id="menu-about" className="uyzn-menu-panel" aria-labelledby="btn-about">
            <div className="uyzn-menu-grid uyzn-menu-grid-simple">
              <MenuLink title="About UYZN" desc="Mission, governance, and partners." to="/about" />
              <MenuLink title="Trust & Safety" desc="Verification, safeguarding, and reporting abuse." to="/trust" />
              <MenuLink title="Data & Privacy" desc="Your data, your control." to="/privacy" />
              <MenuLink title="Contact" desc="We’re here to help." to="/contact" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <MobileMenu
          onClose={() => setMobileOpen(false)}
          authed={authed}
          logo={uyznLogo}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
}

function MenuCard({ title, desc, to }) {
  return (
    <Link to={to} className="uyzn-menu-card">
      <div className="uyzn-menu-card-title">{title}</div>
      <div className="uyzn-menu-card-desc">{desc}</div>
      <div className="uyzn-menu-card-cta">Browse</div>
    </Link>
  );
}

function MenuLink({ title, desc, to }) {
  return (
    <Link to={to} className="uyzn-menu-card">
      <div className="uyzn-menu-card-title">{title}</div>
      <div className="uyzn-menu-card-desc">{desc}</div>
    </Link>
  );
}

function MobileMenu({ onClose, authed, logo, onLogout }) {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);

  // tiny helper to keep it DRY
  const Section = ({ title, items }) => (
    <div className="uyzn-mobile-section">
      <div className="uyzn-section-title">{title}</div>
      <div className="uyzn-section-list">
        {items.map((it) => (
          <Link
            key={it.to}
            to={it.to}
            className="uyzn-section-item"
            onClick={onClose}
          >
            {it.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="uyzn-mobile">
      <div className="uyzn-mobile-overlay" onClick={onClose} aria-hidden="true" />
      <div className="uyzn-mobile-drawer" role="dialog" aria-modal="true" aria-label="Mobile menu">
        <div className="uyzn-mobile-top">
          <div className="uyzn-mobile-brand">
            {logo && (
              <img
                src={logo}
                alt="Unity Youth Zone Network (UYZN)"
                width="28"
                height="28"
                decoding="async"
                className="uyzn-logo-img"
              />
            )}
            <span className="uyzn-logo-word">UYZN</span>
          </div>
          <button className="uyzn-mobile-close" onClick={onClose} aria-label="Close menu" ref={ref}>
            <Icon.X />
          </button>
        </div>

        {/* quick pills */}
        <div className="uyzn-mobile-grid">
          <Link to="/opportunities?type=job" className="btn-primary text-center" onClick={onClose}>Jobs</Link>
          <Link to="/opportunities?type=scholarship" className="btn-secondary text-center" onClick={onClose}>Scholarships</Link>
          <Link to="/opportunities?type=trainee" className="btn-ghost text-center" onClick={onClose}>Graduate Trainee</Link>
          <Link to="/opportunities?type=nss" className="btn-ghost text-center" onClick={onClose}>National Service</Link>
        </div>

        {/* sections */}
        <Section
          title="Opportunities"
          items={[
            { to: "/opportunities?type=job",          label: "Browse Jobs" },
            { to: "/opportunities?type=scholarship",   label: "Explore Scholarships" },
            { to: "/opportunities?type=trainee",       label: "Graduate Trainee Intakes" },
            { to: "/opportunities?type=nss",           label: "NSS Placements" },
          ]}
        />

        <Section
          title="For Employers & Sponsors"
          items={[
            { to: "/partners/post",         label: "Post a Job or Trainee Intake" },
            { to: "/partners/scholarships", label: "Sponsor a Scholarship" },
            { to: "/partners/talent",       label: "Talent Pools" },
            { to: "/partners",              label: "Partner Portal" },
            { to: "/partners/reports",      label: "Impact & CSR Reports" },
          ]}
        />

        <Section
          title="Learn"
          items={[
            { to: "/learn/how-it-works", label: "How UYZN Works" },
            { to: "/learn/eligibility",  label: "Eligibility Checker" },
            { to: "/learn/guides",       label: "Application Guides" },
            { to: "/learn/faq",          label: "FAQs" },
          ]}
        />

        <Section
          title="About"
          items={[
            { to: "/about",   label: "About UYZN" },
            { to: "/trust",   label: "Trust & Safety" },
            { to: "/privacy", label: "Data & Privacy" },
            { to: "/contact", label: "Contact" },
          ]}
        />

        {/* auth row */}
        <div className="uyzn-mobile-auth">
          {authed ? (
            <>
              <Link className="btn-ghost flex-1 text-center" to="/applications" onClick={onClose}>My Applications</Link>
              <Link className="btn-primary flex-1 text-center" to="/account" onClick={onClose}>Profile</Link>
              <button
                type="button"
                className="btn-ghost flex-1 text-center"
                onClick={() => { onLogout?.(); onClose(); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn-ghost flex-1 text-center" to="/login" onClick={onClose}>Sign in</Link>
              <Link className="btn-primary flex-1 text-center" to="/register" onClick={onClose}>Create account</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
