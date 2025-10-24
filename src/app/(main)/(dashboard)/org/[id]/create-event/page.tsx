"use client";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { getEventQueryKey } from "~/features/event";
import { useCreateEvent } from "~/features/event/createEvent";
import { queryClient } from "~/lib/query-client";
import { CreateEventForm } from "./_components/createEventForm";

const CreateEventPage = () => {
  const eventId = crypto.randomUUID();
  const { id: orgId } = useParams();
  const router = useRouter();

  const { mutate, isPending } = useCreateEvent({
    onSuccess() {
      toast.success("event created");
      queryClient.invalidateQueries({ queryKey: getEventQueryKey() });
      router.replace(`/org/${orgId}`);
    },
  });

  return (
    <div>
      <CreateEventForm
        organizationId={String(orgId)}
        eventId={eventId}
        onSubmit={mutate}
        isPending={isPending}
      />
    </div>
  );
};

export default CreateEventPage;
