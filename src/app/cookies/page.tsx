import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import Link from "next/link";

export default function CookiesPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl p-8 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-[#0D0D0D]">
          Cookie Policy
        </h1>

        <p className="mb-6 text-gray-700">
          At <span className="font-semibold">AiWedia</span>, we use cookies to
          keep the site working and, with your consent, to understand how
          visitors use our pages.
        </p>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-[#0D0D0D]">
            1. Types of cookies we use
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-gray-700">
            <li>
              <strong>Necessary</strong> — required for basic site functionality
              (cannot be disabled).
            </li>
            <li>
              <strong>Analytics</strong> — Google Analytics, only if you accept.
              Helps us improve content and navigation.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-[#0D0D0D]">
            2. Your choices
          </h2>
          <p className="mb-4 text-gray-700">
            When you first visit AIWedia, you can accept all cookies, reject
            non-essential cookies, or customize your preferences. You can change
            your choice anytime:
          </p>
          <CookieSettingsButton />
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold text-[#0D0D0D]">
            3. Browser settings
          </h2>
          <p className="text-gray-700">
            You can also block or delete cookies in your browser settings.
            Blocking necessary cookies may affect how the site works.
          </p>
        </section>

        <p className="text-sm text-gray-600">
          See also our{" "}
          <Link href="/privacy" className="font-semibold text-violet-600 underline">
            Privacy Policy
          </Link>
          .
        </p>

        <p className="mt-12 text-center text-sm text-gray-500">
          © {currentYear} AiWedia. All rights reserved.
        </p>
      </div>
    </div>
  );
}
