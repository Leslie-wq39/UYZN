// src/layouts/SiteLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      {/* Add id="top" for “Back to Top” anchor */}
      <div id="top" />
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
