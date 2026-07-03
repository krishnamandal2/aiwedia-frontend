"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_LINKS, ACCENT_STYLES } from "@/lib/mainNav";

type Props = {
  className?: string;
  onNavigate?: () => void;
  stacked?: boolean;
};

export default function NavMainLinks({
  className = "",
  onNavigate,
  stacked = false,
}: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={`${stacked ? "flex flex-col gap-1" : "flex items-center gap-0.5"} ${className}`}
    >
      {MAIN_NAV_LINKS.map(({ href, label, icon: Icon, accent }) => {
        const active =
          pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
        const accentStyle = accent ? ACCENT_STYLES[accent] : null;

        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`inline-flex items-center gap-2 rounded-xl font-semibold transition ${
              stacked ? "min-h-[44px] w-full px-3 py-2.5 text-sm" : "rounded-full px-3 py-2 text-sm"
            } ${
              active
                ? accentStyle?.active ?? "bg-violet-100 text-violet-800"
                : accentStyle?.idle ??
                  "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Icon
              size={16}
              className={
                active
                  ? accentStyle?.icon ?? "text-violet-600"
                  : accentStyle?.icon ?? "text-slate-400"
              }
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
