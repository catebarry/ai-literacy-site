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
          AI systems learn from large collections of human-created data. That means
          they can also learn patterns, assumptions, and stereotypes found in that
          data. In this module, you will explore how an image model connects social
          labels to certain kinds of faces — and why that matters.
        </p>

        {/* Interactive Activity Header */}
        <div className="flex items-center gap-2 mb-5">
          <BookOpen size={20} strokeWidth={1.6} className="text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">
            Interactive Activity
          </h2>
        </div>

        {/* Instructions */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">Instructions</p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Open the Latent Gaze activity in a new tab. Scroll down until you reach
            the large grid of blurred faces. Each face represents a composite image
            built from many AI-generated portraits connected to a social label.
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-3">
            Click on individual faces to reveal the label associated with each one.
            Then compare different labels and look for patterns in age, gender
            presentation, expression, clothing, and race or ethnicity cues.
          </p>
          <p className="text-base text-gray-400">
            Ask yourself: what does the model seem to assume about different kinds
            of people?
          </p>
        </div>

        {/* Screenshot Preview */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-3">
            What to Look For
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            This is the section of the Latent Gaze site you should look for. Once
            you scroll to the grid of faces, click on different images to see the
            label each face is associated with.
          </p>

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

        {/* Activity Launch */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Open the Activity
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            Latent Gaze is an external interactive project. Open it in a new tab,
            explore the face grid, and then come back here to reflect on what you
            noticed.
          </p>

          <a
            href="https://bd1ng.github.io/latent-gaze/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2.5 text-base font-medium bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Open Latent Gaze ↗
          </a>

          <p className="text-sm text-gray-400 mt-3">
            Keep this page open and return after exploring the activity.
          </p>
        </div>

        {/* Explanation */}
        <div className="border-2 border-purple-500 rounded-lg p-6 mb-4 bg-white">
          <p className="text-base font-semibold text-purple-800 mb-2">
            What Is Latent Gaze Showing You?
          </p>
          <p className="text-base text-purple-700 leading-relaxed mb-4">
            Latent Gaze explores how an AI image model interprets social labels like
            <span className="font-medium"> immigrant</span>,{" "}
            <span className="font-medium"> CEO</span>, or{" "}
            <span className="font-medium"> teacher</span>. For each label, the model
            was used to generate thousands of AI portraits. Those portraits were
            then merged into a single composite image.
          </p>
          <p className="text-base text-purple-700 leading-relaxed">
            That means each composite is not a real person. It is a picture of the
            model&apos;s overall pattern — what the model tends to “see” when it is
            given that label. If certain features appear again and again, that
            suggests the model has learned to associate those traits with that
            category.
          </p>
        </div>

        {/* Why This Matters */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-2">
            Why This Matters
          </p>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            In this activity, the bias is visible: you can actually see patterns in
            the generated faces. But many AI systems do not make their assumptions
            this obvious. They may affect search results, recommendations, hiring,
            healthcare, or lending without clearly showing what patterns they
            learned.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Latent Gaze helps make one important idea concrete: AI systems are not
            neutral. They learn from data, and that data can contain stereotypes,
            imbalances, and social assumptions that show up in the outputs.
          </p>
        </div>

        {/* Reflection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <p className="text-base font-semibold text-gray-900 mb-4">
            Reflect on What You Saw
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

        {/* Learn More */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-10">
          <p className="text-base font-semibold text-gray-900 mb-4">Learn More</p>
          <div className="space-y-2">
            {[
              "Read more about bias in AI systems",
              "Teacher resources and lesson plans",
              "Related research and articles",
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