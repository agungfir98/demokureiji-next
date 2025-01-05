"use client";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Separator } from "~/components/ui/separator";
import { orgService } from "~/services/orgService";
import { IUser } from "~/type/httpResponse";
import { NewMemberModal } from "./components/NewMemberModal";

const OrgDetail = () => {
  const { id } = useParams();
  const [showNewMemberModal, setShowNewMemberModal] = useState<boolean>(false);

  const { data } = orgService.GetSingleOrg({ orgId: id as string });

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>
                <h1 className="text-2xl font-semibold">
                  {data?.data.data?.organization}
                </h1>
              </CardTitle>
              <CardDescription>
                {data?.data.data?.description} kebiasaan, anjing
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between my-2">
              <h1 className="text-xl font-semibold">Events</h1>
              {data?.data.data!.isAdmin && (
                <div className="">
                  <Button size="sm">
                    <Plus />
                    New Event
                  </Button>
                </div>
              )}
            </div>
            <Card>
              <CardContent className="mt-6 grid">
                {data?.data.data?.voteEvents.length === 0 && (
                  <span className="my-4 mx-auto opacity-65">
                    no event being held
                  </span>
                )}
                <ul>
                  {data?.data.data?.voteEvents.map((v, index) => (
                    <li key={index}>
                      <p>{v.voteTitle}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Separator className="my-4" />
          <div>
            <div className="flex justify-between my-2">
              <h1 className="text-xl font-semibold">Members</h1>
              {data?.data.data!.isAdmin && (
                <div className="">
                  <Button size="sm" onClick={() => setShowNewMemberModal(true)}>
                    <Plus />
                    add member
                  </Button>
                </div>
              )}
            </div>
            <Card>
              <CardContent className="mt-6 grid">
                <ul>
                  {data?.data.data?.members.map((member, index) => {
                    const v = member as IUser & { isAdmin: string };
                    return (
                      <li key={index}>
                        <ContextMenu>
                          <ContextMenuTrigger className="flex justify-between hover:bg-secondary p-2">
                            <p>{v.name}</p>
                            {v.isAdmin && (
                              <Badge variant="outline">Admin</Badge>
                            )}
                          </ContextMenuTrigger>
                          <ContextMenuContent className="w-64">
                            <ContextMenuItem>satuaaa</ContextMenuItem>
                          </ContextMenuContent>
                        </ContextMenu>
                        <Separator />
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
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
