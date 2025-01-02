"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
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
import { authService } from "~/services/authService";
import { signUpSchema, type SignUpType } from "~/type/auth";

export const SignUpForm = () => {
  const signUpForm = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = authService.SignUp({
    onError(err) {
      const message = err.response?.data.message as string;
      return toast.error(message);
    },
    onSuccess() {
      return toast.success("Account created successfully! You can now sign in");
    },
  });

  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit((data) => mutate(data))}>
        <div className="grid gap-5">
          <FormField
            control={signUpForm.control}
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
            control={signUpForm.control}
            name="name"
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
            control={signUpForm.control}
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
          <FormField
            control={signUpForm.control}
            name="confirmPassword"
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
          <Button type="submit" className="w-full">
            <p>sign up</p>
            <LoaderCircle
              className={`animate-spin ${!isPending && "hidden"}`}
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};
