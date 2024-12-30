import { TabsContent } from "@radix-ui/react-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { SignInForm } from "./signIn";
import { SignUpForm } from "./signUp";

const Auth = () => {
  return (
    <div className="max-h-screen relative">
      <Tabs defaultValue="signIn" className="max-w-sm w-sm mx-auto my-20">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="signIn">Sign in</TabsTrigger>
          <TabsTrigger value="signUp">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signIn">
          <Card className="">
            <CardHeader>
              <CardTitle className="self-center">
                Sign in to DemoKureiji
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signUp">
          <Card className="">
            <CardHeader>
              <CardTitle className="self-center">
                Sign up to DemoKureiji
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
