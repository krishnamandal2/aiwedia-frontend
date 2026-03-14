"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

export default function MobileProfileMenu() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <Link
        href="/login"
        className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all active:scale-90"
        aria-label="Sign in"
      >
        <User size={20} />
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      {/* Trigger: Avatar with a subtle ring */}
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center group outline-none"
      >
        <div className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center font-bold text-white
          ${open ? 'border-emerald-500 bg-emerald-600' : 'border-transparent bg-slate-800 hover:bg-slate-700'}`}>
          {user.name[0].toUpperCase()}
        </div>
      </button>

      {/* Dropdown: Adjusted for mobile thumbs */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-4 bg-slate-50 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</p>
            <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
          </div>

          <div className="p-1">
             <button
          onClick={() => {
          setOpen(false);
          window.location.href = "/profile";
          }}
          className="block w-full px-4 py-3 text-sm text-left hover:bg-slate-50"
         >
        Profile
        </button>

            <button
              onClick={logout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-rose-600 font-medium rounded-xl hover:bg-rose-50 active:bg-rose-100 transition-colors"
            >
            
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}