"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// --- PROMPT OPTIMIZER GAME DATA ---

const SCENARIOS = [
  {
    id: 1,
    context: "A student needs to email a professor to ask for an extension on a lab report due to a severe migraine.",
    goal: "Write a polite, professional email asking for a 48-hour extension without oversharing medical details.",
    weakPrompt: "Write an email to my professor asking for an extension because I'm sick.",
    options: [
      {
        text: "Write a really polite email to my professor asking for an extension on my lab report because I am sick with a migraine. Make it sound professional.",
        type: "improvement",
        isBest: false,
        explanation: "Better, but it leaves the length and structure up to the AI, which often results in overly wordy, dramatic emails that sound like a robot wrote them.",
        simulatedOutput: "Dear Professor, I hope this email finds you in good health and high spirits. I am writing to you today with a heavy heart to formally request..."
      },
      {
        text: "Act as a college student. Write a concise, 3-sentence email to my professor asking for a 48-hour extension on the upcoming lab report due to a sudden migraine. Keep the tone professional but do not overshare medical specifics.",
        type: "optimal",
        isBest: true,
        explanation: "Perfect. This uses a persona ('Act as a college student'), sets clear constraints ('3-sentence email', '48-hour extension'), and guides the tone ('professional, do not overshare').",
        simulatedOutput: "Dear Professor, I am writing to respectfully request a 48-hour extension on our upcoming lab report due to a sudden and severe migraine. I have completed the data analysis portion, but the screen time required to finish the write-up is currently impeding my recovery. Thank you for your time and understanding."
      },
      {
        text: "Write an email asking for a 48-hour extension. Include the medical definition of a migraine to prove I am actually sick.",
        type: "prompt-fail",
        isBest: false,
        explanation: "This contradicts the goal of not oversharing. LLMs will happily follow bad instructions if you give them, resulting in an awkward, inappropriate email.",
        simulatedOutput: "Dear Professor, I need an extension. According to the Mayo Clinic, a migraine is a headache that can cause severe throbbing pain..."
      }
    ]
  },
  {
    id: 2,
    context: "A student is writing a 25-35 page research paper titled 'Defining Social Engineering in the Age of Artificial Intelligence'.",
    goal: "Generate a highly structured, academically rigorous outline for the paper's introduction.",
    weakPrompt: "Give me an outline for an introduction about AI and social engineering.",
    options: [
      {
        text: "Act as a cybersecurity professor. Create a detailed outline for the introduction of a 30-page academic research paper titled 'Defining Social Engineering in the Age of Artificial Intelligence'. Include specific bullet points for the hook, thesis statement, and the transition into modern AI threat vectors.",
        type: "optimal",
        isBest: true,
        explanation: "Excellent. By defining the length of the actual paper (30 pages), the AI scales the introduction appropriately. The persona ensures an academic tone, and specific structural requests guide the exact output.",
        simulatedOutput: "I. Introduction\n  A. Hook: The evolution of deception—from analog cons to algorithmic manipulation.\n  B. Context: The integration of LLMs in phishing and spear-phishing.\n  C. Thesis: While the psychological mechanisms of social engineering remain constant, AI fundamentally alters the scale, speed, and personalization of attack vectors..."
      },
      {
        text: "Write a 30-page research paper about AI and social engineering, starting with the introduction.",
        type: "prompt-fail",
        isBest: false,
        explanation: "Asking an LLM to write a massive academic paper in one shot will result in a shallow, repetitive, and likely hallucinated mess. LLMs excel at iterative generation (step-by-step), not massive single outputs.",
        simulatedOutput: "[Generates 800 words of generic, repetitive text that barely scratches the surface before stopping abruptly due to token limits.]"
      },
      {
        text: "What are the main points I should include in an introduction about social engineering?",
        type: "improvement",
        isBest: false,
        explanation: "This is a basic search query, not a generative prompt. The AI will give you generic advice on how to write an introduction rather than actually drafting the specific outline you need.",
        simulatedOutput: "When writing an introduction about social engineering, you should make sure to include: 1. A definition of the term. 2. A brief history. 3. Your main argument..."
      }
    ]
  },
  {
    id: 3,
    context: "A developer wants to extract only the names and dates from a messy block of raw text containing meeting notes.",
    goal: "Extract the data and format it cleanly so it can be copied directly into a spreadsheet.",
    weakPrompt: "Pull out the names and dates from this text: [messy text]",
    options: [
      {
        text: "Find the names and dates in this text and put them in a list: [messy text]",
        type: "improvement",
        isBest: false,
        explanation: "The AI will make a list, but it might use bullet points, conversational filler ('Here are the names I found:'), or inconsistent formatting, requiring you to manually clean it up anyway.",
        simulatedOutput: "Sure! Here is the list you asked for:\n- John Smith (October 12th)\n- Sarah Jones - Nov 4\nHope this helps!"
      },
      {
        text: "I have a lot of text and I only want the names and dates. Don't include anything else, just the names and dates.",
        type: "prompt-fail",
        isBest: false,
        explanation: "This is too conversational and lacks strict output formatting constraints. The AI might still include conversational filler because it defaults to a 'helpful assistant' persona.",
        simulatedOutput: "I can help with that. The names and dates mentioned in your text are: John Smith (10/12), Sarah Jones (11/04)..."
      },
      {
        text: "Extract all names and dates from the following text. Output the results strictly as a CSV (Comma Separated Values) format with the headers 'Name' and 'Date'. Do not include any conversational filler or markdown formatting. Text: [messy text]",
        type: "optimal",
        isBest: true,
        explanation: "Flawless. This uses 'Zero-Shot Data Extraction' techniques. It specifies the exact technical format (CSV), defines the headers, and explicitly commands the AI to drop its conversational filler.",
        simulatedOutput: "Name,Date\nJohn Smith,2023-10-12\nSarah Jones,2023-11-04"
      }
    ]
  }
];

