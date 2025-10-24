"use client";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { SearchInput } from "~/components/searchInput";
import { Badge } from "~/components/ui/badge";
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
import { useGetOrgMembers } from "~/features/org";
import { useDebouncedCallback } from "~/hooks/useDebouncer";
import { hasRole } from "~/lib/utils";
import { SearchAndPaginateType } from "~/schema/query";
import { OrgMemberRole } from "~/type/org.type";
import { MemberContextMenu } from "./member-context-menu";

export const MemberList: React.FC<{ role: OrgMemberRole }> = ({ role }) => {
  const { id } = useParams();
  const [query, setQuery] = useState<SearchAndPaginateType>({
    page: 1,
    limit: 5,
  });

  const { data: members } = useGetOrgMembers({
    payload: { orgId: id as string, query },
  });

  const handleSearchMember = useDebouncedCallback((search: string) => {
    if (search) {
      return setQuery((prev) => ({ ...prev, page: 1, search }));
    } else {
      return setQuery((prev) => ({ ...prev, search: undefined }));
    }
  }, 750);

  return (
    <div className="space-y-4">
      <SearchInput
        placeholder="Search members..."
        onChange={(e) => handleSearchMember(e.target.value)}
      />

      <div className="space-y-0.5">
        {members?.data?.members.map((member, index) => {
          const hierarchy: Record<OrgMemberRole, number> = {
            master: 1,
            admin: 2,
            member: 3,
          };
          const canManageMember =
            hasRole(role, ["master", "admin"]) &&
            hierarchy[role] <= hierarchy[member.role];

          const memberItem = (
            <div className="flex items-center justify-between hover:bg-accent transition-colors p-3 rounded-md cursor-pointer">
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {member.email}
                </p>
              </div>
              {member.role !== "member" && (
                <Badge variant="secondary" className="ml-2 capitalize text-xs">
                  {member.role}
                </Badge>
              )}
            </div>
          );

          return (
            <div key={index}>
              {canManageMember ? (
                <MemberContextMenu member={member}>
                  {memberItem}
                </MemberContextMenu>
              ) : (
                memberItem
              )}
              {index < members.data.members.length - 1 && (
                <Separator className="my-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {members?.data.members.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No members found</p>
        </div>
      )}

      {members && members.data.members.length > 0 && (
        <Suspense>
          <div className="flex items-center justify-between gap-2 pt-4 border-t flex-wrap">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    isActive={members?.data.pagination.hasPrevPage}
                    onClick={() => {
                      if (query.page > 1) {
                        setQuery((prev) => ({
                          ...prev,
                          page: prev.page - 1,
                        }));
                      }
                    }}
                  />
                </PaginationItem>

                {Array(members?.data.pagination.totalPages)
                  .fill(0)
                  .map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={
                          members!.data.pagination.currentPage === index + 1
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
                    isActive={members?.data.pagination.hasNextpage}
                    onClick={() => {
                      if (query.page < members!.data.pagination.totalPages) {
                        setQuery((prev) => ({
                          ...prev,
                          page: prev.page + 1,
                        }));
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="flex gap-2 self-start">
              <Select
                value={query.limit.toString()}
                onValueChange={(limit) => {
                  setQuery((prev) => ({
                    page: Math.ceil(
                      ((prev.page - 1) * prev.limit! + 1) / Number(limit),
                    ),
                    limit: Number(limit),
                  }));
                }}
              >
                <SelectTrigger className="w-[70px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
};
