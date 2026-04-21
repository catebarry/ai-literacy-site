"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const HALLUCINATION_TYPES = [
  { id: "factual", label: "Factual Inaccuracy", color: "#ef4444" },
  { id: "citation", label: "Citation Fabrication", color: "#f97316" },
  { id: "selfcontradiction", label: "Self-Contradiction", color: "#8b5cf6" },
  { id: "prompt", label: "Prompt-Contradiction", color: "#6366f1" },
  { id: "procedural", label: "Procedural/Logical Error", color: "#10b981" },
  { id: "temporal", label: "Temporal Hallucination", color: "#3b82f6" },
];

const SCENARIOS = [
  {
    id: 1,
    prompt: "Tell me about the history of the printing press.",
    context: "A student asked ChatGPT for help with a history assignment.",
    targetType: "factual",
    sentences: [
      { text: "Johannes Gutenberg invented the movable-type printing press around 1440 in Mainz, Germany.", hallucinated: false },
      { text: "His invention built on earlier woodblock printing techniques that had been used in East Asia for centuries.", hallucinated: false },
      { text: "Gutenberg\u2019s first major printed work was the Gutenberg Bible, completed around 1455.", hallucinated: false },
      { text: "The printing press was immediately banned by the Catholic Church, which feared the spread of literacy among common people.", hallucinated: true, type: "factual", explanation: "This is a factual inaccuracy. The Catholic Church did not ban the printing press. In fact, the Church was one of the early adopters of printing technology. While the Church later established the Index of Forbidden Books (1559), the press itself was never banned." },
      { text: "By 1500, an estimated 20 million volumes had been printed across Europe.", hallucinated: false },
    ],
  },
  {
    id: 2,
    prompt: "Tell me about the health effects of caffeine.",
    context: "A student researching nutrition for a health class project.",
    targetType: "citation",
    sentences: [
      { text: "Caffeine is a natural stimulant most commonly found in coffee, tea, and cacao plants.", hallucinated: false },
      { text: "It works by blocking adenosine receptors in the brain, which helps promote alertness and reduce feelings of tiredness.", hallucinated: false },
      { text: "Moderate caffeine consumption (about 400mg per day) is generally considered safe for most adults.", hallucinated: false },
      { text: "A landmark 2019 study by Chen, Nakamura, and Zhao published in the Journal of Cognitive Nutrition found that caffeine improves memory consolidation by up to 37% in adolescents aged 14-17.", hallucinated: true, type: "citation", explanation: "This citation is entirely fabricated. The \u2018Journal of Cognitive Nutrition\u2019 does not exist, and this study cannot be found in any database. Notice how it uses common researcher names, a plausible journal title, and a precise-sounding statistic to appear credible. This is exactly how fabricated citations work: they combine real-looking elements to create something that feels trustworthy." },
      { text: "Excessive caffeine intake can cause anxiety, insomnia, digestive issues, and increased heart rate.", hallucinated: false },
    ],
  },
  {
    id: 3,
    prompt: "Explain how the human immune system responds to a viral infection.",
    context: "A student preparing for a biology exam asked AI to help them review.",
    targetType: "selfcontradiction",
    sentences: [
      { text: "When a virus enters the body, the innate immune system responds first, deploying white blood cells to attack the invader.", hallucinated: false },
      { text: "If the innate response is not sufficient, the adaptive immune system activates, producing antibodies specifically tailored to the virus.", hallucinated: false },
      { text: "These antibodies bind to the virus and mark it for destruction by other immune cells.", hallucinated: false },
      { text: "Because the adaptive immune system has no memory of previous infections, each time the same virus is encountered, the body must build its defenses entirely from scratch, which is why reinfection is always just as severe as the first time.", hallucinated: true, type: "selfcontradiction", explanation: "This contradicts itself and established biology. The defining feature of the adaptive immune system is immunological memory. It remembers previous infections and responds faster and more effectively upon reinfection. This is the entire basis of how vaccines work. The sentence internally contradicts the concept it is describing." },
      { text: "Fever, inflammation, and fatigue are common symptoms that result from the immune system\u2019s effort to fight off the infection.", hallucinated: false },
    ],
  },
  {
    id: 4,
    prompt: "Write a short summary about climate change for a research paper. Do NOT include anything about politics or policy.",
    context: "A student asked for a science-focused summary and specifically excluded political content.",
    targetType: "prompt",
    sentences: [
      { text: "Climate change refers to long-term shifts in global temperatures and weather patterns, primarily driven by human activities since the Industrial Revolution.", hallucinated: false },
      { text: "The burning of fossil fuels releases greenhouse gases, particularly carbon dioxide and methane, which trap heat in the atmosphere.", hallucinated: false },
      { text: "Global average temperatures have risen approximately 1.1 degrees Celsius above pre-industrial levels.", hallucinated: false },
      { text: "The Paris Agreement of 2015 committed 196 nations to limiting warming to 1.5 degrees Celsius, though many critics argue the targets are insufficient and politically motivated.", hallucinated: true, type: "prompt", explanation: "The student explicitly asked NOT to include anything about politics or policy. This sentence introduces the Paris Agreement (a political agreement), discusses national commitments (policy), and includes political commentary about critics. The AI included exactly what was asked to be excluded." },
      { text: "Consequences include rising sea levels, more frequent extreme weather events, and disruption to ecosystems and biodiversity.", hallucinated: false },
    ],
  },
  {
    id: 5,
    prompt: "Explain how photosynthesis works for my biology class.",
    context: "A teacher asked an AI to help draft a lesson plan explanation.",
    targetType: "procedural",
    sentences: [
      { text: "Photosynthesis is the process by which green plants convert light energy into chemical energy.", hallucinated: false },
      { text: "This process primarily takes place in the chloroplasts, which contain the pigment chlorophyll.", hallucinated: false },
      { text: "During the light-dependent reactions, water molecules are split to release oxygen, and energy is captured in ATP and NADPH.", hallucinated: false },
      { text: "The Calvin cycle then uses these energy carriers to convert carbon dioxide into glucose, a process that requires direct sunlight to function.", hallucinated: true, type: "procedural", explanation: "This is a procedural error. The Calvin cycle (also called the light-independent reactions) does NOT require direct sunlight to function. While it depends on ATP and NADPH produced during the light-dependent reactions, the Calvin cycle itself is light-independent. Confusing these two stages is exactly the kind of step-confusion that defines procedural hallucinations." },
      { text: "The overall equation is 6CO2 + 6H2O + light energy = C6H12O6 + 6O2.", hallucinated: false },
    ],
  },
  {
    id: 6,
    prompt: "Summarize the key findings of the 2023 IPCC report on water scarcity.",
    context: "A graduate student preparing a literature review.",
    targetType: "temporal",
    sentences: [
      { text: "The Intergovernmental Panel on Climate Change (IPCC) has consistently warned about increasing water scarcity driven by climate change.", hallucinated: false },
      { text: "Rising temperatures accelerate glacial melt, disrupt precipitation patterns, and increase evaporation rates from freshwater sources.", hallucinated: false },
      { text: "According to the 2023 IPCC Sixth Assessment Synthesis Report, approximately 3.6 billion people currently live in areas highly vulnerable to water scarcity.", hallucinated: false },
      { text: "These findings were first published in the landmark 1987 Brundtland Report, which originally coined the term \u2018water scarcity\u2019 and predicted the exact trends now being observed.", hallucinated: true, type: "temporal", explanation: "This is a temporal hallucination. While the 1987 Brundtland Report (\u2018Our Common Future\u2019) is a real document, it did not coin the term \u2018water scarcity\u2019 or predict the specific trends described in the 2023 IPCC report. The AI incorrectly attributes modern findings to a decades-old document, confusing the timeline of when these ideas were introduced." },
      { text: "The report warns that by 2050, water scarcity could displace up to 700 million people globally.", hallucinated: false },
    ],
  },
];

