import { Link } from "react-router-dom";

function Contact() {
  const socialLinks = [
    {
      name: "GitHub",
      username: "your-github-username",
      description: "Explore my projects, code, and development journey.",
      url: "https://github.com/abirsutradhar2007",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.09.67-3.74-1.31-3.74-1.31-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.6 5.23-5.08 5.5.4.35.75 1.02.75 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      username: "your-linkedin-profile",
      description: "Connect with me and follow my professional journey.",
      url: "https://www.linkedin.com/in/abir-sutradhar-bb18a5384/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.5H4.95V9h2.98v9.5ZM6.44 7.7a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46ZM19 18.5h-2.97v-4.62c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.78 1.2-1.78 2.44v4.7H9.74V9h2.85v1.3h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.57v5.17Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070710] px-5 py-20 text-white sm:px-8">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Get in touch
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Let's <span className="text-violet-400">Connect.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
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
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:-translate-y-2 hover:border-violet-500/50 hover:bg-violet-500/[0.05]"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500 group-hover:text-white">
                  {social.icon}
                </div>

                <span className="text-xl text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-violet-400">
                  ↗
                </span>
              </div>

              <h2 className="text-2xl font-semibold">{social.name}</h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {social.description}
              </p>

              <p className="mt-6 text-sm font-medium text-violet-400">
                Visit {social.name} profile →
              </p>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Keep Learning. Keep Building.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Explore LearnFlow and turn the videos you watch into
            structured learning materials.
          </p>

          <Link
            to="/"
            className="mt-7 inline-block rounded-xl bg-violet-600 px-7 py-3 font-semibold transition hover:bg-violet-500"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Contact;