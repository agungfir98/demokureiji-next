"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { orgService } from "~/services/orgService";
import { newOrgSchema, NewOrgType } from "~/type/org";

const NewOrganization = () => {
  const newOrgForm = useForm<NewOrgType>({
    resolver: zodResolver(newOrgSchema),
    defaultValues: {
      description: "",
      orgName: "",
    },
  });

  const router = useRouter();

  const { mutate } = orgService.newOrganization({
    onSuccess({ data }) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["organization"] });
      router.push("/org");
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
                  name="orgName"
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button className="self-end sm:w-fit w-full">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default NewOrganization;
