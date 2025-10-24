"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, Vote, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LandingNav() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav
      className={
        "fixed top-0 w-full z-50 transition-all duration-200 bg-[#1C1C1C]/95 backdrop-blur-md border-b border-[#2C2C2C]"
      }
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#3ECF8E] rounded-md flex items-center justify-center">
              <Vote className="w-5 h-5 text-[#1C1C1C]" />
            </div>
            <span className="text-xl font-semibold">Demo Kureiji</span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
            <Button
              className="px-4 py-2 text-sm bg-[#3ECF8E] text-[#1C1C1C] rounded-md font-medium hover:bg-[#3ECF8E]/90 transition-colors"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </Button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-400"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2C2C2C] bg-[#1C1C1C]">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="#features"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="block text-sm text-gray-400 hover:text-white"
            >
              About
            </Link>
            <Button
              className="w-full px-4 py-2 text-sm bg-[#3ECF8E] text-[#1C1C1C] rounded-md font-medium"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
