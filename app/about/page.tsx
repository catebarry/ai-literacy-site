export default function AboutPage() {
    return (
      <main className="min-h-screen bg-gray-100">
        <section className="max-w-3xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            About AI Literacy Lab
          </h1>
          <div className="space-y-5">
  
            {/* Mission */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                AI Literacy Lab is designed to help students and teachers develop
                critical thinking skills for navigating an AI-powered world. Through
                hands-on activities and guided reflection, learners explore how AI
                systems work and where they can go wrong.
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                Our goal is to empower everyone to use AI tools thoughtfully,
                recognize their limitations, and understand their societal implications.
              </p>
            </div>
  
            {/* For Students */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">For Students</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Each module includes interactive activities where you can:
              </p>
              <ul className="space-y-2">
                {[
                  "Experiment with real AI concepts in a safe environment",
                  "Learn to identify AI errors and limitations",
                  "Reflect on questions about ethics and real-world implications",
                  "Develop skills for responsible AI use",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-base text-gray-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* For Teachers */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">For Teachers</h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">
                AI Literacy Lab is designed for classroom use with:
              </p>
              <ul className="space-y-2">
                {[
                  "Self-guided modules that work for individual or group learning",
                  "Built-in reflection questions for class discussion",
                  "Clear learning objectives aligned with digital literacy standards",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-base text-gray-600">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Contact & Feedback */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact & Feedback
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-4">
                Have questions, feedback, or ideas for improvement? We'd love to hear from you.
              </p>

              <div className="space-y-2 text-gray-600 text-base">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:cate.barry@gmail.com"
                    className="text-gray-900 underline hover:text-gray-700"
                  >
                    cate.barry@gmail.com
                  </a>
                </p>

                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/catebarry/ai-literacy-site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 underline hover:text-gray-700"
                  >
                    github.com/catebarry/ai-literacy-site
                  </a>
                </p>
              </div>
            </div>
  
          </div>
        </section>
      </main>
    );
  }