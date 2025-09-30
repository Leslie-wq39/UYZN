import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as api from "../lib/api";


// ---------- API fallback ----------
const defaultBase = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
const defaultGetJSON = async (path) => {
  const url = path.startsWith("http") ? path : `${defaultBase}${path.startsWith("/") ? "" : "/"}${path}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.message || `Failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
};
const getJSON = api.getJSON ?? defaultGetJSON;

// ---------- UI helpers ----------
const fmt = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" });
const statusStyles = {
  submitted: "bg-gray-100 text-gray-700",
  "under review": "bg-blue-100 text-blue-700",
  shortlisted: "bg-amber-100 text-amber-800",
  interview: "bg-indigo-100 text-indigo-700",
  awarded: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
};

function Badge({ status }) {
  const cls = statusStyles[status?.toLowerCase?.()] || "bg-gray-100 text-gray-700";
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
}

function Progress({ value }) {
  const v = Math.max(0, Math.min(100, Math.round(value || 0)));
  return (
    <div className="acc-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={v} aria-label="Profile completion">
      <div className="acc-meter-bar" style={{ width: `${v}%` }} />
    </div>
  );
}

// Accessible Tabs
function Tabs({ tabs, value, onChange }) {
  const listRef = useRef(null);
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    function onKey(e) {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const items = Array.from(el.querySelectorAll('[role="tab"]'));
      const idx = items.findIndex((n) => n.getAttribute("data-key") === value);
      let next = idx;
      if (e.key === "ArrowRight") next = (idx + 1) % items.length;
      if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = items.length - 1;
      const nextKey = items[next]?.getAttribute("data-key");
      if (nextKey) onChange(nextKey);
      items[next]?.focus();
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [value, onChange]);

  return (
    <div role="tablist" aria-label="Applications categories" ref={listRef} className="acc-tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          type="button"
          data-key={t.key}
          aria-selected={value === t.key}
          aria-controls={`panel-${t.key}`}
          id={`tab-${t.key}`}
          className={`acc-tab ${value === t.key ? "is-active" : ""}`}
          onClick={() => onChange(t.key)}
        >
          {t.label}
          <span className="acc-tab-count">{t.count}</span>
        </button>
      ))}
    </div>
  );
}

function AppCard({ item }) {
  return (
    <article className="acc-card">
      <div className="acc-app-head">
        <div>
          <h4 className="acc-app-title">{item.title}</h4>
          <p className="acc-app-org">{item.org}</p>
        </div>
        <Badge status={item.status} />
      </div>
      <div className="acc-app-meta">
        <span>Applied: {fmt.format(new Date(item.appliedAt))}</span>
        {item.deadline && <span>Deadline: {fmt.format(new Date(item.deadline))}</span>}
      </div>
      <div className="acc-actions">
        <Link to={`/opportunity/${item.slug || item.id}`} className="btn btn-ghost">View Details</Link>
        {item.missing && <Link to={`/applications/${item.id}/docs`} className="btn btn-secondary">Upload Docs</Link>}
        <button type="button" className="btn" onClick={() => alert("Withdraw action (wire to API)")}>Withdraw</button>
      </div>
    </article>
  );
}

// ---------- Fallback demo data ----------
const fallbackProfile = { name: "Alex Mensah", location: "Tarkwa, Ghana", education: "BSc Mining Engineering", skills: ["AutoCAD", "Safety", "GIS"], photo: null, completion: 80 };
const fallbackApplications = {
  jobs: [
    { id: 1, title: "Junior Engineer", org: "AngloGold Tarkwa", status: "Under Review", appliedAt: "2025-09-10", deadline: "2025-10-05", slug: "junior-engineer" },
    { id: 2, title: "Field Technician", org: "Gold Fields", status: "Submitted", appliedAt: "2025-09-18", deadline: "2025-10-02", slug: "field-technician", missing: true },
  ],
  scholarships: [{ id: 3, title: "STEM Excellence Scholarship", org: "UYZN", status: "Shortlisted", appliedAt: "2025-08-30", deadline: "2025-10-15" }],
  trainee: [{ id: 4, title: "Graduate Trainee — Process Plant", org: "AngloGold Tarkwa", status: "Interview", appliedAt: "2025-09-01" }],
  nss: [],
};
const fallbackDeadlines = [
  { id: "d1", title: "Complete NSS placement form", date: "2025-09-27" },
  { id: "d2", title: "Upload transcript for scholarship", date: "2025-09-29" },
];
const fallbackRecs = [
  { id: "r1", title: "Graduate Trainee — Mining Ops", org: "AngloGold Tarkwa", tag: "Engineering" },
  { id: "r2", title: "Bursary — Final-Year STEM", org: "Mining Foundation", tag: "Scholarship" },
];

