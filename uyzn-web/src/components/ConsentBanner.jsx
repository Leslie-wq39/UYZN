import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!getConsent());
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-black/80 text-white p-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm flex-1">
          We use cookies for analytics to improve UYZN. Do you consent?
        </p>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={() => { setConsent(true); setShow(false); }}>
            Accept
          </button>
          <button className="btn" onClick={() => { setConsent(false); setShow(false); }}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
