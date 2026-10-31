import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              <span className="text-white">Learn</span>
              <span className="text-violet-500">Flow.</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6">
              Transform YouTube videos into summaries, notes, flashcards,
              and quizzes. Learn smarter, not harder.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-violet-400">Home</Link>
              <Link to="/videos" className="hover:text-violet-400">All Videos</Link>
              <Link to="/contact" className="hover:text-violet-400">Contact</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Connect</h3>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm transition-colors hover:text-violet-400"
            >
              GitHub ↗
            </a>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} LearnFlow. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;