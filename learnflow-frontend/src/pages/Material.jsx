import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getMaterialById } from "../services/material.service.js";

function Material() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMaterial = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMaterialById(videoId);

        if (isMounted) {
          setMaterial(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load materials.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMaterial();

    return () => {
      isMounted = false;
    };
  }, [videoId, retry]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center gap-6">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />

        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">
            Loading your materials...
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Preparing your learning experience.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">

          <div className="mb-5 text-4xl text-red-400">!</div>

          <h2 className="text-2xl font-bold">
            Unable to load materials
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-400">
            {error}
          </p>

          <button
            onClick={() => setRetry((prev) => prev + 1)}
            className="mt-7 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/videos")}
            className="ml-3 rounded-xl border border-white/10 px-6 py-3 text-sm hover:bg-white/5"
          >
            Go Back
          </button>

        </div>
      </div>
    );
  }

  if (!material) return null;

  const notes = material.notes || [];
  const flashcards = material.flashcards || [];

  return (
    <div className="min-h-screen bg-[#070710] px-5 py-12 text-white sm:px-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <header className="mb-12">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/videos"
              className="text-sm text-gray-400 transition hover:text-violet-400"
            >
              ← Back to All Videos
            </Link>

            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs font-medium text-violet-300">
              ✦ AI Generated Materials
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {material.title || "Your Learning Materials"}
          </h1>

          <p className="mt-4 text-sm text-gray-500">
            Your personalized learning resources are ready.
          </p>

        </header>

        {/* SUMMARY */}
        <section className="mb-10">

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-xl text-violet-400">
              ✦
            </div>

            <div>
              <h2 className="text-3xl font-bold">Video Summary</h2>
              <p className="text-xs text-gray-500">
                Understand the big picture
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="whitespace-pre-line text-base leading-8 text-gray-300 sm:text-lg">
              {material.summary || "No summary available."}
            </p>
          </div>

        </section>

        {/* NOTES */}
        <section className="mb-10">

          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-400">
                ▤
              </div>

              <div>
                <h2 className="text-xl font-bold">Detailed Notes</h2>
                <p className="text-xs text-gray-500">
                  Topic-wise learning materials
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-white/5 px-3 py-2 text-xs text-gray-400">
                {notes.length} Topics
              </span>
              <button
                type="button"
                aria-expanded={showNotes}
                aria-controls="material-notes"
                onClick={() => setShowNotes((isVisible) => !isVisible)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:border-violet-500/40 hover:bg-violet-500/10"
              >
                {showNotes ? "Hide Notes" : "Show Notes"}
              </button>
            </div>
          </div>

          {showNotes && (
            <div id="material-notes" className="space-y-4">

              {notes.length > 0 ? (
                notes.map((note, index) => (
                  <article
                    key={index}
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-500/30 sm:p-8"
                  >
                    <div className="mb-4 flex items-start gap-4">

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm font-semibold text-violet-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="pt-1 text-lg font-semibold text-white">
                        {note.title}
                      </h3>

                    </div>

                    <div className="whitespace-pre-line pl-0 text-base leading-8 text-gray-300 sm:pl-[52px]">
                      {note.content}
                    </div>
                  </article>
                ))
              ) : (
                <p className="rounded-xl border border-white/10 p-6 text-sm text-gray-500">
                  No notes available.
                </p>
              )}

            </div>
          )}

        </section>

        {/* FLASHCARDS */}
        <section className="mb-12">

          <div className="mb-5 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-xl text-fuchsia-400">
                ▣
              </div>

              <div>
                <h2 className="text-xl font-bold">Flashcards</h2>
                <p className="text-xs text-gray-500">
                  Revise important concepts
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={showFlashcards}
              aria-controls="material-flashcards"
              onClick={() => setShowFlashcards((isVisible) => !isVisible)}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-violet-300 transition hover:border-fuchsia-500/40 hover:bg-fuchsia-500/10"
            >
              {showFlashcards ? "Hide Flashcards" : "Show Flashcards"}
            </button>

          </div>

          {showFlashcards && (
            <div id="material-flashcards" className="grid gap-4 md:grid-cols-2">

              {flashcards.length > 0 ? (
                flashcards.map((card, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-fuchsia-500/30"
                  >
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-fuchsia-400">
                      Question {index + 1}
                    </p>

                    <h3 className="text-lg font-semibold leading-8">
                      {card.question}
                    </h3>

                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="mb-2 text-xs font-semibold text-gray-500">
                        ANSWER
                      </p>

                      <p className="text-base leading-8 text-gray-300">
                        {card.answer}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="rounded-xl border border-white/10 p-6 text-sm text-gray-500">
                  No flashcards available.
                </p>
              )}

            </div>
          )}

        </section>

        {/* QUIZ CTA */}
        <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/80 via-[#15112b] to-indigo-950/80 p-8 text-center sm:p-12">

          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-500/20 blur-[80px]" />

          <div className="relative">
            <span className="text-3xl">⚡</span>

            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Ready to test your knowledge?
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400">
              You've explored the material. Now challenge yourself
              with an interactive quiz and see how much you've learned.
            </p>

            <Link
              to={`/materials/${videoId}/quiz`}
              className="mt-8 inline-block rounded-xl bg-white px-8 py-4 text-sm font-bold text-violet-950 transition hover:scale-105 hover:bg-violet-100"
            >
              Start Learning Quiz →
            </Link>
          </div>

        </section>

      </div>
    </div>
  );
}

export default Material;