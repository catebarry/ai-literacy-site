"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, Zap, Droplets } from "lucide-react";

type Task = {
  name: string;
  emoji: string;
  energy: number; // Wh
  water: number;  // mL
  source: string;
};

const TASKS: Task[] = [
  {
    name: "Ask a question",
    emoji: "💬",
    energy: 0.3,
    water: 0.3,
    source: "Epoch AI, 2025",
  },
  {
    name: "Write an essay",
    emoji: "📝",
    energy: 2,
    water: 2,
    source: "Est. based on token length research",
  },
  {
    name: "Generate an image",
    emoji: "🖼️",
    energy: 10,
    water: 5,
    source: "Hugging Face / CMU, 2023",
  },
  {
    name: "Generate a short video",
    emoji: "🎥",
    energy: 50,
    water: 20,
    source: "Toolpod, 2026 (conservative estimate)",
  },
];

// Annual electricity consumption in TWh — sorted ascending
// Sources: Ember 2024, IEA, REN (Portugal), BestBrokers/Digital Journal (ChatGPT)
const COUNTRIES = [
    { name: "Kenya", twh: 11.7, flag: "🇰🇪", isAI: false },
    { name: "Iceland", twh: 20, flag: "🇮🇸", isAI: false },
    { name: "ChatGPT", twh: 22.15, flag: "🤖", isAI: true },
    { name: "Ireland", twh: 34, flag: "🇮🇪", isAI: false },
    { name: "Portugal", twh: 51.4, flag: "🇵🇹", isAI: false },
//    { name: "UK", twh: 310, flag: "🇬🇧", isAI: false },
//    { name: "Germany", twh: 485, flag: "🇩🇪", isAI: false },
//    { name: "USA", twh: 4000, flag: "🇺🇸", isAI: false },
  ];

