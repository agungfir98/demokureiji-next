"use client";
import { Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { EventStatus } from "~/components/event-activity-status";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useGetEvent } from "~/features/event/getEvent";
import { VoterList } from "./_components/voterList";
import CandidateList from "./_components/candidateList";
import { StatusButton } from "./_components/StatusButton";
import { Button } from "~/components/ui/button";
import { RoleBaseRenderer } from "../../_components/role-based-render";
import { AddVotersDialog } from "./_components/addVotersDialog";

const EventDetail = () => {
  const { eventId, id: orgId } = useParams();
  const router = useRouter();

  const { data } = useGetEvent({
    eventId: String(eventId),
    queryConfig: {
      enabled: !!eventId,
    },
  });

  if (!data?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Event not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {data.data.title}
            </h1>
            <EventStatus status={data.data.status} />
          </div>
          <div className="flex gap-2">
            {!data.data.hasVoted && (
              <RoleBaseRenderer requiredRole="MEMBER" userRole={data.data.role}>
                <Button
                  size="default"
                  onClick={() =>
                    router.push(`/org/${orgId}/event/${eventId}/vote`)
                  }
                >
                  Cast Your Vote
                </Button>
              </RoleBaseRenderer>
            )}
            <RoleBaseRenderer requiredRole="ADMIN" userRole={data.data.role}>
              <StatusButton status={data.data.status} />
            </RoleBaseRenderer>
          </div>
        </div>
      </div>

      <CandidateList />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Registered Voters</CardTitle>
            </div>
            <RoleBaseRenderer requiredRole="ADMIN" userRole={data.data.role}>
              <AddVotersDialog />
            </RoleBaseRenderer>
          </div>
          <CardDescription>
            List of all eligible voters for this event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VoterList />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetail;
