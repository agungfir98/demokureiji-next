"use client";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
import eventService from "~/services/event.service";
import { VotersQueryType } from "~/type/event";

export const VoterList = () => {
  const { eventId, id: orgId } = useParams();

  const [query, setQuery] = useState<VotersQueryType>({
    limit: 10,
    page: 1,
  });

  const { data: voters } = eventService.GetEventVoters(
    { orgId: orgId as string, eventId: eventId as string },
    query,
    [query]
  );

  // const handleSearchVoter = useDebouncedCallback((search: string) => {
  //   if (search) {
  //     return setQuery({ page: 1, limit: 1, search });
  //   } else {
  //     return setQuery({ page: 1, limit: 10 });
  //   }
  // }, 750);

  // return (
  //   <div>
  //     <h1>alooo</h1>
  //   </div>
  // );
  return (
    <Card>
      <CardContent>
        <CardHeader>
          {/*   <SearchInput */}
          {/*     placeholder="search member" */}
          {/*     onChange={(e) => handleSearchVoter(e.target.value)} */}
          {/*   /> */}
        </CardHeader>
        <ul>
          {voters?.data?.voters.map((member, index) => {
            return (
              <li key={index}>
                <div className="flex items-center justify-between hover:bg-secondary p-2 rounded-lg">
                  <span className="flex gap-2 items-end">
                    <p>{member.name}</p>
                    <p className="text-sm font-thin">{member.email}</p>
                  </span>
                </div>
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
                {Array(voters?.data.pagination.totalPages)
                  .fill(0)
                  .map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={
                          voters.data.pagination.currentPage === index + 1
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
                    isActive={voters?.data.pagination.hasNextPage}
                    onClick={() => {
                      if (query.page < voters!.data.pagination.totalPages) {
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
                defaultValue={voters?.data.pagination.limit.toString()}
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
