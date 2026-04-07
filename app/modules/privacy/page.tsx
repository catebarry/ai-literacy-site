"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  Shield,
  Eye,
  FileText,
  Server,
  Globe,
  Database,
  Cpu,
  CheckCircle2,
  UserCircle2,
  AlertTriangle,
} from "lucide-react";

type DataStop = {
  id: string;
  title: string;
  org: string;
  location: string;
  region: "north-america" | "europe" | "asia";
  description: string;
  whoSeesIt: string;
};

const STOPS: DataStop[] = [
  {
    id: "device",
    title: "Your device",
    org: "You",
    location: "Local device / browser",
    region: "north-america",
    description:
      "You type a prompt into the website or app. Before it ever reaches an AI model, it exists on your own device.",
    whoSeesIt: "You, your browser, and possibly browser extensions on your device.",
  },
  {
    id: "app",
    title: "Website / app server",
    org: "Platform provider",
    location: "US data center",
    region: "north-america",
    description:
      "Your prompt is sent to the platform running the product. It may handle authentication, rate limits, abuse checks, and request routing.",
    whoSeesIt:
      "The company operating the website/app and the systems that forward your request.",
  },
  {
    id: "model",
    title: "AI model processing",
    org: "Model provider",
    location: "Another regional data center",
    region: "north-america",
    description:
      "The prompt is processed by model-serving infrastructure. Depending on the product, this could be the same company or a separate model/API provider.",
    whoSeesIt:
      "The AI provider’s systems, and sometimes engineers or automated monitoring systems.",
  },
  {
    id: "logs",
    title: "Logging / storage",
    org: "Operations and analytics systems",
    location: "Stored in one or more regions",
    region: "europe",
    description:
      "Prompts or metadata may be logged temporarily or retained for debugging, analytics, security, or product improvement.",
    whoSeesIt:
      "Internal teams, automated tools, and storage systems depending on retention policies.",
  },
  {
    id: "review",
    title: "Possible human review",
    org: "Trust & safety / support teams",
    location: "Global operations",
    region: "asia",
    description:
      "Some prompts may be reviewed by humans if they are flagged for safety, quality, or support reasons. This depends on the product and settings.",
    whoSeesIt:
      "Potentially trained reviewers, safety teams, or customer support staff in limited cases.",
  },
];

const MAP_STOPS: Record<
  DataStop["id"],
  {
    x: number;
    y: number;
  }
> = {
  device: { x: 20, y: 13 },
  app: { x: 28, y: 12 },
  model: { x: 51, y: 13 },
  logs: { x: 65, y: 20 },
  review: { x: 88, y: 15 },
};

const LABEL_OFFSETS: Record<
  DataStop["id"],
  { dx: number; dy: number }
> = {
  device: { dx: -60, dy: 50 },
  app: { dx: -10, dy: 25 },
  model: { dx: -60, dy: 50 },
  logs: { dx: -10, dy: 50 },
  review: { dx: -10, dy: -10 },
};

const REGION_POSITIONS: Record<
  DataStop["region"],
  {
    label: string;
    className: string;
  }
> = {
  "north-america": {
    label: "North America",
    className: "left-[8%] top-[28%] w-[28%]",
  },
  europe: {
    label: "Europe",
    className: "left-[40%] top-[22%] w-[18%]",
  },
  asia: {
    label: "Asia",
    className: "left-[64%] top-[26%] w-[24%]",
  },
};

