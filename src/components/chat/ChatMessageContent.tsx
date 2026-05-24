"use client";

import Link from "next/link";

const MD_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const PLAIN_URL = /(https?:\/\/[^\s<>"']+)/g;

function isInternal(url: string) {
  try {
    const host = new URL(url).hostname;
    return host.includes("aiwedia.com") || host.includes("localhost");
  } catch {
    return false;
  }
}

export function parseMessageParts(
  content: string
): Array<
  { type: "text"; value: string } | { type: "link"; label: string; url: string }
> {
  const parts: Array<
    { type: "text"; value: string } | { type: "link"; label: string; url: string }
  > = [];
  let lastIndex = 0;
  const matches: {
    index: number;
    length: number;
    label: string;
    url: string;
  }[] = [];

  let m: RegExpExecArray | null;
  const mdCopy = new RegExp(MD_LINK.source, "g");
  while ((m = mdCopy.exec(content)) !== null) {
    matches.push({
      index: m.index,
      length: m[0].length,
      label: m[1],
      url: m[2],
    });
  }

  matches.sort((a, b) => a.index - b.index);

  for (const match of matches) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: "link", label: match.label, url: match.url });
    lastIndex = match.index + match.length;
  }

  if (lastIndex < content.length) {
    const remainder = content.slice(lastIndex);
    let rmIdx = 0;
    const urlCopy = new RegExp(PLAIN_URL.source, "g");
    while ((m = urlCopy.exec(remainder)) !== null) {
      if (m.index > rmIdx) {
        parts.push({ type: "text", value: remainder.slice(rmIdx, m.index) });
      }
      const url = m[1].replace(/[.,;:!?)]+$/, "");
      parts.push({ type: "link", label: url.slice(0, 40), url });
      rmIdx = m.index + m[0].length;
    }
    if (rmIdx < remainder.length) {
      parts.push({ type: "text", value: remainder.slice(rmIdx) });
    }
  }

  if (parts.length === 0) {
    parts.push({ type: "text", value: content });
  }

  return parts;
}

export default function ChatMessageContent({ content }: { content: string }) {
  const parts = parseMessageParts(content);

  return (
    <span className="whitespace-pre-wrap break-words">
      {parts.map((part, i) => {
        if (part.type === "text") {
          return <span key={i}>{part.value}</span>;
        }
        if (isInternal(part.url)) {
          try {
            const path = new URL(part.url).pathname;
            return (
              <Link
                key={i}
                href={path}
                className="font-semibold text-violet-600 underline underline-offset-2 hover:text-violet-800"
              >
                {part.label}
              </Link>
            );
          } catch {
            /* fall through */
          }
        }
        return (
          <a
            key={i}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-violet-600 underline underline-offset-2 hover:text-violet-800"
          >
            {part.label}
          </a>
        );
      })}
    </span>
  );
}
