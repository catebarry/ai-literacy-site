"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, Zap, Droplets, Info } from "lucide-react";

type Task = {
  name: string;
  emoji: string;
  energy: number; // Wh
  energyNote: string;
  water: number;  // mL
  waterNote: string;
  source: string;
};

// ─── NOTES ON ESTIMATES ────────────────────────────────────────────────────
//
// ENERGY: Values are based on inference (query-time) compute only.
//   • "Ask a question": ~0.3 Wh for a typical GPT-4o query (~500 output tokens).
//     Source: Epoch AI (2025). The 2025 arxiv paper "How Hungry is AI?" (Jegham et al.)
//     finds ~0.43 Wh for a short GPT-4o query. Reasoning models (o1, o3) can exceed
//     33 Wh per long prompt — over 70× more than the simple figure shown here.
//   • "Write an essay": ~2 Wh reflects a query with ~10,000 input tokens (~200 pages).
//     Epoch AI estimates ~2.5 Wh for that scale; 2 Wh is a reasonable lower bound.
//   • "Generate an image": 1–11 Wh depending on model size and resolution.
//     Hugging Face/CMU (Luccioni et al., 2023) found Stable Diffusion XL uses
//     ~10 Wh per image; more efficient models use ~1–2 Wh.
//   • "Generate a short video": Rough estimate; video generation benchmarks are sparse.
//     Treat as an order-of-magnitude figure.
//
// WATER: This is where uncertainty is widest.
//   • Company-disclosed figures (e.g., Google's 0.26 mL per Gemini query) count
//     only on-site cooling water — they exclude the water used in power generation.
//   • Academic research (Li et al. 2023, "Making AI Less Thirsty") includes both
//     on-site and power-plant cooling and estimates 10–25 mL per query for older
//     GPT-3-era infrastructure. Independent analyses of modern models suggest ~5 mL
//     (NIAIS report). The values below use ~10 mL for a simple query as a
//     research-consensus middle estimate; real figures vary by region (water-intensive
//     fossil fuel grids vs. hydro), data center cooling technology, and model size.
//   • Water usage is poorly disclosed. Very few AI companies report full lifecycle
//     water footprints, making independent verification difficult.
//
// ───────────────────────────────────────────────────────────────────────────

const TASKS: Task[] = [
  {
    name: "Ask a question",
    emoji: "💬",
    energy: 0.3,
    energyNote: "Range: 0.3–0.5 Wh for standard models; up to 33+ Wh for reasoning models",
    water: 10,
    waterNote: "Range: 0.3 mL (company on-site only) to 25 mL (incl. power-plant water)",
    source: "Epoch AI 2025 (energy); Li et al. 2023 / NIAIS (water)",
  },
  {
    name: "Write an essay",
    emoji: "📝",
    energy: 2,
    energyNote: "Reflects ~10k input tokens + long output; Epoch AI estimates ~2.5 Wh at this scale",
    water: 50,
    waterNote: "Scaled proportionally from simple-query estimate; varies significantly by region",
    source: "Epoch AI 2025 (energy); scaled from Li et al. 2023 (water)",
  },
  {
    name: "Generate an image",
    emoji: "🖼️",
    energy: 10,
    energyNote: "High end of observed range (1–11 Wh); reflects a high-quality/large model",
    water: 100,
    waterNote: "Scaled from energy; high compute = high cooling demand",
    source: "Luccioni et al. 2023, Hugging Face / CMU (energy); proportional estimate (water)",
  },
  {
    name: "Generate a short video",
    emoji: "🎥",
    energy: 50,
    energyNote: "Rough order-of-magnitude estimate; dedicated video-generation benchmarks are limited",
    water: 500,
    waterNote: "Proportional estimate; real figures will vary widely",
    source: "Conservative estimate based on frame/token scaling (energy & water)",
  },
];

// Annual electricity consumption in TWh — sorted ascending
// Country sources: Ember 2024, IEA, REN (Portugal)
// "All Gen AI" figure: Schneider Electric Sustainability Research Institute (2025),
// as reported by IEEE Spectrum. OpenAI does not publicly disclose ChatGPT's energy use;
// IEEE Spectrum estimates ChatGPT alone at ~0.31 TWh using Altman's per-query figure.
const COUNTRIES = [
    { name: "Kenya", twh: 11.7, flag: "🇰🇪", isAI: false },
    { name: "All Gen AI*", twh: 15, flag: "🤖", isAI: true },
    { name: "Iceland", twh: 20, flag: "🇮🇸", isAI: false },
    { name: "Ireland", twh: 34, flag: "🇮🇪", isAI: false },
    { name: "Portugal", twh: 51.4, flag: "🇵🇹", isAI: false },
  ];

