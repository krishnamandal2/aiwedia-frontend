import React from "react";

const Cookies = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen px-4 py-12 bg-white">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#0D0D0D] mb-6">
          Cookies Policy
        </h1>

        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">AiWedia</span>, we use cookies to improve your experience. This page explains how we use and manage cookies.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2">1. What Are Cookies?</h2>
          <p className="text-gray-700">
            Cookies are small text files stored on your device that help websites remember information such as preferences, login status, and usage patterns.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2">2. How We Use Cookies</h2>
          <p className="text-gray-700">
            We use cookies to enhance functionality, analyze traffic, and provide a personalized experience. Some cookies are essential, while others improve your experience.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2">3. Managing Cookies</h2>
          <p className="text-gray-700">
            You can control cookies through your browser settings. Disabling some cookies may affect site functionality, but essential services will still work.
          </p>
        </section>

        <p className="text-gray-500 text-sm text-center mt-12">
          © {currentYear} Aiwedia. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Cookies;
