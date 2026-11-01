import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMaterials } from "../services/material.service.js";

const LIMIT = 10;

function AllVideos() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [hasMore, setHasMore] = useState(false);
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    let isMounted = true;

    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllMaterials(page, LIMIT);

        // Supports either a direct array or a paginated response.
        const videoList = Array.isArray(data)
          ? data
          : data.materials || data.docs || [];

        if (isMounted) {
          setVideos(videoList);
          setHasMore(videoList.length === LIMIT);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchVideos();

    return () => {
      isMounted = false;
    };
  }, [page, refresh]);

  return (
    <section className="min-h-screen bg-[#070710] px-5 py-16 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Your Learning Library
          </p>

          <h1 className="text-3xl font-bold sm:text-5xl">
            All Your <span className="text-violet-400">Materials</span>
          </h1>

          <p className="mt-4 max-w-xl text-gray-400">
            Revisit your generated summaries, notes, flashcards, and quizzes
            whenever you want.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-24 text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-violet-500/20 border-t-violet-500" />
            <p className="text-gray-400">Loading your materials...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="mb-4 text-red-400">{error}</p>
            <button
              onClick={() => setPage((current) => current)}
              className="rounded-lg bg-violet-600 px-5 py-2 font-medium hover:bg-violet-500"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && videos.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <h2 className="mb-3 text-2xl font-semibold">
              No videos yet
            </h2>
            <p className="mb-7 text-gray-400">
              Generate your first learning material to see it here.
            </p>

            <Link
              to="/generate"
              className="inline-block rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
            >
              Generate Materials
            </Link>
          </div>
        )}

        {/* Videos grid */}
        {!loading && !error && videos.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <Link
                  key={video.videoId}
                  to={`/materials/${video.videoId}`}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:bg-violet-500/[0.05]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m10 8 6 4-6 4V8Z" />
                      <rect x="3" y="4" width="18" height="16" rx="3" />
                    </svg>
                  </div>

                  <h2 className="mb-4 line-clamp-2 text-lg font-semibold transition group-hover:text-violet-300">
                    {video.title}
                  </h2>

                  <div className="flex items-center justify-between">
                  
                    <span className="text-sm font-medium text-violet-400">
                      View materials →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex items-center justify-center gap-5">
              <button
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border border-white/10 px-5 py-2 text-sm transition hover:border-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Previous
              </button>

              <span className="text-sm text-gray-400">
                Page {page}
              </span>

              <button
                disabled={!hasMore}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-white/10 px-5 py-2 text-sm transition hover:border-violet-500 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AllVideos;