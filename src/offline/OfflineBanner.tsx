"use client";

import { useEffect, useState } from "react";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  const checkServer = async () => {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/health`,
        { signal: controller.signal }
      );

      clearTimeout(timeout);
      setIsOffline(!res.ok);
    } catch {
      setIsOffline(true);
    }
  };

  useEffect(() => {
    // 1️⃣ Detect internet instantly
    const updateOnlineStatus = () => {
      if (!navigator.onLine) {
        setIsOffline(true);
      } else {
        checkServer(); // only check server when back online
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus(); // initial check

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    // 2️⃣ Retry ONLY when offline (not always)
    if (!isOffline) return;

    const interval = setInterval(checkServer, 10000); // retry every 10s
    return () => clearInterval(interval);
  }, [isOffline]);

  useEffect(() => {
    document.body.classList.toggle("offline", isOffline);
  }, [isOffline]);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <div className="w-full bg-red-500 text-white flex items-center justify-center px-3 py-2 text-sm shadow-md">
        ⚠️ Server is offline. Some features may not work.
      </div>
    </div>
  );
}