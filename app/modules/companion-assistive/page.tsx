"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Game 1 data: 10 AI tool features for the general companion/assistive quiz.
// Each feature has a classification used to score the spectrum at the end.
//   - "assistive" = clearly task-focused, no emotional bonding
//   - "companion"  = emotionally engaging, relationship-building
//   - "borderline" = debated; could be either depending on context
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
    description: 'Sends messages like "Haven\'t heard from you, are you okay?"',
    type: "companion",
  },
];

// ---------------------------------------------------------------------------
// Game 2 data: GUARD Act edition.
// All five responses below would be banned under the GUARD Act because they
// use warm, adaptive, collaborative language that simulates interpersonal
// interaction. The user decides whether each should be allowed or blocked.
// The reveal shows that every one of them is banned under the current bill.
// ---------------------------------------------------------------------------
const guardResponses = [
  {
    id: "fafsa",
    context: "FAFSA / financial aid",
    response: "I can see this part is confusing. A lot of students get stuck here. Let's find your tax transcript together.",
  },
  {
    id: "homework",
    context: "Homework help",
    response: "Good try! You're really close. Let's work through why this step didn't quite work.",
  },
  {
    id: "college",
    context: "College applications",
    response: "This is a strong draft. Let's trim it together so your voice really comes through.",
  },
  {
    id: "job",
    context: "Job readiness",
    response: "Interviews can feel scary. You've got this. Let's practice so you feel more confident.",
  },
  {
    id: "iep",
    context: "IEP / special education support",
    response: "That was a hard paragraph. Let's slow down and break it into smaller pieces.",
  },
];

// ---------------------------------------------------------------------------
// Helper: compute Game 1 spectrum score.
// Score = (companion features allowed) / (total companion features) * 100
// Higher score = more open to companion-style AI.
// ---------------------------------------------------------------------------
function computeScore(choices: Record<string, boolean>): number {
  const companionFeatures = features.filter((f) => f.type === "companion");
  const allowed = companionFeatures.filter((f) => choices[f.id] === true);
  return Math.round((allowed.length / companionFeatures.length) * 100);
}

// ---------------------------------------------------------------------------
// Helper: return a label and explanation for the Game 1 spectrum position.
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
        "You were comfortable with quite a bit of companion-style behavior. You likely see emotional engagement as part of good support, especially for vulnerable youth who may not have other resources.",
    };
  }
  return {
    label: "Companion-Leaning",
    color: "bg-orange-100 border-orange-300 text-orange-900",
    explanation:
      "You allowed most or all companion features. You may believe emotional connection is inseparable from effective support, or that restricting it does more harm than good for youth who rely on these tools.",
  };
}

