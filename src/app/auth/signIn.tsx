"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { signInSchema } from "~/type/auth";

type SignInType = z.infer<typeof signInSchema>;

export const SignInForm = () => {
  const signInForm = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const signIn = (data: SignInType) => {
    console.log(data);
  };
  return (
    <Form {...signInForm}>
      <form onSubmit={signInForm.handleSubmit(signIn)}>
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
            sign in
          </Button>
        </div>
      </form>
    </Form>
  );
};
