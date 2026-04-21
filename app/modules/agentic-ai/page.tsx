"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Data: 10 real-world agentic AI actions.
// Each scenario has a label, description, stakes level, and a note that
// appears after the user makes their choice explaining the tradeoff.
// ---------------------------------------------------------------------------
const scenarios = [
  {
    id: "email",
    action: "Send an email on your behalf",
    context:
      "You ask an AI assistant to follow up with a colleague about a meeting. It drafts and sends the email without showing it to you first.",
    stakes: "medium",
    afterNote:
      "Many AI email tools can send without review. Once sent, you cannot unsend it, and the AI may have misread your intent or tone.",
  },
  {
    id: "calendar",
    action: "Schedule a meeting with someone else",
    context:
      "Your AI assistant finds an open slot in your calendar and books a meeting with a client, sending them an invite automatically.",
    stakes: "medium",
    afterNote:
      "Scheduling on your behalf is one of the most common agentic AI features. It is convenient but commits you to obligations without a final check.",
  },
  {
    id: "purchase",
    action: "Buy a product using your saved payment method",
    context:
      "You tell an AI to order more paper for your printer. It finds the cheapest option and completes the purchase using your saved credit card.",
    stakes: "high",
    afterNote:
      "Financial transactions are irreversible and involve real money. Most people are comfortable with AI recommending a product, but fewer are comfortable with it buying one.",
  },
  {
    id: "delete",
    action: "Delete files it decides are duplicates",
    context:
      "An AI organizes your computer and permanently deletes files it identifies as duplicates or junk, without asking for confirmation.",
    stakes: "high",
    afterNote:
      "Permanent deletion is one of the most consequential agentic actions. AI can misidentify files, and deleted files may not be recoverable.",
  },
  {
    id: "post",
    action: "Post to your social media accounts",
    context:
      "You ask an AI to keep your LinkedIn active. It writes and publishes posts on your behalf based on your past content style.",
    stakes: "high",
    afterNote:
      "Public posts can affect your reputation and relationships. AI-generated content published in your name may not reflect your actual views.",
  },
  {
    id: "summarize",
    action: "Read and summarize your private emails",
    context:
      "An AI assistant reads through your inbox and gives you a daily summary of what needs attention, including personal and work emails.",
    stakes: "medium",
    afterNote:
      "Reading email requires access to potentially sensitive information. Even if the AI only summarizes, it has processed everything, including private conversations.",
  },
  {
    id: "medical",
    action: "Book a doctor appointment based on your symptoms",
    context:
      "You describe feeling unwell. An AI reviews your calendar, finds an opening, and books an appointment with your primary care doctor.",
    stakes: "high",
    afterNote:
      "Health decisions involve sensitive personal data and judgment calls about urgency. The AI may not understand the full context of your situation.",
  },
  {
    id: "apply",
    action: "Submit a job application on your behalf",
    context:
      "An AI finds a job listing that matches your resume and submits an application, including a cover letter it wrote, without your final review.",
    stakes: "high",
    afterNote:
      "Job applications represent you professionally. An AI may tailor your application in ways that misrepresent your actual experience or intentions.",
  },
  {
    id: "smart",
    action: "Adjust your home's thermostat and lights automatically",
    context:
      "A smart home AI learns your preferences and starts adjusting temperature and lighting throughout the day without being asked.",
    stakes: "low",
    afterNote:
      "This is one of the most accepted forms of agentic AI. The stakes are low and the action is easily reversible, but it still involves the AI making decisions for you.",
  },
  {
    id: "negotiate",
    action: "Negotiate a bill or subscription on your behalf",
    context:
      "An AI contacts your internet provider, negotiates a lower rate, and agrees to a new contract without you reviewing the final terms.",
    stakes: "high",
    afterNote:
      "Negotiating contracts involves legal commitments. The AI may accept terms you would have rejected, or give up leverage you did not know you had.",
  },
];

// ---------------------------------------------------------------------------
// Helper: color coding for stakes level
// ---------------------------------------------------------------------------
function stakesStyle(stakes: string) {
  if (stakes === "high") return "bg-red-50 text-red-700 border border-red-200";
  if (stakes === "medium") return "bg-amber-50 text-amber-700 border border-amber-200";
  return "bg-green-50 text-green-700 border border-green-200";
}

function stakesLabel(stakes: string) {
  if (stakes === "high") return "High stakes";
  if (stakes === "medium") return "Medium stakes";
  return "Low stakes";
}

