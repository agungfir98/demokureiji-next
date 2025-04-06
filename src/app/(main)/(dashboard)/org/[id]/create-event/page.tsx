"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { queryClient } from "~/components/query-provider";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import eventService from "~/services/event.service";
import { newEventSchema, NewEventType } from "~/type/event";

const CreateEventPage = () => {
  const { id: orgId } = useParams();
  const router = useRouter();

  const eventForm = useForm<NewEventType>({
    resolver: zodResolver(newEventSchema),
    defaultValues: {
      voteTitle: "",
      candidates: [
        {
          calonKetua: "",
          calonWakil: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: eventForm.control,
    name: "candidates",
  });

  const { mutate, isPending } = eventService.NewEvent({
    onSuccess(data) {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["orgDetail", orgId] });
      return router.replace(`/org/${orgId}`);
    },
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create new vote event</CardTitle>
        </CardHeader>
        <Form {...eventForm}>
          <form
            onSubmit={eventForm.handleSubmit(
              (data) => mutate({ orgId: orgId as string, data }),
              async () => {
                await eventForm.trigger("candidates");
              }
            )}
          >
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={eventForm.control}
                  name="voteTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel title={field.name}>title</FormLabel>
                      <FormControl>
                        <Input placeholder="event title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <h2 className="font-semibold">
                  Candidates ({eventForm.getValues("candidates").length})
                </h2>
                {eventForm.formState.errors.candidates?.message && (
                  <p className="text-destructive">
                    {eventForm.formState.errors.candidates.message}
                  </p>
                )}
                {fields.map((field, index) => (
                  <Card key={field.id} className="relative">
                    <CardHeader>
                      <CardTitle>candidate {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-2">
                        <FormField
                          control={eventForm.control}
                          name={`candidates.${index}.calonKetua`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel title={field.name}>
                                main candidate
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="main candidate"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={eventForm.control}
                          name={`candidates.${index}.calonWakil`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel title={field.name}>
                                vice candidate
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="vice candidate"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={eventForm.control}
                        name={`candidates.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel title={field.name}>
                              description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="candidate desciprtion"
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                    <Button
                      className="absolute right-6 top-6"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Minus />
                    </Button>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({ calonWakil: "", description: "", calonKetua: "" })
                  }
                >
                  <Plus />
                  candidate
                </Button>
              </div>
            </CardContent>
            <CardFooter className="justify-end mt-6">
              <Button className="self-end sm:w-fit w-full">
                <LoaderCircle
                  className={`animate-spin ${!isPending && "hidden"}`}
                />
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateEventPage;
