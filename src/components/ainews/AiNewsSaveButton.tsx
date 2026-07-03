"use client";

import SaveItemButton from "@/components/SaveItemButton";

export default function AiNewsSaveButton({ slug }: { slug: string }) {
  return (
    <SaveItemButton
      type="news"
      slug={slug}
      label="Save article"
      className="shrink-0"
    />
  );
}
