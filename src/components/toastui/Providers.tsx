"use client";

import { Toaster } from "react-hot-toast";

export default function Providers() {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      containerClassName="mt-4"
      toastOptions={{
        duration: 4000,

        className:
          "bg-gray-900 text-white border border-gray-800 rounded-xl shadow-lg px-4 py-3 text-sm font-medium",

        success: {
          className:
            "bg-green-600 text-white border border-green-500 rounded-xl shadow-lg px-4 py-3",
          iconTheme: {
            primary: "#22c55e",
            secondary: "#ecfdf5",
          },
        },

        error: {
          className:
            "bg-red-600 text-white border border-red-500 rounded-xl shadow-lg px-4 py-3",
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fef2f2",
          },
        },
      }}
    />
  );
}