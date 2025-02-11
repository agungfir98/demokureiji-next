"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SearchInput } from "~/components/searchInput";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { useDebouncedCallback } from "~/hooks/useDebouncer";
import { orgService } from "~/services/orgService";
import { OrgQueryType } from "~/type/org";
import { NewMemberModal } from "./components/NewMemberModal";
import { MemberContextMenu } from "./components/member-context-menu";
import { EventStatus } from "~/components/event-activity-status";

const OrgDetail = () => {
  const { id } = useParams();
  const [showNewMemberModal, setShowNewMemberModal] = useState<boolean>(false);
  const router = useRouter();
  const [query, setQuery] = useState<OrgQueryType>({
    memberLimit: 10,
    memberPage: 1,
  });

  const { data, isPending } = orgService.GetSingleOrg(
    { orgId: id as string },
    { ...query },
    {
      queryKey: [query, "orgDetail", id],
    }
  );

  const handleSearchMember = useDebouncedCallback((searchMember: string) => {
    if (searchMember) {
      return setQuery({ memberPage: 1, memberLimit: 1, searchMember });
    } else {
      return setQuery({ memberPage: 1, memberLimit: 10 });
    }
  }, 750);

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
              <CardDescription>{data?.data.data.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-between my-2">
              <h1 className="text-xl font-semibold">Events</h1>
              {data?.data.data!.role === "admin" ||
                (data?.data.data?.role === "master" && (
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
                ))}
            </div>
            <Card>
              <CardContent className="mt-6 grid">
                {!data?.data.data?.voteevents.length && (
                  <span className="my-4 mx-auto opacity-65">
                    no event being held
                  </span>
                )}
                <ul>
                  {data?.data.data?.voteevents.map((event, index) => (
                    <li key={index}>
                      <Link
                        href={`/org/${id}/event/${event._id}`}
                        className="relative"
                      >
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
          </div>
          <Separator className="my-4" />

          <div>
            <div className="flex justify-between my-2">
              <h1 className="text-xl font-semibold">Members</h1>
              {data?.data.data.role === "admin" ||
                (data?.data.data?.role === "master" && (
                  <div className="">
                    <Button
                      size="sm"
                      onClick={() => setShowNewMemberModal(true)}
                    >
                      <Plus />
                      add member
                    </Button>
                  </div>
                ))}
            </div>

            <Card>
              <CardContent>
                <CardHeader>
                  <SearchInput
                    placeholder="search member"
                    onChange={(e) => handleSearchMember(e.target.value)}
                  />
                </CardHeader>
                <ul>
                  {data?.data.data?.members.map((member, index) => {
                    return (
                      <li key={index}>
                        {data.data.data?.role === "member" ? (
                          <div className="flex items-center justify-between hover:bg-secondary p-2 rounded-lg">
                            <span className="flex gap-2 items-end">
                              <p>{member.member.name}</p>
                              <p className="text-sm font-thin">
                                {member.member.email}
                              </p>
                            </span>
                            {member.role !== "member" && (
                              <Badge variant="outline">{member.role}</Badge>
                            )}
                          </div>
                        ) : (
                          <MemberContextMenu member={member}>
                            <div className="flex justify-between items-center hover:bg-secondary p-2 rounded-lg">
                              <span className="flex gap-2 items-center">
                                <p>{member.member.name}</p>
                                <p className="text-sm font-thin">
                                  {member.member.email}
                                </p>
                              </span>
                              {member.role !== "member" && (
                                <Badge variant="outline">{member.role}</Badge>
                              )}
                            </div>
                          </MemberContextMenu>
                        )}
                        <Separator />
                      </li>
                    );
                  })}
                </ul>

                <CardFooter>
                  {!isPending && data && (
                    <Pagination className="mt-4 w-fit gap-4">
                      <PaginationContent defaultValue={1}>
                        <PaginationItem>
                          <PaginationPrevious
                            isActive={query.memberPage === 1}
                            onClick={() => {
                              if (query.memberPage > 1) {
                                return setQuery((prev) => ({
                                  ...prev,
                                  memberPage: prev.memberPage - 1,
                                }));
                              }
                            }}
                          />
                        </PaginationItem>
                        {Array(data.data.data.pagination.totalPages)
                          .fill(0)
                          .map((_, index) => (
                            <PaginationItem key={index}>
                              <PaginationLink
                                isActive={
                                  data.data.data.pagination.page === index + 1
                                }
                                onClick={() => {
                                  setQuery((prev) => ({
                                    ...prev,
                                    memberPage: index + 1,
                                  }));
                                }}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                        <PaginationItem>
                          <PaginationNext
                            isActive={
                              query.memberPage ===
                              data.data.data.pagination.totalPages
                            }
                            onClick={() => {
                              if (
                                query.memberPage <
                                data.data.data.pagination.totalPages
                              ) {
                                return setQuery((prev) => ({
                                  ...prev,
                                  memberPage: prev.memberPage + 1,
                                }));
                              }
                            }}
                          />
                        </PaginationItem>
                      </PaginationContent>

                      <Select
                        defaultValue={data.data.data.pagination.limit.toString()}
                        onValueChange={(memberLimit) => {
                          setQuery((prev) => ({
                            memberPage: Math.ceil(
                              ((prev.memberPage - 1) * prev.memberLimit + 1) /
                                Number(memberLimit)
                            ),
                            memberLimit: Number(memberLimit),
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue>{query.memberLimit}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="15">15</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                      </Select>
                    </Pagination>
                  )}
                </CardFooter>
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
