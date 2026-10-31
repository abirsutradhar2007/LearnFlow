import { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "✦",
    title: "Smart Summaries",
    description: "Get concise summaries of lengthy YouTube videos in seconds.",
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: "▤",
    title: "Detailed Notes",
    description: "Turn video content into structured, easy-to-understand notes.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "▣",
    title: "Smart Flashcards",
    description: "Remember important concepts with interactive flashcards.",
    color: "from-fuchsia-500 to-purple-500",
  },
  {
    icon: "⌘",
    title: "Interactive Quizzes",
    description: "Test your understanding and discover what you've learned.",
    color: "from-indigo-500 to-blue-500",
  },
];

function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]{11}/;

    if (!youtubeRegex.test(url.trim())) {
      setError("Please enter a valid YouTube video URL.");
      return;
    }

    setError("");

    navigate("/generate", {
      state: { youtubeUrl: url.trim() },
    });
  };

  return (
    <div className="overflow-hidden bg-[#070710] text-white">

      {/* HERO SECTION */}
      <section className="relative isolate px-6 pb-28 pt-24 sm:pt-32">

        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[140px]" />
          <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        </div>

        <div className="mx-auto max-w-5xl text-center">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300 sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />
            Your AI-powered learning companion
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Turn Videos Into
            <span className="mt-2 block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
              Knowledge.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Stop watching hours of content without remembering anything.
            Transform YouTube videos into summaries, detailed notes,
            flashcards and quizzes — all in one place.
          </p>

          {/* URL Input */}
          <div
            id="generate"
            className="mx-auto mt-12 max-w-2xl scroll-mt-28"
          >
            <form
              onSubmit={handleSubmit}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-violet-950/30 backdrop-blur-xl transition-all focus-within:border-violet-500/50 focus-within:shadow-violet-900/20"
            >
              <div className="flex flex-col gap-2 sm:flex-row">

                <div className="flex flex-1 items-center gap-3 px-4">
                  <span className="text-xl text-red-500">▶</span>

                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setError("");
                    }}
                    placeholder="Paste your YouTube video URL..."
                    className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-500 sm:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-all hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98]"
                >
                  Generate Materials <span className="ml-2">→</span>
                </button>
              </div>
            </form>

            {error && (
              <p className="mt-3 text-left text-sm text-red-400">
                {error}
              </p>
            )}

            <p className="mt-4 text-xs text-gray-500">
              ✦ Paste a public YouTube video link to get started.
            </p>
          </div>

          {/* Small highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-gray-400 sm:text-sm">
            <span>✓ No account required</span>
            <span>✓ Instant access to cached materials</span>
            <span>✓ Learn at your own pace</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative border-t border-white/5 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Everything you need
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              One video.
              <span className="block text-gray-500">
                Four ways to learn.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
              LearnFlow transforms passive video watching into
              an active learning experience.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:bg-white/[0.06]"
              >
                <div
                  className={`mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-xl font-bold text-white shadow-lg`}
                >
                  {feature.icon}
                </div>

                <h3 className="mb-3 text-lg font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-400">
                  {feature.description}
                </p>

                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl transition-all group-hover:bg-violet-500/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/5 px-6 py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Simple workflow
            </p>

            <h2 className="text-3xl font-bold sm:text-5xl">
              Learning made simple.
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Paste a URL",
                description:
                  "Copy and paste the link of any supported YouTube video.",
              },
              {
                number: "02",
                title: "Generate Materials",
                description:
                  "Let AI transform the video transcript into useful learning resources.",
              },
              {
                number: "03",
                title: "Learn & Practice",
                description:
                  "Explore notes, revise with flashcards and test yourself with quizzes.",
              },
            ].map((step) => (
              <div key={step.number} className="relative text-center">

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-xl font-bold text-violet-400">
                  {step.number}
                </div>

                <h3 className="mb-3 text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mx-auto max-w-xs text-sm leading-7 text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24 pt-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-[#15112b] to-indigo-950/80 px-6 py-16 text-center sm:px-12">

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-[90px]" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-5xl">
              Ready to learn smarter?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
              Your next learning experience is just one video away.
              Start turning content into knowledge today.
            </p>

            <button
              onClick={() =>
                document.getElementById("generate")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-9 rounded-xl bg-white px-8 py-4 text-sm font-bold text-violet-950 transition-all hover:scale-105 hover:bg-violet-100"
            >
              Get Started Now →
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;