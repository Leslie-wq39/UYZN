import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";              // <-- this import is required
import App from "./App.jsx";
import { getConsent } from "@/lib/consent";
import ConsentBanner from "@/components/ConsentBanner.jsx";

if (getConsent()) {
   const s = document.createElement("script");
   s.async = true;
   s.src = "https://plausible.io/js/script.js"; // or GA4 tag
   s.setAttribute("data-domain", "uyzn.org");    // configure domain
   document.head.appendChild(s);
 }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ConsentBanner />
  </React.StrictMode>
);
