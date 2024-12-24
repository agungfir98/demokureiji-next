"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { signInSchema } from "~/type/auth";

type SignInType = z.infer<typeof signInSchema>;
const Auth = () => {
  const signInForm = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const signIn = (data: SignInType) => {
    console.log(data);
  };

  return (
    <div className="max-h-screen relative">
      <Tabs defaultValue="signIn" className="max-w-sm w-sm mx-auto my-20">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="signIn">Sign in</TabsTrigger>
          <TabsTrigger value="signUp">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <Card className="">
            <CardContent>
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
                            <Input
                              type="password"
                              placeholder={field.name}
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
