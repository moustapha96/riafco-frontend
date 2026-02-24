import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'RIAFCO | Réseau des Institutions Africaines de Financement des Collectivités locales';
const DEFAULT_DESCRIPTION_FR =
  "Le RIAFCO fédère les institutions africaines de financement des collectivités locales pour soutenir le développement territorial, l'investissement public local et l'accès aux financements durables.";
const DEFAULT_DESCRIPTION_EN =
  'RIAFCO brings together African local government financing institutions to support territorial development, local public investment and access to sustainable finance.';

const getOgLocale = (lang) => {
  if (!lang) return 'fr_FR';
  const lower = lang.toLowerCase();
  if (lower.startsWith('en')) return 'en_US';
  return 'fr_FR';
};

const buildCanonicalUrl = (pathname, canonicalPath) => {
  if (typeof window === 'undefined') return undefined;
  const base = window.location.origin;
  const path = canonicalPath || pathname || '/';
  try {
    return new URL(path, base).href;
  } catch {
    return `${base}${path}`;
  }
};

const upsertMeta = (selector, attributes) => {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes)
      .filter(([key]) => key === 'name' || key === 'property')
      .forEach(([key, value]) => element.setAttribute(key, value));
    document.head.appendChild(element);
  }
  if (attributes.content !== undefined) {
    element.setAttribute('content', attributes.content);
  }
};

const upsertLinkCanonical = (href) => {
  if (typeof document === 'undefined' || !href) return;
  let link = document.querySelector('link[rel=\"canonical\"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

export default function Seo({
  title,
  description,
  canonicalPath,
  lang = 'fr',
  ogType = 'website',
}) {
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const effectiveTitle = title || DEFAULT_TITLE;
    const effectiveDescription =
      description ||
      (lang && lang.toLowerCase().startsWith('en') ? DEFAULT_DESCRIPTION_EN : DEFAULT_DESCRIPTION_FR);

    // Title
    document.title = effectiveTitle;

    // Description
    upsertMeta('meta[name=\"description\"]', {
      name: 'description',
      content: effectiveDescription,
    });

    const canonicalUrl = buildCanonicalUrl(location.pathname, canonicalPath);
    if (canonicalUrl) {
      upsertLinkCanonical(canonicalUrl);
    }

    const ogLocale = getOgLocale(lang);

    // Open Graph
    upsertMeta('meta[property=\"og:title\"]', {
      property: 'og:title',
      content: effectiveTitle,
    });
    upsertMeta('meta[property=\"og:description\"]', {
      property: 'og:description',
      content: effectiveDescription,
    });
    if (canonicalUrl) {
      upsertMeta('meta[property=\"og:url\"]', {
        property: 'og:url',
        content: canonicalUrl,
      });
    }
    upsertMeta('meta[property=\"og:type\"]', {
      property: 'og:type',
      content: ogType,
    });
    upsertMeta('meta[property=\"og:site_name\"]', {
      property: 'og:site_name',
      content: 'RIAFCO',
    });
    upsertMeta('meta[property=\"og:locale\"]', {
      property: 'og:locale',
      content: ogLocale,
    });

    // Twitter
    upsertMeta('meta[name=\"twitter:card\"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    upsertMeta('meta[name=\"twitter:title\"]', {
      name: 'twitter:title',
      content: effectiveTitle,
    });
    upsertMeta('meta[name=\"twitter:description\"]', {
      name: 'twitter:description',
      content: effectiveDescription,
    });
  }, [title, description, canonicalPath, lang, ogType, location.pathname]);

  return null;
}

