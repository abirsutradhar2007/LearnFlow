import { Link } from "react-router-dom";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#F6F3E8] text-[#68665E]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              <span className="text-[#201F1A]">Learn</span>
              <span className="text-[#77746A]">Flow.</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6">
              Transform YouTube videos into summaries, notes, flashcards,
              and quizzes. Learn smarter, not harder.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-[#201F1A]">Quick Links</h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="transition-colors hover:text-black">Home</Link>
              <Link to="/videos" className="transition-colors hover:text-black">All Videos</Link>
              <Link to="/contact" className="transition-colors hover:text-black">Contact</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 font-semibold text-[#201F1A]">Connect</h3>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm transition-colors hover:text-black"
            >
              <span className="inline-flex items-center gap-2">
                <GithubLogo size={16} aria-hidden="true" />
                GitHub
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </a>
          </div>

        </div>

        <div className="mt-12 border-t border-black/10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} LearnFlow. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;