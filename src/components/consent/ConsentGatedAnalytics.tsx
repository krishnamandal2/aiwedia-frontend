"use client";

import { useEffect, useState } from "react";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import AnalyticsPageView from "@/components/seo/AnalyticsPageView";
import { readConsent } from "@/lib/cookies";

export default function ConsentGatedAnalytics() {
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const update = () => {
      const c = readConsent();
      setAnalytics(Boolean(c?.analytics));
    };
    update();
    window.addEventListener("aiwedia-cookie-consent", update);
    return () => window.removeEventListener("aiwedia-cookie-consent", update);
  }, []);

  if (!analytics) return null;

  return (
    <>
      <GoogleAnalytics />
      <AnalyticsPageView />
    </>
  );
}
