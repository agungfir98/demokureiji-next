"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
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
import {
  createOrgRequest,
  createOrgSchema,
  getOrgQueryKey,
  useCreateOrg,
} from "~/features/org";
import { queryClient } from "~/lib/query-client";

const NewOrgModal = () => {
  const id = crypto.randomUUID()
  const newOrgForm = useForm<createOrgRequest>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      id,
      description: "",
      name: "",
    },
  });

  const router = useRouter();

  const { mutate, isPending } = useCreateOrg({
    onSuccess({ message }) {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: getOrgQueryKey() });
      return router.back();
    },
  });

  return (
    <Dialog
      defaultOpen={true}
      onOpenChange={(open) => {
        if (!open) {
          return router.back();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Organization</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...newOrgForm}>
            <form
              className="grid gap-4"
              onSubmit={newOrgForm.handleSubmit((data) => mutate(data))}
            >
              <FormField
                control={newOrgForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel title={field.name}>organization</FormLabel>
                    <FormControl>
                      <Input placeholder="organization name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={newOrgForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel title={field.name}>{field.name}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="organization description"
                        className="max-h-[300px]"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <div className="flex justify-end mt-4">
                  <Button className="self-end sm:w-fit w-full">
                    <LoaderCircle
                      className={`animate-spin ${!isPending && "hidden"}`}
                    />
                    Submit
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrgModal;