function HallucinationGame() {
  const [phase, setPhase] = useState("intro");
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedSentence, setSelectedSentence] = useState<number | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealAll, setRevealAll] = useState(false);

  const scenario = SCENARIOS[currentRound];
  const totalRounds = SCENARIOS.length;

  const startRound = () => {
    setSelectedSentence(null);
    setShowExplanation(false);
    setRevealAll(false);
    setPhase("reading");
  };

  const handleSentenceClick = (index: number) => {
    if (phase !== "reading") return;
    setSelectedSentence(index);
    setPhase("classifying");
  };

  const handleClassify = (typeId: string) => {
    if (selectedSentence === null) return;
    const sentence = scenario.sentences[selectedSentence];
    setAnswers((prev) => [...prev, {
      round: currentRound,
      correctlySpotted: sentence.hallucinated,
      correctlyClassified: sentence.hallucinated && sentence.type === typeId,
      actualType: sentence.hallucinated ? sentence.type : null,
      selectedType: typeId,
    }]);
    setShowExplanation(true);
    setPhase("feedback");
  };

  const handleMarkClean = () => {
    if (selectedSentence === null) return;
    const sentence = scenario.sentences[selectedSentence];
    setAnswers((prev) => [...prev, {
      round: currentRound,
      correctlySpotted: !sentence.hallucinated,
      correctlyClassified: !sentence.hallucinated,
      actualType: sentence.hallucinated ? sentence.type : null,
      selectedType: "clean",
    }]);
    setShowExplanation(true);
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

  const handleTryAnother = () => {
    setSelectedSentence(null);
    setShowExplanation(false);
    setRevealAll(false);
    setPhase("reading");
  };

  const getTypeLabel = (typeId: string) => {
    const t = HALLUCINATION_TYPES.find((h) => h.id === typeId);
    return t ? t.label : "None";
  };

  const getTypeColor = (typeId: string) => {
    const t = HALLUCINATION_TYPES.find((h) => h.id === typeId);
    return t ? t.color : "#9ca3af";
  };

  const correctSpots = answers.filter((a) => a.correctlySpotted).length;
  const correctClassifications = answers.filter((a) => a.correctlyClassified).length;
  const lastAnswer = answers.length > 0 ? answers[answers.length - 1] : null;

  if (phase === "intro") {
    return (
      <div className="bg-gray-900 rounded-lg p-6 text-gray-200">
        <p className="text-lg font-semibold text-white mb-3">How it works</p>
        <div className="space-y-3 mb-5">
          <p className="text-sm text-gray-400"><span className="font-semibold text-gray-200">1. Read the AI response.</span> Each round shows an AI-generated passage. One sentence in each passage is hallucinated.</p>
          <p className="text-sm text-gray-400"><span className="font-semibold text-gray-200">2. Click a suspicious sentence.</span> Or mark it as accurate if you think it is correct.</p>
          <p className="text-sm text-gray-400"><span className="font-semibold text-gray-200">3. Classify the hallucination type.</span> Choose from the taxonomy above: factual inaccuracy, citation fabrication, self-contradiction, and more.</p>
          <p className="text-sm text-gray-400"><span className="font-semibold text-gray-200">4. Learn from the explanation.</span> After each guess, see why the sentence is or is not a hallucination.</p>
        </div>
        <button onClick={startRound} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
          Start Game
        </button>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="bg-gray-900 rounded-lg p-6 text-gray-200">
        <p className="text-lg font-semibold text-white mb-1">Results</p>
        <p className="text-sm text-gray-400 mb-5">You made {answers.length} guesses across {totalRounds} passages.</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gray-950 rounded-lg p-4 text-center border border-gray-800">
            <p className="text-3xl font-bold text-green-500">{correctSpots}</p>
            <p className="text-xs text-gray-500">Correctly spotted</p>
          </div>
          <div className="bg-gray-950 rounded-lg p-4 text-center border border-gray-800">
            <p className="text-3xl font-bold text-blue-500">{correctClassifications}</p>
            <p className="text-xs text-gray-500">Correctly classified</p>
          </div>
        </div>
        <div className="bg-gray-950 rounded-lg p-4 border-l-4 border-orange-500 mb-5">
          <p className="text-sm font-semibold text-white mb-1">Key takeaway</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            AI hallucinations are hard to catch because they are woven into otherwise accurate text and delivered with confidence. The best defense is building the habit of verification: check citations, question precise statistics, and look for logical consistency.
          </p>
        </div>
        <button onClick={() => { setPhase("intro"); setCurrentRound(0); setAnswers([]); }} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500 font-medium">Round target: <span className="font-semibold" style={{ color: getTypeColor(scenario.targetType) }}>{getTypeLabel(scenario.targetType)}</span></span>
        <span className="text-xs text-gray-400 bg-gray-800 px-3 py-1 rounded-md font-mono">{currentRound + 1} / {totalRounds}</span>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">Prompt</p>
        <p className="text-sm text-gray-300 italic mb-1">&quot;{scenario.prompt}&quot;</p>
        <p className="text-xs text-gray-500">{scenario.context}</p>
      </div>
      {phase === "reading" && (
        <div className="bg-yellow-950 border border-yellow-800 rounded-lg px-4 py-2 text-center">
          <p className="text-sm text-yellow-200">Click on a sentence you think is hallucinated</p>
        </div>
      )}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 font-medium">AI Response</p>
        <div className="space-y-2">
          {scenario.sentences.map((s, i) => {
            const isSelected = selectedSentence === i;
            const isRevealed = revealAll && s.hallucinated;
            const showResult = phase === "feedback" && isSelected;
            let classes = "p-3 rounded-lg border text-sm leading-relaxed transition-all ";
            if (isRevealed) {
              classes += "border-orange-500 bg-orange-950/30 ";
            } else if (showResult && s.hallucinated) {
              classes += "border-green-500 bg-green-950/30 ";
            } else if (showResult && !s.hallucinated) {
              classes += "border-red-500 bg-red-950/30 ";
            } else if (isSelected) {
              classes += "border-yellow-500 bg-yellow-950/20 ";
            } else {
              classes += "border-gray-800 bg-gray-950 ";
              if (phase === "reading") classes += "cursor-pointer hover:border-yellow-500 hover:bg-gray-900 ";
            }
            return (
              <div key={i} onClick={() => handleSentenceClick(i)} className={classes}>
                <span className="text-gray-300">{s.text}</span>
                {isRevealed && s.type && (
                  <span className="inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded" style={{ color: getTypeColor(s.type), backgroundColor: getTypeColor(s.type) + "20" }}>
                    {getTypeLabel(s.type)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {phase === "classifying" && (
        <div className="bg-gray-900 rounded-lg p-4 border border-yellow-500">
          <p className="text-sm font-semibold text-white mb-1">What type of hallucination is this?</p>
          <p className="text-xs text-gray-500 mb-3">Or mark it as accurate if you think it is correct.</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {HALLUCINATION_TYPES.map((type) => (
              <button key={type.id} onClick={() => handleClassify(type.id)} className="p-2.5 bg-gray-950 border border-gray-800 rounded-lg text-sm text-gray-300 text-left hover:border-gray-600 transition-colors" style={{ borderLeftWidth: 3, borderLeftColor: type.color }}>
                {type.label}
              </button>
            ))}
          </div>
          <button onClick={handleMarkClean} className="w-full p-2.5 bg-gray-950 border border-gray-800 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:border-gray-600 transition-colors">
            This sentence is accurate (not hallucinated)
          </button>
        </div>
      )}
      {phase === "feedback" && showExplanation && selectedSentence !== null && lastAnswer && (
        <div className={"bg-gray-900 rounded-lg p-4 border " + (scenario.sentences[selectedSentence].hallucinated ? "border-green-700" : "border-red-700")}>
          <p className="text-sm font-semibold text-white mb-1">
            {lastAnswer.correctlyClassified ? "Correct! You nailed it." : lastAnswer.correctlySpotted && lastAnswer.selectedType !== "clean" ? "Good catch! But wrong type." : !lastAnswer.correctlySpotted && lastAnswer.selectedType === "clean" ? "That one was actually hallucinated." : "That sentence was actually accurate."}
          </p>
          {lastAnswer.correctlySpotted && !lastAnswer.correctlyClassified && lastAnswer.actualType && (
            <p className="text-xs text-gray-400 mb-2">
              The correct type: <span className="font-semibold" style={{ color: getTypeColor(lastAnswer.actualType) }}>{getTypeLabel(lastAnswer.actualType)}</span>
            </p>
          )}
          {scenario.sentences[selectedSentence].hallucinated && (
            <div className="bg-gray-950 rounded-lg p-3 my-3 border-l-4" style={{ borderLeftColor: getTypeColor(scenario.sentences[selectedSentence].type!) }}>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 font-medium">Explanation</p>
              <p className="text-sm text-gray-400 leading-relaxed">{scenario.sentences[selectedSentence].explanation}</p>
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <button onClick={handleTryAnother} className="flex-1 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
              Try another sentence
            </button>
            {!revealAll && (
              <button onClick={() => setRevealAll(true)} className="flex-1 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                Reveal all
              </button>
            )}
            <button onClick={handleNext} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm text-white font-semibold transition-colors">
              {currentRound < totalRounds - 1 ? "Next passage" : "See results"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HallucinationsModule() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link href="/" className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors">
          <ArrowLeft size={20} /> Back to Modules
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Hallucinations: When AI Is Confident But Wrong
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          AI hallucination is the term we use to broadly classify inaccurate or fabricated
          information output by an AI system. Large Language Models (LLMs) work by predicting the statistically most
          likely next word based on patterns in training data. When a model encounters a gap
          in its data, it often fills the gap with something that sounds plausible rather than
          admitting uncertainty.
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
            Each round shows a real AI-generated passage on an educational topic. One sentence
            in each passage is hallucinated. Click the sentence you think is wrong, then
            classify what type of hallucination it is. The different types of hallucinations are listed
            below.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            After each guess, you will see an explanation of why the sentence is or is not a
            hallucination. Try to complete all six rounds.
          </p>
        </div>

        {/* Hallucination type legend */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-3">Hallucination Types</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {HALLUCINATION_TYPES.map((type) => (
              <div
                key={type.id}
                className="flex items-center gap-2 text-sm text-gray-700 px-3 py-2 rounded-md border border-gray-100 bg-gray-50"
                style={{ borderLeftWidth: 3, borderLeftColor: type.color }}
              >
                {type.label}
              </div>
            ))}
          </div>
        </div>

        {/* Game */}
        <div className="rounded-lg mb-4 overflow-hidden">
          <HallucinationGame />
        </div>

        {/* Step 2 */}
        <div className="flex items-center gap-3 mb-5 mt-8">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            2
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Understand</h2>
        </div>

        {/* Purple Understand section */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-4 space-y-4">
          {/* <div>
            <p className="text-base font-semibold text-purple-900 mb-2">What are AI hallucinations?</p>
            <p className="text-base text-purple-800 leading-relaxed">
              As stated above, AI hallucination is the term we use to broadly classify inaccurate or fabricated
              information output by an AI system. That said, the very use of the word
              "hallucinate" to describe AI failures is misleading and anthropomorphizes a
              phenomenon with no human analog. LLMs work by predicting the statistically most
              likely next word based on patterns in training data.
            </p>
          </div> */}

          {/* <div className="border-t border-purple-200 pt-4"> */}
            <p className="text-base font-semibold text-purple-900 mb-2">Why hallucinations matter</p>
            <p className="text-base text-purple-800 leading-relaxed mb-3">
              In educational contexts, overtrusting AI output can lead to unintended research
              malpractices, such as the falsification of sources and citations, and the
              inclusion of factual inaccuracies.
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              Perhaps the most dangerous reality of hallucinations is that the more wrong an
              AI chatbot is, the more confident it will sound. Hallucination statistics vary
              wildly due to the rapid deployment of new models, but a 2025 MIT report found
              that phrases like "definitely," "certainly," and "without doubt" were 34% more
              likely to accompany incorrect information.
            </p>
          {/* </div> */}

          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-4">Types of hallucinations to look out for</p>
            <div className="space-y-4">
              <div>
                <p className="text-base font-medium text-purple-900 mb-1">Factual inaccuracies</p>
                <p className="text-base text-purple-800 leading-relaxed">A factual inaccuracy is when AI presents something as fact, despite it being wrong. Factual inaccuracies are difficult to spot without domain expertise in the subject at hand. A subcategory of factual inaccuracy is temporal hallucination, which describes when an AI misrepresents a timeline of events or attributes information to a source that could not have discussed the topic at the time of its publication (e.g., citing a 2009 book as a source on COVID-19).</p>
              </div>
              <div>
                <p className="text-base font-medium text-purple-900 mb-1">Citation/source fabrication</p>
                <p className="text-base text-purple-800 leading-relaxed mb-2">Citation/source fabrication is when AI invents nonexistent academic references. Despite improvements with each model, a study found that out of 732 citations provided by ChatGPT, 51% were entirely fabricated.</p>
                <p className="text-base text-purple-800 leading-relaxed">One challenge to identification is that fabricated citations often combine real elements, such as an actual journal or author&apos;s name, with invented titles or dates.</p>
              </div>
              <div>
                <p className="text-base font-medium text-purple-900 mb-1">Self-contradiction</p>
                <p className="text-base text-purple-800 leading-relaxed">Often, a sentence generated by AI sounds right on the first read through, but under close inspection, internal inconsistencies can be observed. An example of self-contradiction could look like the following: &quot;The moon generates its own light by absorbing sunlight from the sun&apos;s core.&quot; How can the moon generate its own light if the light is coming from the sun?</p>
              </div>
              <div>
                <p className="text-base font-medium text-purple-900 mb-1">Prompt-contradiction</p>
                <p className="text-base text-purple-800 leading-relaxed">Prompt-contradiction is when the output directly contradicts the user&apos;s input. A common instance of prompt contradictions is when a user specifically asks AI not to include anything about a certain topic or subject, and it does so anyway. This leads to material being included despite the user&apos;s explicit request, as well as the included material being overrepresented.</p>
              </div>
              <div>
                <p className="text-base font-medium text-purple-900 mb-1">Visual distortion (images)</p>
                <p className="text-base text-purple-800 leading-relaxed">Visual distortion is common in AI image or video generation, where human subjects are seen with extra or missing fingers and distorted background environments. These visual cues are becoming more and more unrecognizable as models improve, which brings an entirely different issue: how can you distinguish real content from AI-generated content?</p>
              </div>
              <div>
                <p className="text-base font-medium text-purple-900 mb-1">Procedural/logical errors</p>
                <p className="text-base text-purple-800 leading-relaxed mb-2">These are most common in STEM-related responses, when AI confuses steps in a process or reaches conclusions without a clear logical progression. In programming, this can look like the use of a function that doesn&apos;t exist in a library.</p>
                <p className="text-base text-purple-800 leading-relaxed">When it comes to hallucinations in writing, non sequiturs also fall under this category, where an AI makes logical jumps that do not follow from preceding reasoning.</p>
              </div>
            </div>
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
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700">Which hallucination type was hardest for you to identify? What made it difficult?</div>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700">If you were writing an essay and an AI gave you a citation that looked real, what steps would you take before including it?</div>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700">Why do you think AI hallucinations tend to sound more confident than accurate responses?</div>
            <div className="border border-gray-200 rounded-md p-4 bg-gray-50 text-base text-gray-700">Think of a time you used AI for schoolwork. Looking back, is there anything it told you that you accepted without verifying? How would you check it now?</div>
          </div>
        </div>

        {/* What You Can Do */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-green-900 mb-4">What You Can Do</p>
          <ul className="space-y-3 text-base text-green-800">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Avoid ambiguous language and provide ample context in your prompts. Instructing the AI to ask clarifying questions if uncertain can reduce hallucination rates by roughly 22 percentage points.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Use AI models with Retrieval-Augmented Generation (RAG) for fact-based queries. RAG pulls from external sources rather than relying purely on pattern matching, and can reduce hallucinations by up to 71%.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Play to AI&apos;s strengths: use it for brainstorming, outlining, editing, and summarizing. Avoid relying on it to retrieve specific factual claims or generate accurate citations.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Never trust a citation without checking it. Paste the title into Google Scholar — if it does not appear, the source was likely fabricated or cited incorrectly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>If you use one AI model to double-check another, remember that different models often share similar training data and blind spots. Cross-checking with library databases and verifiable sources is more reliable.</span>
            </li>
          </ul>
        </div>

        {/* Sources / Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More / Sources</p>
          <div className="space-y-2">
            <a href="https://suprmind.ai/hub/insights/ai-hallucination-statistics-research-report-2026/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              AI Hallucination Statistics Research Report 2026 (Suprmind)
            </a>
            <a href="https://wacclearinghouse.org/repository/collections/continuing-experiments/august-2025/ai-literacy/understanding-avoiding-hallucinated-references/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              Understanding and Avoiding Hallucinated References (WAC Clearinghouse)
            </a>
            <a href="https://cdt.org/insights/students-use-of-generative-ai-the-threat-of-hallucinations/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              Students&apos; Use of Generative AI: The Threat of Hallucinations (CDT)
            </a>
            <a href="https://researchguides.library.tufts.edu/c.php?g=1398045&p=10352472" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              AI Tools and Hallucinations (Tufts University Library)
            </a>
            <a href="https://sqmagazine.co.uk/llm-hallucination-statistics/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              LLM Hallucination Statistics 2026 (SQ Magazine)
            </a>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12826005/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              The Hallucination Problem in Generative AI (PMC / NIH)
            </a>
            <a href="https://www.allaboutai.com/resources/ai-statistics/ai-hallucinations/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              AI Hallucination Report 2026 (AllAboutAI)
            </a>
            <a href="https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              We Compared Eight AI Search Engines (Columbia Journalism Review)
            </a>
            <a href="https://www.ibm.com/think/topics/ai-hallucinations" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-base text-blue-600 hover:underline">
              What Are AI Hallucinations? (IBM)
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
