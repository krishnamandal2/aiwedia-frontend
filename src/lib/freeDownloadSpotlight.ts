/** Top Google searches → free tool pages on AIWedia */
export const FREE_DOWNLOAD_TRENDING = [
  {
    slug: "instagram-reels-downloader-free",
    label: "Instagram Reels",
    emoji: "📸",
    searches: "2M+ / mo",
  },
  {
    slug: "tiktok-video-downloader-free",
    label: "TikTok no watermark",
    emoji: "🎵",
    searches: "1.5M+ / mo",
  },
  {
    slug: "youtube-video-downloader-free",
    label: "YouTube video",
    emoji: "▶️",
    searches: "3M+ / mo",
  },
  {
    slug: "youtube-mp3-converter-free",
    label: "YouTube to MP3",
    emoji: "🎧",
    searches: "2M+ / mo",
  },
  {
    slug: "facebook-video-downloader-free",
    label: "Facebook video",
    emoji: "📘",
    searches: "800K+ / mo",
  },
  {
    slug: "merge-pdf-online-free",
    label: "Merge PDF",
    emoji: "📄",
    searches: "1M+ / mo",
  },
  {
    slug: "compress-pdf-online-free",
    label: "Compress PDF",
    emoji: "📑",
    searches: "900K+ / mo",
  },
  {
    slug: "remove-background-from-image-free",
    label: "Remove background",
    emoji: "✂️",
    searches: "1.2M+ / mo",
  },
  {
    slug: "youtube-thumbnail-downloader",
    label: "YT thumbnail",
    emoji: "🖼️",
    searches: "500K+ / mo",
  },
  {
    slug: "reddit-video-downloader-free",
    label: "Reddit video",
    emoji: "🔴",
    searches: "400K+ / mo",
  },
] as const;

export const FREE_TOOL_CATEGORIES = [
  { id: "all", label: "All", emoji: "✦" },
  { id: "trending", label: "Trending", emoji: "🔥" },
  { id: "social", label: "Social", emoji: "📱" },
  { id: "youtube", label: "YouTube", emoji: "▶️" },
  { id: "pdf", label: "PDF", emoji: "📄" },
  { id: "image", label: "Image", emoji: "🖼️" },
  { id: "audio", label: "Audio", emoji: "🎧" },
  { id: "video", label: "Video", emoji: "🎬" },
] as const;

export type FreeToolCategoryId = (typeof FREE_TOOL_CATEGORIES)[number]["id"];

const TRENDING_SLUGS = new Set<string>(
  FREE_DOWNLOAD_TRENDING.map((t) => t.slug)
);

export function getToolCategoryTag(
  slug: string,
  title: string,
  tags?: string[]
): string {
  if (tags?.length) return tags[0].toLowerCase();
  const b = `${slug} ${title}`.toLowerCase();
  if (/youtube|yt-|thumbnail/.test(b)) return "youtube";
  if (/instagram|tiktok|facebook|twitter|snapchat|pinterest|reddit|whatsapp|telegram|linkedin/.test(b))
    return "social";
  if (/pdf|word-to-pdf|pdf-to-word|merge-pdf|split-pdf|compress-pdf/.test(b))
    return "pdf";
  if (/mp3|audio|youtube-mp3|video-mp3/.test(b)) return "audio";
  if (/image|photo|png|jpg|heic|compress-image|resize|crop|watermark|background/.test(b))
    return "image";
  if (/video|animation|capcut|movie/.test(b)) return "video";
  return "all";
}

export function isTrendingSlug(slug: string): boolean {
  return TRENDING_SLUGS.has(slug);
}
