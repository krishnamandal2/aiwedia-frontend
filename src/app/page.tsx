import HomeComponent from "@/home/Home";
import HomeStructuredData from "@/components/seo/HomeStructuredData";
import { buildPageMetadata } from "@/lib/seo/buildMetadata";
import { HOME_SEO } from "@/lib/seo/pages";

export const revalidate = 3600;

export const metadata = buildPageMetadata(HOME_SEO);

export default function Page() {
  return (
    <>
      <HomeStructuredData />
      <HomeComponent />
    </>
  );
}
