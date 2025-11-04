"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import {
  createOrgRequest,
  createOrgSchema,
  getOrgQueryKey,
  useCreateOrg,
} from "~/features/org";
import { queryClient } from "~/lib/query-client";

const NewOrganization = () => {
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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create a new organization</CardTitle>
        </CardHeader>
        <Form {...newOrgForm}>
          <form onSubmit={newOrgForm.handleSubmit((data) => mutate(data))}>
            <CardContent>
              <div className="grid gap-4">
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
                          rows={4}
                          className="max-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
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

export default NewOrganization;
