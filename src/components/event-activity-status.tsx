import { cn } from "~/lib/utils";
import { IEvent } from "~/type/httpResponse";

const condition: Record<IEvent["status"], string> = {
  active: "bg-green-500",
  inactive: "bg-red-500",
  finished: "bg-slate-500",
};

export const EventStatus: React.FC<{ status?: IEvent["status"] }> = ({
  status,
}) => {
  return (
    <span className="flex gap-2 items-center">
      <div
        className={cn("w-2 h-2 rounded-full", condition[status ?? "inactive"])}
      ></div>
      <p>{status}</p>
    </span>
  );
};
