import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { EVENT_STATUS } from "~/constant";
import { useGetEventStatuses } from "~/features/event/getEventStatus";
import { usePatchEvent } from "~/features/event/patchEvent";
import { EventStatus } from "~/type/event.type";

export const StatusButton: React.FC<{ status: EventStatus }> = ({ status }) => {
  const { eventId } = useParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const { data, isPending } = useGetEventStatuses()
  const { mutate } = usePatchEvent();

  const statusConfig = {
    inactive: {
      buttonLabel: "Start Event",
      dialogTitle: "Confirm Start Event",
      dialogDescription:
        "Are you sure you want to start the event? Once started, it cannot be undone.",
      actionLabel: "Start",
      nextStatus: data?.data.find(status => status.name === EVENT_STATUS.ACTIVE)?.id
    },
    active: {
      buttonLabel: "End Event",
      dialogTitle: "Confirm End Event",
      dialogDescription:
        "Are you sure you want to end the event? This action is irreversible.",
      actionLabel: "End",
      nextStatus: data?.data.find(status => status.name === EVENT_STATUS.FINISHED)?.id
    },
    finished: {
      buttonLabel: "Event Finished",
      dialogTitle: "Event Completed",
      dialogDescription:
        "This event has already been completed and cannot be modified.",
      actionLabel: null,
      nextStatus: null,
    },
  } as const;

  const config = statusConfig[status];

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          disabled={status === "finished"}
          onClick={() => setShowDialog(true)}
        >
          {config.buttonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{config.dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {config.dialogDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {config.nextStatus && (
            <AlertDialogAction
              disabled={status === "finished" && isPending}
              onClick={() =>
                mutate({
                  eventId: String(eventId),
                  payload: {
                    id: String(eventId),
                    statusId: config.nextStatus,
                  },
                })
              }
            >
              {config.actionLabel}
            </AlertDialogAction>
          )}
          <AlertDialogCancel>cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
