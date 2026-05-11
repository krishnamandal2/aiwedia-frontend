"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // LOGIN
      const loginRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        setError(loginData.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      // VERIFY SESSION
      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const verifyData = await verifyRes.json();

      console.log("VERIFY:", verifyData);

      if (!verifyRes.ok) {
        setError("Session verification failed");
        setLoading(false);
        return;
      }

      // SUCCESS REDIRECT
      window.location.href = "/admin/dashboard";

      // OR:
      // router.replace("/admin/dashboard");

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "100px auto",
        padding: "24px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Admin Login
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
          }}
        />

        {error && (
          <p
            style={{
              color: "#b00020",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}