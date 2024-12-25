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
import { signUpSchema } from "~/type/auth";

type SignUpType = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const signUpForm = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
  });

  const signIn = (data: SignUpType) => {
    console.log(data);
  };
  return (
    <Form {...signUpForm}>
      <form onSubmit={signUpForm.handleSubmit(signIn)}>
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
            sign up
          </Button>
        </div>
      </form>
    </Form>
  );
};
