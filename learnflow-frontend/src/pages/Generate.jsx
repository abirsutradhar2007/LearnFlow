import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateMaterials } from "../services/material.service.js";

function Generate() {
  const location = useLocation();
  const navigate = useNavigate();

  const youtubeUrl = location.state?.youtubeUrl;
  const retry = location.state?.retry ?? 0;
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!youtubeUrl) {
      navigate("/", { replace: true });
      return;
    }

    let isMounted = true;
    
    const generate = async () => {
      try {
        setStatus("loading");

        const result = await generateMaterials(youtubeUrl);

        if (!result.data?.videoId) {
          throw new Error("Video ID missing from server response.");
        }

        if (!isMounted) return;

        // Navigate to the material page
        navigate(`/materials/${result.data.videoId}`, {
          replace: true,
          state: {
            cached: result.cached,
          },
        });

      } catch (err) {
        if (!isMounted) return;

        setError(err.message || "Something went wrong.");
        setStatus("error");
      }
    };

    generate();

    return () => {
      isMounted = false;
    };
  }, [youtubeUrl, navigate, retry]);

  // Loading screen
  if (status === "loading") {
    return (
      <div className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6">

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[100px]" />

        <div className="relative w-full max-w-lg text-center">

          {/* Animated loader */}
          <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center">

            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-violet-500 border-r-indigo-500" />

            <div className="absolute inset-3 animate-[spin_3s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-fuchsia-500 border-l-blue-500" />

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10 text-3xl text-violet-400 shadow-lg shadow-violet-500/20">
              ✦
            </div>

          </div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            LearnFlow AI
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Creating your
            <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              learning experience
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-gray-400">
            We're processing your video and preparing your personalized
            learning materials. This may take a moment.
          </p>

          {/* Animated dots */}
          <div className="mt-9 flex justify-center gap-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-violet-500 [animation-delay:300ms]" />
          </div>

          <p className="mt-8 text-xs text-gray-600">
            Please don't refresh or close this page.
          </p>

        </div>
      </div>
    );
  }

  // Error screen
  if (status === "error") {
    return (
      <div className="flex min-h-[75vh] items-center justify-center px-6">

        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-white/[0.03] p-8 text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl text-red-400">
            !
          </div>

          <h1 className="text-2xl font-bold">
            Unable to generate materials
          </h1>

          <p className="mt-4 text-sm leading-7 text-gray-400">
            {error}
          </p>

          <div className="mt-8 flex flex-col gap-3">

            <button
              onClick={() => {
                setError("");
                setStatus("loading");

                // Re-run generation by navigating to the same page
                navigate("/generate", {
                  replace: true,
                  state: {
                    youtubeUrl,
                    retry: Date.now(),
                  },
                });
              }}
              className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >
              Try Again
            </button>

            <button
              onClick={() => navigate("/", { replace: true })}
              className="rounded-xl border border-white/10 px-6 py-3 text-sm text-gray-300 transition hover:bg-white/5"
            >
              Back to Home
            </button>

          </div>

        </div>
      </div>
    );
  }

  return null;
}

export default Generate;