import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="app-page relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="relative mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          Page not found
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-tight sm:text-7xl">
          404
        </h1>

        <h2 className="mt-5 text-xl font-semibold sm:text-2xl">
          Looks like this page took a wrong turn.
        </h2>

        <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
          The page may have moved, or the address might be incorrect.
          Let's get you back to learning.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="bg-black px-6 py-3 text-sm font-medium text-[#FFFDF2] transition hover:bg-black/80"
          >
            Go to Home
          </Link>
          <Link
            to="/videos"
            className="border border-black/15 px-6 py-3 text-sm font-medium text-black/70 transition hover:border-black/40 hover:bg-black/[0.03]"
          >
            Browse Videos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
