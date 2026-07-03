"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, User } from "lucide-react";

export default function ProfileMenu() {
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:border-violet-300 hover:text-violet-700"
      >
        <User size={16} />
        Sign In
      </Link>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm transition hover:border-violet-200"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">
          {user.name[0].toUpperCase()}
        </div>
        <span className="hidden max-w-[100px] truncate text-sm font-semibold text-slate-700 lg:block">
          {user.name.split(" ")[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right animate-in fade-in zoom-in rounded-2xl border border-slate-200 bg-white py-1 shadow-xl duration-100">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
            {user.email && (
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            )}
          </div>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-800"
          >
            <LayoutDashboard size={16} />
            My account
          </Link>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
