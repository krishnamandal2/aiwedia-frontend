import CommonCard from "./CommonCard";
import { memo } from "react";

interface ToolsGridProps {
  tools: any[];
}

// Memoize grid to prevent unnecessary re-renders
const ToolsGrid = memo(({ tools }: ToolsGridProps) => {
  return (
    <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <CommonCard
          key={tool.slug}
          image={tool.image || "/placeholder-tool.jpg"}
          title={tool.title}
          description={tool.description}
          benefits={tool.benefits || []}
          url={tool.url}
          rank={tool.rank || 0}
        />
      ))}
    </div>
  );
});

ToolsGrid.displayName = "ToolsGrid";

export default ToolsGrid;