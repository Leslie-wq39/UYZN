import React from "react";
import Seo from "../../components/Seo";

export default function AboutCompany() {
  return (
    <>
      <Seo
        title="About UYZN — Mission, Governance, Partners"
        description="Unity Youth Zone Network (UYZN) opens doors to jobs, scholarships, graduate trainee programs, and national service placements."
        path="/about/company"
      />
      <section className="a-hero">
        <div className="a-wrap py-12">
          <h1 className="a-h1 a-h1--pill">Mission, governance, and partners</h1>
          <p className="a-sub">Who we are and how we’re accountable.</p>
        </div>
      </section>

      <section className="a-section">
        <div className="a-wrap a-two">
          <article className="a-prose">
            <h2 className="a-h2">Our mission</h2>
            <p>
              <strong>Unity Youth Zone Network (UYZN)</strong> exists to{" "}
              <em>open doors of opportunity</em> for young people in Ghana by providing one
              verified hub for Jobs, Scholarships, Graduate Trainee programs, and National Service.
            </p>

            <h3 className="a-h3">Governance</h3>
            <ul className="a-list">
              <li><strong>Board of Advisors:</strong> Education, youth development, and CSR experts.</li>
              <li><strong>Management:</strong> Technology, HR, and youth engagement professionals.</li>
              <li><strong>Community representation:</strong> Youth voices from Western Region and beyond.</li>
            </ul>

            <h3 className="a-h3">Partners</h3>
            <p>
              We collaborate with corporates, universities, NGOs, donors, and government bodies to verify listings and
              deliver measurable impact.
            </p>
          </article>

          <aside className="a-aside">
            <h4 className="a-h4">At a glance</h4>
            <ul className="a-kpis">
              <li><strong>4</strong> pillars in one platform</li>
              <li><strong>Verified</strong> partners and listings</li>
              <li><strong>Transparent</strong> applicant tracking</li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
