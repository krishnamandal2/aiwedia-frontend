import HeaderClient from "./HeaderClient";
import MegaExploreClient from "@/components/MegaExploreClient";
import Smalldevicemenu from "@/components/Smalldevicemenu";
import { getMenuCategories } from "@/lib/api";

export default async function Header() {
  const res = await getMenuCategories();

  const categories = Array.isArray(res?.categories)
    ? res.categories
    : [];

  return (
    <HeaderClient
      megaMenu={<MegaExploreClient categories={categories} />}
      mobileMenu={<Smalldevicemenu categories={categories} />}
    />
  );
}
