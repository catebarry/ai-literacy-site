import Link from "next/link";
import { AlertCircle, Users, Image, Brain, Shield, Eye, Zap, ChevronRight, Bot, Terminal } from "lucide-react";

const modules = [
  {
    title: "Hallucinations",
    subtitle: "When AI is confident but wrong",
    description: "Learn to identify when AI makes up information that sounds convincing but is false.",
    time: "15-20 min",
    href: "/modules/hallucinations",
    icon: AlertCircle,
  },
  {
    title: "Sycophancy",
    subtitle: "When AI always agrees with you",
    description: "Explore how AI systems can reinforce your beliefs instead of challenging your thinking.",
    time: "15-20 min",
    href: "/modules/sycophancy",
    icon: Users,
  },
  {
    title: "Deepfakes",
    subtitle: "AI-generated fake media",
    description: "Understand how AI creates realistic fake images, videos, and audio.",
    time: "20-25 min",
    href: "/modules/deepfakes",
    icon: Image,
  },
  {
    title: "Bias",
    subtitle: "Unfair patterns in AI decisions",
    description: "Discover how AI systems can inherit and amplify human biases.",
    time: "20-25 min",
    href: "/modules/bias",
    icon: Brain,
  },
  {
    title: "Privacy",
    subtitle: "Data collection and security",
    description: "Learn about how AI systems collect and use your personal data.",
    time: "15-20 min",
    href: "/modules/privacy",
    icon: Shield,
  },
  {
    title: "Companion vs. Assistive AI",
    subtitle: "Where do you draw the line?",
    description: "Explore how AI tools differ in intent and why that distinction matters for regulation.",
    time: "15-20 min",
    href: "/modules/companion-assistive",
    icon: Zap,
  },
  {
    title: "Agentic AI",
    subtitle: "When AI takes actions in the world",
    description: "Learn how agentic AI can act autonomously on your behalf and what that means for trust and control.",
    time: "15-20 min",
    href: "/modules/agentic-ai",
    icon: Bot,
  },
  {
    title: "Mastering LLMs",
    subtitle: "Prompts, systems, and personalization",
    description: "Learn how to optimize your prompts, use system instructions, and tailor your AI experience.",
    time: "15-20 min",
    href: "/modules/mastering-llms",
    icon: Terminal,
  },
];

export default function ModulesPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">All Modules</h1>
        <p className="text-base text-gray-500 mb-10">
          Explore interactive lessons about AI capabilities, limitations, and ethical considerations.
        </p>

        <div className="flex flex-col gap-4">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.title} href={module.href}>
                <div className="flex items-center gap-6 bg-white border border-gray-200 rounded-lg px-6 py-6 hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer group">
                  {/* Icon */}
                  <div className="shrink-0">
                    <Icon size={30} strokeWidth={2} className="text-gray-700" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-semibold text-gray-900">
                        {module.title}
                      </span>
                      <span className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-0.5">
                        {module.time}
                      </span>
                    </div>
                    <p className="text-base text-gray-700 mb-0.5">{module.subtitle}</p>
                    <p className="text-base text-gray-400">{module.description}</p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight
                    size={20}
                    strokeWidth={2}
                    className="text-gray-400 shrink-0 group-hover:text-gray-700 transition-colors"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}