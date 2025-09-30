// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./hooks/queryClient";
import { lazy, Suspense } from "react";

import SiteLayout from "./layouts/SiteLayout";
import ErrorBoundary from "@/components/ErrorBoundary";      // requires Vite alias @
import ProtectedRoute from "./routes/ProtectedRoute";        // make sure this file exists
import NotFound from "./pages/NotFound";                     // make sure this file exists

// Lazy pages (code-splitting)
const Homepage             = lazy(() => import("./pages/Homepage"));
const Opportunities        = lazy(() => import("./pages/Opportunities"));
const Employers            = lazy(() => import("./pages/Employers"));

const PartnersPost         = lazy(() => import("./pages/PartnersPost"));
const PartnersScholarships = lazy(() => import("./pages/PartnersScholarships"));
const PartnersTalent       = lazy(() => import("./pages/PartnersTalent"));
const PartnersPortal       = lazy(() => import("./pages/PartnersPortal"));
const PartnersReports      = lazy(() => import("./pages/PartnersReports"));

const Learn                = lazy(() => import("./pages/Learn"));
const LearnHow             = lazy(() => import("./pages/LearnHow"));
const LearnEligibility     = lazy(() => import("./pages/LearnEligibility"));
const LearnGuides          = lazy(() => import("./pages/LearnGuides"));
const LearnFaq             = lazy(() => import("./pages/LearnFaq"));

const About                = lazy(() => import("./pages/about/About"));
const AboutCompany         = lazy(() => import("./pages/about/AboutCompany"));
const TrustSafety          = lazy(() => import("./pages/about/TrustSafety"));
const DataPrivacy          = lazy(() => import("./pages/about/DataPrivacy"));
const Contact              = lazy(() => import("./pages/about/Contact"));

const SignIn               = lazy(() => import("./pages/SignIn"));
const Register             = lazy(() => import("./pages/Register"));
const Account              = lazy(() => import("./pages/Account"));
const Applications         = lazy(() => import("./pages/Applications")); // <-- add this page or remove the route

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <SiteLayout>
            <Suspense fallback={<div className="p-6">Loading…</div>}>
              <Routes>
                {/* Public */}
                <Route path="/" element={<Homepage />} />
                <Route path="/opportunities" element={<Opportunities />} />
                <Route path="/employers" element={<Employers />} />

                {/* Partners */}
                <Route path="/partners" element={<PartnersPortal />} /> {/* use portal here */}
                <Route path="/partners/post" element={<PartnersPost />} />
                <Route path="/partners/scholarships" element={<PartnersScholarships />} />
                <Route path="/partners/talent" element={<PartnersTalent />} />
                <Route path="/partners/reports" element={<PartnersReports />} />

                {/* Learn */}
                <Route path="/learn" element={<Learn />} />
                <Route path="/learn/how-it-works" element={<LearnHow />} />
                <Route path="/learn/eligibility" element={<LearnEligibility />} />
                <Route path="/learn/guides" element={<LearnGuides />} />
                <Route path="/learn/faq" element={<LearnFaq />} />

                {/* About */}
                <Route path="/about" element={<About />} />
                <Route path="/about/company" element={<AboutCompany />} />
                <Route path="/trust" element={<TrustSafety />} />
                <Route path="/privacy" element={<DataPrivacy />} />
                <Route path="/contact" element={<Contact />} />

                {/* Auth */}
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<Register />} />

                {/* Protected */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/account" element={<Account />} />
                  <Route path="/applications" element={<Applications />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </SiteLayout>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
