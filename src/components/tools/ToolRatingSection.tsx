"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

type RatingStats = {
  average: number;
  count: number;
  yourRating?: number;
};

export default function ToolRatingSection({
  categorySlug,
  toolSlug,
}: {
  categorySlug: string;
  toolSlug: string;
}) {
  const [stats, setStats] = useState<RatingStats>({ average: 0, count: 0 });
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [picked, setPicked] = useState(0);

  const API = process.env.NEXT_PUBLIC_API_URL;
  const base = `${API}/api/tools/${encodeURIComponent(categorySlug)}/${encodeURIComponent(toolSlug)}/ratings`;

  useEffect(() => {
    if (!API) return;
    const headers: HeadersInit = {};
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) headers.Authorization = `Bearer ${token}`;

    fetch(base, { headers })
      .then((r) => r.json())
      .then((d) =>
        setStats({
          average: d.average || 0,
          count: d.count || 0,
          yourRating: d.yourRating,
        })
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [API, base]);

  const submit = async (rating: number) => {
    if (!API || submitting) return;
    setSubmitting(true);
    setPicked(rating);
    try {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      const token = localStorage.getItem("token");
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(base, {
        method: "POST",
        headers,
        body: JSON.stringify({ rating }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not save rating");
        return;
      }
      setStats({
        average: data.average,
        count: data.count,
        yourRating: data.yourRating,
      });
      toast.success(
        data.savedToAccount
          ? "Rating saved to your account!"
          : "Thanks for rating this tool!"
      );
    } catch {
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="border-t border-slate-100 px-6 py-6 sm:px-8">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
        Community rating
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              disabled={submitting}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => submit(n)}
              className="rounded p-0.5 transition hover:scale-110 disabled:opacity-50"
              aria-label={`Rate ${n} stars`}
            >
              <Star
                size={28}
                className={
                  n <= (hover || picked || stats.yourRating || 0)
                    ? "fill-amber-400 text-amber-500"
                    : "text-slate-300"
                }
              />
            </button>
          ))}
        </div>
        {!loading && (
          <p className="text-sm text-slate-600">
            {stats.count > 0 ? (
              <>
                <span className="font-bold text-slate-900">{stats.average}</span>
                <span className="text-slate-400"> / 5</span>
                <span className="text-slate-400"> · {stats.count} ratings</span>
              </>
            ) : (
              <span className="text-slate-500">Be the first to rate this tool</span>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
