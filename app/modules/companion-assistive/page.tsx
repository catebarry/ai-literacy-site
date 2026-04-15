"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Data: the 10 AI tool features used in the "What Would You Allow?" quiz.
// Each feature has a label, a short description, and a classification:
//   - "assistive" = clearly task-focused, no emotional bonding
//   - "companion"  = emotionally engaging, relationship-building
//   - "borderline" = debated; could be either depending on context
// The classification is used at the end to score where the user drew the line.
// ---------------------------------------------------------------------------
const features = [
  {
    id: "name",
    label: "Remembers your name between sessions",
    description: "The AI greets you by name every time you return.",
    type: "borderline",
  },
  {
    id: "emoji",
    label: "Uses encouraging emoji in responses",
    description: 'Replies with things like "Great job! 🎉" when you finish a task.',
    type: "companion",
  },
  {
    id: "autofill",
    label: "Auto-fills form fields on your behalf",
    description: "Completes FAFSA or scholarship forms using your saved information.",
    type: "assistive",
  },
  {
    id: "feeling",
    label: "Asks how you are feeling before helping",
    description: 'Starts each session with "How are you doing today?"',
    type: "companion",
  },
  {
    id: "progress",
    label: "Tracks your task progress across sessions",
    description: "Remembers that you finished Step 2 of a job application last week.",
    type: "assistive",
  },
  {
    id: "friend",
    label: "Refers to itself as your friend or companion",
    description: 'Says things like "I\'m here for you" or "You can always talk to me."',
    type: "companion",
  },
  {
    id: "deadline",
    label: "Sends reminders about upcoming deadlines",
    description: "Notifies you when a scholarship application is due in 3 days.",
    type: "assistive",
  },
  {
    id: "vent",
    label: "Lets you vent about your day before getting to work",
    description: "Encourages open-ended emotional sharing before any task.",
    type: "companion",
  },
  {
    id: "summarize",
    label: "Summarizes complex documents in plain language",
    description: "Breaks down a housing assistance form into simple steps.",
    type: "assistive",
  },
  {
    id: "checkin",
    label: "Checks in on your emotional wellbeing unprompted",
    description: 'Sends messages like "Haven\'t heard from you — are you okay?"',
    type: "companion",
  },
];

// ---------------------------------------------------------------------------
// Helper: given the user's Allow/Block choices, compute a spectrum score.
// Score = (companion features allowed) / (total companion features) * 100
// Higher score = more open to companion-style AI.
// ---------------------------------------------------------------------------
function computeScore(choices: Record<string, boolean>): number {
  const companionFeatures = features.filter((f) => f.type === "companion");
  const allowed = companionFeatures.filter((f) => choices[f.id] === true);
  return Math.round((allowed.length / companionFeatures.length) * 100);
}

// ---------------------------------------------------------------------------
// Helper: return a label and explanation for the user's spectrum position.
// ---------------------------------------------------------------------------
function getSpectrum(score: number): {
  label: string;
  color: string;
  explanation: string;
} {
  if (score <= 25) {
    return {
      label: "Strictly Assistive",
      color: "bg-blue-100 border-blue-300 text-blue-900",
      explanation:
        "You drew a tight line: AI should complete tasks and stay out of emotional territory. This aligns closely with the GUARD Act's intent, which restricts conversational warmth to prevent emotional dependency in minors.",
    };
  }
  if (score <= 50) {
    return {
      label: "Mostly Assistive",
      color: "bg-teal-100 border-teal-300 text-teal-900",
      explanation:
        "You allowed some friendly features but kept emotional engagement limited. Most policymakers land here: helpful tone is fine, but persistent emotional bonding is a concern.",
    };
  }
  if (score <= 75) {
    return {
      label: "Mixed",
      color: "bg-amber-100 border-amber-300 text-amber-900",
      explanation:
        "You were comfortable with quite a bit of companion-style behavior. You likely see emotional engagement as part of good support — especially for vulnerable youth who may not have other resources.",
    };
  }
  return {
    label: "Companion-Leaning",
    color: "bg-orange-100 border-orange-300 text-orange-900",
    explanation:
      "You allowed most or all companion features. You may believe emotional connection is inseparable from effective support — or that restricting it does more harm than good for youth who rely on these tools.",
  };
}

