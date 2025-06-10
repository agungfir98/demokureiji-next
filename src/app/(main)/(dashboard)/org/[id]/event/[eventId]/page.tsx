"use client";
import { useParams, useRouter } from "next/navigation";
import { EventStatus } from "~/components/event-activity-status";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import eventService from "~/services/event.service";
import { RoleBaseRenderer } from "../../components/role-based-render";
import { StatusButton } from "./components/StatusButton";
import { VoterList } from "./components/voterList";
import { Button } from "~/components/ui/button";

const EventDetail = () => {
  const { eventId, id: orgId } = useParams();
  const router = useRouter();

  const { data: event } = eventService.GetEvent(eventId as string, {
    orgId: orgId as string,
  });

  return (
    <main>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{event?.voteTitle}</h1>
            <EventStatus status={event?.status!} />
          </div>
          <div className="flex gap-2">
            {!event?.hasVoted && (
              <RoleBaseRenderer requiredRole="MEMBER" userRole={event?.role!}>
                <Button
                  size="sm"
                  role="link"
                  onClick={() =>
                    router.push(`/org/${orgId}/event/${eventId}/vote`)
                  }
                >
                  vote
                </Button>
              </RoleBaseRenderer>
            )}
            <RoleBaseRenderer requiredRole="ADMIN" userRole={event?.role!}>
              <StatusButton status={event?.status!} />
            </RoleBaseRenderer>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event?.candidates.map((candidate, index) => (
            <li key={index}>
              <Card>
                <CardHeader>
                  <h1>Candidate {index + 1}</h1>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div>
                    <h1>{candidate.calonKetua}</h1>
                    <h1>{candidate.calonWakil}</h1>
                  </div>
                  <Separator />
                  <div>
                    <h2 className="font-thin">Description</h2>
                    <h1>{candidate.description}</h1>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
        <Separator className="my-5" />
        <div className="flex justify-between my-2">
          <h1 className="text-xl">Registerd Voters</h1>
        </div>
        <VoterList />
      </CardContent>
    </main>
  );
};

export default EventDetail;
