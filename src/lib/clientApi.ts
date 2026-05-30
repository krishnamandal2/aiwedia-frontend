/**
 * Browser-side API URLs. On production (phone/tablet), never call localhost —
 * use same-origin paths proxied by Next.js rewrites in next.config.
 */
export function clientApiUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const configured =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

  if (typeof window === "undefined") {
    return configured ? `${configured}${normalized}` : normalized;
  }

  const host = window.location.hostname;
  const isLocalDev =
    host === "localhost" ||
    host === "127.0.0.1" ||
    /^192\.168\.\d{1,3}\.\d{1,3}$/.test(host);

  if (process.env.NEXT_PUBLIC_API_SAME_ORIGIN === "1" || !configured) {
    return normalized;
  }

  if (configured.includes("localhost") && !isLocalDev) {
    return normalized;
  }

  if (
    window.location.protocol === "https:" &&
    configured.startsWith("http://")
  ) {
    return normalized;
  }

  return `${configured}${normalized}`;
}
