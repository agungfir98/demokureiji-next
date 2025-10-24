"use client";
import { CheckCircle2, LoaderCircle, Vote as VoteIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useGetEvent } from "~/features/event";
import { useGetCandidates } from "~/features/event/getCandidates";
import { useGetVoteToken } from "~/features/event/getVoteToken";
import { useVote, type Vote } from "~/features/event/vote";
import { cn } from "~/lib/utils";

const VotePage = () => {
  const { eventId, id: orgId } = useParams<{ eventId: string; id: string }>();
  const router = useRouter();
  const [payload, setPayload] = useState<Vote>({
    organizationId: String(orgId),
    isAbstain: false,
    candidateId: "",
    voteToken: "",
  });

  const { data } = useGetEvent({
    eventId: String(eventId),
  });

  const { data: candidatesData } = useGetCandidates({
    eventId: String(eventId),
  });
  const { data: tokenData } = useGetVoteToken({ eventId: String(eventId) });

  const { mutate, isPending } = useVote({
    eventId: String(eventId),
    mutationConfig: {
      onSuccess(data) {
        toast.success(data.message);
        router.back();
      },
    },
  });

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <VoteIcon className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-3">
          {data?.data.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select your preferred candidate below. Your vote is anonymous and
          cannot be changed once submitted.
        </p>
        <p>{tokenData?.data.voteToken}</p>
      </div>

      {/* Candidates Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {candidatesData?.data.map((candidate, index) => {
          const isSelected = candidate.id === payload.candidateId;

          return (
            <Card
              key={candidate.id}
              className={cn(
                "cursor-pointer select-none transition-all duration-200 hover:shadow-lg",
                isSelected && "ring-2 ring-primary shadow-lg scale-[1.02]",
              )}
              onClick={() =>
                setPayload((prev) => ({
                  ...prev,
                  candidateId:
                    prev.candidateId === candidate.id ? "" : candidate.id,
                }))
              }
            >
              <CardHeader className="relative">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">
                      CANDIDATE {index + 1}
                    </div>
                    <CardTitle className="text-xl mb-1">
                      {candidate.leader.name}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {candidate.viceLeader.name}
                    </CardDescription>
                  </div>
                  {isSelected && (
                    <div className="flex-shrink-0">
                      <div className="rounded-full bg-primary p-1">
                        <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {candidate.visionMission && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Vision & Mission
                    </p>
                    <p className="text-sm leading-relaxed">
                      {candidate.visionMission}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.back()}
          disabled={isPending}
          className="w-full sm:w-auto min-w-[140px]"
        >
          Cancel
        </Button>
        <Button
          size="lg"
          disabled={!payload.candidateId || isPending}
          onClick={() => {
            mutate({
              eventId: String(eventId),
              payload: { ...payload, voteToken: tokenData!.data.voteToken },
            });
          }}
          className="w-full sm:w-auto min-w-[140px] gap-2"
        >
          {isPending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <VoteIcon className="h-4 w-4" />
              Submit Vote
            </>
          )}
        </Button>
      </div>

      {/* Info Notice */}
      {payload.candidateId && (
        <div className="mt-8 p-4 bg-muted rounded-lg border">
          <p className="text-sm text-center text-muted-foreground">
            ⚠️ Please review your selection carefully. Once submitted, your vote
            cannot be changed.
          </p>
        </div>
      )}
    </div>
  );
};

export default VotePage;
