import Link from "next/link";
import { ArrowLeft, ShieldAlertIcon } from "lucide-react";

export default function DeepfakesCSAMPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back */}
        <Link
          href="/modules/deepfakes"
          className="inline-flex items-center gap-1.5 text-base text-gray-500 hover:text-gray-800 mb-6 transition-colors"
          aria-label="Back to Deepfakes Module"
        >
          <ArrowLeft size={20} /> Back to Deepfakes
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          A Serious Harm: AI-Generated Child Sexual Abuse Material
        </h1>

        {/* Content Advisory */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-300 rounded-lg px-5 py-4 mb-4">
          <ShieldAlertIcon size={22} className="text-amber-500 mt-0.5 shrink-0" />
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
        <div className="border-t border-gray-300 pt-6">
          <Link
            href="/modules/deepfakes"
            className="px-5 py-2.5 text-base font-medium border border-gray-400 text-gray-800 rounded-md bg-white hover:bg-gray-100 transition-colors"
          >
            Back to Deepfakes
          </Link>
        </div>
      </div>
    </main>
  );
}