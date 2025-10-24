"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronsUpDown,
  LoaderCircle,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Textarea } from "~/components/ui/textarea";
import {
  createEventandCandidateSchema,
  CreateEventType,
} from "~/features/event/createEvent";
import { OrgMembersResponse, useGetOrgMembers } from "~/features/org";
import { useDebouncer } from "~/hooks/useDebouncer";
import { cn } from "~/lib/utils";

interface CreateEventFormProps {
  organizationId: string;
  eventId: string;
  onSubmit: (data: CreateEventType) => void;
  isPending?: boolean;
}

type MemberType = OrgMembersResponse["members"][0];

interface CandidateState {
  leader?: MemberType;
  viceLeader?: MemberType;
}

export const CreateEventForm = ({
  organizationId,
  eventId,
  onSubmit,
  isPending = false,
}: CreateEventFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch] = useDebouncer(searchQuery, 300);

  const [selectedCandidates, setSelectedCandidates] = useState<
    Record<number, CandidateState>
  >({});

  const { data: membersData, isLoading: isMembersLoading } = useGetOrgMembers({
    payload: {
      orgId: organizationId,
      query: { search: debouncedSearch, page: 1, limit: 5 },
    },
  });

  const members = membersData?.data.members ?? [];

  const eventForm = useForm<CreateEventType>({
    resolver: zodResolver(createEventandCandidateSchema),
    defaultValues: {
      id: eventId,
      organizationId,
      title: "",
      description: "",
      allowAbstain: false,
      candidates: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: eventForm.control,
    name: "candidates",
  });

  const handleRemoveCandidate = (index: number) => {
    remove(index);
    setSelectedCandidates((prev) => {
      const updated = { ...prev };
      delete updated[index];
      // WARN: Reindexing candidates- Don't TOUCH THIS, was confusing af
      const reindexed: Record<number, CandidateState> = {};
      Object.entries(updated).forEach(([key, value]) => {
        const oldIndex = Number(key);
        if (oldIndex > index) {
          reindexed[oldIndex - 1] = value;
        } else {
          reindexed[oldIndex] = value;
        }
      });
      return reindexed;
    });
  };

  const handleSelectLeader = (index: number, member: MemberType) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        leader: member,
      },
    }));
  };

  const handleSelectViceLeader = (index: number, member: MemberType) => {
    setSelectedCandidates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        viceLeader: member,
      },
    }));
  };

  const handleClearLeader = (
    index: number,
    fieldOnChange: (value: string) => void,
  ) => {
    fieldOnChange("");
    setSelectedCandidates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        leader: undefined,
      },
    }));
  };

  const handleClearViceLeader = (
    index: number,
    fieldOnChange: (value: string) => void,
  ) => {
    fieldOnChange("");
    setSelectedCandidates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        viceLeader: undefined,
      },
    }));
  };

  const getSelectedLeaderName = (index: number, fieldValue: string) => {
    const candidate = selectedCandidates[index];
    if (candidate?.leader?.id === fieldValue) {
      return candidate.leader.name;
    }
    return "Select leader";
  };

  const getSelectedViceLeaderName = (index: number, fieldValue: string) => {
    const candidate = selectedCandidates[index];
    if (candidate?.viceLeader?.id === fieldValue) {
      return candidate.viceLeader.name;
    }
    return "Select vice leader";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new vote event</CardTitle>
      </CardHeader>
      <Form {...eventForm}>
        <form onSubmit={eventForm.handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid gap-4">
              <FormField
                control={eventForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={eventForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Event description"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={eventForm.control}
                name="allowAbstain"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Allow abstain votes</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="border-t pt-4 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">
                    Candidates ({fields.length})
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        eventId,
                        number: fields.length + 1,
                        organizationId,
                        leaderId: "",
                        visionMission: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add candidate
                  </Button>
                </div>

                {eventForm.formState.errors.candidates?.message && (
                  <p className="text-sm text-destructive mb-4">
                    {eventForm.formState.errors.candidates.message}
                  </p>
                )}

                {fields.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No candidates added yet. Click &quot;Add candidate&quot; to
                    get started.
                  </p>
                )}

                <div className="grid gap-4">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="relative">
                      <CardHeader>
                        <CardTitle className="text-base">
                          Candidate #{index + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          <FormField
                            control={eventForm.control}
                            name={`candidates.${index}.number`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Candidate Number</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={1}
                                    placeholder="Candidate number"
                                    {...field}
                                    onChange={(e) => {
                                      const value = Number(e.target.value);
                                      field.onChange(value < 1 ? 1 : value);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={eventForm.control}
                            name={`candidates.${index}.leaderId`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Leader</FormLabel>
                                <div className="flex gap-2">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            "w-full justify-between",
                                            !field.value &&
                                              "text-muted-foreground",
                                          )}
                                          disabled={isMembersLoading}
                                        >
                                          {isMembersLoading
                                            ? "Loading members..."
                                            : getSelectedLeaderName(
                                                index,
                                                field.value,
                                              )}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-full p-0"
                                      align="start"
                                    >
                                      <Command>
                                        <CommandInput
                                          placeholder="Search member..."
                                          value={searchQuery}
                                          onValueChange={setSearchQuery}
                                        />
                                        <CommandList>
                                          <CommandEmpty>
                                            {isMembersLoading
                                              ? "Loading..."
                                              : "No member found."}
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {members.map((member) => (
                                              <CommandItem
                                                value={member.name}
                                                key={member.id}
                                                onSelect={() => {
                                                  field.onChange(member.id);
                                                  handleSelectLeader(
                                                    index,
                                                    member,
                                                  );
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    member.id === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0",
                                                  )}
                                                />
                                                <div className="flex flex-col">
                                                  <span>{member.name}</span>
                                                  {member.email && (
                                                    <span className="text-xs text-muted-foreground">
                                                      {member.email}
                                                    </span>
                                                  )}
                                                </div>
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                  {field.value && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() =>
                                        handleClearLeader(index, field.onChange)
                                      }
                                      className="shrink-0"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={eventForm.control}
                            name={`candidates.${index}.viceLeaderId`}
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Vice Leader (Optional)</FormLabel>
                                <div className="flex gap-2">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          role="combobox"
                                          className={cn(
                                            "w-full justify-between",
                                            !field.value &&
                                              "text-muted-foreground",
                                          )}
                                          disabled={isMembersLoading}
                                        >
                                          {isMembersLoading
                                            ? "Loading members..."
                                            : getSelectedViceLeaderName(
                                                index,
                                                field.value ?? "",
                                              )}
                                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-full p-0"
                                      align="start"
                                    >
                                      <Command>
                                        <CommandInput
                                          placeholder="Search member..."
                                          value={searchQuery}
                                          onValueChange={setSearchQuery}
                                        />
                                        <CommandList>
                                          <CommandEmpty>
                                            {isMembersLoading
                                              ? "Loading..."
                                              : "No member found."}
                                          </CommandEmpty>
                                          <CommandGroup>
                                            {members.map((member) => (
                                              <CommandItem
                                                value={member.name}
                                                key={member.id}
                                                onSelect={() => {
                                                  field.onChange(member.id);
                                                  handleSelectViceLeader(
                                                    index,
                                                    member,
                                                  );
                                                }}
                                              >
                                                <Check
                                                  className={cn(
                                                    "mr-2 h-4 w-4",
                                                    member.id === field.value
                                                      ? "opacity-100"
                                                      : "opacity-0",
                                                  )}
                                                />
                                                <div className="flex flex-col">
                                                  <span>{member.name}</span>
                                                  {member.email && (
                                                    <span className="text-xs text-muted-foreground">
                                                      {member.email}
                                                    </span>
                                                  )}
                                                </div>
                                              </CommandItem>
                                            ))}
                                          </CommandGroup>
                                        </CommandList>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                  {field.value && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() =>
                                        handleClearViceLeader(
                                          index,
                                          field.onChange,
                                        )
                                      }
                                      className="shrink-0"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={eventForm.control}
                            name={`candidates.${index}.visionMission`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Vision & Mission (Optional)
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Candidate's vision and mission"
                                    rows={4}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                      <Button
                        type="button"
                        className="absolute right-6 top-6"
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveCandidate(index)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end mt-6">
            <Button
              type="submit"
              className="self-end sm:w-fit w-full"
              disabled={isPending}
            >
              {isPending && (
                <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
              )}
              Submit
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
