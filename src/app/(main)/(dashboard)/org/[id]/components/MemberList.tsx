"use client";
import React, { Suspense, useState } from "react";
import { SearchInput } from "~/components/searchInput";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "~/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "~/components/ui/pagination";
import { MemberContextMenu } from "./member-context-menu";
import { useParams } from "next/navigation";
import { orgService } from "~/services/orgService";
import { OrgMemberQueryType } from "~/type/org";
import { useDebouncedCallback } from "~/hooks/useDebouncer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";

export const MemberList = () => {
  const { id } = useParams();
  const [query, setQuery] = useState<OrgMemberQueryType>({
    limit: 10,
    page: 1,
  });

  const { data: members } = orgService.GetOrgMembers(
    { orgId: id as string },
    { params: query },
    { queryKey: [query] }
  );

  const handleSearchMember = useDebouncedCallback((search: string) => {
    if (search) {
      return setQuery({ page: 1, limit: 1, search });
    } else {
      return setQuery({ page: 1, limit: 10 });
    }
  }, 750);

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <SearchInput
            placeholder="search member"
            onChange={(e) => handleSearchMember(e.target.value)}
          />
        </CardHeader>
        <ul>
          {members?.data.data?.members.map((member, index) => {
            return (
              <li key={index}>
                {member.role === "member" ? (
                  <div className="flex items-center justify-between hover:bg-secondary p-2 rounded-lg">
                    <span className="flex gap-2 items-end">
                      <p>{member.name}</p>
                      <p className="text-sm font-thin">{member.email}</p>
                    </span>
                    {member.role !== "member" && (
                      <Badge variant="outline">{member.role}</Badge>
                    )}
                  </div>
                ) : (
                  <MemberContextMenu member={member}>
                    <div className="flex justify-between items-center hover:bg-secondary p-2 rounded-lg">
                      <span className="flex gap-2 items-center">
                        <p>{member.name}</p>
                        <p className="text-sm font-thin">{member.email}</p>
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
          <Suspense>
            <Pagination className="mt-4 w-fit gap-4">
              <PaginationContent defaultValue={1}>
                <PaginationItem>
                  <PaginationPrevious
                    isActive={query.page === 1}
                    onClick={() => {
                      if (query.page > 1) {
                        return setQuery((prev) => ({
                          ...prev,
                          page: prev.page - 1,
                        }));
                      }
                    }}
                  />
                </PaginationItem>
                {Array(members?.data.data.pagination.totalPages)
                  .fill(0)
                  .map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={
                          members.data.data.pagination.currentPage === index + 1
                        }
                        onClick={() => {
                          setQuery((prev) => ({
                            ...prev,
                            page: index + 1,
                          }));
                        }}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                <PaginationItem>
                  <PaginationNext
                    isActive={members?.data.data.pagination.hasNextPage}
                    onClick={() => {
                      if (
                        query.page < members!.data.data.pagination.totalPages
                      ) {
                        return setQuery((prev) => ({
                          ...prev,
                          page: prev.page + 1,
                        }));
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>

              <Select
                defaultValue={members?.data.data.pagination.limit.toString()}
                onValueChange={(limit) => {
                  setQuery((prev) => ({
                    page: Math.ceil(
                      ((prev.page - 1) * prev.limit + 1) / Number(limit)
                    ),
                    limit: Number(limit),
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue>{query.limit}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </Pagination>
          </Suspense>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
