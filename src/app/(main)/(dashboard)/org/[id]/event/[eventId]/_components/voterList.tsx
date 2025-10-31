"use client";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useGetVoters } from "~/features/event";
import { SearchAndPaginateType } from "~/schema/query";
import { OrgMemberRole } from "~/type/org.type";

export const VoterList: React.FC<{ role: OrgMemberRole }> = ({ role }) => {
  const { eventId } = useParams();

  const [query, setQuery] = useState<SearchAndPaginateType>({
    limit: 10,
    page: 1,
  });

  const [selectionMode, setSelectionMode] = useState<"single" | "bulk">(
    "single",
  );
  const [selectedVoters, setSelectedVoters] = useState<Set<string>>(new Set());

  const { data } = useGetVoters({
    request: {
      eventId: String(eventId),
      query,
    },
    queryConfig: {
      enabled: !!eventId,
    },
  });

  const isAdminOrMaster = role === "admin" || role === "master";

  const toggleVoterSelection = (voterId: string) => {
    setSelectedVoters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(voterId)) {
        newSet.delete(voterId);
      } else {
        newSet.add(voterId);
      }
      return newSet;
    });
  };

  const toggleAllVoters = () => {
    if (selectedVoters.size === data?.data.voters.length) {
      setSelectedVoters(new Set());
    } else {
      const allIds = new Set(
        data?.data.voters.map((voter) => voter.user.email) || [],
      );
      setSelectedVoters(allIds);
    }
  };

  const handleModeChange = (mode: "single" | "bulk") => {
    setSelectionMode(mode);
    setSelectedVoters(new Set());
  };

  if (!data) return null;

  if (!data.data.voters.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No registered voters yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mode selector and selection info */}
      {isAdminOrMaster && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center rounded-lg border p-1 bg-muted/50">
            <Button
              variant={selectionMode === "single" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-3"
              onClick={() => handleModeChange("single")}
            >
              Single
            </Button>
            <Button
              variant={selectionMode === "bulk" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 px-3"
              onClick={() => handleModeChange("bulk")}
            >
              Bulk
            </Button>
          </div>
          {selectionMode === "bulk" && selectedVoters.size > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {selectedVoters.size} selected
              </span>
              {/* Add action buttons here */}
              <Button variant="destructive" size="sm">
                Remove Selected
              </Button>
            </div>
          )}
        </div>
      )}

      {isAdminOrMaster ? (
        // Data Table View for Admin/Master
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {selectionMode === "bulk" && (
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedVoters.size === data.data.voters.length &&
                        data.data.voters.length > 0
                      }
                      onCheckedChange={toggleAllVoters}
                      aria-label="Select all"
                    />
                  </TableHead>
                )}
                <TableHead className="w-[80px] font-semibold">#</TableHead>
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.voters.map((voter, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {selectionMode === "bulk" && (
                    <TableCell>
                      <Checkbox
                        checked={selectedVoters.has(voter.user.email)}
                        onCheckedChange={() =>
                          toggleVoterSelection(voter.user.email)
                        }
                        aria-label={`Select ${voter.user.name}`}
                      />
                    </TableCell>
                  )}
                  <TableCell className="font-medium text-muted-foreground">
                    {(query.page - 1) * query.limit + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {voter.user.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {voter.user.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden divide-y">
          {data.data.voters.map((voter, index) => (
            <div
              key={index}
              className="flex items-center gap-3 hover:bg-muted/50 transition-colors p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm flex-shrink-0">
                {voter.user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <p className="font-medium text-sm">{voter.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {voter.user.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.data.voters.length > 0 && (
        <Suspense>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Rows per page:
              </span>
              <Select
                value={query.limit.toString()}
                onValueChange={(limit) => {
                  setQuery((prev) => ({
                    page: Math.ceil(
                      ((prev.page - 1) * prev.limit + 1) / Number(limit),
                    ),
                    limit: Number(limit),
                  }));
                }}
              >
                <SelectTrigger className="w-[75px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {(query.page - 1) * query.limit + 1}-
                {Math.min(
                  query.page * query.limit,
                  data.data.pagination.totalVoters,
                )}{" "}
                of {data.data.pagination.totalVoters}
              </span>
            </div>

            <Pagination className="mx-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    isActive={query.page === 1}
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

                {Array(data.data.pagination.totalPages)
                  .fill(0)
                  .map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={
                          data.data.pagination.currentPage === index + 1
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
                    isActive={data.data.pagination.hasNextPage}
                    onClick={() => {
                      if (query.page < data.data.pagination.totalPages) {
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
          </div>
        </Suspense>
      )}
    </div>
  );
};
