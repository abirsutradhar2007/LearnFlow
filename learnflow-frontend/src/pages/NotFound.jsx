import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#070710] px-6 py-20 text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[120px]" />

      <div className="relative mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
          Page not found
        </p>

        <h1 className="mt-4 text-8xl font-extrabold tracking-tight sm:text-9xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
          Looks like this page took a wrong turn.
        </h2>

        <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
          The page may have moved, or the address might be incorrect.
          Let's get you back to learning.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold transition hover:from-violet-500 hover:to-indigo-500"
          >
            Go to Home
          </Link>
          <Link
            to="/videos"
            className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:border-violet-500/40 hover:bg-white/5"
          >
            Browse Videos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
