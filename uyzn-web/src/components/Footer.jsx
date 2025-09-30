import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState({ type: "idle", text: "" });

  function onSubscribe(e) {
    e.preventDefault();
    // simple client-side check; replace with real API later
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setMsg({ type: "error", text: "Please enter a valid email." });
      return;
    }
    setMsg({ type: "success", text: "Thanks—you’re subscribed." });
    setEmail("");
  }

  return (
    <footer role="contentinfo" className="uyzn-footer">
      <div className="uyzn-footer__inner">

        {/* Top: brand blurb + newsletter */}
        <div className="uyzn-footer__top">
          <div className="uyzn-brand">
            <div className="uyzn-brand__mark" aria-hidden="true" />
            <div>
              <div className="uyzn-brand__name">Unity Youth Zone Network (UYZN)</div>
              <p className="uyzn-brand__blurb">
                Connects Ghana’s youth to <strong>Jobs</strong>, <strong>Scholarships</strong>,
                <strong> Graduate Trainee</strong> programmes, and <strong>National Service</strong> —
                with verified listings and transparent tracking.
              </p>
            </div>
          </div>

          <form className="uyzn-news" onSubmit={onSubscribe} aria-labelledby="newsletter-title">
            <div id="newsletter-title" className="uyzn-news__title">Get new opportunities in your inbox</div>
            <div className="uyzn-news__help">Weekly email with verified jobs, scholarships, and deadlines.</div>
            <div className="uyzn-news__row">
              <input
                type="email"
                inputMode="email"
                name="email"
                aria-label="Email address"
                placeholder="Enter your email"
                className="uyzn-news__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn-primary uyzn-news__btn" type="submit">Subscribe</button>
            </div>
            {msg.type !== "idle" && (
              <div
                className={`uyzn-news__msg ${msg.type === "error" ? "is-error" : "is-success"}`}
                role="alert"
              >
                {msg.text}
              </div>
            )}
            <div className="uyzn-news__fineprint">You can unsubscribe anytime.</div>
          </form>
        </div>

        {/* Middle: link columns */}
        <nav className="uyzn-links" aria-label="Footer">
          <FooterCol title="Opportunities">
            <FooterItem to="/opportunities?type=job" label="Browse Jobs" sub="Verified roles across Ghana" />
            <FooterItem to="/opportunities?type=scholarship" label="Scholarships" sub="Eligibility, documents, decisions" />
            <FooterItem to="/opportunities?type=trainee" label="Graduate Trainee Intakes" sub="Rotations & feedback" />
            <FooterItem to="/opportunities?type=nss" label="National Service (NSS)" sub="Match & manage placements" />
            <FooterItem to="/learn/eligibility" label="Eligibility Checker" />
            <FooterItem to="/opportunities?deadline=month" label="Deadlines" sub="This week · This month" />
          </FooterCol>

          <FooterCol title="For Employers & Sponsors">
            <FooterItem to="/partners/post" label="Post a Job / Trainee Intake" sub="Create listings & manage funnels" />
            <FooterItem to="/partners/scholarships" label="Sponsor a Scholarship" sub="Criteria, reviewers, audit trail" />
            <FooterItem to="/partners" label="Partner Portal" sub="Secure dashboards & reports" />
            <FooterItem to="/partners/talent" label="Talent Pools" sub="Search skills, location, education" />
            <FooterItem to="/partners/reports" label="Impact & CSR Reports" sub="Board/ESG reporting" />
            <FooterItem to="/contact?type=partnerships" label="Contact Partnerships" sub="Build local pipelines in Tarkwa" />
          </FooterCol>

          <FooterCol title="Learn">
            <FooterItem to="/learn/how-it-works" label="How UYZN Works" sub="One profile, many paths" />
            <FooterItem to="/learn/guides" label="Application Guides" sub="CV, interviews, SOPs" />
            <FooterItem to="/learn/stories" label="Success Stories" />
            <FooterItem to="/learn/faq" label="FAQs" sub="Docs, timelines, status" />
            <FooterItem to="/help" label="Help Center" sub="Articles & contact" />
          </FooterCol>

          <FooterCol title="Company">
            <FooterItem to="/about" label="About UYZN" sub="Mission, governance, partners" />
            <FooterItem to="/trust" label="Trust & Safety" sub="Verification, safeguarding, reporting" />
            <FooterItem to="/privacy" label="Data & Privacy" sub="Your rights and choices" />
            <FooterItem to="/accessibility" label="Accessibility" sub="Request accommodations" />
            <FooterItem to="/contact" label="Contact Us" sub="Support & media" />
            <FooterItem to="/careers" label="Careers at UYZN" sub="Join the team" />
          </FooterCol>

          <FooterCol title="Region & Language">
            <div className="uyzn-meta">
              <div><span className="uyzn-meta__label">Region:</span> Ghana · <strong>Tarkwa & Western Region</strong> <Link to="/settings/region" className="uyzn-meta__link">Change</Link></div>
              <div><span className="uyzn-meta__label">Language:</span> English <Link to="/settings/language" className="uyzn-meta__link">Change</Link></div>
            </div>
            <div className="uyzn-contacts">
              <div className="uyzn-contacts__title">Contact</div>
              <a href="mailto:support@uyzn.org" className="uyzn-contacts__item">Support: support@uyzn.org</a>
              <a href="mailto:partners@uyzn.org" className="uyzn-contacts__item">Partnerships: partners@uyzn.org</a>
              <a href="mailto:press@uyzn.org" className="uyzn-contacts__item">Media: press@uyzn.org</a>
            </div>
          </FooterCol>
        </nav>

        {/* Bottom bar */}
        <div className="uyzn-bottom">
          <div className="uyzn-bottom__left">
            <Link to="/privacy" className="uyzn-bottom__link">Privacy Policy</Link>
            <Link to="/terms" className="uyzn-bottom__link">Terms of Use</Link>
            <Link to="/cookies" className="uyzn-bottom__link">Cookie Preferences</Link>
            <Link to="/aup" className="uyzn-bottom__link">Acceptable Use</Link>
          </div>

          <div className="uyzn-bottom__center">
            <p className="uyzn-disclaimer">
              Postings are verified; selection is not guaranteed. Scholarship awards are determined by sponsors.
              National Service placements follow applicable national guidelines and processes.
            </p>
            <p className="uyzn-disclaimer">
              We respect data-protection and safeguarding principles. Report concerns via <Link to="/trust" className="uyzn-bottom__link">Trust & Safety</Link>.
            </p>
          </div>

          <div className="uyzn-bottom__right">
            <div className="uyzn-social">
              <a href="#" aria-label="LinkedIn" className="uyzn-social__icon">in</a>
              <a href="#" aria-label="X (Twitter)" className="uyzn-social__icon">𝕏</a>
              <a href="#" aria-label="Facebook" className="uyzn-social__icon">f</a>
              <a href="#" aria-label="YouTube" className="uyzn-social__icon">▶</a>
            </div>
            <div className="uyzn-utils">
              <Link to="/report" className="uyzn-bottom__link">Report an Issue</Link>
              <Link to="/status" className="uyzn-bottom__link">System Status</Link>
              <Link to="/sitemap" className="uyzn-bottom__link">Sitemap</Link>
              <a href="#top" className="uyzn-bottom__link">Back to Top</a>
            </div>
          </div>
        </div>

        <div className="uyzn-copy">© {new Date().getFullYear()} Unity Youth Zone Network (UYZN). All rights reserved.</div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <section className="uyzn-col">
      <h3 className="uyzn-col__title">{title}</h3>
      <ul className="uyzn-col__list">{children}</ul>
    </section>
  );
}

function FooterItem({ to, label, sub }) {
  return (
    <li className="uyzn-item">
      <Link to={to} className="uyzn-item__link">{label}</Link>
      {sub ? <div className="uyzn-item__sub">{sub}</div> : null}
    </li>
  );
}