export default function EnvironmentModule() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [scaled, setScaled] = useState(false);

  const add = (name: string) =>
    setCounts((p) => ({ ...p, [name]: (p[name] || 0) + 1 }));
  const remove = (name: string) =>
    setCounts((p) => ({ ...p, [name]: Math.max((p[name] || 0) - 1, 0) }));

  const multiplier = scaled ? 1_000_000 : 1;

  const totalEnergy =
    TASKS.reduce((s, t) => s + (counts[t.name] || 0) * t.energy, 0) * multiplier;
  const totalWater =
    TASKS.reduce((s, t) => s + (counts[t.name] || 0) * t.water, 0) * multiplier;

  const hasAny = Object.values(counts).some((v) => v > 0);

  // Equivalents
  const phoneCharges = totalEnergy / 10;
  const ledBulbMinutes = totalEnergy / (10 / 60);
  const waterBottles = totalWater / 500;

  // Log scale bar width (capped 0–100%)
  function logBar(value: number, max: number) {
    if (value <= 0 || max <= 0) return 0;
    const logVal = Math.log10(value + 1);
    const logMax = Math.log10(max + 1);
    return Math.min((logVal / logMax) * 100, 100);
  }

  const maxTwh = Math.max(...COUNTRIES.map(c => c.twh));

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> {"Back to Modules"}
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Environmental Costs: The Hidden Impact of AI
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          Every AI query uses real energy and real water — invisible costs that grow
          enormously when billions of people use these systems every day. This module
          makes those hidden costs tangible.
        </p>

        {/* Step 1 header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            1
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Try it out</h2>
        </div>

        {/* Instructions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">Instructions</p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Add AI tasks below to build a typical session. Watch how energy and water
            add up — then hit the scale button to see what happens when a million
            people do the same thing.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            As you play, pay attention to details like lighting, skin texture, hair,
            backgrounds, and anything that looks slightly unusual or inconsistent.
          </p>
          <p className="text-base text-gray-400">
            Numbers are estimates based on published research — ranges vary by model and hardware.
          </p>
        </div>


        {/* Task Builder */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-4">Build Your AI Session</p>
          <div className="space-y-3">
            {TASKS.map((task) => (
              <div
                key={task.name}
                className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{task.emoji}</span>
                  <div>
                    <p className="text-base font-medium text-gray-900">{task.name}</p>
                    <p className="text-sm text-gray-500">
                      ~{task.energy} Wh &nbsp;·&nbsp; ~{task.water} mL water
                    </p>
                    <p className="text-xs text-gray-400 italic">Source: {task.source}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => remove(task.name)}
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 text-lg font-medium"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-base font-semibold text-gray-900">
                    {counts[task.name] || 0}
                  </span>
                  <button
                    onClick={() => add(task.name)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-md hover:bg-gray-700 text-lg font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-5">
            <p className="text-lg font-semibold text-gray-900">Estimated Impact</p>
            {scaled && (
              <span className="text-small bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                × 1,000,000 users
              </span>
            )}
          </div>

          {/* Energy */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-yellow-500" />
                <span className="text-base font-medium text-gray-800">Energy</span>
              </div>
              <span className="text-base font-bold text-gray-900">
                {totalEnergy >= 1000
                  ? `${(totalEnergy / 1000).toFixed(2)} kWh`
                  : `${totalEnergy.toFixed(2)} Wh`}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                style={{width: `${hasAny ? logBar(totalEnergy, scaled ? 5_000_000 : 5000) : 0}%`}}
              />
            </div>
          </div>

          {/* Water */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <Droplets size={14} className="text-blue-500" />
                <span className="text-base font-medium text-gray-800">Water</span>
              </div>
              <span className="text-base font-bold text-gray-900">
                {totalWater >= 1000
                  ? `${(totalWater / 1000).toFixed(2)} L`
                  : `${totalWater.toFixed(1)} mL`}
              </span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full transition-all duration-500"
                style={{width: `${hasAny ? logBar(totalWater, scaled ? 20_000_000 : 20000) : 0}%`}}
              />
            </div>
          </div>

          {/* Real-world equivalents */}
          {hasAny && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  emoji: "📱",
                  label: `${phoneCharges >= 1 ? phoneCharges.toFixed(1) : "<1"} phone charge${phoneCharges !== 1 ? "s" : ""}`,
                  sub: "~10 Wh each",
                },
                {
                  emoji: "💡",
                  label: `${ledBulbMinutes.toFixed(0)} min of a LED bulb`,
                  sub: "10W bulb",
                },
                {
                  emoji: "🍶",
                  label: `${waterBottles >= 1 ? waterBottles.toFixed(1) : "<1"} water bottle${waterBottles !== 1 ? "s" : ""}`,
                  sub: "500 mL each",
                },
                scaled
                  ? {
                      emoji: "🏠",
                      label: `Powers ~${Math.round(totalEnergy / 30000)} homes for a day`,
                      sub: "US avg ~30 kWh/day",
                    }
                  : {
                      emoji: "🔍",
                      label: `${(totalEnergy / 0.3).toFixed(0)} Google searches`,
                      sub: "~0.3 Wh per search",
                    },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-3"
                >
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!hasAny && (
            <p className="text-base text-gray-400 text-center py-4">
              {"Add tasks above to see your impact."}
            </p>
          )}

          {/* Scale toggle */}
          <button
            onClick={() => setScaled((s) => !s)}
            className="w-full py-2.5 text-base font-medium rounded-lg border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
          >
            {scaled
              ? "← Show just my usage"
              : "What if 1 million people did this? →"}
          </button>
        </div>

        {/* Country Comparison */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-1">
            How does ChatGPT compare to entire countries?
          </p>
          <p className="text-sm text-gray-400 mb-5">
            {"Annual electricity consumption (TWh/year)"}
          </p>
          <div className="space-y-3">
            {COUNTRIES.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="text-base w-6 shrink-0">{c.flag}</span>
                <span
                  className={`text-sm w-28 shrink-0 font-medium ${
                    c.isAI ? "text-orange-700" : "text-gray-700"
                  }`}
                >
                  {c.name}
                </span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      c.isAI ? "bg-orange-400" : "bg-gray-300"
                    }`}
                    style={{ width: `${(c.twh / maxTwh) * 100}%` }}                  />
                </div>
                <span
                  className={`text-sm w-20 text-right shrink-0 font-semibold ${
                    c.isAI ? "text-orange-700" : "text-gray-700"
                  }`}
                >
                  {c.twh >= 1000 ? `${(c.twh / 1000).toFixed(0)}k` : c.twh} TWh
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-4">
            {"Sources: Ember 2024, IEA, REN Portugal, BestBrokers 2025."}
          </p>
        </div>

        {/* Step 2 header */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            2
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Understand</h2>
        </div>


        {/* Explanation */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4 space-y-3">
          <p className="text-base font-semibold text-purple-900">
            Why does AI use water?
          </p>
          <p className="text-base text-purple-800 leading-relaxed">
            Data centers generate enormous heat. To prevent servers from overheating,
            cooling systems evaporate water — often millions of gallons per day per facility.
            This water is largely consumed, not recycled.
          </p>
          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-3">
              Why does this matter?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Individual queries are small, but at scale — billions of daily queries — the
              cumulative impact rivals that of entire nations. AI companies rarely disclose
              their full energy or water footprints, making independent research difficult.
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
          <p className="text-base font-semibold text-gray-900 mb-4">Questions to Consider</p>
          <div className="space-y-3">
            {[
              "Did the scale button change how you think about your AI use?",
              "Which task had the biggest environmental impact — and why?",
              "Should AI companies be required to show energy costs before you submit a prompt?",
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

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>
          <div className="space-y-2">
            {[
              "Epoch AI — How much energy does ChatGPT use? (2025)",
              "MIT Technology Review — We did the math on AI's energy footprint (2025)",
              "Google Cloud — Measuring the environmental impact of AI inference (2025)",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center gap-1.5 text-base text-blue-600 hover:underline"
              >
                {"→ " + item}
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