export const COOKIE_CONSENT_KEY = "aiwedia_cookie_consent_v1";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

export const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  updatedAt: new Date().toISOString(),
};

export function parseConsent(raw: string | null): CookieConsent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as CookieConsent;
    if (typeof data.analytics !== "boolean") return null;
    return { necessary: true, analytics: data.analytics, updatedAt: data.updatedAt || "" };
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean): CookieConsent {
  const consent: CookieConsent = {
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent("aiwedia-cookie-consent", { detail: consent }));
  }
  return consent;
}

export function readConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  return parseConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
}
