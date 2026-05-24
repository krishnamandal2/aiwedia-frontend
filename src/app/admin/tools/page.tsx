"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientApi } from "@/lib/api-client";

type ToolRow = {
  _id: string;
  title: string;
  slug: string;
  rank?: number;
  editorScore?: number | null;
  editorsPick?: boolean;
  affiliateUrl?: string;
  category?: { slug: string; title: string };
};

export default function AdminToolsPage() {
  const router = useRouter();
  const [tools, setTools] = useState<ToolRow[]>([]);
  const [filter, setFilter] = useState("ai-tools");

  const load = () =>
    clientApi.admin.tools.list(filter).then((d) => setTools(d.tools as ToolRow[]));

  useEffect(() => {
    clientApi.admin.verify().then((r) => {
      if (!r.ok) router.push("/admin/login");
      else load();
    });
  }, [router, filter]);

  const update = async (id: string, patch: Partial<ToolRow>) => {
    await clientApi.admin.tools.update(id, patch);
    load();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link href="/admin/manage" className="text-sm text-indigo-600 hover:underline">
        ← Content hub
      </Link>
      <h1 className="mt-4 text-2xl font-bold">Tools</h1>

      <input
        className="mt-4 border rounded px-3 py-2 text-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="category slug filter"
      />

      <div className="mt-6 overflow-x-auto border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Rank</th>
              <th className="p-2">Score</th>
              <th className="p-2">Pick</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{t.title}</td>
                <td className="p-2">
                  <input
                    type="number"
                    className="w-16 border rounded px-1"
                    defaultValue={t.rank ?? 999}
                    onBlur={(e) =>
                      update(t._id, { rank: Number(e.target.value) })
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    min={1}
                    max={10}
                    className="w-16 border rounded px-1"
                    defaultValue={t.editorScore ?? ""}
                    onBlur={(e) =>
                      update(t._id, {
                        editorScore: e.target.value
                          ? Number(e.target.value)
                          : null,
                      })
                    }
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    defaultChecked={t.editorsPick}
                    onChange={(e) =>
                      update(t._id, { editorsPick: e.target.checked })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