export default function Account() {
  // Call hooks unconditionally; gate UI later
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: profile = fallbackProfile } = useQuery({
    queryKey: ["me"],
    queryFn: () => getJSON("/me"),
    enabled: !!token,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: applications = fallbackApplications } = useQuery({
    queryKey: ["applications", "all"],
    queryFn: () => getJSON("/applications"),
    enabled: !!token,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: deadlines = fallbackDeadlines } = useQuery({
    queryKey: ["deadlines"],
    queryFn: () => getJSON("/deadlines?scope=week"),
    enabled: !!token,
    staleTime: 15_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const { data: recs = fallbackRecs } = useQuery({
    queryKey: ["recs"],
    queryFn: () => getJSON("/recommendations"),
    enabled: !!token,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const [tab, setTab] = useState("jobs");
  const tabs = useMemo(
    () => [
      { key: "jobs", label: "Jobs", count: (applications?.jobs || []).length },
      { key: "scholarships", label: "Scholarships", count: (applications?.scholarships || []).length },
      { key: "trainee", label: "Graduate Trainee", count: (applications?.trainee || []).length },
      { key: "nss", label: "National Service", count: (applications?.nss || []).length },
    ],
    [applications]
  );
  const list = applications?.[tab] || [];

  // Safe to gate after hooks
  if (!token) return <Navigate to="/login" replace />;

  return (
    <main className="acc-page">
      {/* Welcome */}
      <section className="acc-welcome">
        <h1 className="acc-welcome-title">Welcome back, {profile?.firstName || profile?.name?.split(" ")[0] || "friend"}.</h1>
        <p className="acc-welcome-sub">Here’s where you stand on your opportunities today.</p>
      </section>

      <div className="acc-grid">
        {/* Main */}
        <div className="acc-main">
          {/* Profile Snapshot */}
          <section className="acc-card">
            <div className="acc-profile">
              {profile?.photo ? (
                <img src={profile.photo} alt="" width="64" height="64" className="acc-avatar" loading="lazy" decoding="async" />
              ) : (
                <div aria-hidden className="acc-avatar placeholder">{(profile?.name || "U").slice(0, 1)}</div>
              )}

              <div className="acc-profile-body">
                <h2 className="acc-profile-name">{profile?.name || "Your Name"}</h2>
                <p className="acc-profile-meta">
                  {[profile?.location, profile?.education].filter(Boolean).join(" · ") || "Add your profile details"}
                </p>

                {Array.isArray(profile?.skills) && profile.skills.length > 0 && (
                  <div className="acc-skills">
                    {profile.skills.slice(0, 5).map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>
                )}

                <div className="acc-progress">
                  <div className="acc-progress-row">
                    <span className="acc-progress-label">Profile completion</span>
                    <span className="acc-progress-value">{Math.round(profile?.completion ?? 0)}%</span>
                  </div>
                  <Progress value={profile?.completion} />
                </div>

                <div className="acc-quick">
                  <Link className="btn" to="/account/edit">Edit Profile</Link>
                  <Link className="btn" to="/account/documents">Upload Documents</Link>
                  <Link className="btn btn-ghost" to="/u/me">View Public Profile</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Applications */}
          <section className="acc-card">
            <div className="acc-section-head">
              <h3 className="acc-section-title">Your Applications</h3>
            </div>

            <Tabs tabs={tabs} value={tab} onChange={setTab} />

            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="acc-panel">
              {list.length === 0 ? (
                <div className="acc-empty">
                  No {tabs.find((t) => t.key === tab)?.label.toLowerCase()} yet.{" "}
                  <Link to="/opportunities" className="si-link">Browse opportunities</Link>.
                </div>
              ) : (
                list.map((item) => <AppCard key={item.id} item={item} />)
              )}
            </div>
          </section>

          {/* Recommended */}
          <section className="acc-card">
            <div className="acc-section-head">
              <h3 className="acc-section-title">Recommended for you</h3>
              <Link to="/opportunities" className="btn btn-ghost">See all</Link>
            </div>
            <div className="acc-recs">
              {(recs || []).map((r) => (
                <article key={r.id} className="acc-rec">
                  <h4 className="acc-rec-title">{r.title}</h4>
                  <p className="acc-rec-sub">{r.org} · {r.tag}</p>
                  <div className="acc-rec-actions">
                    <Link to={`/opportunity/${r.id}`} className="btn btn-primary">Apply Now</Link>
                    <button className="btn btn-ghost" type="button">Save</button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="acc-sidebar">
          <section className="acc-card">
            <h3 className="acc-section-title mb-2">This week</h3>
            {(deadlines || []).length === 0 ? (
              <p className="acc-muted">No deadlines this week.</p>
            ) : (
              <ul className="acc-deadlines">
                {deadlines.map((d) => (
                  <li key={d.id} className="acc-deadline">
                    <div className="acc-deadline-date">{fmt.format(new Date(d.date))}</div>
                    <div className="acc-deadline-title">{d.title}</div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="acc-card">
            <h3 className="acc-section-title mb-2">Resources & Support</h3>
            <ul className="acc-list">
              <li><Link to="/learn/cv-template" className="si-link">CV template</Link></li>
              <li><Link to="/learn/interview-prep" className="si-link">Interview prep</Link></li>
              <li><Link to="/learn/sop" className="si-link">Statement of Purpose tips</Link></li>
              <li><Link to="/help" className="si-link">Contact Help Desk</Link></li>
            </ul>
          </section>

          <section className="acc-trust">
            <p className="acc-muted">All opportunities on UYZN are verified. Found something suspicious?</p>
            <button className="btn btn-secondary mt-3" type="button" onClick={() => alert("Report flow (wire to API)")}>
              Report Issue
            </button>
          </section>

          <section className="acc-card">
            <h3 className="acc-section-title mb-2">Account</h3>
            <ul className="acc-list">
              <li><Link to="/account/documents" className="si-link">Documents</Link></li>
              <li><Link to="/saved" className="si-link">Saved Opportunities</Link></li>
              <li><Link to="/messages" className="si-link">Messages</Link></li>
              <li><Link to="/settings" className="si-link">Settings (2FA, notifications)</Link></li>
              <li><Link to="/logout" className="si-link">Logout</Link></li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
