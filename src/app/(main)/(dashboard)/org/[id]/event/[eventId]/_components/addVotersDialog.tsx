"use client";

import { Suspense, useState } from "react";
import { LoaderCircle, Plus, Search } from "lucide-react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
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
import { Checkbox } from "~/components/ui/checkbox";
import { SearchAndPaginateType } from "~/schema/query";
import { useGetUnregisteredVoters } from "~/features/event/getUnregisteredVoter";
import { useDebouncedCallback } from "~/hooks/useDebouncer";
import { SearchInput } from "~/components/searchInput";
import { useAddVoters, Voters } from "~/features/event/addVoter";
import { toast } from "sonner";

export function AddVotersDialog() {
  const [open, setOpen] = useState(false);
  const [selectedVoters, setSelectedVoters] = useState<Voters>([]);
  const [query, setQuery] = useState<SearchAndPaginateType>({
    page: 1,
    limit: 5,
  });
  const handleSearchVoter = useDebouncedCallback((search: string) => {
    if (search) {
      return setQuery((prev) => ({ ...prev, page: 1, search }));
    } else {
      return setQuery((prev) => ({ ...prev, search: undefined }));
    }
  }, 750);

  const { eventId } = useParams();

  const { data, isLoading } = useGetUnregisteredVoters({
    params: { eventId: String(eventId), query },
    queryConfig: {
      enabled: open && !!eventId,
    },
  });

  const voters = data?.data.members ?? [];
  const pagination = data?.data?.pagination;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVoters(voters.map((v) => v.userId));
    } else {
      setSelectedVoters([]);
    }
  };

  const handleSelectVoter = (voterId: string, checked: boolean) => {
    if (checked) {
      setSelectedVoters([...selectedVoters, voterId]);
    } else {
      setSelectedVoters(selectedVoters.filter((id) => id !== voterId));
    }
  };

  const { mutate, isPending } = useAddVoters({
    onSuccess(data) {
      toast.success(data.message)
      setSelectedVoters([])
    }
  })


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Voters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Voters to Event</DialogTitle>
          <DialogDescription>
            Select organization members to add as voters for this event
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 py-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <SearchInput
              placeholder="Search by name or email..."
              onChange={(e) => handleSearchVoter(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto border rounded-md">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Loading voters...</p>
            </div>
          ) : voters.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">
                {query.search
                  ? "No voters found matching your search"
                  : "No unregistered voters available"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        voters.length > 0 &&
                        selectedVoters.length === voters.length
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {voters.map((voter) => (
                  <TableRow key={voter.userId}>
                    <TableCell>
                      <Checkbox
                        checked={selectedVoters.includes(voter.userId)}
                        onCheckedChange={(checked) =>
                          handleSelectVoter(voter.userId, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{voter.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {voter.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {voter.joinedAt.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {voters && voters.length > 0 && pagination && (
          <Suspense>
            <div className="flex items-center justify-between gap-2 pt-4 border-t flex-wrap">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      isActive={pagination.hasPrevPage}
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

                  {Array(pagination.totalPages)
                    .fill(0)
                    .map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={pagination.page === index + 1}
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
                      isActive={pagination.hasNextPage}
                      onClick={() => {
                        if (query.page < pagination.totalPages) {
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
            </div>
          </Suspense>
        )}

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            {selectedVoters.length} voter
            {selectedVoters.length !== 1 ? "s" : ""} selected
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(false);
                setSelectedVoters([]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => mutate({ eventId: String(eventId), payload: selectedVoters })}
              disabled={selectedVoters.length === 0 && isPending}
            >
              <LoaderCircle
                className={`animate-spin ${!isPending && "hidden"}`}
              />
              Add {selectedVoters.length} Voter
              {selectedVoters.length !== 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