// ---------------------------------------------------------------------------
// Sub-component: Game 1 feature toggle card.
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
// Sub-component: Game 2 GUARD Act response card.
// Shows a single AI response that would be banned under the GUARD Act.
// The user decides whether they would allow or block it.
// After submitting, the reveal shows it is banned regardless of their choice.
// ---------------------------------------------------------------------------
function GuardResponseCard({
  item,
  choice,
  revealed,
  onChoice,
}: {
  item: (typeof guardResponses)[0];
  choice: boolean | null;
  revealed: boolean;
  onChoice: (id: string, value: boolean) => void;
}) {
  return (
    <div
      className={`rounded-lg p-5 flex flex-col gap-4 border transition-colors ${
        revealed
          ? "bg-red-50 border-red-200"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Context label */}
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
        {item.context}
      </p>

      {/* The AI response */}
      <p className="text-base text-gray-800 leading-relaxed italic">
        &ldquo;{item.response}&rdquo;
      </p>

      {/* Allow / Block buttons, disabled after reveal */}
      <div className="flex gap-2">
        <button
          onClick={() => !revealed && onChoice(item.id, true)}
          disabled={revealed}
          className={`flex-1 py-2 rounded-md text-sm font-medium border transition-colors ${
            choice === true && !revealed
              ? "bg-green-600 text-white border-green-600"
              : choice === true && revealed
              ? "bg-green-100 text-green-700 border-green-300"
              : revealed
              ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-600 border-gray-300 hover:border-green-400 hover:text-green-700"
          }`}
        >
          ✓ Allow
        </button>
        <button
          onClick={() => !revealed && onChoice(item.id, false)}
          disabled={revealed}
          className={`flex-1 py-2 rounded-md text-sm font-medium border transition-colors ${
            choice === false && !revealed
              ? "bg-red-500 text-white border-red-500"
              : choice === false && revealed
              ? "bg-red-100 text-red-700 border-red-300"
              : revealed
              ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600"
          }`}
        >
          ✕ Block
        </button>
      </div>

      {/* After reveal: show banned badge and note */}
      {revealed && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-red-700 border border-red-300 bg-red-50 rounded px-2 py-0.5">
            ✕ Banned under GUARD Act
          </span>
          {choice === true && (
            <span className="text-xs text-gray-500">You would have allowed this.</span>
          )}
          {choice === false && (
            <span className="text-xs text-gray-500">You would have blocked this.</span>
          )}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function CompanionAssistivePage() {
  // Game 1 state: maps feature id -> true (allowed) | false (blocked) | null
  const [choices, setChoices] = useState<Record<string, boolean | null>>(
    Object.fromEntries(features.map((f) => [f.id, null]))
  );
  const [showResults, setShowResults] = useState(false);

  // Game 2 state: maps response id -> true (allow) | false (block) | null
  const [guardChoices, setGuardChoices] = useState<Record<string, boolean | null>>(
    Object.fromEntries(guardResponses.map((r) => [r.id, null]))
  );
  // revealed = true once the user hits "See results" for Game 2
  const [guardRevealed, setGuardRevealed] = useState(false);

  const answeredCount = Object.values(choices).filter((v) => v !== null).length;
  const allAnswered = answeredCount === features.length;

  const guardAnsweredCount = Object.values(guardChoices).filter((v) => v !== null).length;
  const allGuardAnswered = guardAnsweredCount === guardResponses.length;

  // How many of the banned responses the user said they would allow
  const wouldAllowCount = Object.values(guardChoices).filter((v) => v === true).length;

  function handleToggle(id: string, value: boolean) {
    setChoices((prev) => ({ ...prev, [id]: value }));
    setShowResults(false);
  }

  function handleGuardChoice(id: string, value: boolean) {
    if (!guardRevealed) {
      setGuardChoices((prev) => ({ ...prev, [id]: value }));
    }
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
          Not all AI tools are the same. How can policymakers adequately distinguish tools that appropriately assist students with learning and career preparation from tools designed to build emotional dependency? Current policymaking neglects to ask the students and teachers who will be most affected.
        </p>

        {/* Step 1 */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            1
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Try it out</h2>
        </div>

        {/* Game 1 instructions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            What Would You Allow? (Game 1)
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Below are 10 real features that can be found in AI tools used by or marketed to young people. For each one, decide whether you think it should be allowed or blocked in K-12 schools.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            There are no right or wrong answers. At the end, you will see where your choices
            place you on the companion-to-assistive spectrum, and how your line compares to
            what current laws like the GUARD Act actually permit.
          </p>
          <p className="text-sm text-gray-400">
            {answeredCount} of {features.length} answered
            {allAnswered && " — ready to see your results"}
          </p>
        </div>

        {/* Game 1 cards */}
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

        {/* Game 1 results */}
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
            <div className="mt-5 border-t border-current opacity-60 pt-4">
              <p className="text-sm font-semibold mb-3 opacity-100">How your choices break down:</p>
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

        {/* Game 2 instructions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            What Would You Allow? (Game 2: GUARD Act Edition)
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Each response below comes from an educational AI tool. For each one, decide whether
            you would Allow it or Block it in a school context. When you are done, hit "See
            results" to find out how the GUARD Act classifies every single one.
          </p>
          <p className="text-sm text-gray-400">
            {guardAnsweredCount} of {guardResponses.length} answered
            {allGuardAnswered && !guardRevealed && " — ready to see your results"}
          </p>
        </div>

        {/* Game 2 cards */}
        <div className="flex flex-col gap-4 mb-6">
          {guardResponses.map((item) => (
            <GuardResponseCard
              key={item.id}
              item={item}
              choice={guardChoices[item.id]}
              revealed={guardRevealed}
              onChoice={handleGuardChoice}
            />
          ))}
        </div>

        {/* Game 2 submit — hidden after reveal */}
        {!guardRevealed && (
          <button
            disabled={!allGuardAnswered}
            onClick={() => setGuardRevealed(true)}
            className={`w-full py-3 rounded-md text-base font-semibold transition-colors mb-8 ${
              allGuardAnswered
                ? "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allGuardAnswered
              ? "See results"
              : `Answer ${guardResponses.length - guardAnsweredCount} more to continue`}
          </button>
        )}

        {/* Game 2 results reveal */}
        {guardRevealed && (
          <div className="border border-amber-300 bg-amber-50 rounded-lg p-6 mb-8">
            <p className="text-lg font-bold text-amber-900 mb-3">
              Every one of those responses would likely be banned under the GUARD Act.
            </p>
            <p className="text-base text-amber-800 leading-relaxed mb-3">
              You said you would allow {wouldAllowCount} out of {guardResponses.length} of them.
            </p>
            <p className="text-base text-amber-800 leading-relaxed mb-3">
              None of these responses are harmful. They are simply warmer, more collaborative,
              and more pedagogically effective than what the law permits. Because the GUARD Act
              defines a companion chatbot as any tool that "provides adaptive, human-like responses"
              and "is designed to encourage or facilitate the simulation of interpersonal or
              emotional interaction," all five responses could trigger the bill's restrictions.
            </p>
            <p className="text-base text-amber-800 leading-relaxed">
              A tool that patiently walks a student through a confusing FAFSA form, or tells
              a struggling reader "let's slow down and break it into smaller pieces," may be
              doing exactly what a good teacher would do. The GUARD Act bases legal
              categorization on the manner in which content is expressed, not the underlying
              purpose that the tool serves.
            </p>
          </div>
        )}

        {/* Step 2 */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            2
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Understand</h2>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4 space-y-4">
          <div>
            <p className="text-lg font-semibold text-purple-900 mb-2">
              What is assistive AI?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Assistive AI helps a user, either through instruction or by taking action, pursue a
              goal or complete a task. The relationship between a user and an assistive AI is
              functional, similar to how a student uses a calculator.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-2">
              What is companion AI?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Companion AI is designed to increase user engagement by simulating an ongoing
              emotional relationship. Developers of companion AI program the models to ask a
              user how they feel, remember personal details to seem caring, and respond in ways
              that feel warm and personal. Features characteristic of companion AI systems also
              appear in tools marketed as educational. A Center for Democracy and Technology
              survey conducted in October 2025 found that roughly 20 percent of students
              reported personal or secondhand experience with romantic AI relationships.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-2">
              Why does the distinction matter for young people?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              K-12 education serves to develop more than just students' intellectual faculties.
              Especially in elementary school and middle school, the interactions that students
              have with each other and with their teachers can shape their social-emotional
              well-being for the rest of their lives. Researchers are beginning to examine how
              forming relationships with AI chatbots can disrupt healthy emotional development
              by replacing real friends. That said, there remains an overlap between qualities
              that make AI an effective tutor (adaptiveness, warm tone, and ability to predict
              student needs) and qualities that put children at risk of becoming emotionally
              attached. An important consideration is that AI interaction facilitated in school
              environments can also be a gateway to more harmful AI interactions outside of the classroom.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-2">
              What does the GUARD Act say?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              The GUARD Act, introduced to Congress in October of last year, would ban youth
              access to AI companion chatbots and require AI companies to implement age
              verification measures, including government-issued ID, for AI products that fall
              outside of the companion definition. The unresolved question is whether the bill
              defines the term "companion AI chatbot" broadly enough to inadvertently restrict
              access to AI tools that adolescents could safely utilize.
            </p>
            <p className="text-base text-purple-800 leading-relaxed mt-3">
              A tool that "provides adaptive, human-like responses to user inputs" and "is
              designed to encourage or facilitate the simulation of interpersonal or emotional
              interaction" could include educational tools that patiently respond to an
              adolescent's questions and help a student or job applicant work through confusion
              as a collaborator rather than simply an answer machine. After all, a tutor chatbot
              that interacts with a student can be thought of as a simulation of interpersonal
              interaction. Even if such tools store no memory between chats, are properly
              guardrailed to avoid encouragement of self-harm, and lack push notifications and check-ins, the
              GUARD Act bases legal categorization on the manner in which content is expressed
              and not the underlying purpose that the tool serves.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-2">
              What about agentic AI?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Agentic AI can take actions in the world on your behalf, such as clicking buttons,
              submitting forms, and scheduling appointments. Generative AI produces content like
              text, images, and audio. Agentic AI adds another dimension to the distinction between
              companion and assistive AI because emotional dependency with decreased human oversight
              can be a dangerous mix.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            3
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Reflect</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Questions to Consider
          </p>
          <div className="space-y-3">
            {[
              "Was the line between assistive and companion always clear? Which responses were hardest to classify?",
              "Should the same rules apply to AI tools used in schools vs. AI tools adolescents can use at home?",
              "To what degree would your answers change based on the age of the student? Do you think that policy should be tiered (allowable AI products map to different developmental stages) or applied the same to all minors?",
              "Who should decide where the line between assistive and companion AI is drawn? Should it be up to the government, schools, parents, or young people themselves?",
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
          <p className="text-lg font-semibold text-green-900 mb-4">What You Can Do</p>
          <ul className="space-y-3 text-base text-green-800">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Ask whether an AI tool is designed to help you complete a task or to keep you engaged.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Notice when an AI uses emotional language. Warmth is an intentional design choice, not a natural property.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Advocate for schools to have clear policies on which AI features are permitted and why.</span>
            </li>
          </ul>
        </div>

        {/* Learn More / Sources */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-lg font-semibold text-gray-900 mb-4">Learn More / Sources</p>
          <div className="space-y-2">
            {[
              {
                label: "Guidelines for User Age-verification and Responsible Dialogue Act of 2025",
                href: "https://www.congress.gov/bill/119th-congress/senate-bill/3062/text",
                ariaLabel: "Read the full GUARD Act bill text on congress.gov",
              },
              {
                label: "AI Chatbots and Digital Companions Are Reshaping Emotional Connection",
                href: "https://www.apa.org/monitor/2026/01-02/trends-digital-ai-relationships-emotional-connection",
                ariaLabel: "Read APA research on AI companions and emotional connection",
              },
              {
                label: "Agentic AI vs. Generative AI",
                href: "https://www.ibm.com/think/topics/agentic-ai-vs-generative-ai",
                ariaLabel: "Read IBM's explainer on agentic vs generative AI",
              },
              {
                label: "Three Reasons to Be on GUARD about the GUARD Act",
                href: "https://cdt.org/insights/three-reasons-to-be-on-guard-about-the-guard-act/",
                ariaLabel: "Read the Center for Democracy and Technology's analysis of the GUARD Act",
              },
              {
                label: "Who Is Harmed by Age Verification Mandates?",
                href: "https://www.eff.org/pages/whos-harmed-age-verification-mandates",
                ariaLabel: "Read EFF's analysis of who is harmed by age verification laws",
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
                {item.label}
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
