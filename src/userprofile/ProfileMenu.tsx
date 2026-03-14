"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ProfileMenu() {
  const [user, setUser] = useState<{ name: string; email?: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    localStorage.clear();
    window.location.reload(); 
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-medium transition-all hover:bg-slate-800 active:scale-95"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
          {user.name[0].toUpperCase()}
        </div>
        <span className="hidden md:block text-sm font-medium text-slate-700">
          {user.name}
        </span>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
         <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M19 9l-7 7-7-7"
/>

        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 divide-y divide-slate-100 focus:outline-none animate-in fade-in zoom-in duration-100">
          <div className="px-4 py-3">
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Account</p>
            <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
          </div>
          
          <div className="py-1">
           <button
          onClick={() => {
          setOpen(false);
          window.location.href = "/profile";
          }}
          className="block w-full px-4 py-3 text-sm text-left hover:bg-slate-50"
         >
        Profile
        </button>

          
          </div>

          <div className="py-1">
            <button
              onClick={logout}
              className="flex w-full items-center px-4 py-2 text-sm text-slate-600 font-medium hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}