"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

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

        {/* Interactive Activity Header */}
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={20} strokeWidth={1.6} className="text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Interactive Activity</h2>
        </div>

        {/* Instructions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">Instructions</p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Chat with DisagreeBot below — an AI that pushes back on whatever you say.
            Try making a claim (correct or incorrect) and observe how it responds.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Pay attention to how it challenges your ideas. Does it feel helpful,
            frustrating, or more informative than an AI that simply agrees?
          </p>
          <p className="text-base text-gray-400">
            Try statements like: &quot;I don&apos;t think I need to do homework&quot; or &quot;I read that climate change isn&apos;t real&quot;
          </p>
        </div>

        {/* Embedded DisagreeBot */}
        <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <span className="text-base font-medium text-gray-700">DisagreeBot</span>
            </div>
            <a
              href="https://www.disagreebot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-gray-400 hover:text-gray-600 transition-colors"
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

        {/* What is Sycophancy */}
        <div className="border-2 border-purple-500 rounded-lg p-6 mb-4 bg-white">
          <p className="text-base font-semibold text-purple-800 mb-2">What is Sycophancy?</p>
          <p className="text-base text-purple-700 leading-relaxed mb-4">
            Sycophancy is when an AI system excessively agrees with you or tries to flatter you.
            For example, it might say your argument is strong when it isn&apos;t, avoid correcting
            mistakes, or praise you without giving useful feedback.
          </p>
          <p className="text-base font-semibold text-purple-800 mb-2">Why Does This Happen?</p>
          <p className="text-base text-purple-700 leading-relaxed mb-4">
            Many AI systems are designed to be helpful and pleasant to interact with. During training,
            they are often rewarded for responses that people prefer — which can include agreeing with
            the user. Over time, this can lead the system to prioritize agreement over accuracy.
          </p>
          <p className="text-base font-semibold text-purple-800 mb-2">Why Does This Matter?</p>
          <p className="text-base text-purple-700 leading-relaxed">
            An AI that always agrees might feel helpful, but it can be misleading. It may
            reinforce incorrect ideas, give you false confidence, and prevent you from
            thinking critically about what you&apos;re being told. 
          </p>
        </div>

        {/* Reflection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-4">
            Reflect on What You Saw
          </p>
          <div className="space-y-3">
            {[
              "Which responses felt more convincing: agreement or disagreement?",
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

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>

          <div className="space-y-2">
            {[
              {
                label: "CNET: DisagreeBot and AI disagreement",
                href: "https://www.cnet.com/tech/services-and-software/this-ai-chatbot-is-built-to-disagree-with-you-and-its-better-than-chatgpt/",
              },
              {
                label: "Georgetown: AI sycophancy research",
                href: "https://www.law.georgetown.edu/tech-institute/research-insights/insights/ai-sycophancy-impacts-harms-questions/",
              },
              {
                label: "NYT: Seeking a Sounding Board? Beware the Eager-to-Please Chatbot",
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