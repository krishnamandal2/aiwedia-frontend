/**
 * Shown when /api/free-tools/:slug is missing (DB not seeded yet).
 * Run backend: npm run seed:free-tools-popular
 */

export type FreeToolLink = { name: string; desc: string; url: string };

export type HowToStep = { step: number; title: string; text: string };

export type ToolScreenshot = { title: string; image: string; caption: string };

export type FreeToolPageDetail = {
  slug: string;
  title: string;
  h1: string;
  intro: string;
  description: string;
  about?: string;
  faq?: { question: string; answer: string }[];
  howTo?: HowToStep[];
  benefits?: string[];
  screenshots?: ToolScreenshot[];
  metaKeywords?: string[];
  tools: FreeToolLink[];
};

const ytTools: FreeToolLink[] = [
  { name: "SaveFrom.net", desc: "Download YouTube in multiple formats", url: "https://en.savefrom.net" },
  { name: "Y2Mate", desc: "YouTube MP4 and MP3", url: "https://www.y2mate.com" },
  { name: "9xbuddy", desc: "Social video downloader", url: "https://9xbuddy.com" },
  { name: "Loader.to", desc: "Multiple quality options", url: "https://loader.to" },
];

const igTools: FreeToolLink[] = [
  { name: "SnapInsta", desc: "Reels, photos, stories", url: "https://snapinsta.app" },
  { name: "Inflact", desc: "Instagram downloader", url: "https://inflact.com/downloader/instagram" },
  { name: "DownloadGram", desc: "Videos and photos", url: "https://downloadgram.org" },
];

const tiktokTools: FreeToolLink[] = [
  { name: "SSSTikTok", desc: "No watermark downloads", url: "https://ssstik.io" },
  { name: "SnapTik", desc: "TikTok HD saver", url: "https://snaptik.app" },
  { name: "SaveTT", desc: "Fast TikTok download", url: "https://savett.cc" },
];

const pdfMergeTools: FreeToolLink[] = [
  { name: "iLovePDF", desc: "Merge PDF free", url: "https://www.ilovepdf.com/merge_pdf" },
  { name: "Smallpdf", desc: "Combine PDFs", url: "https://smallpdf.com/merge-pdf" },
  { name: "PDF24", desc: "Free merge tool", url: "https://tools.pdf24.org/en/merge-pdf" },
];

const ytThumbnailTools: FreeToolLink[] = [
  { name: "BoingBoing getthumbs", desc: "YouTube thumbnail viewer & downloader — HD sizes", url: "https://boingboing.net/features/getthumbs" },
  { name: "Thumbnail.Download", desc: "Thumbnail grabber — maxresdefault & hqdefault", url: "https://thumbnail.download" },
  { name: "Get YouTube Thumbnail", desc: "Download YouTube thumbnail from URL", url: "https://get-youtube-thumbnail.com" },
  { name: "YouTube Thumbnail Extractor", desc: "Extract all CDN thumbnail sizes", url: "https://seostudio.tools/youtube-thumbnail-downloader" },
];

const ytThumbnailPage: FreeToolPageDetail = {
  slug: "youtube-thumbnail-downloader-free",
  title: "YouTube Thumbnail Downloader — Download YouTube Thumbnails Free (HD)",
  h1: "YouTube Thumbnail Downloader",
  intro: "Download YouTube thumbnails in HD with thumbnail downloader, grabber, and viewer tools — paste any video URL.",
  description: "Free YouTube thumbnail downloader & grabber — maxresdefault HD download",
  metaKeywords: [
    "youtube thumbnail downloader",
    "download youtube thumbnail",
    "thumbnail grabber",
    "youtube thumbnail viewer",
    "youtube thumbnail download",
    "thumbnail download",
  ],
  about:
    "A YouTube thumbnail downloader saves the cover image from any public video. Use grabbers to preview maxresdefault and hqdefault sizes before download.",
  benefits: [
    "Download maxresdefault (1280×720) when available",
    "Preview all CDN sizes in one click",
    "No account on BoingBoing getthumbs",
    "Works on mobile and desktop",
  ],
  howTo: [
    { step: 1, title: "Copy the YouTube URL", text: "Open the video and copy the link from Share or the address bar." },
    { step: 2, title: "Paste into a grabber", text: "Use BoingBoing getthumbs or Thumbnail.Download from the list below." },
    { step: 3, title: "Pick maxresdefault", text: "Choose the highest resolution available for that video." },
    { step: 4, title: "Download", text: "Save the JPG to your device for analysis or design reference." },
  ],
  screenshots: [
    {
      title: "BoingBoing getthumbs viewer",
      image: "https://res.cloudinary.com/dj3vrogpl/image/upload/v1768645475/aitools_wn5tnv.jpg",
      caption: "Paste a URL to preview and download every thumbnail size.",
    },
  ],
  faq: [
    { question: "How do I download a YouTube thumbnail?", answer: "Copy the video URL, paste into a thumbnail downloader, select maxresdefault, and download." },
    { question: "What is a thumbnail grabber?", answer: "A tool that fetches all YouTube CDN thumbnail sizes from one video link." },
    { question: "Is BoingBoing getthumbs free?", answer: "Yes — free at boingboing.net/features/getthumbs with no login." },
  ],
  tools: ytThumbnailTools,
};

