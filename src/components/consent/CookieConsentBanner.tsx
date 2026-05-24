"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Settings2, X } from "lucide-react";
import {
  readConsent,
  saveConsent,
  type CookieConsent,
} from "@/lib/cookies";

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("aiwedia-open-cookie-settings"));
  }
}

export default function CookieConsentBanner() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const sync = useCallback(() => {
    const stored = readConsent();
    setConsent(stored);
    if (stored) setAnalytics(stored.analytics);
  }, []);

  useEffect(() => {
    sync();
    setReady(true);
    const onConsent = () => sync();
    const onOpenSettings = () => {
      sync();
      setShowPrefs(true);
    };
    window.addEventListener("aiwedia-cookie-consent", onConsent);
    window.addEventListener("aiwedia-open-cookie-settings", onOpenSettings);
    return () => {
      window.removeEventListener("aiwedia-cookie-consent", onConsent);
      window.removeEventListener("aiwedia-open-cookie-settings", onOpenSettings);
    };
  }, [sync]);

  if (!ready) return null;
  if (consent !== null && !showPrefs) return null;

  const acceptAll = () => {
    setConsent(saveConsent(true));
    setShowPrefs(false);
  };

  const rejectOptional = () => {
    setConsent(saveConsent(false));
    setAnalytics(false);
    setShowPrefs(false);
  };

  const savePreferences = () => {
    setConsent(saveConsent(analytics));
    setShowPrefs(false);
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[1200] p-3 sm:p-4"
      role="dialog"
      aria-label="Cookie consent"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/20 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Cookie size={20} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-slate-900 sm:text-base">
              {showPrefs ? "Cookie preferences" : "We use cookies"}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {showPrefs
                ? "Necessary cookies keep the site working. You can opt in to analytics."
                : "We use necessary cookies for the site. With your permission we use analytics to improve AIWedia."}{" "}
              <Link href="/cookies" className="font-semibold text-violet-600 underline">
                Cookie policy
              </Link>{" "}
              ·{" "}
              <Link href="/privacy" className="font-semibold text-violet-600 underline">
                Privacy
              </Link>
            </p>

            {showPrefs && (
              <label className="mt-4 flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                <div>
                  <span className="block text-sm font-semibold text-slate-900">
                    Analytics cookies
                  </span>
                  <span className="text-xs text-slate-500">
                    Google Analytics — page views and traffic
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-5 w-5 shrink-0 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                />
              </label>
            )}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {showPrefs ? (
                <>
                  <button
                    type="button"
                    onClick={savePreferences}
                    className="min-h-[44px] rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-500"
                  >
                    Save preferences
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="min-h-[44px] rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Accept all
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="min-h-[44px] rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-violet-500"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    onClick={rejectOptional}
                    className="min-h-[44px] rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Reject non-essential
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPrefs(true)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Settings2 size={16} />
                    Manage
                  </button>
                </>
              )}
            </div>
          </div>
          {showPrefs && consent !== null && (
            <button
              type="button"
              onClick={() => setShowPrefs(false)}
              className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
