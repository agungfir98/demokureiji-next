"use client";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
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
import { useGetVoters } from "~/features/event";
import { SearchAndPaginateType } from "~/schema/query";

export const VoterList = () => {
  const { eventId } = useParams();

  const [query, setQuery] = useState<SearchAndPaginateType>({
    limit: 10,
    page: 1,
  });

  const { data } = useGetVoters({
    request: {
      eventId: String(eventId),
      query,
    },
    queryConfig: {
      enabled: !!eventId,
    },
  });

  if (!data) return null;

  if (!data.data.voters.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No registered voters yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-0.5">
        {data?.data.voters.map((voter, index) => {
          return (
            <div key={index}>
              <div className="flex items-center justify-between hover:bg-accent transition-colors p-3 rounded-md">
                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <p className="font-medium text-sm">{voter.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {voter.user.email}
                  </p>
                </div>
              </div>
              {index < data.data.voters.length - 1 && (
                <Separator className="my-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {data!.data.voters.length > 0 && (
        <Suspense>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
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

                {Array(data?.data.pagination.totalPages)
                  .fill(0)
                  .map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={
                          data?.data.pagination.currentPage === index + 1
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
                    isActive={data?.data.pagination.hasNextPage}
                    onClick={() => {
                      if (query.page < data!.data.pagination.totalPages) {
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
