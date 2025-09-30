import React from "react";
import Seo from "../../components/Seo";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact UYZN — Support, Partnerships, Press"
        description="Contact UYZN for support, partnerships, press & media. We’re here to help."
        path="/contact"
      />
      <section className="a-hero">
        <div className="a-wrap py-12">
          <h1 className="a-h1 a-h1--pill">Contact</h1>
          <p className="a-sub">We’re here to help.</p>
        </div>
      </section>

      <section className="a-section">
        <div className="a-wrap a-two">
          <article className="a-prose">
            <h2 className="a-h2">Contact options</h2>
            <ul className="a-list">
              <li><strong>Support:</strong> <a href="mailto:support@uyzn.org">support@uyzn.org</a></li>
              <li><strong>Partnerships:</strong> <a href="mailto:partners@uyzn.org">partners@uyzn.org</a></li>
              <li><strong>Press & Media:</strong> <a href="mailto:press@uyzn.org">press@uyzn.org</a></li>
              <li><strong>Phone:</strong> +233 (0) XXX XXX XXX</li>
              <li><strong>Office:</strong> Accra HQ · Satellite desk in Tarkwa</li>
            </ul>

            <p className="muted">
              For safety or fraud concerns, please use the in-app “Report a problem” tool in your dashboard.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
