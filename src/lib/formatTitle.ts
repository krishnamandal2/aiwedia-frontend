export function formatCategoryTitle(value: string) {
  if (!value) return "";

  const normalized = value
    .replace(/([a-z])([A-Z])/g, "$1 $2") // handle camelCase
    .replace(/[-_\s]/g, "")             // remove - _ spaces
    .toLowerCase();

  const specialCases: Record<string, string> = {
    "ai-tools": "AI Tools",
    "pdf-and-document-tools": "All Documents and Converter Websites",
    "ai-image-filters": "All Image Filter Websites",
    "ai-video-generators": "AI for Video Generation",
    "ai-voice-generators": "AI Tools for Voice Change",
    "ai-writing-tools": "AI Tools for Content Writing",
    "ai-data-search": "AI Tools for Data Analysis",
    "ai-web-design-tools": "AI Tools for Web Design",
    "ai-marketing-tools": "AI Tools for SEO & Marketing",
    "ai-code-generators": "Vibe Coding",
    "ai-image-generators": "Image Generative AI Tools",
    "web-series": "Web Series Sites",
    "ecommerce": "All E-Commerce Sites",
    "socialmedia": "All Social Media Platforms",
    "dating-sites": "All Dating Sites",
    "bollywood-streaming-sites": "All Bollywood Sites",
    "football-websites": "Football Live Matches & Scores",
    "cricket": "Cricket Live Matches & Scores",
    "trending-websites": "Trending Websites in 2026",
    "english-news": "English News Websites",
    "hindi-news": "Hindi News Websites",
    "online-games": "Play Online Games",
    "education": "Education Platforms",
    "job-search-sites": "Job Portals",
    "ai-developer-tools": "Developer Tools",
    "real-estate-platforms": "Housing & Real Estate Websites",
    "food-delivery": "Food Delivery Platforms",
    "train-booking": "Train Ticket Booking",
    "freight-booking": "Freight Booking Platforms",
    "hotel-booking": "Hotel Booking Platforms",
    "bus-booking": "Bus Booking Sites",
    "cab-booking-apps": "Taxi & Cab Booking Sites",
    "coding-platforms": "Coding Platforms",
    "informational-websites": "Information Websites",
    "trading-platforms": "Trading Platforms",
    "hotcall": "Hot Call Platforms",
    "indian-government-websites": "Indian Government Websites",
    "government-exams": "Government Exam Portals",
    "wedding-websites": "Matrimony Websites",
    "ai-logo-design-tools": "Logo & Favicon Design",
    "ai-background-remover": "Background Image Remover",
    "ai-health-tools": "AI Tools For Health and Fitness",
    "ai-healthcare-tools": "AI in HealthCare"
  };

  if (specialCases[normalized]) {
    return specialCases[normalized];
  }

  // fallback
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}