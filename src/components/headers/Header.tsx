import HeaderClient from "./HeaderClient";
import { getMenuCategories } from "@/lib/api";
import { withMenuFallback } from "@/lib/fallbackMenuCategories";
import type { MenuCategory } from "@/lib/megaMenuUtils";

export const revalidate = 600;

export default async function Header() {
  const res = await getMenuCategories();
  const raw: MenuCategory[] = Array.isArray(res?.categories)
    ? (res.categories as MenuCategory[])
    : Array.isArray(res)
      ? (res as MenuCategory[])
      : [];

  const categories = withMenuFallback(raw);

  return <HeaderClient categories={categories} />;
}
