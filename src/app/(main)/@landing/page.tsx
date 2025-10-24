"use client";
import React from "react";
import { Vote, Users, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Chip from "~/components/chip";

export default function LandingPage() {
  const router = useRouter();
  const year = new Date().getFullYear();

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Multi-Organization Support",
      description:
        "Manage multiple organizations and extracurriculars within a single school. Each organization can run independent elections with their own candidates and voters.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Anonymous",
      description:
        "Built with security at its core. Anonymous voting ensures privacy while maintaining election integrity and preventing duplicate votes.",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Easy to Use",
      description:
        "Clean, intuitive interface designed for students and administrators. No training required—just login and vote.",
    },
  ];

  return (
    <>
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#2C2C2C] border border-[#3C3C3C] rounded-full mb-8">
              <span className="w-2 h-2 bg-[#3ECF8E] rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">
                Modern E-Voting Platform
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Democracy made simple for
              <span className="block text-[#3ECF8E]">school organizations</span>
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-2xl">
              Run secure, transparent elections across multiple organizations
              and clubs. Real-time results, anonymous voting, and powerful admin
              tools—all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group px-6 py-3 bg-[#3ECF8E] text-[#1C1C1C] rounded-md font-medium hover:bg-[#3ECF8E]/90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#3ECF8E]/20"
                onClick={() => router.push("/auth")}
              >
                <span>Start Voting</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-16 pt-8 border-t border-[#2C2C2C]">
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div>
                  <div className="text-3xl font-bold text-[#3ECF8E] mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-500">Anonymous</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#3ECF8E] mb-1">
                    Secure
                  </div>
                  <div className="text-sm text-gray-500">Elections</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">Powered by</p>
              <div className="flex flex-wrap gap-3">
                <Chip>Next.js</Chip>
                <Chip>React</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Tailwind CSS</Chip>
                <Chip>MongoDB</Chip>
                <Chip>ExpressJS</Chip>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="py-20 px-6 lg:px-8 border-t border-[#2C2C2C]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Built for modern
              <span className="block text-[#3ECF8E]">school governance</span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to run fair, transparent elections—from
              student councils to club leadership
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="w-10 h-10 bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 rounded-lg flex items-center justify-center text-[#3ECF8E] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[#3ECF8E] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-20 px-6 lg:px-8 border-t border-[#2C2C2C] bg-[#161616]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Why Demo Kureiji?
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Demo Kureiji brings professional-grade e-voting to schools. No
                  more paper ballots, messy counting, or concerns about
                  fairness—just clean, transparent digital democracy.
                </p>
                <p>
                  Whether you&apos;re running student government elections,
                  choosing club presidents, or organizing committee votes, Demo
                  Kureiji handles it all. Multiple organizations can operate
                  independently while administrators maintain oversight from a
                  single dashboard.
                </p>
                <p>
                  Built with modern tech and security best practices, this
                  platform demonstrates how traditional processes can be
                  transformed with thoughtful digital solutions. It&apos;s
                  voting that actually works for today&apos;s schools.
                </p>
              </div>
            </div>

            <div className="bg-[#1C1C1C] border border-[#2C2C2C] rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Key Capabilities</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#3ECF8E] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Organization Management</p>
                    <p className="text-sm text-gray-400">
                      Create and manage multiple organizations within a school
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#3ECF8E] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Election Configuration</p>
                    <p className="text-sm text-gray-400">
                      Set voting periods, add candidates, and define eligible
                      voters
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#3ECF8E] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Role-based Access</p>
                    <p className="text-sm text-gray-400">
                      Different permissions for admins, organizers, and voters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 lg:px-8 border-t border-[#2C2C2C]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#3ECF8E] rounded-md flex items-center justify-center">
                <Vote className="w-5 h-5 text-[#1C1C1C]" />
              </div>
              <span className="text-lg font-semibold">Demo Kureiji</span>
            </div>
            <span className="text-sm text-gray-400">
              &copy; {year} made with ❤ by{" "}
              <Link href={"https://gnoega.vercel.app"}>gnoega</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
