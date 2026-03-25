import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";

export default function DeepfakesModule() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> {"Back to Modules"}
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Deepfakes: AI-Generated Fake Media
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          AI can now generate images, audio, and video that look and sound completely real.
          These &quot;deepfakes&quot; are becoming harder to detect and are increasingly used to spread
          misinformation, manipulate public opinion, and deceive people. Learning to spot them
          is a critical skill in the age of AI.
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
            You will be shown a series of images, videos, or music clips. For each one, guess whether it is a real
            or AI-generated. Pay attention to details like lighting, skin texture,
            hands, backgrounds, and anything that looks slightly &quot;off.&quot;
            Which is the most difficult to discern real vs. AI-generated: images, videos, or music?
          </p>
        </div>

        {/* Launch Card */}
        <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🖼️</span>
              <span className="text-base font-medium text-gray-700">AI or Not — by Sightengine</span>
            </div>
            <a
              href="https://sightengine.com/ai-or-not"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-gray-400 hover:text-gray-600 transition-colors"
            >
              {"Open in new tab ↗"}
            </a>
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
                {"This interactive quiz shows you real and AI-generated images side by side. See how well you can spot the difference — most people struggle more than they expect."}
              </p>
            </div>
            <a
              href="https://sightengine.com/ai-or-not"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-md hover:bg-gray-700 transition-colors"
            >
              {"Launch Activity ↗"}
            </a>
          </div>
        </div>

        {/* What are Deepfakes */}
        <div className="border-2 border-purple-500 rounded-lg p-6 mb-4 bg-white">
          <p className="text-base font-semibold text-purple-800 mb-2">What are Deepfakes?</p>
          <p className="text-base text-purple-700 leading-relaxed mb-4">
            Deepfakes use a type of AI called generative models to create realistic-looking images,
            videos, and audio of people and events that never happened. The name comes from
            &quot;deep learning&quot; — the AI technique that powers them.
          </p>
          <p className="text-base font-semibold text-purple-800 mb-2">Why This Matters</p>
          <p className="text-base text-purple-700 leading-relaxed">
            As deepfakes become more convincing, they are being used to spread false information,
            create non-consensual content, and undermine trust in real media. Developing a habit
            of questioning what you see online — and knowing what to look for — is an increasingly
            essential skill.
          </p>
        </div>


        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>
          <div className="space-y-2">
            {[
              "How deepfake technology works",
              "Real-world cases where deepfakes caused harm",
              "Teacher resources and lesson plans",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="flex items-center gap-1.5 text-base text-blue-600 hover:underline"
              >
                {"→ " + item}
              </a>
            ))}
          </div>
        </div>


        {/* Footer Nav */}
        <div className="border-t border-gray-300 pt-6 flex items-center justify-between">
          <Link
            href="/"
            className="px-5 py-2.5 text-base font-medium border border-gray-400 text-gray-800 rounded-md bg-white hover:bg-gray-100 transition-colors"          >
            Back to Modules
          </Link>
        </div>

      </div>
    </main>
  );
}