import { cn } from "~/lib/utils";
import { EventStatus as Status } from "~/type/event.type";

const condition: Record<Status, string> = {
  active: "bg-green-500",
  inactive: "bg-red-500",
  finished: "bg-slate-500",
};

export const EventStatus: React.FC<{ status: Status }> = ({ status }) => {
  if (!status) return null;

  return (
    <span className="flex gap-2 items-center">
      <div
        className={cn("w-2 h-2 rounded-full", condition[status ?? "inactive"])}
      ></div>
      <p>{status}</p>
    </span>
  );
};
