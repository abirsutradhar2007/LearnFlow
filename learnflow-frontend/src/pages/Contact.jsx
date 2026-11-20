import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

function Contact() {
  const socialLinks = [
    {
      name: "GitHub",
      username: "your-github-username",
      description: "Explore my projects, code, and development journey.",
      url: "https://github.com/abirsutradhar2007",
      icon: <GithubLogo className="h-7 w-7" aria-hidden="true" />,
    },
    {
      name: "LinkedIn",
      username: "your-linkedin-profile",
      description: "Connect with me and follow my professional journey.",
      url: "https://www.linkedin.com/in/abir-sutradhar-bb18a5384/",
      icon: <LinkedinLogo className="h-7 w-7" aria-hidden="true" />,
    },
  ];

  return (
    <section className="app-page relative min-h-screen overflow-hidden px-5 py-16 sm:px-8 sm:py-20">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Get in touch
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let's <span className="text-violet-400">Connect.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            I'm always interested in connecting with developers, learning
            new things, and exploring exciting opportunities. Feel free to
            find me on these platforms.
          </p>
        </div>

        {/* Social cards */}
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition duration-200 hover:border-violet-500/50 hover:bg-violet-500/[0.05]"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500 group-hover:text-white">
                  {social.icon}
                </div>

                <span className="text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-400">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </div>

              <h2 className="text-2xl font-semibold">{social.name}</h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {social.description}
              </p>

              <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-violet-400">
                Visit {social.name} profile
                <ArrowRight size={16} aria-hidden="true" />
              </p>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 border border-black/10 bg-[#F6F3E8] p-7 text-center sm:p-10">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Keep Learning. Keep Building.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Explore LearnFlow and turn the videos you watch into
            structured learning materials.
          </p>

          <Link
            to="/"
            className="mt-7 inline-block bg-black px-6 py-3 text-sm font-medium text-[#FFFDF2] transition hover:bg-black/80"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;