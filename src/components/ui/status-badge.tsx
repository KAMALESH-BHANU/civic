import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "submitted" | "assigned" | "in-progress" | "resolved";
  className?: string;
}

const statusConfig = {
  submitted: {
    label: "Submitted",
    className: "bg-blue-100 text-blue-800 border-blue-200",
  },
  assigned: {
    label: "Assigned",
    className: "bg-orange-100 text-orange-800 border-orange-200",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  resolved: {
    label: "Resolved",
    className: "bg-green-100 text-green-800 border-green-200",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
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