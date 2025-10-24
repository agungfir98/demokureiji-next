"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { signInSchema, SignInType, useSignIn } from "~/features/auth";
import useAuthStore from "~/hooks/useAuth";

export const SignInForm = () => {
  const router = useRouter();
  const signInForm = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setToken } = useAuthStore();
  const { mutate, isPending } = useSignIn({
    onError(err) {
      const message = err.message;
      return toast.error(message);
    },
    onSuccess(data) {
      toast.success(data.message);
      setToken(data.data.token);
      router.replace("/");
      router.refresh();
    },
  });

  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit((data) => mutate(data))}>
        <div className="grid gap-5">
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel title={field.name}>{field.name}</FormLabel>
                <FormControl>
                  <Input placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel title={field.name}>{field.name}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={field.name} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-10">
            <p>sign in</p>
            <LoaderCircle
              className={`animate-spin ${!isPending && "hidden"}`}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};
