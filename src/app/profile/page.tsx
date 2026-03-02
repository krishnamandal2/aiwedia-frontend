"use client";

import { useEffect, useState } from "react";
import { Mail, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    name: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(u));
  }, [router]);

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Greeting */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Hi, {user.name} 
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Thank you for visiting our site. We’re glad you’re here.
          </p>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
            <User size={16} className="text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              {user.name}
            </span>
          </div>

          {user.email && (
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
              <Mail size={16} className="text-slate-500" />
              <span className="text-sm text-slate-700 truncate">
                {user.email}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-slate-600 text-white py-3 rounded-2xl font-bold hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
