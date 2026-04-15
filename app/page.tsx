"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  Users,
  Image,
  Brain,
  Shield,
  Eye,
  Zap,
  Home as HomeIcon,
  BookOpen,
  Info,
} from "lucide-react";

const modules = [
  {
    title: "Hallucinations",
    description: "When AI is confident but wrong",
    href: "/modules/hallucinations",
    icon: AlertCircle,
  },
  {
    title: "Sycophancy",
    description: "When AI always agrees with you",
    href: "/modules/sycophancy",
    icon: Users,
  },
  {
    title: "Deepfakes",
    description: "AI-generated fake media",
    href: "/modules/deepfakes",
    icon: Image,
  },
  {
    title: "Bias",
    description: "Unfair patterns in AI decisions",
    href: "/modules/bias",
    icon: Brain,
  },
  {
    title: "Privacy",
    description: "Data collection and security",
    href: "/modules/privacy",
    icon: Shield,
  },
  {
    title: "Environmental Costs",
    description: "The hidden energy and water behind AI",
    href: "/modules/environment",
    icon: Zap,
  },
  {
    title: "Companion vs. Assistive AI",
    description: "Where do you draw the line?",
    href: "/modules/companion-assistive",
    icon: Eye,
  },
  {
    title: "Agentic AI",
    description: "When AI takes actions in the world",
    href: "/modules/agentic-ai",
    icon: Zap,
  },
];

const steps = [
  {
    number: 1,
    title: "Try it out",
    description: "Select a topic and complete the interactive exercise",
  },
  {
    number: 2,
    title: "Understand",
    description: "Learn what the activity reveals and why it matters",
  },
  {
    number: 3,
    title: "Reflect",
    description: "Think critically about what you learned",
  },
];


export default function Home() {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-gray-100">


      {/* Hero Section */}
      <section className="text-center pt-16 pb-12 px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Literacy Lab
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
          An interactive learning experience to understand how AI works and
          where it can go wrong. Explore modules, complete hands-on activities,
          and develop critical thinking skills for the age of AI.
        </p>
      </section>

      {/* Modules Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Learning Modules
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Link key={index} href={module.href}>
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer h-full">
                  <Icon
                    size={30}
                    strokeWidth={2}
                    className="text-gray-700 mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {module.title}
                  </h3>
                  <p className="text-gray-500 text-base">{module.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-start">
                <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}