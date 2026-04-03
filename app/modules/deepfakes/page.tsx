import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

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
          AI can now generate images, audio, and video that look and sound realistic.
          These &quot;deepfakes&quot; can be used to spread misinformation, manipulate public
          opinion, and make it harder to know what is real. Learning how to question
          media is an important part of AI literacy.
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
            Open the activity below and try to decide whether each image is real or
            AI-generated. Make your best guess before checking the answer.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            As you play, pay attention to details like lighting, skin texture, hair,
            backgrounds, and anything that looks slightly unusual or inconsistent.
          </p>
          <p className="text-base text-gray-400">
            After a few rounds, ask yourself: how confident were you, and were you
            actually right?
          </p>
        </div>

        {/* Launch Card */}
        <div className="bg-white border border-gray-200 rounded-lg mb-4 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🖼️</span>
              <span className="text-base font-medium text-gray-700">
                AI or Not — by Sightengine
              </span>
            </div>
            <a
              href="https://sightengine.com/ai-or-not"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open AI or Not quiz in a new tab"
              className="text-base text-gray-400 hover:text-gray-600 transition-colors"
            >
              Open in new tab ↗
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
              Launch Activity ↗
            </a>
          </div>
        </div>

        {/* What are Deepfakes */}
        <div className="border-2 border-purple-500 rounded-lg p-6 mb-4 bg-white">
          <p className="text-base font-semibold text-purple-800 mb-2">What are Deepfakes?</p>
          <p className="text-base text-purple-700 leading-relaxed mb-4">
            Deepfakes are AI-generated images, videos, or audio designed to look or
            sound real. They are created using generative models trained on large
            datasets of media.
          </p>
          <p className="text-base font-semibold text-purple-800 mb-2">Why This Matters</p>
          <p className="text-base text-purple-700 leading-relaxed">
            As deepfakes become more realistic, it becomes easier to mislead people
            and harder to trust media at first glance. AI literacy means learning not
            just to detect fakes, but to stay careful even when detection is hard.
          </p>
        </div>

        {/* Reflection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-4">
            Reflect on What You Saw
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
                href="/"
                className="flex items-center gap-1.5 text-base text-blue-600 hover:underline"
              >
                {"→ " + item}
              </a>
            ))}
          </div>
        </div>
        
        {/* ── AIG-CSAM Subsection ── */}
 
        {/* Content Advisory */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-lg px-5 py-4 mb-4">
          <TriangleAlert size={20} className="text-amber-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">Content Advisory</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              The following section discusses the serious harm of AI-generated child
              sexual abuse material (AIG-CSAM). No graphic content is shown. If you find
              this topic distressing, you may skip ahead to the &quot;Learn More&quot; section
              below. Support resources are available at{" "}
              <a
                href="https://www.missingkids.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the National Center for Missing and Exploited Children website"
                className="underline hover:text-amber-900"
              >
                missingkids.org
              </a>
              .
            </p>
          </div>
        </div>
 
        {/* AIG-CSAM Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-3">
            A Serious Harm: AI-Generated Child Sexual Abuse Material
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            One of the most harmful uses of deepfake technology is the creation of
            AI-generated child sexual abuse material (AIG-CSAM) — synthetic explicit
            imagery of minors that is produced entirely by AI, without involving a
            real child in its creation. Reports of this content to the{" "}
            <a
              href="https://www.missingkids.org/gethelpnow/cybertipline/cybertiplinedata"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View NCMEC CyberTipline data"
              className="text-blue-600 hover:underline"
            >
              NCMEC CyberTipline
            </a>{" "}
            increased by over 1,300% between 2023 and 2024, rising from roughly 4,700
            to 67,000 reports.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Even though no real child appears in synthetic CSAM, researchers and
            lawmakers agree it causes real harm — normalizing the exploitation of
            children and creating gaps in existing law that make prosecution harder.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Legislation like the{" "}
            <a
              href="https://www.congress.gov/bill/119th-congress/house-bill/4831/text"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the ENFORCE Act bill text on congress.gov"
              className="text-blue-600 hover:underline"
            >
              ENFORCE Act
            </a>{" "}
            aims to close these legal gaps by ensuring AIG-CSAM is prosecuted with
            the same consequences as traditional CSAM offenses. The{" "}
            <a
              href="https://www.whitehouse.gov/briefings-statements/2025/05/first-lady-melania-trump-joins-president-trump-for-signing-of-the-take-it-down-act/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read about the TAKE IT DOWN Act signing"
              className="text-blue-600 hover:underline"
            >
              TAKE IT DOWN Act
            </a>
            , signed in May 2025, also addressed the psychological harm of
            non-consensual deepfake imagery targeting minors.
          </p>
        </div>
 
        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>
          <div className="space-y-2">
            {[
              {
                label: "How deepfake technology works",
                href: "https://www.ibm.com/think/topics/open-source-ai",
                ariaLabel: "Learn how deepfake and open-source AI technology works",
              },
              {
                label: "Real-world cases where deepfakes caused harm",
                href: "https://pulitzercenter.org/resource/how-we-investigated-epidemic-ai-generated-child-sexual-abuse-material-internet",
                ariaLabel: "Read the Pulitzer Center investigation into AIG-CSAM",
              },
              {
                label: "How the ENFORCE Act addresses AIG-CSAM",
                href: "https://www.thorn.org/blog/the-enforce-act-addressing-ai-generated-csam-offenses/",
                ariaLabel: "Read Thorn's explainer on the ENFORCE Act",
              },
              {
                label: "NCMEC CyberTipline reporting data",
                href: "https://www.missingkids.org/gethelpnow/cybertipline/cybertiplinedata",
                ariaLabel: "View NCMEC CyberTipline statistics",
              },
              {
                label: "FTC inquiry into AI chatbots and child safety",
                href: "https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-launches-inquiry-ai-chatbots-acting-companions",
                ariaLabel: "Read the FTC press release on AI chatbot safety inquiry",
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