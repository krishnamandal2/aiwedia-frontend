import HomeComponent from "@/home/Home";

export const revalidate = 3600;

export default function Page() {
  return <HomeComponent />;
}