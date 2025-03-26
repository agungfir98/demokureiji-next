import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { EventStatus } from "~/components/event-activity-status";
import { Card, CardContent } from "~/components/ui/card";
import { orgService } from "~/services/orgService";
import { OrgMemberQueryType } from "~/type/org";

const EventList = () => {
  const { id } = useParams();
  const [query] = useState<OrgMemberQueryType>({
    limit: 5,
    page: 1,
  });
  const { data: events } = orgService.GetOrgEvents(
    { orgId: id as string },
    { params: query },
    { queryKey: [query] }
  );
  return (
    <Card>
      <CardContent className="mt-6 grid">
        {!events?.data.data?.events.length && (
          <span className="my-4 mx-auto opacity-65">no event being held</span>
        )}
        <ul>
          {events?.data.data?.events.map((event, index) => (
            <li key={index}>
              <Link href={`/org/${id}/event/${event._id}`} className="relative">
                <div className="flex justify-between items-center hover:bg-secondary p-2 rounded-lg">
                  <p>{event.voteTitle}</p>
                  <EventStatus status={event.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EventList;
