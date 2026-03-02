"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
    >
      ← Back
    </button>
  );
}
