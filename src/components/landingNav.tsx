"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LandingNav() {
  const router = useRouter();
  return (
    <nav className="px-8 py-4 flex justify-between items-center">
      <div>Demo Kureiji</div>
      <div>
        <Button variant="outline" onClick={() => router.push("/auth")}>
          SignIn
        </Button>
      </div>
    </nav>
  );
}
