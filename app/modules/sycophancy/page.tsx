"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Lightbulb, MessageSquare } from "lucide-react";

export default function SycophancyModule() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Modules
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Sycophancy: When AI Always Agrees With You
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          Many AI systems are trained to be agreeable, which can sometimes lead them to validate user opinions excessively, even when those
          opinions might be incorrect or harmful. This &quot;sycophantic&quot; behavior can reinforce
          biases and prevent critical thinking. Understanding this tendency is essential in using AI more
          thoughtfully.
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
            Chat below with DisagreeBot, an AI that pushes back on whatever you say.
            Try making a claim (correct or incorrect) and observe how it responds.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Pay attention to how it challenges your ideas. Does it feel helpful,
            frustrating, or more informative than an AI that simply agrees?
          </p>
          <p className="text-base text-gray-600">
            Try statements like: &quot;I don&apos;t think I need to do homework&quot; or &quot;I read that climate change isn&apos;t real&quot;
          </p>
        </div>

        {/* Embedded DisagreeBot */}
        <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <span className="text-base font-medium text-gray-700">DisagreeBot — by Brinnae Bent</span>
            </div>
            <a
              href="https://www.disagreebot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Open in new tab ↗
            </a>
          </div>

          <div className="h-[720px] w-full">
            <iframe
              src="https://www.disagreebot.com"
              className="w-full h-full border-0"
              title="DisagreeBot"
            />
          </div>
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
          <p className="text-lg font-semibold text-purple-900">What is sycophancy?</p>
          <p className="text-base text-purple-800 leading-relaxed">
            Sycophancy is when an AI system excessively agrees with you or tries to flatter you.
            It might say your argument is strong when it isn&apos;t, avoid correcting mistakes, or
            praise you without giving useful feedback.
          </p>

          <div className="border-t border-purple-200 pt-4 space-y-3">
            <p className="text-lg font-semibold text-purple-900">Why does this happen?</p>
            <p className="text-base text-purple-800 leading-relaxed">
              Many AI systems are designed to be helpful and pleasant to interact with. During training,
              they are often rewarded for responses that people prefer, which can include agreeing with
              the user. Over time, this can lead the system to prioritize agreement over accuracy.
            </p>
          </div>

          <div className="border-t border-purple-200 pt-4 space-y-3">
            <p className="text-lg font-semibold text-purple-900">Why does this matter?</p>
            <p className="text-base text-purple-800 leading-relaxed">
              An AI that always agrees might feel helpful, but it can be misleading. It may reinforce
              incorrect ideas, give you false confidence, and make it harder to think critically about
              what you&apos;re being told.
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
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Questions to Consider
          </p>
          <div className="space-y-3">
            {[
              "Did the disagreeable AI ever feel more useful, even if less comfortable?",
              "How might always agreeing with users be misleading?",
              "Where have you seen AI agree too easily in real life?",
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
          <p className="text-lg font-semibold text-green-900 mb-4">
            What You Can Do
          </p>

          <ul className="space-y-3 text-base text-green-800">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Ask follow-up questions and demand evidence (e.g. “Are you sure?” “What evidence supports that?”).</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Rephrase prompts to invite critique (e.g. “What are the weaknesses of this idea?” “What are the counter arguments?”).</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>
                Set{" "}
                <a
                  href="https://tetrate.io/learn/ai/system-prompts-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-green-900"
                >
                  system prompts
                </a>{" "}
                to tell the AI to challenge your assumptions.
              </span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Use neutral phrasing and avoid leading questions. </span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Reset your chat session to clear the context. </span>
            </li>
          </ul>
        </div>

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-lg font-semibold text-gray-900 mb-4">Learn More / Sources</p>

          <div className="space-y-2">
            {[
              {
                label: "CNET — DisagreeBot and AI disagreement",
                href: "https://www.cnet.com/tech/services-and-software/this-ai-chatbot-is-built-to-disagree-with-you-and-its-better-than-chatgpt/",
              },
              {
                label: "Georgetown — AI sycophancy research",
                href: "https://www.law.georgetown.edu/tech-institute/research-insights/insights/ai-sycophancy-impacts-harms-questions/",
              },
              {
                label: "NYT — Seeking a Sounding Board? Beware the Eager-to-Please Chatbot",
                href: "https://www.nytimes.com/2026/03/26/well/mind/ai-chatbots-relationships.html",
              },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
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