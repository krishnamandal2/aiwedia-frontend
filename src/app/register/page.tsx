"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import RegisterForm from "@/contactsform/RegisterForm";

export default function RegisterPage() {

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (form.fullName.trim().length < 3)
      newErrors.fullName = "Full name required";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";

    if (!/^\d{10}$/.test(form.mobile))
      newErrors.mobile = "10-digit mobile required";

    if (form.password.length < 6)
      newErrors.password = "Min 6 characters";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Welcome to AiWedia!");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      form={form}
      errors={errors}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}