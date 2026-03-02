"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL 

type Blog = {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  createdAt?: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Verify admin + load blogs
  useEffect(() => {
    const init = async () => {
      const verify = await fetch(`${API}/api/admin/verify`, {
        credentials: "include",
      });

      if (!verify.ok) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch(`${API}/api/blogs`, {
        credentials: "include",
      });

      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    };

    init();
  }, [router]);

  // 🗑 Delete blog
  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog?")) return;

    const res = await fetch(`${API}/api/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } else {
      alert("Failed to delete blog");
    }
  };

  // 🚪 Logout
  const logout = async () => {
    await fetch(`${API}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });

    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const total = blogs.length;
  const published = blogs.filter((b) => b.status === "published").length;
  const drafts = blogs.filter((b) => b.status === "draft").length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Blogs" value={total} />
        <StatCard title="Published" value={published} />
        <StatCard title="Drafts" value={drafts} />
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blogs</h2>

        <Link href="/admin/blogs/new">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            ➕ New Blog
          </button>
        </Link>
      </div>

      {/* Table */}
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Slug</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3 font-medium">{blog.title}</td>

                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        blog.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td className="p-3 text-sm text-gray-600">
                    {blog.slug}
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <Link href={`/admin/blogs/edit/${blog._id}`}>
                      <button className="text-indigo-600 hover:underline">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* 🔹 Small stat card component */
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
