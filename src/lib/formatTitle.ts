export function formatCategoryTitle(value: string) {
  if (!value) return "";

  const normalized = value
    .replace(/([a-z])([A-Z])/g, "$1$2") // handle camelCase
    .replace(/[-_\s]/g, "")             // remove - _ spaces
    .toLowerCase();

  const specialCases: Record<string, string> = {
    aitools: "AI Tools",
    documenttools: "All Documents Converter Websites",
    imagefilter: "All Image Filter Websites",
    aivideogeneration: "AI for Video Generation",
    aivoice: "AI Tools for Voice Change",
    aiwritingandcontent: "AI Tools for Content Writing",
    aidatasearch: "AI Tools for Data Analysis",
    aiwebdesign: "AI Tools for Web Design",
    aimarketingseo: "AI Tools for SEO & Marketing",
    vibecoding: "Vibe Coding",
    imagegenerative: "Image Generative AI Tools",
    webseries: "Web Series Sites",
    ecommerce: "All E-Commerce Sites",
    socialmedia: "All Social Media Platforms",
    datingsite: "All Dating Sites",
    bollywood: "All Bollywood Sites",
    football: "Football Live Matches & Scores",
    cricket: "Cricket Live Matches & Scores",
    trendingsite: "Trending Websites in 2026",
    englishnews: "English News Websites",
    hindinews: "Hindi News Websites",
    games: "Play Online Games",
    education: "Education Platforms",
    jobs: "Job Portals",
    developertools: "Developer Tools",
    housing: "Housing & Real Estate Websites",
    fooddelivery: "Food Delivery Platforms",
    trainbooking: "Train Ticket Booking",
    freightbooking: "Freight Booking Platforms",
    hotelbooking: "Hotel Booking Platforms",
    busbooking: "Bus Booking Sites",
    tax: "Taxi & Cab Booking Sites",
    codingplatform: "Coding Platforms",
    informationsite: "Information Websites",
    tradingsites: "Trading Platforms",
    hotcall: "Hot Call Platforms",
    indiagovsites: "Indian Government Websites",
    governmentexam: "Government Exam Portals",
    wedding: "Matrimony Websites",
    logoandfavicondesign: "Logo & Favicon Design",
    onlinegames: "Online Games",
    imagebackgroundremover: "Background Image Remover",
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
