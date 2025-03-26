"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
import { orgService } from "~/services/orgService";
import EventList from "./components/EventsList";
import { MemberList } from "./components/MemberList";
import { NewMemberModal } from "./components/NewMemberModal";
import { RoleBaseRenderer } from "./components/role-based-render";

const OrgDetail = () => {
  const { id } = useParams();
  const [showNewMemberModal, setShowNewMemberModal] = useState<boolean>(false);
  const router = useRouter();

  const { data: org, isLoading } = orgService.GetSingleOrg({
    orgId: id as string,
  });

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>
                <Suspense fallback={<Skeleton className="h-12 w-md" />}>
                  {isLoading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <h1 className="text-2xl font-semibold">
                      {org?.data.data.organization}
                    </h1>
                  )}
                </Suspense>
              </CardTitle>
              <Suspense fallback={<Skeleton className="h-4 w-xl" />}>
                {isLoading ? (
                  <Skeleton className="h-5 w-40" />
                ) : (
                  <CardDescription>
                    {org?.data.data.description}
                  </CardDescription>
                )}
              </Suspense>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between my-2">
              <h1 className="text-xl font-semibold">Events</h1>
              <Suspense fallback={<Skeleton className="h-8 w-20" />}>
                <RoleBaseRenderer
                  userRole={org!.data.data.role as string}
                  requiredRole="ADMIN"
                >
                  <div className="">
                    <Button
                      size="sm"
                      onClick={() => {
                        return router.replace(`/org/${id}/create-event`);
                      }}
                    >
                      <Plus />
                      New Event
                    </Button>
                  </div>
                </RoleBaseRenderer>
              </Suspense>
            </div>
            <Suspense fallback={<Skeleton className="h-52 w-full" />}>
              <EventList />
            </Suspense>
          </div>
          <Separator className="my-4" />

          <div>
            <div className="flex justify-between my-2">
              <h1 className="text-xl font-semibold">Members</h1>
              <Suspense>
                <RoleBaseRenderer
                  userRole={org?.data.data.role as string}
                  requiredRole="ADMIN"
                >
                  <div className="">
                    <Button
                      size="sm"
                      onClick={() => setShowNewMemberModal(true)}
                    >
                      <Plus />
                      add member
                    </Button>
                  </div>
                </RoleBaseRenderer>
              </Suspense>
            </div>

            <MemberList />
          </div>
        </CardContent>
      </Card>
      <NewMemberModal
        open={showNewMemberModal}
        onOpenChange={setShowNewMemberModal}
      />
    </div>
  );
};

export default OrgDetail;