export default function EnvironmentModule() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [scaled, setScaled] = useState(false);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

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
          <p className="text-base text-gray-400">
            Numbers are estimates — tap the info icon on each task to see the range and source.
          </p>
        </div>

        {/* Nuance disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-4">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-900 mb-1">Why these are estimates, not exact figures</p>
              <p className="text-sm text-amber-800 leading-relaxed">
                Energy and water costs vary significantly based on <strong>model size</strong> (a small model may use 70× less energy than a large reasoning model), <strong>query length</strong> (long inputs cost much more), <strong>data center region</strong> (cooling water needs differ by climate), and <strong>what's counted</strong> (companies typically report on-site cooling only; researchers include power-plant water, which can be 10–30× higher). Values shown here are middle estimates from peer-reviewed sources — tap any task&apos;s <Info size={11} className="inline" /> icon for the full range and source.
              </p>
            </div>
          </div>
        </div>

        {/* Task Builder */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-4">Build Your AI Session</p>
          <div className="space-y-3">
            {TASKS.map((task) => (
              <div key={task.name} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xl shrink-0">{task.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-base font-medium text-gray-900">{task.name}</p>
                        <button
                          onClick={() => setExpandedTask(expandedTask === task.name ? null : task.name)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Show details"
                        >
                          <Info size={14} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        ~{task.energy} Wh &nbsp;·&nbsp; ~{task.water} mL water
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
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

                {/* Expanded detail panel */}
                {expandedTask === task.name && (
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-3 space-y-2">
                    <div>
                      <span className="text-xs font-semibold text-yellow-700">⚡ Energy range: </span>
                      <span className="text-xs text-gray-600">{task.energyNote}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-700">💧 Water range: </span>
                      <span className="text-xs text-gray-600">{task.waterNote}</span>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-500">Source: </span>
                      <span className="text-xs text-gray-400 italic">{task.source}</span>
                    </div>
                  </div>
                )}
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
                style={{width: `${hasAny ? logBar(totalWater, scaled ? 500_000_000 : 500_000) : 0}%`}}
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
            How does the energy use of all generative AI compare to entire countries?
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
                    style={{ width: `${(c.twh / maxTwh) * 100}%` }}
                  />
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
          <p className="text-xs text-gray-400 mt-4 leading-relaxed">
            Country data: Ember 2024, IEA, REN Portugal. *"All Gen AI" = all generative AI queries globally, estimated at 15 TWh for 2025 by Schneider Electric Sustainability Research Institute, as reported by IEEE Spectrum. ChatGPT alone is estimated at ~0.31 TWh (IEEE Spectrum, using Altman's per-query figure) — OpenAI does not publicly disclose its energy consumption.
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
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4 space-y-4">
          <div>
            <p className="text-base font-semibold text-purple-900 mb-2">
              Why does AI use water?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              AI runs in big buildings called data centers. Inside are powerful computers 
              that get very hot. To cool them down, these centers use water—sometimes millions of gallons a day. 
              Some water is also used to make the electricity that powers the computers.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              Why is water so hard to measure?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Companies often count only the water used at the data center. 
              But a lot more water is used to produce the electricity they need. 
              When you include that, total water use can be much higher. 
              It also depends on location—hot places need more cooling water than cold ones.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              Why does this matter at scale?
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
              "If company-reported water figures are much lower than academic estimates, who should you trust — and why might companies report differently?",
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
              <span>Use AI intentionally instead of automatically</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Avoid repetitive or unnecessary AI tasks</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Keep requests simple when possible</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Remember that small actions add up at scale</span>
            </li>

          </ul>
        </div>

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>
          <div className="space-y-2">
            {[
              {
                label: "Epoch AI — How much energy does ChatGPT use? (2025)",
                href: "https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use",
              },
              {
                label: "MIT Technology Review — We did the math on AI's energy footprint (2025)",
                href: "https://www.technologyreview.com/2025/05/20/1116327/ai-energy-usage-climate-footprint-big-tech/",
              },
              {
                label: "Li et al. — Making AI Less Thirsty: water footprint of AI models (2023)",
                href: "https://arxiv.org/abs/2304.03271",
              },
              {
                label: "Luccioni et al. — Power Hungry Processing: carbon cost of AI tasks (2023)",
                href: "https://arxiv.org/abs/2311.16863",
              },
              {
                label: "Jegham et al. — How Hungry is AI? Energy, water & carbon of LLM inference (2025)",
                href: "https://arxiv.org/html/2505.09598v1",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-base text-blue-600 hover:underline"
              >
                {"→ " + item.label}
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
