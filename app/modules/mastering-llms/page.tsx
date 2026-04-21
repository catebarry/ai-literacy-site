"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Data: Prompt Optimization Scenarios
// ---------------------------------------------------------------------------
const scenarios = [
  {
    id: "research_outline",
    goal: "Generate a highly structured, academically rigorous outline for a paper's introduction.",
    context:
      "A student at Duke University is writing a 25-35 page research paper titled 'Minimizing Energy Consumption with AI'.",
    weakPrompt: "Give me an outline for an introduction about AI energy consumption.",
    options: [
      {
        id: "opt_1",
        text: "Act as a cybersecurity professor. Create a detailed outline for the introduction of a 30-page academic research paper titled 'Minimizing Energy Consumption with AI'. Include specific bullet points for the hook, thesis statement, and the transition into modern AI threat vectors.",
        type: "optimal",
        explanation:
          "Excellent. By defining the length of the actual paper, the AI scales the introduction appropriately. The persona ensures an academic tone, and specific structural requests guide the exact output.",
        simulatedOutput:
          "I. Introduction\n  A. Hook: The evolution of deception—from analog cons to algorithmic manipulation.\n  B. Context: The integration of LLMs in phishing.\n  C. Thesis: While psychological mechanisms remain constant, AI fundamentally alters the scale of attack vectors...",
      },
      {
        id: "opt_2",
        text: "Write a 30-page research paper about AI and energy consumption, starting with the introduction.",
        type: "fail",
        explanation:
          "Asking an LLM to write a massive academic paper in one shot results in a shallow, repetitive, and hallucinated mess. LLMs excel at iterative generation, not massive single outputs.",
        simulatedOutput:
          "[Generates 800 words of generic, repetitive text that barely scratches the surface before stopping abruptly due to token limits.]",
      },
      {
        id: "opt_3",
        text: "What are the main points I should include in an introduction about AI energy consumption?",
        type: "suboptimal",
        explanation:
          "This is a basic search query, not a generative prompt. The AI will give generic advice on how to write an introduction rather than drafting the specific outline needed.",
        simulatedOutput:
          "When writing an introduction, include: 1. A definition of the term. 2. A brief history. 3. Your main argument...",
      },
    ],
  },
  {
    id: "model_un",
    goal: "Draft a position paper representing a specific national perspective on technology.",
    context:
      "A student participating in a Model UN conference needs to draft a position paper representing Kenya's stance on AI innovation.",
    weakPrompt: "Write a position papergi about Kenya's AI innovation.",
    options: [
      {
        id: "opt_1",
        text: "Write a really professional position paper about Kenya's AI innovation and what they are doing to foster AI development.",
        type: "suboptimal",
        explanation:
          "Better, but it leaves the structure up to the AI, which often results in overly wordy text that lacks the specific formatting required for UN simulations.",
        simulatedOutput:
          "To Whom It May Concern: Kenya is making great strides in Artificial Intelligence. Innovation is growing rapidly...",
      },
      {
        id: "opt_2",
        text: "Provide a list of facts about Kenya's technology sector and AI.",
        type: "fail",
        explanation:
          "This abandons the goal of writing a position paper entirely and just asks for trivia. It doesn't leverage the AI's ability to format and synthesize.",
        simulatedOutput:
          "Kenya has a growing digital economy. Cloud computing is expanding...",
      },
      {
        id: "opt_3",
        text: "Act as a delegate for Kenya in a model UN conference. Draft a 3-paragraph position paper outlining our current AI innovation goals. Focus specifically on data center investments and cloud sovereignty. Adopt a diplomatic, persuasive tone.",
        type: "optimal",
        explanation:
          "Perfect. Assigning the 'delegate' persona instantly fixes the tone. Providing length constraints (3 paragraphs) and specific topical focuses prevents the AI from generating irrelevant fluff.",
        simulatedOutput:
          "The delegation of Kenya recognizes that robust digital infrastructure is the bedrock of equitable AI advancement. Currently, our nation is prioritizing the expansion of sovereign data centers...",
      },
    ],
  },
  {
    id: "data_extraction",
    goal: "Extract historical dates and locations from a messy text block so it can be used in a spreadsheet.",
    context:
      "A researcher has a long, unformatted document detailing the history of North Carolina textile mill closures and needs just the raw data.",
    weakPrompt: "Pull out the names and dates of the mills closing from this text: [messy text]",
    options: [
      {
        id: "opt_1",
        text: "Find the mill names and dates in this text and put them in a list: [messy text]",
        type: "suboptimal",
        explanation:
          "The AI will make a list, but it might use conversational filler ('Here are the names I found:') or inconsistent bullet points, requiring manual cleanup.",
        simulatedOutput:
          "Sure! Here is the list you asked for:\n- Loray Mill (1935)\n- Cannon Mills - 2003\nHope this helps!",
      },
      {
        id: "opt_2",
        text: "Extract all mill names and closure years from the following text. Output the results strictly as a CSV (Comma Separated Values) format with the headers 'Mill_Name' and 'Closure_Year'. Do not include any conversational filler or markdown formatting. Text: [messy text]",
        type: "optimal",
        explanation:
          "Flawless. This uses 'Zero-Shot Data Extraction' techniques. It specifies the exact technical format (CSV), defines headers, and explicitly commands the AI to drop its conversational filler.",
        simulatedOutput:
          "Mill_Name,Closure_Year\nLoray Mill,1935\nCannon Mills,2003\nGlencoe Mills,1954",
      },
      {
        id: "opt_3",
        text: "I have a lot of text and I only want the mill names and dates. Don't include anything else, just the names and dates.",
        type: "fail",
        explanation:
          "This is too conversational and lacks strict output constraints. The AI might still include conversational filler because it defaults to a 'helpful assistant' persona.",
        simulatedOutput:
          "I can help with that. The mills and dates mentioned in your text are: Loray Mill (1935), Cannon Mills (2003)...",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sub-component: one scenario card
// ---------------------------------------------------------------------------
function ScenarioCard({
  scenario,
  choice,
  onChoice,
}: {
  scenario: (typeof scenarios)[0];
  choice: string | null;
  onChoice: (scenarioId: string, optionId: string) => void;
}) {
  const selectedOption = scenario.options.find((o) => o.id === choice);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-4">
      <div className="mb-2">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Context</p>
        <p className="text-sm text-gray-700">{scenario.context}</p>
      </div>
      <div className="mb-2">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">The Goal</p>
        <p className="text-sm font-medium text-blue-600">{scenario.goal}</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-2">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Weak Base Prompt</p>
        <p className="text-sm text-gray-600 italic">"{scenario.weakPrompt}"</p>
      </div>

      {/* Options - only shown before a choice is made */}
      {choice === null && (
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-sm font-semibold text-gray-900 mb-1">Select the best prompt upgrade:</p>
          {scenario.options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onChoice(scenario.id, opt.id)}
              className="w-full text-left p-3 rounded-md text-sm font-medium border border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              "{opt.text}"
            </button>
          ))}
        </div>
      )}

      {/* After choice: show result and explanatory note */}
      {choice !== null && selectedOption && (
        <div
          className={`rounded-md p-4 text-sm leading-relaxed mt-2 ${
            selectedOption.type === "optimal"
              ? "bg-green-50 border border-green-200 text-green-900"
              : selectedOption.type === "suboptimal"
              ? "bg-amber-50 border border-amber-200 text-amber-900"
              : "bg-red-50 border border-red-200 text-red-900"
          }`}
        >
          <p className="font-bold mb-2">
            {selectedOption.type === "optimal" && "✓ Optimal Choice"}
            {selectedOption.type === "suboptimal" && "⚠ Close, but could be better"}
            {selectedOption.type === "fail" && "✕ Not quite"}
          </p>
          <p className="mb-4">{selectedOption.explanation}</p>
          
          <div className="bg-white/60 rounded p-3 border border-gray-300/50">
            <p className="text-xs uppercase tracking-wide mb-1 font-semibold opacity-70">Simulated AI Output</p>
            <p className="italic opacity-90">"{selectedOption.simulatedOutput}"</p>
          </div>

          <button
            onClick={() => onChoice(scenario.id, "")} // Reset choice by passing empty string, handled in parent
            className="mt-3 text-xs underline opacity-60 hover:opacity-100"
          >
            Change my answer
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function MasteringLLMsPage() {
  // choices maps scenario id -> selected option id | null
  const [choices, setChoices] = useState<Record<string, string | null>>(
    Object.fromEntries(scenarios.map((s) => [s.id, null]))
  );
  const [showResults, setShowResults] = useState(false);

  const answeredCount = Object.values(choices).filter((v) => v !== null).length;
  const allAnswered = answeredCount === scenarios.length;

  function handleChoice(id: string, value: string) {
    if (value === "") {
      setChoices((prev) => ({ ...prev, [id]: null }));
    } else {
      setChoices((prev) => ({ ...prev, [id]: value }));
    }
    setShowResults(false);
  }

  // Calculate score when showing results
  const computeScore = () => {
    let optimal = 0;
    Object.entries(choices).forEach(([scenarioId, optionId]) => {
      const scenario = scenarios.find(s => s.id === scenarioId);
      const option = scenario?.options.find(o => o.id === optionId);
      if (option?.type === "optimal") optimal++;
    });
    return optimal;
  };

  const optimalCount = allAnswered ? computeScore() : 0;

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
          Mastering LLMs: Prompts, Systems, and Personalization
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          Learn how to effectively harness your LLM with prompt engineering and system instructions to tailor outputs to your exact needs. 
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
          <p className="text-lg font-semibold text-gray-900 mb-2">The Prompt Optimizer</p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Below are common scenarios where someone might use an AI assistant. You will be presented with a weak base prompt. Your task is to select the most optimized upgrade.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Pay attention to how constraints, personas, and formatting rules completely change the simulated output.
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
        {showResults && (
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-8">
            <p className="text-lg font-bold text-gray-900 mb-4">Training Complete</p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-green-600">{optimalCount}</p>
                <p className="text-sm text-gray-500 mt-1">optimal prompts chosen</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {scenarios.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">total scenarios</p>
              </div>
            </div>

            <p className="text-base text-gray-700 leading-relaxed">
              {optimalCount === scenarios.length
                ? "Perfect! You understand the core formula: Role + Task + Format. You recognize that LLMs need strict boundaries to perform at their best."
                : "Good effort. Remember that great prompts rarely happen by accident. They require you to treat the AI less like a search engine and more like an intern who needs extremely precise, contextual instructions."}
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
            <p className="text-base font-semibold text-purple-900 mb-2">
              The Invisible Layer: System vs. User Prompts
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              When you type a question into an AI, you are submitting a <strong>User Prompt</strong>. However, before your text ever reaches the AI, it is wrapped in an invisible set of instructions called a <strong>System Prompt</strong>. The system prompt dictates the model's core behavior, safety boundaries, and default "helpful assistant" tone. By assigning a persona in your prompt (e.g., "Act as a strict copy editor"), you can effectively override these defaults and shape the invisible layer to your advantage.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              What is Few-Shot Prompting?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Instead of just telling the AI what to do (Zero-Shot), you <em>show</em> it. By providing 2 or 3 examples of the exact input-to-output translation you want inside your prompt, the AI mimics your pattern perfectly. This is the most reliable way to guarantee specific formatting or tone, because LLMs are fundamentally pattern-matching engines.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              What is Chain-of-Thought (CoT)?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              LLMs don't "think," they predict. If you ask a complex logic or math question, forcing it to generate the final answer immediately often results in errors. By simply adding the phrase <strong>"Think step-by-step"</strong> to the end of your prompt, you force the model to generate its intermediate reasoning. This extra generation uses more computing power and drastically reduces logical failures.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-2">
              Why does personalization matter?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Most frontier models now offer "Custom Instructions" or "Gems." These features allow you to write your own permanent system prompts. You can tell the AI exactly who you are, what your preferences are, and how you want it to format its responses every single time, saving you from having to rewrite the same context in every new chat session.
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
          <p className="text-base font-semibold text-gray-900 mb-4">Questions to Consider</p>
          <div className="space-y-3">
            {[
              "If you were to set up 'Custom Instructions' for your main AI account today, what personal context would you provide to make its answers more relevant to you?",
              "Think of a recent task where an AI gave you a frustrating or generic answer. How could you have used a Persona or Format Constraint to improve the output?",
              "How might assigning an AI a specific persona (e.g., 'Act as a conservative think-tank analyst' vs. 'Act as a progressive policy writer') change the underlying biases in its output?",
            ].map((question, idx) => (
              <div
                key={idx}
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
              <span className="font-bold">✓</span>
              <span><strong>Assign a Role:</strong> Always start complex tasks by telling the AI who it is acting as (e.g., "Act as an expert data analyst").</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Define the Output:</strong> Never leave the length or format up to the AI. Specify "Write exactly 3 paragraphs" or "Output as a markdown table."</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Provide Examples:</strong> If you want a specific tone or structure, paste an example of your own writing into the prompt and say "Match this style."</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">✓</span>
              <span><strong>Iterate, Don't Restart:</strong> Treat prompting as a conversation. If the first output isn't quite right, reply with specific critiques like, "That's too formal. Make it punchier and cut the word count in half."</span>
            </li>
          </ul>
        </div>

        {/* Learn More / Sources */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More / Sources</p>
          <div className="space-y-2">
            {[
              {
                label: "OpenAI: Prompt Engineering Strategy Guide",
                href: "https://platform.openai.com/docs/guides/prompt-engineering",
                ariaLabel: "Read OpenAI's prompting guide",
              },
              {
                label: "Anthropic: Claude Prompt Engineering Interactive Tutorial",
                href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
                ariaLabel: "Explore Anthropic's prompt tutorial",
              },
              {
                label: "Google Cloud: Designing Prompts",
                href: "https://cloud.google.com/vertex-ai/docs/generative-ai/text/prompt-design",
                ariaLabel: "Read Google's prompt design documentation",
              },
              {
                label: "DAIR.AI: The Prompt Engineering Guide",
                href: "https://www.promptingguide.ai/",
                ariaLabel: "Read the open source prompt engineering guide",
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