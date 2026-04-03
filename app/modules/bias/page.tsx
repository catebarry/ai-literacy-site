"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen } from "lucide-react";

const reflectionQuestions = [
  "What patterns did you notice across labels like CEO, teacher, immigrant, or politician?",
  "Did some labels seem connected to particular genders, ages, expressions, or racial cues?",
  "Did any result surprise you or feel especially stereotyped?",
  "What does this suggest about what the model learned from its training data?",
];

export default function BiasModule() {
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
          Bias: How AI Reflects Stereotypes
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          AI systems learn from large collections of data. That means
          they can also learn patterns, assumptions, and stereotypes found in that
          data. In this module, you will explore how an image model connects social
          labels to certain kinds of faces — and why that matters.
        </p>

        {/* Step 1 header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full border-2 border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
            1
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Try it out</h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <p className="text-lg font-semibold text-gray-900 mb-2">Instructions</p>
        <p className="text-base text-gray-600 leading-relaxed">
          Latent Gaze is an interactive project that visualizes how an AI image model interprets
          social labels. Open it in a new tab, then scroll down to the large grid of blurred faces.
          Click individual faces to reveal the label associated with each one — then compare across
          labels and look for patterns in age, gender presentation, expression, clothing, and
          racial or ethnic cues.
        </p>
      </div>

      {/* Embedded Latent Gaze */}
      <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-gray-700">Latent Gaze — by Bochu Ding</span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-5 px-8 py-10">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
            👁️
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900 mb-2">
              What does the model see?
            </p>
            <p className="text-base text-gray-500 max-w-lg leading-relaxed">
              Scroll to the face grid, click individual faces to reveal their labels,
              and compare across categories. Look for patterns in age, gender, expression,
              and racial or ethnic cues.
            </p>
          </div>
          <a
            href="https://bd1ng.github.io/latent-gaze/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-gray-700 transition-colors"
          >
            Open Activity ↗
          </a>
        </div>

        <div className="border-t border-gray-200 px-6 pb-6 pt-5">
          <p className="text-sm text-gray-400 mb-3">Look for this section on the site:</p>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <Image
              src="/latent-gaze-preview.png"
              alt="Preview of the Latent Gaze face grid activity"
              width={1400}
              height={1000}
              className="w-full h-auto"
            />
          </div>
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
          <p className="text-base font-semibold text-purple-900">
            What is Latent Gaze showing you?
          </p>
          <p className="text-base text-purple-800 leading-relaxed">
            For each social label — like immigrant, CEO, or teacher — the model generated thousands
            of AI portraits, then merged them into a single composite image. That composite is not a
            real person. It is a picture of the model&apos;s overall pattern: what it tends to &ldquo;see&rdquo;
            when given that label.
          </p>

        
          <div className="border-t border-purple-200 pt-4">
            <p className="text-base font-semibold text-purple-900 mb-3">
              Why does this matter?
            </p>
            <p className="text-base text-purple-800 leading-relaxed">
              AI systems are not neutral. They learn from data, and that data can carry stereotypes and
              social assumptions that surface in the outputs. This activity makes bias visible — but most
              AI systems do not. The same learned patterns can quietly affect hiring tools, search results,
              healthcare recommendations, and lending decisions without showing you what they assumed.
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
          <p className="text-base font-semibold text-gray-900 mb-4">
            Questions to Consider
          </p>
          <div className="space-y-3">
            {reflectionQuestions.map((question) => (
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
          <p className="text-base font-semibold text-green-900 mb-4">
            What You Can Do
          </p>

          <ul className="space-y-3 text-base text-green-800">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Ask who built a system and what their incentives are</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Ask what data a system was trained on and recognize that bias in AI is not always intentional</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Be skeptical of AI outputs used in high-stakes decisions like hiring, financial lending, or healthcare</span>
            </li>

          </ul>
        </div>

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>

          <div className="space-y-5">
            <div>
              <div className="space-y-2">
                <a href="https://www.chapman.edu/ai/bias-in-ai.aspx" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-base text-blue-600 hover:underline">
                  → Chapman University — Bias in AI: What it is and Why it Matters
                </a>
                <a href="https://www.ajl.org/about" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-base text-blue-600 hover:underline">
                  → Algorithmic Justice League — What is algorithmic bias and why does it matter?
                </a>
                <a href="https://www.codedbias.com/about" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-base text-blue-600 hover:underline">
                  → Coded Bias — documentary about facial recognition and racial bias in AI systems
                </a>
                <a href="https://github.com/bd1ng/latent-gaze" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-base text-blue-600 hover:underline">
                  → Latent Gaze GitHub — explore the code and read more about the project
                </a>
              </div>
            </div>
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