import { Badge } from "@/components/ui/badge";

export function StatusBadge({ status }: { status: "OPEN" | "CLOSED" }) {
  const isOpen = status === "OPEN";
  return (
    <Badge
      variant="outline"
      className={
        isOpen
          ? "border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-400"
          : "border-red-600/20 bg-red-500/10 text-red-700 dark:border-red-500/30 dark:text-red-400"
      }
    >
      {status}
    </Badge>
  );
}
