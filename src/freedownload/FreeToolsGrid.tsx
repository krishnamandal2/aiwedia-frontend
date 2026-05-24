import FreeToolsDirectory from "./FreeToolsDirectory";
import { fetchFreeToolsList } from "@/lib/freeToolsApi";

export default async function FreeToolsGrid() {
  const tools = await fetchFreeToolsList();
  return <FreeToolsDirectory tools={tools} />;
}
