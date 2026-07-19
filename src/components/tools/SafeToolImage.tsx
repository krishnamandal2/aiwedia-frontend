"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackClassName?: string;
};

/**
 * next/image for remote URLs. On load error, falls back to initials
 * instead of breaking the page (common with bad user-submitted logos).
 */
export default function SafeToolImage({
  src,
  alt,
  className,
  fallbackClassName,
  fill,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);
  const url = typeof src === "string" ? src.trim() : "";
  const initials =
    alt
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "AI";

  if (!url || failed) {
    return (
      <span
        className={
          fallbackClassName ||
          `flex items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-black text-white ${
            fill ? "absolute inset-0" : "h-full w-full"
          } ${className || ""}`
        }
        aria-hidden
      >
        {initials}
      </span>
    );
  }

  return (
    <Image
      {...rest}
      fill={fill}
      src={url}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