// ---------------------------------------------------------------------------
// Sub-component: one scenario card
// ---------------------------------------------------------------------------
function ScenarioCard({
  scenario,
  choice,
  onChoice,
}: {
  scenario: (typeof scenarios)[0];
  choice: boolean | null;
  onChoice: (id: string, value: boolean) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-base font-semibold text-gray-900">{scenario.action}</p>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded shrink-0 ${stakesStyle(scenario.stakes)}`}
        >
          {stakesLabel(scenario.stakes)}
        </span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{scenario.context}</p>

      {/* Approve / Deny buttons, only shown before a choice is made */}
      {choice === null && (
        <div className="flex gap-2">
          <button
            onClick={() => onChoice(scenario.id, true)}
            className="flex-1 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-colors"
          >
            ✓ AI can do this alone
          </button>
          <button
            onClick={() => onChoice(scenario.id, false)}
            className="flex-1 py-2 rounded-md text-sm font-medium border border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            ✕ AI should ask me first
          </button>
        </div>
      )}

      {/* After choice: show result and explanatory note */}
      {choice !== null && (
        <div
          className={`rounded-md p-4 text-sm leading-relaxed ${
            choice
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <p className="font-semibold mb-1">
            {choice ? "You said: AI can do this alone" : "You said: AI should ask me first"}
          </p>
          <p>{scenario.afterNote}</p>
          <button
            onClick={() => onChoice(scenario.id, !choice)}
            className="mt-2 text-xs underline opacity-60 hover:opacity-100"
          >
            Change my answer
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helper: compute summary stats for the results panel
// ---------------------------------------------------------------------------
function computeResults(choices: Record<string, boolean | null>) {
  const approved = scenarios.filter((s) => choices[s.id] === true);
  const highStakesApproved = approved.filter((s) => s.stakes === "high");
  return { approved: approved.length, highStakesApproved: highStakesApproved.length };
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function AgenticAIPage() {
  // choices maps scenario id -> true (AI acts alone) | false (ask first) | null (unanswered)
  const [choices, setChoices] = useState<Record<string, boolean | null>>(
    Object.fromEntries(scenarios.map((s) => [s.id, null]))
  );
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.values(choices).filter((v) => v !== null).length;
  const allAnswered = answeredCount === scenarios.length;

  function handleChoice(id: string, value: boolean) {
    setChoices((prev) => ({ ...prev, [id]: value }));
    // Hide results when the user changes an answer so they re-submit
    setShowResults(false);
  }

  const results = allAnswered ? computeResults(choices) : null;

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          aria-label="Back to Modules"
        >
          <ArrowLeft size={20} /> Back to Modules
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Agentic AI: When AI Takes Action
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          How much should AI be allowed to do on its own? Should minors
          have access to agentic AI tools? If so, under what conditions? 
        </p>

        {/* Step 1 */}
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
            Below are 10 things an AI agent could do on your behalf. For each one, decide whether
            you are comfortable letting the AI act alone, or whether it should check with you first.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            After you answer, each card will show a short note about what is actually at stake.
            At the end, you will see a summary of where you drew the line.
          </p>
          <p className="text-sm text-gray-400">
            {answeredCount} of {scenarios.length} answered
            {allAnswered && " — ready to see your results"}
          </p>
        </div>

        {/* Scenario cards */}
        <div className="flex flex-col gap-4 mb-6">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              choice={choices[scenario.id]}
              onChoice={handleChoice}
            />
          ))}
        </div>

        {/* Submit button */}
        <button
          disabled={!allAnswered}
          onClick={() => setShowResults(true)}
          className={`w-full py-3 rounded-md text-base font-semibold transition-colors mb-8 ${
            allAnswered
              ? "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {allAnswered
            ? "See my results"
            : `Answer ${scenarios.length - answeredCount} more to continue`}
        </button>

        {/* Results panel */}
        {showResults && results && (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-8">
            <p className="text-lg font-bold text-gray-900 mb-4">Your results</p>

            <div className="grid grid-cols-3 gap-4 mb-5">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">{results.approved}</p>
                <p className="text-sm text-gray-500 mt-1">actions you let AI do alone</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {scenarios.length - results.approved}
                </p>
                <p className="text-sm text-gray-500 mt-1">actions you wanted to approve first</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-red-600">{results.highStakesApproved}</p>
                <p className="text-sm text-gray-500 mt-1">high-stakes actions you let AI do alone</p>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed">
              {results.approved <= 3
                ? "You drew a tight line. You want AI to assist, not act, keeping humans in control of decisions that have real consequences. This reflects a cautious approach most regulators currently favor for agentic systems."
                : results.approved <= 6
                ? "You were selective. You let AI handle routine or low-stakes tasks but pulled back on decisions involving money, health, or public communication. That reflects how most people think about acceptable AI autonomy."
                : "You gave AI significant autonomy. That can make life more convenient, but it also means accepting more risk, including errors, misrepresentation, and irreversible actions. It is worth asking whether your trust is calibrated to the actual reliability of these systems."}
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
              What makes AI "agentic"?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Unlike generative AI, which is constrained to producing text, image, or audio
              content, agentic AI systems can take action on behalf of a user and autonomously
              pursue goals with minimal human oversight. An agentic system is closer to filling
              the place of a parent in assisting a student with a form or application, whereas
              generative AI is closer to resembling a customer service representative in terms
              of the level of support it can provide students. Agentic AI systems are already
              being deployed in schools across the US. Last year, Tennessee approved Kira, an
              integrated agentic AI system that could do everything from design curriculum and
              tutor students, to autograding and attendance.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-2">
              Why does autonomy level matter in educational contexts?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              As a general rule, the more autonomy an AI has, the more consequential its errors become. Most generative AI mistakes, such as a wrong answer or confusing response, are fixable and, for the most part, less likely to cause the user significant harm. Agentic mistakes, on the other hand, are often harder to undo or harder to notice, especially when an agent is being used with minimal human oversight. This matters especially in educational settings because students are still developing independent skills and may lack understanding for how an agent achieves a desired goal. 
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-2">
              What unique risks does agentic AI pose to students?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
             In order to function, Agentic AI systems require permissions. Users are often required to hand access to calendars, email, files, and sometimes financial accounts over to an agent. For students in particular, this creates data privacy risks, because student data is subject to a patchwork of outdated and inadequately enforced protections under FERPA and COPPA. Further, when an AI agent makes a mistake on a student's behalf, it is often unclear whether the student, the school, or the AI company is responsible. Lastly, Agentic AI can compound cognitive offloading risks when students use agents to complete tasks they otherwise would complete themselves, or using generative AI that still requires the student to prompt, evaluate, and apply the output.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-2">
              What unique benefits does agentic AI promise?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Completing a FAFSA, requesting an IEP accommodation, or applying for a scholarship involves navigating complex bureaucratic systems that heavily favor students with knowledgeable parents or access to counselors and support systems. An agentic AI that can guide or complete those steps offers a form of access equity that generative AI doesn’t provide. Agentic systems like Kira, which have been deployed in Tennessee and other states, also promise to reduce administrative burden on teachers, which frees up time for them to focus on the human-centered parts of education that AI cannot replicate as well.
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
          <p className="text-lg font-semibold text-gray-900 mb-4">Questions to Consider</p>
          <div className="space-y-3">
            {[
              "What would it take for you to trust an AI to act fully on your behalf?",
              "How much should a student understand about how an agent is pursuing a goal before allowing it to take action?",
              "How might using an agent provide an advantage that students without access to an agent don't have?",
              "At what age or developmental stage should students be permitted to delegate decisions to an AI agent?",

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
              <span>Before using an AI tool, ask yourself: can this AI do more than generate content? Can it take action on my device?</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Check whether an agentic tool has a confirmation step before acting, and turn it on if it does. Insist on reviewing any action an AI proposes before it is carried out</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Remember that you are responsible for what an AI does in your name. If an agent makes a mistake, the consequences are unlikely to fall on the company that built it.</span>
            </li>
          </ul>
        </div>

        {/* Learn More / Sources */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-lg font-semibold text-gray-900 mb-4">Learn More / Sources</p>
          <div className="space-y-2">
            {[
              {
                label: "What Is Agentic AI and How Can Agencies Use It to Enhance Citizen Services?",
                href: "https://statetechmagazine.com/article/2025/03/what-agentic-ai-and-how-can-agencies-use-it-enhance-citizen-services",
                ariaLabel: "Read about agentic AI in public services",
              },
              {
                label: "The Age of Agentic AI",
                href: "https://www.technologyreview.com/2025/01/06/1109267/agentic-ai/",
                ariaLabel: "Read MIT Technology Review on agentic AI",
              },
              {
                label: "Building Effective Agents",
                href: "https://www.anthropic.com/research/building-effective-agents",
                ariaLabel: "Read Anthropic's research on building effective agents",
              },
              {
                label: "AI and Your Consumer Rights",
                href: "https://consumer.ftc.gov/features/artificial-intelligence",
                ariaLabel: "Read FTC guidance on AI and consumer rights",
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
        <div className="border-t border-gray-300 pt-6">
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
