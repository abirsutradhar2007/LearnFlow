import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext.jsx";
import {
  LandingFooter,
  LandingNavbar,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
} from "../components/landing/LandingSections.jsx";

function Home() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/generate", {
      state: { youtubeUrl: youtubeUrl.trim() },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#FFFDF2] text-sm text-black/60">
        Loading LearnFlow...
      </div>
    );
  }

  if (user) {
    return (
      <section className="app-page min-h-[75vh] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/50">
              Your learning desk
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Welcome back, {user.username}.
            </h1>
            <p className="mt-3 text-sm leading-7 text-black/60 sm:text-base">
              Turn a YouTube lesson into clear notes, flashcards, and a quiz.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-9 max-w-3xl border border-black/10 bg-[#FBF9F1] p-5 sm:p-7"
          >
            <label
              htmlFor="youtube-url"
              className="block text-sm font-medium"
            >
              YouTube video URL
            </label>
            <p className="mt-1 text-sm text-black/55">
              Paste a link to the lesson you want to study.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                id="youtube-url"
                name="youtubeUrl"
                type="url"
                required
                value={youtubeUrl}
                onChange={(event) => setYoutubeUrl(event.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="min-w-0 flex-1 border border-black/15 bg-[#FFFDF7] px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-black"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#201F1A] px-5 py-3 text-sm font-medium text-[#FFFDF2] transition hover:bg-black/80"
              >
                Create study materials
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-medium">Your study library</h2>
              <p className="mt-1 text-sm text-black/55">
                Pick up where you left off with your saved materials.
              </p>
            </div>
            <Link
              to="/videos"
              className="inline-flex w-fit items-center gap-2 border border-black/15 px-4 py-2.5 text-sm font-medium transition hover:border-black/40 hover:bg-black/[0.03]"
            >
              Browse all materials
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="landing-page min-h-screen overflow-hidden bg-[#FFFDF2] text-black">
      <LandingNavbar />
      <div>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </div>
      <LandingFooter />
    </div>
  );
}

export default Home;