// ---------------------------------------------------------------------------
// Sub-component: a single toggle card for one AI feature.
// ---------------------------------------------------------------------------
function FeatureCard({
  feature,
  choice,
  onToggle,
}: {
  feature: (typeof features)[0];
  choice: boolean | null;
  onToggle: (id: string, value: boolean) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3">
      <div>
        <p className="text-base font-semibold text-gray-900 mb-1">{feature.label}</p>
        <p className="text-sm text-gray-500">{feature.description}</p>
      </div>

      {/* Allow / Block toggle buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(feature.id, true)}
          className={`flex-1 py-2 rounded-md text-sm font-medium border transition-colors ${
            choice === true
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-700"
          }`}
        >
          ✓ Allow
        </button>
        <button
          onClick={() => onToggle(feature.id, false)}
          className={`flex-1 py-2 rounded-md text-sm font-medium border transition-colors ${
            choice === false
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600"
          }`}
        >
          ✕ Block
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function CompanionAssistivePage() {
  // choices maps feature id -> true (allowed) | false (blocked) | null (not yet answered)
  const [choices, setChoices] = useState<Record<string, boolean | null>>(
    Object.fromEntries(features.map((f) => [f.id, null]))
  );

  // Whether the user has submitted the quiz and wants to see results
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.values(choices).filter((v) => v !== null).length;
  const allAnswered = answeredCount === features.length;

  function handleToggle(id: string, value: boolean) {
    // Update the specific feature's choice without touching others
    setChoices((prev) => ({ ...prev, [id]: value }));
    // If results are already showing, hide them so the user can re-submit
    setShowResults(false);
  }

  const score = allAnswered ? computeScore(choices as Record<string, boolean>) : 0;
  const spectrum = allAnswered ? getSpectrum(score) : null;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          aria-label="Back to Modules"
        >
          <ArrowLeft size={20} /> Back to Modules
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Companion vs. Assistive AI: Where Do You Draw the Line?
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          Not all AI products can be created equal. Some tools are designed to help users complete tasks and do nothing more. Other models are the product of AI companies making intentional design decisions to keep users coming back, often through human-like behaviors and emotionally manipulative tendencies.
        </p>

        {/* ── Step 1: Understand ── */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            1
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Understand</h2>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4 space-y-4">
          <div>
            <p className="text-base font-semibold text-purple-900 mb-2">
              What is assistive AI?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              What is companion AI?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              Why does the distinction matter for young people?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              What does the GUARD Act say?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              What about agentic AI?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Agentic AI can take autonomous action on behalf of a user, which means that it can fill out forms and applications from preloaded data, browse the web, and navigate websites. Generative AI, on the other hand, can produce content (text, images, audio) but otherwise stops short of interfacing with other apps and files on a user’s device. Agentic brings another dimension to the distinction between companion and assistive AI because agentic tools can simplify the completion of bureaucratic tasks. That said, agentic AI can also contain companion-like qualities and features that keep a user emotionally engaged. 
            </p>
          </div>
        </div>

        {/* ── Step 2: Try It Out ── */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            2
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Try it out</h2>
        </div>

        {/* Instructions card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">Instructions</p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Below are 10 real features found in AI tools used by or marketed to young people.
            For each one, decide whether you would <strong>Allow</strong> it in an AI tool used
            in schools or youth-serving organizations, or <strong>Block</strong> it.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            There are no right or wrong answers. At the end, you will see where your choices
            place you on the companion-to-assistive spectrum, as well as how your line compares to
            what proposed laws like the GUARD Act would permit.
          </p>
          <p className="text-sm text-gray-400">
            {answeredCount} of {features.length} answered
            {allAnswered && " — ready to see your results"}
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              choice={choices[feature.id]}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {/* Submit button — only active once all features are answered */}
        <button
          disabled={!allAnswered}
          onClick={() => setShowResults(true)}
          className={`w-full py-3 rounded-md text-base font-semibold transition-colors mb-8 ${
            allAnswered
              ? "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {allAnswered ? "See my results" : `Answer all ${features.length - answeredCount} remaining to continue`}
        </button>

        {/* Results panel — shown only after submission */}
        {showResults && spectrum && (
          <div className={`border rounded-lg p-6 mb-8 ${spectrum.color}`}>
            <p className="text-lg font-bold mb-1">Your position: {spectrum.label}</p>
            <div className="w-full bg-white rounded-full h-3 mb-4 overflow-hidden border border-current opacity-40">
              <div
                className="h-full bg-current rounded-full transition-all duration-500"
                style={{ width: `${score}%` }}
              />
            </div>
            <p className="text-base leading-relaxed">{spectrum.explanation}</p>

            {/* Per-feature breakdown */}
            <div className="mt-5 border-t border-current opacity-60 pt-4">
              <p className="text-sm font-semibold mb-3 opacity-100">
                How your choices break down:
              </p>
              <div className="space-y-2">
                {features.map((f) => (
                  <div key={f.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-800">{f.label}</span>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          f.type === "companion"
                            ? "bg-orange-100 text-orange-700"
                            : f.type === "assistive"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {f.type}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          choices[f.id] === true ? "text-green-700" : "text-red-600"
                        }`}
                      >
                        {choices[f.id] === true ? "Allowed" : "Blocked"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Step 3: Reflect ── */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            3
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Reflect</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-4">
            Questions to Consider
          </p>
          <div className="space-y-3">
            {[
              "Was the line between assistive and companion always clear? Which features were hardest to classify?",
              "Should the same rules apply to AI tools used in schools vs. AI tools used at home?",
              "Who should decide where the line between companion and assistive AI is drawn?",
              "Are there youth who might genuinely benefit from companion AI features? Who might be harmed by them?",
            ].map((question) => (
              <div
                key={question}
                className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700"
              >
                {question}
              </div>
            ))}
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-green-900 mb-4">What You Can Do</p>
          <ul className="space-y-3 text-base text-green-800">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Ask whether an AI tool is designed to help you complete a task or to keep you engaged</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Notice when an AI uses emotional language (warmth is a design choice!)</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Advocate for schools to have clear policies on which AI features are permitted and why</span>
            </li>
          </ul>
        </div>

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>
          <div className="space-y-2">
            {[
              {
                label: "GUARD Act",
                href: "https://www.congress.gov/bill/119th-congress/senate-bill/3062/text",
                ariaLabel: "Read the full GUARD Act bill text on congress.gov",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.ariaLabel}
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
