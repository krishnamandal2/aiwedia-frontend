/** Google Analytics 4 — set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID || GTM_ID);
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** SPA page views (App Router) */
export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/** Custom events — e.g. trackEvent('select_tool', { tool_name: 'Cursor' }) */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

/** Outbound link clicks to tool websites */
export function trackOutboundLink(url: string, label?: string) {
  trackEvent("click_outbound", {
    link_url: url,
    link_text: label || url,
  });
}
