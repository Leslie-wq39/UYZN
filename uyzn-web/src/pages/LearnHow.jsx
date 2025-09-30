import React from "react";
import Seo from "../components/Seo";

export default function LearnHow() {
  return (
    <>
      <Seo title="How UYZN Works | UYZN" description="Profile once, apply everywhere across Jobs, Scholarships, Trainee and NSS." path="/learn/how-it-works" />
      <main className="learn">
        <section className="l-hero">
          <div className="l-wrap py-10">
            <h1 className="l-h1">How UYZN Works</h1>
            <p className="l-sub">Create one verified profile and reuse it across all four pillars.</p>
          </div>
        </section>

        <section className="l-section">
          <div className="l-wrap">
            <ol className="l-steps">
              <li><strong>Create your profile</strong> — personal info, education, skills, docs.</li>
              <li><strong>Browse opportunities</strong> — jobs, scholarships, trainee, NSS.</li>
              <li><strong>Apply with one click</strong> — reuse your verified profile.</li>
              <li><strong>Track applications</strong> — statuses, deadlines, reviewer notes.</li>
              <li><strong>Accept offers & onboard</strong> — confirm placement/award digitally.</li>
            </ol>
            <ul className="l-bullets">
              <li>Saves time (no duplicate forms)</li>
              <li>Builds trust (verification prevents fraud)</li>
              <li>Fair process (same profile data across applications)</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
