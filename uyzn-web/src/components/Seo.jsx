// src/components/Seo.jsx
import React from 'react';
import { SITE_URL, TITLE_SUFFIX } from '../config/seo';

export default function Seo({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
}) {
  const fullTitle = `${title}${TITLE_SUFFIX}`;
  const canonical =
    SITE_URL.replace(/\/$/, '') +
    (path || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const robots = noindex ? 'noindex,nofollow' : 'index,follow';

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={robots} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="UYZN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
