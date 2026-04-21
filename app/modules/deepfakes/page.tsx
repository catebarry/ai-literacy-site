import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldAlertIcon } from "lucide-react";

export default function DeepfakesModule() {
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
          Deepfakes: AI-Generated Fake Media
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          AI can now generate images, audio, and videos that look and sound realistic.
          These &quot;deepfakes&quot; can be used to spread misinformation, manipulate public
          opinion, and make it harder to know what is real. Learning how to question
          media is an important part of AI literacy.
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
            Open the activity below and try to decide whether each image is real or
            AI-generated. Make your best guess before checking the answer.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            As you play, pay attention to details like lighting, skin texture, hair,
            backgrounds, and anything that looks slightly unusual or inconsistent.
          </p>
          <p className="text-base text-gray-600">
            After a few rounds, ask yourself: how confident were you, and were you
            actually right?
          </p>
        </div>

        {/* Launch Card */}
        <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-medium text-gray-700">
                AI or Not — by Sightengine
              </span>
            </div>

          </div>

          <div className="flex flex-col items-center text-center gap-5 px-8 py-12">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl">
              🕵️
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900 mb-2">
                Can you tell what&apos;s real?
              </p>
              <p className="text-base text-gray-500 max-w-lg leading-relaxed">
                This quiz shows you real and AI-generated images and asks you to tell
                them apart. Many people are less accurate than they expect.
              </p>
            </div>
            <a
              href="https://sightengine.com/ai-or-not"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Launch the AI or Not activity in a new tab"
              className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-gray-700 transition-colors"
            >
              Open Activity ↗
            </a>
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
          <p className="text-lg font-semibold text-purple-900">What are deepfakes?</p>
          <p className="text-base text-purple-800 leading-relaxed">
            Deepfakes are AI-generated images, videos, or audio designed to look or
            sound real. They are created using generative models trained on large
            datasets of media.
          </p>

          <div className="border-t border-purple-200 pt-4">
            <p className="text-lg font-semibold text-purple-900 mb-3">Why does this matter?</p>
            <p className="text-base text-purple-800 leading-relaxed">
              As deepfakes become more realistic, it becomes easier to mislead people
              and harder to trust media at first glance. AI literacy means learning not
              just to detect fakes, but to be careful even when detection is impossible.
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
              "Which examples were hardest to classify?",
              "What details made you think something was real or fake?",
              "Were you ever very confident but wrong?",
              "What does this tell you about trusting digital media online?",
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
              <span>Question whether the content you see online is real.</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Look for visual clues that indicate the content might be fake, but don't rely on these alone.</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Check who first created or shared the content.</span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Talk about it with others if you are unsure. </span>
            </li>

            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Be transparent and get permission if you are creating or sharing AI content.</span>
            </li>

          </ul>
        </div>
        
        {/* ── AIG-CSAM Subsection ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-amber-900 mb-2">
            Serious harms of deepfakes
          </p>
          <p className="text-base text-amber-800 leading-relaxed mb-4">
            Deepfakes are not just about misinformation. They can also be used in abusive and illegal ways,
            including AI-generated child sexual abuse material.
          </p>

          <Link
            href="/modules/deepfakes/csam"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md bg-amber-900 text-white hover:bg-amber-800 transition-colors"
          >
            Learn more about CSAM →
          </Link>
        </div>

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-lg font-semibold text-gray-900 mb-4">Learn More / Sources </p>
          <div className="space-y-2">
            {[
              {
                label: "AI for Education — Uncovering Deepfakes",
                href: "https://www.aiforeducation.io/ai-resources/uncovering-deepfakes",
                ariaLabel: "Learn how deepfake and open-source AI technology works",
              },
              {
                label: "UVA — What the heck is a deepfake",
                href: "https://security.virginia.edu/deepfakes",
                ariaLabel: "Learn how deepfake and open-source AI technology works",
              },
              {
                label: "MIT — DetectDeepFakes: counteract misinformation created by AI",
                href: "https://www.media.mit.edu/projects/detect-fakes/overview/",
                ariaLabel: "Learn how deepfake and open-source AI technology works",
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