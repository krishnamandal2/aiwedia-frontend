import { getMenuCategories } from "@/lib/api";
import type { MenuCategory } from "@/lib/megaMenuUtils";
import MegaExploreClient from "./MegaExploreClient";

export default async function MegaExplore() {
  const res = await getMenuCategories();

  const categories: MenuCategory[] = Array.isArray(res?.categories)
    ? (res.categories as MenuCategory[])
    : [];

  return (
   
      <MegaExploreClient categories={categories} />
 
  );
}
