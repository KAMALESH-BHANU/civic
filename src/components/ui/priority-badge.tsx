import { cn } from "@/lib/utils";

interface PriorityBadgeProps {
  priority: "low" | "medium" | "high" | "critical";
  className?: string;
}

const priorityConfig = {
  low: {
    label: "Low",
    className: "bg-gray-100 text-gray-800 border-gray-200",
  },
  medium: {
    label: "Medium",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  high: {
    label: "High",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  critical: {
    label: "Critical",
    className: "bg-red-100 text-red-800 border-red-200",
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = priorityConfig[priority];
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}