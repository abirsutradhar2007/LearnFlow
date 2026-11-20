import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "@phosphor-icons/react";
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

        const { materials: videoList, pagination } = await getAllMaterials(
          page,
          LIMIT
        );

        if (isMounted) {
          setVideos(videoList);
          setHasMore(pagination.currentPage < pagination.totalPages);
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
    <section className="app-page min-h-screen px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Your Learning Library
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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
              onClick={() => setRefresh((current) => current + 1)}
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
              className="inline-flex items-center justify-center gap-2 bg-[#201F1A] px-5 py-3 text-sm font-medium text-[#FFFDF2] transition hover:bg-black/80"
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
                    <Play size={22} weight="fill" aria-hidden="true" />
                  </div>

                  <h2 className="mb-4 line-clamp-2 text-lg font-semibold transition group-hover:text-violet-300">
                    {video.title}
                  </h2>

                  {video.genre && (
                    <p className="mb-4 text-sm text-gray-500">{video.genre}</p>
                  )}

                  <div className="flex items-center justify-between">
                  
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-violet-400">
                      View materials
                      <ArrowRight size={16} aria-hidden="true" />
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