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
import { Skeleton } from "~/components/ui/skeleton";
import { useGetSingleOrg } from "~/features/org";
import EventList from "./_components/EventsList";
import { MemberList } from "./_components/MemberList";
import { NewMemberModal } from "./_components/NewMemberModal";
import { RoleBaseRenderer } from "./_components/role-based-render";

const OrgDetail = () => {
  const { id } = useParams();
  const [showNewMemberModal, setShowNewMemberModal] = useState<boolean>(false);
  const router = useRouter();

  const { data: org, isLoading } = useGetSingleOrg({
    orgId: String(id),
  });

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <Suspense fallback={<Skeleton className="h-10 w-64 mb-2" />}>
          {isLoading ? (
            <Skeleton className="h-10 w-64 mb-2" />
          ) : (
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {org?.data.name}
            </h1>
          )}
        </Suspense>
        <Suspense fallback={<Skeleton className="h-5 w-96" />}>
          {isLoading ? (
            <Skeleton className="h-5 w-96" />
          ) : (
            <p className="text-lg text-muted-foreground">
              {org?.data.description}
            </p>
          )}
        </Suspense>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 col-span-5 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Events</CardTitle>
                  <CardDescription className="mt-1.5">
                    Manage and view all organization events
                  </CardDescription>
                </div>
                <Suspense fallback={<Skeleton className="h-9 w-32" />}>
                  <RoleBaseRenderer
                    userRole={org?.data.role as string}
                    requiredRole="ADMIN"
                  >
                    <Button
                      onClick={() => router.replace(`/org/${id}/create-event`)}
                      className="gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      New Event
                    </Button>
                  </RoleBaseRenderer>
                </Suspense>
              </div>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-64 w-full" />}>
                <EventList />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2 col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Members</CardTitle>
                  <CardDescription className="mt-1.5">
                    Team members and roles
                  </CardDescription>
                </div>
              </div>
              <Suspense>
                <RoleBaseRenderer
                  userRole={org?.data.role as string}
                  requiredRole="ADMIN"
                >
                  <Button
                    onClick={() => setShowNewMemberModal(true)}
                    variant="outline"
                    className="w-full gap-2 mt-4"
                  >
                    <Plus className="h-4 w-4" />
                    Add Member
                  </Button>
                </RoleBaseRenderer>
              </Suspense>
            </CardHeader>
            <CardContent>
              <MemberList role={org!.data.role} />
            </CardContent>
          </Card>
        </div>
      </div>

      <NewMemberModal
        open={showNewMemberModal}
        onOpenChange={setShowNewMemberModal}
      />
    </div>
  );
};

export default OrgDetail;
