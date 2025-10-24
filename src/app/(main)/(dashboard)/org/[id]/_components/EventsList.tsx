import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { EventStatus } from "~/components/event-activity-status";
import { Separator } from "~/components/ui/separator";
import { useGetOrgEvents } from "~/features/org";
import { PaginationQueryType } from "~/schema/query";

const EventList = () => {
  const { id } = useParams();
  const [query] = useState<PaginationQueryType>({
    limit: 5,
    page: 1,
  });
  const { data: events } = useGetOrgEvents({
    payload: {
      orgId: String(id),
      query,
    },
  });

  if (!events?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No events yet</p>
        <p className="text-xs text-muted-foreground mt-1">
          Create your first event to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {events?.data?.map((event, index) => (
        <div key={index}>
          <Link href={`/org/${id}/event/${event.id}`} className="block group">
            <div className="flex items-center justify-between hover:bg-accent transition-colors p-3 rounded-md">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="rounded-md bg-primary/10 p-2 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{event.title}</p>
                  {event.description && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <EventStatus status={event.status} />
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
          {index < events.data.length - 1 && <Separator className="my-0.5" />}
        </div>
      ))}

      {events?.data?.length >= 5 && (
        <Link
          href={`/org/${id}/events`}
          className="block mt-2 text-center py-2 text-sm text-primary hover:underline"
        >
          View all events
        </Link>
      )}
    </div>
  );
};

export default EventList;
