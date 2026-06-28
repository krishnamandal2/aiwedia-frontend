/**
 * Client-safe formatting for AI news text (matches backend aiNewsTextFormat).
 */

const ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": "\u0022",
  "&#34;": "\u0022",
  "&#39;": "\u0027",
  "&apos;": "\u0027",
  "&nbsp;": " ",
  "&#160;": " ",
  "&hellip;": "\u2026",
  "&#8230;": "\u2026",
  "&mdash;": "\u2014",
  "&#8212;": "\u2014",
  "&ndash;": "\u2013",
  "&#8211;": "\u2013",
  "&#8216;": "\u2018",
  "&#8217;": "\u2019",
  "&#8220;": "\u201C",
  "&#8221;": "\u201D",
  "&rsquo;": "\u2019",
  "&lsquo;": "\u2018",
  "&rdquo;": "\u201D",
  "&ldquo;": "\u201C",
};

export function decodeHtmlEntities(text = ""): string {
  let out = String(text);

  for (const [entity, char] of Object.entries(ENTITY_MAP)) {
    out = out.split(entity).join(char);
  }

  out = out.replace(/&#(\d+);/g, (_, num) => {
    const code = parseInt(num, 10);
    if (Number.isNaN(code) || code < 1 || code > 0x10ffff) return _;
    try {
      return String.fromCodePoint(code);
    } catch {
      return _;
    }
  });

  out = out.replace(/&#x([0-9a-f]+);/gi, (_, hex) => {
    const code = parseInt(hex, 16);
    if (Number.isNaN(code) || code < 1 || code > 0x10ffff) return _;
    try {
      return String.fromCodePoint(code);
    } catch {
      return _;
    }
  });

  return out;
}

function removeEmbeddedMedia(html = ""): string {
  return String(html)
    .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
    .replace(/<picture[\s\S]*?<\/picture>/gi, " ")
    .replace(/<video[\s\S]*?<\/video>/gi, " ")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, " ")
    .replace(/<source[^>]*>/gi, " ")
    .replace(/<img\b[^>]*>/gi, " ")
    .replace(/<img\b[\s\S]*?(?:>|$)/gi, " ");
}

export function scrubLeftoverMarkup(text = ""): string {
  return String(text)
    .replace(/<img\b[\s\S]*?(?:>|$)/gi, " ")
    .replace(/<\/?[a-z][^>]*>/gi, " ")
    .replace(/<[^>]*$/gi, " ")
    .replace(/https?:\/\/\S*\.(png|jpe?g|gif|webp|svg)(\?\S*)?/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripHtml(html = ""): string {
  let text = String(html)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");

  text = removeEmbeddedMedia(text);

  return text
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/<[^>]*$/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function removeBoilerplate(text: string): string {
  return text
    .replace(/\[…\]/g, "…")
    .replace(/\[&hellip;\]/gi, "…")
    .replace(/\s*Continue reading.*$/i, "")
    .replace(/\s*Read more.*$/i, "")
    .replace(/\s*The post .+ appeared first on .+$/i, "")
    .trim();
}

export function formatAiNewsTitle(raw = ""): string {
  const text = removeBoilerplate(
    decodeHtmlEntities(stripHtml(raw)).replace(/\s+/g, " ").trim()
  );
  return text.length > 300 ? `${text.slice(0, 297)}…` : text;
}

export function formatAiNewsSummary(raw = "", maxLength = 500): string {
  let text = decodeHtmlEntities(stripHtml(raw));
  text = removeBoilerplate(text);
  text = scrubLeftoverMarkup(text);
  text = text
    .split("\n")
    .map((line) => scrubLeftoverMarkup(line.trim()))
    .filter(Boolean)
    .join("\n\n");
  if (text.length > maxLength) {
    const cut = text.slice(0, maxLength);
    const lastSpace = cut.lastIndexOf(" ");
    text = `${scrubLeftoverMarkup(
      (lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut).trim()
    )}…`;
  }
  return scrubLeftoverMarkup(text);
}

/** Longer clean summary for article detail pages */
export function formatAiNewsDetailSummary(raw = ""): string {
  return formatAiNewsSummary(raw, 1200);
}

/** Split summary into clean paragraphs for detail view */
export function summaryToParagraphs(summary = "", maxLength = 1200): string[] {
  return formatAiNewsSummary(summary, maxLength)
    .split(/\n\n+/)
    .map((p) => scrubLeftoverMarkup(p.trim()))
    .filter((p) => p.length > 20);
}

export function estimateReadingMinutes(text = ""): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** One-line excerpt for cards */
export function formatAiNewsExcerpt(raw = "", max = 160): string {
  const flat = formatAiNewsSummary(raw).replace(/\n+/g, " ");
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}