export default function PrivacyModule() {
  const [step, setStep] = useState(0);
  const [promptText, setPromptText] = useState(
    "What's the best way to study for my history test?"
  );

  const hasStarted = step > 0;
  const activeStops = STOPS.slice(0, step);
  const currentStop = activeStops[activeStops.length - 1];

  const uniqueActiveRegions = useMemo(() => {
    return Array.from(new Set(activeStops.map((stop) => stop.region)));
  }, [activeStops]);

  const sendPrompt = () => {
    setStep((prev) => Math.min(prev + 1, STOPS.length));
  };

  const resetFlow = () => {
    setStep(0);
  };

    const routeSegments = activeStops.slice(1).map((stop, index) => {
    const from = activeStops[index];
    const to = stop;
    return { from, to };
  });

  function curvedPath(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const cx = (x1 + x2) / 2;
    const cy = Math.min(y1, y2) - 10;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> {"Back to Modules"}
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Privacy: What AI Systems Know About You
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          Privacy matters online, especially when using AI tools. Many systems collect,
          store, and process data in ways that are not always visible to the people using
          them. As a user of AI products, it is important to understand what information
          companies have about you and what they can use this information for.
        </p>

        {/* Step 1 header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            1
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Try it out</h2>
        </div>

        {/* Interactive Activity Header
        <div className="flex items-center gap-2 mb-5">
          <Lock size={20} strokeWidth={1.6} className="text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Interactive Activity</h2>
        </div> */}

        {/* Instructions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Instructions
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Type a sample prompt, then click the button to simulate what can happen after
            you send it to an AI system. You will see who may process the data and which
            parts of the world it may travel through.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            This is an educational example, not a literal map of one specific company.
            Real data flows vary based on the product, region, account settings, and legal
            requirements.
          </p>
          <p className="text-base text-gray-600">
            The goal is to make hidden data flows more visible.
          </p>
        </div>

        {/* Prompt simulator */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <div className="space-y-6">
            {/* Left side */}
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-4">
                Simulate an AI prompt
              </p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Example prompt
              </label>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Type a prompt here..."
              />

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={sendPrompt}
                  disabled={step >= STOPS.length || !promptText.trim()}
                  className="px-5 py-2.5 text-base font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {step === 0
                    ? "Send Prompt"
                    : step < STOPS.length
                    ? "Show Next Stop"
                    : "Journey Complete"}
                </button>

                <button
                  onClick={resetFlow}
                  className="px-5 py-2.5 text-base font-medium rounded-lg border border-gray-300 text-gray-800 bg-white hover:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
              </div>

              <div className="mt-5 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <UserCircle2 className="text-gray-500 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Prompt preview
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed break-words">
                      {promptText.trim() || "Type a prompt to begin."}
                    </p>
                  </div>
                </div>
              </div>

              {currentStop && (
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-5">
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Current stop: {currentStop.title}
                  </p>
                  <p className="text-sm text-blue-800 leading-relaxed mb-3">
                    {currentStop.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Globe size={16} className="text-blue-700 mt-0.5" />
                      <p className="text-blue-900">
                        <span className="font-semibold">Location:</span>{" "}
                        {currentStop.location}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Eye size={16} className="text-blue-700 mt-0.5" />
                      <p className="text-blue-900">
                        <span className="font-semibold">Who may access it:</span>{" "}
                        {currentStop.whoSeesIt}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full">
            <p className="text-lg font-semibold text-gray-900 mb-4">
                Where your data travels
            </p>

            <div className="w-full h-[400px] rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="relative w-full h-full">
                  {/* World map */}
                <div className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-60"
                    style={{
                        backgroundImage: "url('/world.svg')",
                    }}>
                    <svg
                    viewBox="0 0 100 55"
                    className="w-full max-w-[900px] h-auto"
                    preserveAspectRatio="xMidYMid meet"
                    >
                    {/* Ocean */}
                    <rect x="0" y="0" width="100" height="55" fill="transparent" />

                    {/* Arrow marker */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="2"
                        markerHeight="2"
                        refX="3.2"
                        refY="2"
                        orient="auto"
                      >
                        <path d="M0,0 L4,2 L0,4 Z" fill="#2563eb" />
                      </marker>
                      <marker
                        id="arrowheadMuted"
                        markerWidth="2"
                        markerHeight="2"
                        refX="3.2"
                        refY="2"
                        orient="auto"
                      >
                        <path d="M0,0 L4,2 L0,4 Z" fill="#cbd5e1" />
                      </marker>
                    </defs>

                    {/* Full possible route in muted gray */}
                    {STOPS.slice(1).map((stop, index) => {
                      const from = STOPS[index];
                      const fromPos = MAP_STOPS[from.id];
                      const toPos = MAP_STOPS[stop.id];

                      return (
                        <path
                          key={`full-${from.id}-${stop.id}`}
                          d={curvedPath(fromPos.x, fromPos.y, toPos.x, toPos.y)}
                          fill="none"
                          stroke="#cbd5e1"
                          strokeWidth="0.7"
                          strokeDasharray="2 1.5"
                          markerEnd="url(#arrowheadMuted)"
                        />
                      );
                    })}

                    {/* Active route in blue */}
                    {routeSegments.map(({ from, to }) => {
                      const fromPos = MAP_STOPS[from.id];
                      const toPos = MAP_STOPS[to.id];

                      return (
                        <path
                          key={`active-${from.id}-${to.id}`}
                          d={curvedPath(fromPos.x, fromPos.y, toPos.x, toPos.y)}
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="1"
                          markerEnd="url(#arrowhead)"
                        />
                      );
                    })}

                    {/* Markers */}
                    {STOPS.map((stop) => {
                      const pos = MAP_STOPS[stop.id];
                      const isReached = activeStops.some((s) => s.id === stop.id);
                      const isCurrent = currentStop?.id === stop.id;

                      return (
                        <g key={stop.id}>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={isCurrent ? 2.2 : 1.6}
                            fill={isReached ? "#2563eb" : "#ffffff"}
                            stroke={isReached ? "#1d4ed8" : "#94a3b8"}
                            strokeWidth="0.6"
                          />
                          {isCurrent && (
                            <circle
                              cx={pos.x}
                              cy={pos.y}
                              r="2"
                              fill="none"
                              stroke="#60a5fa"
                              strokeWidth="0.5"
                              opacity="0.9"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                    </div>

                  {/* Labels overlay */}
                  {STOPS.map((stop) => {
                    const pos = MAP_STOPS[stop.id];
                    const isReached = activeStops.some((s) => s.id === stop.id);
                    const isCurrent = currentStop?.id === stop.id;
                    const offset = LABEL_OFFSETS[stop.id];

                    return (   
                      <div
                        key={stop.id}
                        className="absolute"
                        style={{
                            left: `calc(${pos.x}% + ${offset.dx}px)`,
                            top: `calc(${pos.y}% + ${offset.dy}px)`,
                        }}
                        >
                        <div className="translate-y-6">
                          <div
                            className={`min-w-[110px] max-w-[140px] rounded-lg border px-2.5 py-2 shadow-sm transition-all ${
                              isCurrent
                                ? "bg-blue-50 border-blue-400"
                                : isReached
                                ? "bg-white border-blue-200"
                                : "bg-white/90 border-gray-200"
                            }`}
                          >
                            <p
                              className={`text-[11px] font-semibold leading-tight ${
                                isReached ? "text-gray-900" : "text-gray-500"
                              }`}
                            >
                              {stop.title}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                              {stop.location}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Legend */}
                    <div className="absolute left-4 top-4 bg-white/90 border border-gray-200 rounded-xl px-3 py-2">
                    <p className="text-xs font-semibold text-gray-800 mb-2">
                      Map legend
                    </p>
                    <div className="space-y-1.5 text-[11px] text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full border border-slate-400 bg-white inline-block" />
                        Possible stop
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                        Reached stop
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-0.5 bg-blue-600 inline-block" />
                        Active route
                      </div>
                    </div>
                  </div>

                  {/* Route summary */}
                </div>
              </div>

              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={18} className="text-amber-700 mt-0.5" />
                  <p className="text-sm text-amber-900 leading-relaxed">
                    Even if a product feels like a single chat box, your data may pass
                    through multiple companies, cloud systems, regions, and review layers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stop-by-stop cards */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Server size={18} className="text-gray-700" />
            <p className="text-lg font-semibold text-gray-900">
              Who might get your data?
            </p>
          </div>

          <div className="space-y-3">
            {STOPS.map((stop, index) => {
              const isReached = activeStops.some((s) => s.id === stop.id);

              return (
                <div
                  key={stop.id}
                  className={`rounded-lg border px-4 py-4 transition-all ${
                    isReached
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-200 bg-white opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        {index + 1}. {stop.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {stop.org} · {stop.location}
                      </p>
                    </div>
                    {isReached ? (
                      <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-1" />
                    ) : null}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed mt-3">
                    {stop.description}
                  </p>

                  <div className="mt-3 flex items-start gap-2">
                    <Shield size={16} className="text-gray-500 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">
                        Potential access:
                      </span>{" "}
                      {stop.whoSeesIt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key ideas
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-4">Key Ideas</p>
          <div className="space-y-4">
            {[
              {
                icon: <Eye size={18} className="text-gray-600" />,
                title: "Data can move farther than you expect",
                text: "A prompt may travel from your device to app servers, model infrastructure, logging systems, and review workflows.",
              },
              {
                icon: <Database size={18} className="text-gray-600" />,
                title: "Storage and logging matter",
                text: "Even when the model finishes responding, copies of prompts or metadata may remain in logs or analytics systems.",
              },
              {
                icon: <Cpu size={18} className="text-gray-600" />,
                title: "One product can involve multiple companies",
                text: "The website you use may rely on cloud vendors, AI providers, content moderation systems, and support tools.",
              },
              {
                icon: <FileText size={18} className="text-gray-600" />,
                title: "Policies are often hard to interpret",
                text: "Privacy policies may describe retention, training, and data sharing in broad language that is difficult to compare across services.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-base font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Step 2 header */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            2
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Understand</h2>
        </div>

        {/* Why it matters */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4 space-y-3">
          <p className="text-base font-semibold text-purple-900">
            Why is it important to protect your privacy?
          </p>
          <p className="text-base text-purple-800 leading-relaxed">
            Privacy is not just secrecy. It is not about hiding a wrong. Consider the following situation: let's say
            you are out in public but you know you are having a conversation with a friend. However,
            you know that you are being watched and listened to by security cameras at all times. Would you 
            feel comfortable speaking freely in that situation? Would your opinion on this change if you knew
            for sure that you were not being watched and listened to at all times?

            This is the same with AI tools. Whether it is about putting prompts into generative
            AI tools or talking to customer service chatbots, it is important to remember that whatever
            information you give them has the potential to be seen and used by the companies that run them.
          </p>
          
          <div className="border-t border-purple-200 pt-4 space-y-3">
          <p className="text-base font-semibold text-purple-900">
            What can AI companies do with the information they collect from prompts?
          </p>
          <p className="text-base text-purple-800 leading-relaxed">
            A large language model such as ChatGPT remembers everything you tell it. In fact,
            it uses input data to train itself and improve its performance. This means your
            prompts can make the model better, but it also means you need to be careful what you
            tell it. In work-related settings, you need to be careful not to expose confidential
            customer information or private company data. When using AI for in personal settings,
            it is important not to share any information about yourself that you would not feel
            comfortable sharing with a stranger on the street.
          </p>
          </div>
        </div>

        {/* Step 3 header */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            3
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Reflect</h2>
        </div>

        {/* Reflection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">Reflect</p>
          <div className="space-y-3">
            {[
              "Did seeing the possible route of a prompt change how you think about using AI tools?",
              "Which stop in the journey surprised you the most?",
              "Should AI tools be required to show where data is processed and stored before you submit a prompt?",
            ].map((q) => (
              <div
                key={q}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-800"
              >
                {q}
              </div>
            ))}
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-green-900 mb-4">
            What You Can Do
          </p>

          <ul className="space-y-3 text-base text-green-800">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Be mindful of the information you share with AI tools</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Ask questions about data usage, retention, and sharing</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Know the terms and conditions that apply to the products you use</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Advocate for transparency and accountability in AI systems</span>
            </li>
          </ul>
        </div>

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-lg font-semibold text-gray-900 mb-4">Learn More</p>
          <div className="space-y-2">
            {[
            {
                title: "Why Privacy Matters Even If You Have Nothing to Hide",
                url: "https://www.chronicle.com/article/why-privacy-matters-even-if-you-have-nothing-to-hide/",
            },
            {
                title: "Stanford HAI — Privacy in the AI era",
                url: "https://hai.stanford.edu/news/privacy-ai-era-how-do-we-protect-our-personal-information",
            },
            {
                title: "Does AI Take Your Data? AI and Data Privacy",
                url: "https://www.staysafeonline.org/articles/does-ai-take-your-data-ai-and-data-privacy",
            },
            ].map((item) => (
            <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-base text-blue-600 hover:underline"
            >
                {"→ " + item.title}
            </a>
            ))}
          </div>
        </div>

        {/* Footer Nav */}
        <div className="border-t border-gray-300 pt-6 flex items-center justify-between">
          <Link
            href="/"
            className="px-5 py-2.5 text-base font-medium border border-gray-400 text-gray-800 rounded-md bg-white hover:bg-gray-100 transition-colors"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    </main>
  );
}