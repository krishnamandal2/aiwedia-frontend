import { getMenuCategories } from "@/lib/api";
import MegaExploreClient from "./MegaExploreClient";

export default async function MegaExplore() {
  const res = await getMenuCategories();

  const categories = Array.isArray(res?.categories)
    ? res.categories
    : [];

  return (
   
      <MegaExploreClient categories={categories} />
 
  );
}