function PromptOptimizerGame() {
  const [phase, setPhase] = useState("intro");
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenario = SCENARIOS[currentRound];
  const totalRounds = SCENARIOS.length;

  const startRound = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setPhase("evaluating");
  };

  const handleOptionClick = (index: number) => {
    if (phase !== "evaluating") return;
    setSelectedOption(index);
    setShowFeedback(true);
    setPhase("feedback");
  };

  const handleNext = () => {
    if (currentRound < totalRounds - 1) {
      setCurrentRound((prev) => prev + 1);
      startRound();
    } else {
      setPhase("results");
    }
  };

  if (phase === "intro") {
    return (
      <div className="bg-gray-900 rounded-lg p-6 text-gray-200 shadow-sm border border-gray-800">
        <p className="text-lg font-semibold text-white mb-3">Prompt Optimizer Game</p>
        <p className="text-sm text-gray-400 mb-5 leading-relaxed">
          The difference between a frustrating AI experience and a highly productive one usually comes down to prompt engineering. In this interactive exercise, you will be presented with a weak prompt and a specific goal. Your task is to select the most optimized prompt upgrade.
        </p>
        <button onClick={startRound} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          Start Training
        </button>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="bg-gray-900 rounded-lg p-6 text-gray-200 border border-gray-800">
        <p className="text-lg font-semibold text-white mb-2">Training Complete</p>
        <div className="bg-gray-950 rounded-lg p-5 border-l-4 border-blue-500 mb-5">
          <p className="text-sm font-semibold text-white mb-2">The Prompting Formula</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-2">
            Great prompts rarely happen by accident. They usually contain three elements:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
            <li><span className="text-gray-200 font-medium">Context/Persona:</span> "Act as an expert..."</li>
            <li><span className="text-gray-200 font-medium">Task/Constraint:</span> "...write a 3-sentence summary..."</li>
            <li><span className="text-gray-200 font-medium">Format:</span> "...output as a markdown table."</li>
          </ul>
        </div>
        <button onClick={() => { setPhase("intro"); setCurrentRound(0); }} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Optimization Scenario</span>
        <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-md font-mono">{currentRound + 1} / {totalRounds}</span>
      </div>

      {/* Scenario Context */}
      <div className="bg-gray-900 rounded-lg p-5 border border-gray-800">
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">Context</p>
          <p className="text-sm text-gray-300">{scenario.context}</p>
        </div>
        <div className="mb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-semibold">The Goal</p>
          <p className="text-sm text-blue-400 font-medium">{scenario.goal}</p>
        </div>
        <div className="bg-red-950/20 border border-red-900/50 rounded p-3">
          <p className="text-xs text-red-400 uppercase tracking-wide mb-1 font-semibold">Weak Base Prompt</p>
          <p className="text-sm text-gray-400 italic">"{scenario.weakPrompt}"</p>
        </div>
      </div>

      {/* Options */}
      {phase === "evaluating" && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-200 px-1">Select the best optimized prompt:</p>
          {scenario.options.map((option, index) => (
            <button 
              key={index} 
              onClick={() => handleOptionClick(index)} 
              className="w-full text-left p-4 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:border-blue-500 transition-all"
            >
              "{option.text}"
            </button>
          ))}
        </div>
      )}

      {/* Feedback */}
      {phase === "feedback" && selectedOption !== null && (
        <div className={`rounded-lg p-5 border ${scenario.options[selectedOption].isBest ? 'bg-green-950/20 border-green-700' : 'bg-red-950/20 border-red-700'}`}>
          <p className={`text-base font-bold mb-2 ${scenario.options[selectedOption].isBest ? 'text-green-400' : 'text-red-400'}`}>
            {scenario.options[selectedOption].isBest ? "Optimal Choice!" : "Not Quite."}
          </p>
          
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            {scenario.options[selectedOption].explanation}
          </p>

          <div className="bg-gray-950 rounded p-4 border border-gray-800 mt-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 font-semibold">Simulated AI Output</p>
            <p className="text-sm text-gray-400 italic leading-relaxed">
              {scenario.options[selectedOption].simulatedOutput}
            </p>
          </div>

          <div className="mt-5 flex justify-end">
             <button onClick={handleNext} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white font-semibold transition-colors">
              {currentRound < totalRounds - 1 ? "Next Scenario" : "Finish Training"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function MasteringLLMsModule() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link href="/" className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft size={20} /> Back to Modules
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Mastering LLMs: Prompts, Systems, and Personalization
        </h1>

        {/* Section 1: Introduction to Prompting */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
          <p className="text-base font-semibold text-gray-900 mb-2">The Invisible Layer: System vs. User Prompts</p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            When you type a question into ChatGPT, Claude, or Gemini, you are submitting a <strong>User Prompt</strong>. However, before your text ever reaches the AI, it is wrapped in an invisible set of instructions called a <strong>System Prompt</strong>. The system prompt dictates the model's core behavior, safety boundaries, and default tone.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            The secret to mastering LLMs is realizing that <em>you can override and shape this invisible layer</em>. You don't have to accept the default "helpful but verbose AI assistant" personality. By assigning the AI a persona in your prompt (e.g., "Act as a ruthless copy editor," or "Act as a senior software engineer conducting a code review"), you fundamentally change the probability weights of the words it generates next, resulting in highly specialized outputs.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4 rounded-r-md">
            <p className="text-sm font-semibold text-blue-900 mb-1">Feature Spotlight: Custom Instructions & Gems</p>
            <p className="text-sm text-blue-800 leading-relaxed">
              Most frontier models now offer "Custom Instructions" (OpenAI) or "Gems" (Google). These features allow you to write your own permanent system prompts. You can tell the AI exactly who you are, what your preferences are, and how you want it to format its responses every single time, saving you from having to rewrite the same context in every new chat.
            </p>
          </div>
        </div>

        {/* Section 2: Interactive Game */}
        <div className="mb-4">
          <PromptOptimizerGame />
        </div>

        {/* Section 3: Advanced Techniques */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
          <p className="text-base font-semibold text-gray-900 mb-4">Advanced Prompting Techniques</p>
          <div className="space-y-5">
            <div>
              <p className="text-base font-medium text-gray-900 mb-1">1. Few-Shot Prompting</p>
              <p className="text-base text-gray-600 leading-relaxed">
                Instead of just telling the AI what to do (Zero-Shot), you <em>show</em> it. By providing 2 or 3 examples of the exact input-to-output translation you want inside the prompt, the AI mimics your pattern perfectly. This is the most effective way to guarantee a specific tone or complex data formatting.
              </p>
            </div>
            <div>
              <p className="text-base font-medium text-gray-900 mb-1">2. Chain-of-Thought (CoT) Prompting</p>
              <p className="text-base text-gray-600 leading-relaxed">
                LLMs don't "think," they predict. If you ask a complex logic or math question, forcing it to generate the answer immediately often results in errors. By simply adding the phrase <strong>"Think step-by-step"</strong> to the end of your prompt, you force the model to generate its intermediate reasoning. This extra generation uses more computing power and drastically reduces logic failures.
              </p>
            </div>
            <div>
              <p className="text-base font-medium text-gray-900 mb-1">3. Iterative Refinement</p>
              <p className="text-base text-gray-600 leading-relaxed">
                Treat prompting as a conversation, not a search query. If the first output isn't quite right, don't start over. Reply with specific critiques: <em>"That's too formal. Make it punchier, cut the word count in half, and remove the bullet points."</em>
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Reflection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm">
          <p className="text-base font-semibold text-gray-900 mb-4">Reflect on Your Workflow</p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700">
              If you were to set up "Custom Instructions" for your main AI account today, what personal context would you provide to make its answers more relevant to you?
            </div>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700">
              Think of a recent task where an AI gave you a frustrating or generic answer. How could you have used a Persona or Constraints to improve the output?
            </div>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700">
              Why do you think "Few-Shot" prompting (providing examples) is often more effective than simply writing a longer, more detailed description of what you want?
            </div>
          </div>
        </div>

        {/* Section 5: Sources / Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10 shadow-sm">
          <p className="text-base font-semibold text-gray-900 mb-4">Official Documentation & Guides</p>
          <div className="space-y-3">
            <a href="https://platform.openai.com/docs/guides/prompt-engineering" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              OpenAI: Prompt Engineering Strategy Guide
            </a>
            <a href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              Anthropic: Claude Prompt Engineering Interactive Tutorial
            </a>
            <a href="https://cloud.google.com/vertex-ai/docs/generative-ai/text/prompt-design" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              Google Cloud: Designing Prompts for Vertex AI
            </a>
            <a href="https://www.promptingguide.ai/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              DAIR.AI: The Prompt Engineering Guide (Open Source)
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 pt-6 flex items-center justify-between">
          <Link href="/" className="px-5 py-2.5 text-base font-medium border border-gray-400 text-gray-800 rounded-md bg-white hover:bg-gray-100 transition-colors">
            Back to Modules
          </Link>
        </div>

      </div>
    </main>
  );
}