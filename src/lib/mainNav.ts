import type { LucideIcon } from "lucide-react";
import {
  GitCompare,
  Mail,
  Newspaper,
  BookOpen,
  MessageCircle,
  Tag,
} from "lucide-react";

export type MainNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  accent?: "sky" | "amber" | "violet";
};

/** Primary navbar links — keep in sync across desktop & mobile */
export const MAIN_NAV_LINKS: MainNavItem[] = [
  {
    href: "/ai-news",
    label: "AI News",
    icon: Newspaper,
    accent: "sky",
  },
  {
    href: "/newsletter",
    label: "Newsletter",
    icon: Mail,
    accent: "amber",
  },
  {
    href: "/deals",
    label: "Deals",
    icon: Tag,
    accent: "amber",
  },
  {
    href: "/compare",
    label: "Compare",
    icon: GitCompare,
    accent: "violet",
  },
  {
    href: "/blog",
    label: "Blog",
    icon: BookOpen,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: MessageCircle,
  },
];

export const ACCENT_STYLES = {
  sky: {
    active: "bg-sky-100 text-sky-800 ring-1 ring-sky-200",
    idle: "text-slate-600 hover:bg-sky-50 hover:text-sky-800",
    icon: "text-sky-500",
  },
  amber: {
    active: "bg-amber-100 text-amber-900 ring-1 ring-amber-200",
    idle: "text-slate-600 hover:bg-amber-50 hover:text-amber-900",
    icon: "text-amber-500",
  },
  violet: {
    active: "bg-violet-100 text-violet-800 ring-1 ring-violet-200",
    idle: "text-slate-600 hover:bg-violet-50 hover:text-violet-800",
    icon: "text-violet-500",
  },
} as const;
