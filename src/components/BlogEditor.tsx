"use client";

import { useState } from "react";

interface BlogEditorProps {
  value: string;
  onChange: (text: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  return (
    <textarea
      className="w-full border rounded-md p-3 min-h-[200px] resize-y"
      placeholder={`Write your blog content here...
- First line is heading
- Use blank lines to separate paragraphs
- Start list items with dash (-)`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
