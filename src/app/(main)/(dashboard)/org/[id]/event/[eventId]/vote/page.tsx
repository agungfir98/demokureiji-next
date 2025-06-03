"use client"
import { CheckIcon, LoaderCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import eventService from "~/services/event.service";

const VotePage = () => {
  const { eventId, id: orgId } = useParams<{ eventId: string, id: string }>()
  const [selected, setSelected] = useState<{ candidateId: string | null }>({ candidateId: null })

  const { data } = eventService.GetEvent(eventId as string, { orgId: orgId as string })

  const { mutate, isPending } = eventService.Vote({
    onError: err => {
      return toast.error(err.response?.data.message)
    }
  })

  return (
    <main>
      <CardHeader>
        <CardTitle className="text-2xl">
          {data?.voteTitle}
        </CardTitle>
        <CardDescription>
          <h1>Please select candidate you want to vote</h1>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {data?.candidates.map(v => (
            <Card key={v._id}
              className={cn("cursor-pointer select-none relative", v._id == selected.candidateId && "shadow-white/20 shadow-md")}
              onClick={() => setSelected((prev) => ({ candidateId: prev.candidateId == v._id ? null : v._id }))}>
              <CardHeader className="flex flex-col gap-2">
                <CardTitle>{v.calonKetua} {v.calonWakil}</CardTitle>
                {selected.candidateId == v._id && <CheckIcon className="absolute right-5 top-0" />}
              </CardHeader>
              <CardContent>
                <CardDescription>description</CardDescription>
                <p>{v.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center my-10">
        <Button
          disabled={!selected.candidateId}
          onClick={() => {
            mutate({ orgId, eventId, candidateId: selected.candidateId! })
          }}>
          vote
          <LoaderCircle
            className={`animate-spin ${!isPending && "hidden"}`}
          />
        </Button>
      </CardFooter>
    </main>
  )
}

export default VotePage
