"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function UnsubscribePage() {
  const params = useParams();
  const token = Array.isArray(params.token) ? params.token[0] : params.token;

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) return;

    const unsubscribe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/unsubscribe/${token}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    unsubscribe();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="max-w-md text-center bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg">

        {status === "loading" && (
          <>
            <p className="text-white text-lg font-medium">
              Processing unsubscribe...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-2xl font-bold text-white mb-4">
              You have been unsubscribed
            </h1>

            <p className="text-slate-400 text-sm mb-6">
              You will no longer receive AIWedia newsletters.
            </p>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition"
            >
              Go to Homepage
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-bold text-white mb-4">
              Invalid Unsubscribe Link
            </h1>

            <p className="text-slate-400 text-sm mb-6">
              This unsubscribe link is invalid or already used.
            </p>

            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition"
            >
              Go to Homepage
            </Link>
          </>
        )}

      </div>
    </div>
  );
}