"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-screen max-h-screen flex flex-col items-center justify-center ">
      <div className="text-6xl mb-4">👾</div>
      <h1 className="text-4xl font-bold tracking-tight mb-2">Oops!</h1>
      <p className="text-xl text-muted-foreground mb-6">
        This page seems to have vanished into thin air
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="default"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          Go Back
        </Button>
        <Button
          variant="outline"
          onClick={() => router.replace("/")}
          className="w-full sm:w-auto"
        >
          Return Home
        </Button>
      </div>
    </div>
  );
}
