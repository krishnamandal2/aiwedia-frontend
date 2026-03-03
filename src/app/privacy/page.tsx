import React from "react";

const Privacy = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen px-4 py-12 bg-white">
      <div className="max-w-4xl mx-auto rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#0D0D0D] mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-6">
          At <span className="font-semibold">AiWedia</span>, your privacy is important. This page explains how we collect, use, and protect your personal data.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2">1. Information Collection</h2>
          <p className="text-gray-700">
            We may collect personal information such as your name, email address, and usage data to improve services and enhance your experience.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2">2. Data Usage</h2>
          <p className="text-gray-700">
            Your information is used to provide services, communicate updates, and enhance user experience. We never sell your data to third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-[#0D0D0D] mb-2">3. Data Protection</h2>
          <p className="text-gray-700">
            We implement strict security measures to protect your data. However, no internet transmission is 100% secure, so use our services responsibly.
          </p>
        </section>

        <p className="text-gray-500 text-sm text-center mt-12">
          © {currentYear} AiWedia. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