export const FREE_TOOL_PAGE_FALLBACK: Record<string, FreeToolPageDetail> = {
  "youtube-video-downloader-free": {
    slug: "youtube-video-downloader-free",
    title: "Free YouTube Video Downloader",
    h1: "YouTube Video Downloader",
    intro: "Download YouTube videos for offline viewing using trusted online tools.",
    description: "Save YouTube videos in MP4 — HD options",
    about:
      "YouTube video downloaders are among the most searched utilities online. Always respect copyright and platform terms.",
    faq: [
      {
        question: "Can I download YouTube videos in HD?",
        answer: "Many tools support 720p and 1080p when the source allows it.",
      },
    ],
    tools: ytTools,
  },
  "youtube-mp3-converter-free": {
    slug: "youtube-mp3-converter-free",
    title: "YouTube to MP3 — Free Converter Tools",
    h1: "YouTube to MP3 Converter",
    intro: "Extract audio from YouTube videos with popular free converter sites.",
    description: "Convert YouTube to MP3 audio online",
    tools: [
      { name: "Y2Mate", desc: "YouTube to MP3", url: "https://www.y2mate.com" },
      { name: "MP3Juice", desc: "Search and convert", url: "https://mp3juice.cc" },
      { name: "YTMP3", desc: "Simple converter", url: "https://ytmp3.nu" },
    ],
  },
  "instagram-reels-downloader-free": {
    slug: "instagram-reels-downloader-free",
    title: "Free Instagram Reels Downloader",
    h1: "Instagram Reels Downloader",
    intro: "Download Instagram reels, videos, and stories easily.",
    description: "Download reels without watermark",
    tools: igTools,
  },
  "tiktok-video-downloader-free": {
    slug: "tiktok-video-downloader-free",
    title: "TikTok Video Downloader",
    h1: "TikTok Video Downloader",
    intro: "Download TikTok videos quickly without watermark.",
    description: "Download TikTok videos without watermark",
    tools: tiktokTools,
  },
  "facebook-video-downloader-free": {
    slug: "facebook-video-downloader-free",
    title: "Facebook Video Downloader Free",
    h1: "Facebook Video Downloader",
    intro: "Save Facebook videos and reels with these free tools.",
    description: "Download Facebook reels and videos in HD",
    tools: [
      { name: "FDown.net", desc: "Facebook HD video", url: "https://fdown.net" },
      { name: "Getfvid", desc: "FB and IG downloader", url: "https://www.getfvid.com" },
    ],
  },
  "merge-pdf-online-free": {
    slug: "merge-pdf-online-free",
    title: "Merge PDF Files Online Free",
    h1: "Merge PDF Online",
    intro: "Join PDF documents in seconds — no install.",
    description: "Combine multiple PDFs into one file",
    tools: pdfMergeTools,
  },
  "compress-pdf-online-free": {
    slug: "compress-pdf-online-free",
    title: "Compress PDF File Size Free",
    h1: "Compress PDF Online",
    intro: "Shrink PDF file size for email and uploads.",
    description: "Reduce PDF size online",
    tools: [
      { name: "iLovePDF Compress", desc: "Reduce PDF size", url: "https://www.ilovepdf.com/compress_pdf" },
      { name: "Smallpdf Compress", desc: "Compress online", url: "https://smallpdf.com/compress-pdf" },
    ],
  },
  "remove-background-from-image-free": {
    slug: "remove-background-from-image-free",
    title: "Remove Background from Image Free",
    h1: "Remove Background from Image",
    intro: "AI tools to cut out subjects and get transparent PNGs.",
    description: "Transparent PNG background remover",
    tools: [
      { name: "remove.bg", desc: "AI background removal", url: "https://www.remove.bg" },
      { name: "Photoroom", desc: "Free tier available", url: "https://www.photoroom.com" },
    ],
  },
  "youtube-thumbnail-downloader-free": ytThumbnailPage,
  "youtube-thumbnail-downloader": ytThumbnailPage,
};

export function getFreeToolPageFallback(slug: string): FreeToolPageDetail | null {
  return FREE_TOOL_PAGE_FALLBACK[slug] ?? null;
}
