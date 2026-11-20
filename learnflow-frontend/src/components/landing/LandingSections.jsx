import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Play } from "@phosphor-icons/react";

const features = [
  {
    number: "01",
    title: "Summaries",
    description:
      "Get to the heart of a lesson without replaying the whole video.",
    mark: "S",
  },
  {
    number: "02",
    title: "Detailed notes",
    description:
      "A clear, structured record of the ideas worth coming back to.",
    mark: "N",
  },
  {
    number: "03",
    title: "Flashcards",
    description:
      "Turn important details into quick prompts for active recall.",
    mark: "F",
  },
  {
    number: "04",
    title: "Interactive quizzes",
    description:
      "Check what stuck and find the topics that need another look.",
    mark: "Q",
  },
];

const steps = [
  {
    number: "01",
    title: "Bring a video",
    description: "Paste the link to a YouTube lesson you want to understand.",
  },
  {
    number: "02",
    title: "Make it yours",
    description: "LearnFlow shapes the video into focused study materials.",
  },
  {
    number: "03",
    title: "Put it to work",
    description: "Review the notes, practise recall, and take a short quiz.",
  },
];

export function LandingNavbar() {
  return (
    <header className="landing-reveal border-b border-black/10">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8 lg:px-12"
      >
        <Link
          to="/"
          aria-label="LearnFlow home"
          className="group inline-flex items-center gap-2.5"
        >
          <span className="flex h-8 w-8 items-center justify-center bg-black text-xs font-semibold tracking-tight text-[#FFFDF2] transition-transform duration-300 group-hover:rotate-[-8deg]">
            L
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.06em]">
            LearnFlow
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          <a
            href="#features"
            className="text-sm text-black/65 transition-colors hover:text-black"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-black/65 transition-colors hover:text-black"
          >
            How it works
          </a>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/login"
            className="text-xs text-black/70 transition-colors hover:text-black sm:text-sm"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 bg-black px-2.5 py-2.5 text-xs font-medium text-[#FFFDF2] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/80 sm:gap-2 sm:px-5 sm:text-sm"
          >
            Get started <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

function StudyPreview() {
  return (
    <div
      aria-label="Preview of a video transformed into study notes and a flashcard"
      className="landing-reveal landing-reveal-delay relative mx-auto w-full max-w-[510px] py-5 sm:py-8"
    >
      <div className="absolute -left-2 top-1/2 hidden h-36 w-36 -translate-y-1/2 rounded-full border border-black/[0.07] sm:block" />
      <div className="absolute -left-8 top-1/2 hidden h-52 w-52 -translate-y-1/2 rounded-full border border-black/[0.05] sm:block" />

      <div className="relative ml-auto w-[94%] border border-black/10 bg-[#FFFDF2] p-4 shadow-[0_24px_70px_rgba(27,25,17,0.10)] sm:w-[88%] sm:p-6">
        <div className="flex items-center justify-between border-b border-black/10 pb-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-black/50">
            Your study desk
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-black/45">
            <span className="h-1.5 w-1.5 rounded-full bg-black/70" />
            READY TO REVIEW
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <div className="flex h-[86px] w-[36%] shrink-0 items-center justify-center bg-[#EAE7DB] sm:h-[102px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-[#FFFDF2]/80">
              <Play size={16} weight="fill" aria-hidden="true" />
            </div>
          </div>
          <div className="flex min-w-0 flex-col justify-center">
            <span className="text-[9px] uppercase tracking-[0.16em] text-black/45">
              Video lesson · 18 min
            </span>
            <p className="mt-2 max-w-[220px] font-serif text-lg leading-tight tracking-[-0.035em] sm:text-[22px]">
              The science of building better habits
            </p>
            <span className="mt-2 text-[10px] text-black/45">
              4 learning formats, one useful place
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1.1fr_0.9fr] gap-3">
          <div className="border border-black/10 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                Key idea
              </span>
              <span className="font-serif text-xs italic text-black/35">01</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-px w-full bg-black/15" />
              <div className="h-px w-[84%] bg-black/10" />
              <div className="h-px w-[68%] bg-black/10" />
            </div>
            <p className="mt-3 text-[10px] leading-relaxed text-black/60 sm:text-[11px]">
              Small cues make new routines easier to repeat.
            </p>
          </div>

          <div className="flex min-h-[116px] flex-col justify-between bg-black p-3 text-[#FFFDF2] sm:p-4">
            <span className="text-[9px] uppercase tracking-[0.16em] text-white/55">
              Quick recall
            </span>
            <p className="font-serif text-sm leading-snug sm:text-base">
              What makes a habit easier to start?
            </p>
            <span className="flex items-center justify-between text-[9px] text-white/55">
              Flashcard <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">
          <span className="text-[10px] text-black/45">A little more learning.</span>
          <span className="font-serif text-xs italic text-black/55">
            at your pace
          </span>
        </div>
      </div>

      <div className="absolute -bottom-1 left-0 hidden rotate-[-4deg] border border-black/10 bg-[#FFFDF2] px-4 py-3 shadow-[0_12px_30px_rgba(27,25,17,0.08)] sm:block">
        <span className="block text-[9px] uppercase tracking-[0.17em] text-black/45">
          One video
        </span>
        <span className="mt-1 block font-serif text-sm italic">many ways in</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 md:min-h-[590px] md:grid-cols-[1.06fr_0.94fr] md:gap-8 lg:px-12 lg:pb-28 lg:pt-24">
      <div className="landing-reveal relative z-10 max-w-[590px]">
        <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black/55 sm:text-[11px]">
          <span className="h-px w-8 bg-black/35" />
          A better way to learn from video
        </p>
        <h1 className="max-w-[620px] font-serif text-[clamp(3.35rem,8vw,6.65rem)] leading-[0.91] tracking-[-0.075em]">
          Watch less.
          <br />
          <span className="italic">Understand</span>
          <br />
          more.
        </h1>
        <p className="mt-7 max-w-[430px] text-[15px] leading-7 text-black/65 sm:mt-8 sm:text-base sm:leading-8">
          Transform YouTube videos into structured learning materials you can
          actually use: clear notes, useful flashcards, and quizzes that make
          knowledge stick.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
          <Link
            to="/signup"
            className="inline-flex items-center gap-3 bg-black px-5 py-3.5 text-sm font-medium text-[#FFFDF2] transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/80"
          >
            Get started <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a
            href="#features"
            className="group inline-flex items-center gap-2 px-4 py-3.5 text-sm text-black/70 transition-colors hover:text-black"
          >
            Explore features
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </a>
        </div>
        <p className="mt-6 text-[11px] tracking-wide text-black/45">
          Made for curious minds and open tabs.
        </p>
      </div>

      <StudyPreview />

      <a
        href="#features"
        className="absolute bottom-7 left-5 hidden items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-black/40 transition-colors hover:text-black md:flex lg:left-12"
      >
        Scroll to explore <span className="h-8 w-px bg-black/25" />
      </a>
      <span className="absolute bottom-8 right-8 hidden font-serif text-sm italic text-black/40 md:block lg:right-12">
        Learn with intention.
      </span>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-8 border-y border-black/10 bg-[#F6F3E8]"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
          <div className="max-w-md">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-black/50">
              From watching to knowing
            </p>
            <h2 className="font-serif text-4xl leading-[1.02] tracking-[-0.055em] sm:text-5xl">
              Keep the ideas.
              <br />
              <span className="italic">Leave the scrubbing.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-black/60">
              One lesson can become a few different ways to understand,
              remember, and test what you learned.
            </p>
          </div>

          <div className="grid sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.number}
                className={`group border-t border-black/15 py-5 transition-transform duration-300 hover:translate-x-1 sm:py-6 ${
                  Number(feature.number) % 2 === 0
                    ? "sm:border-l sm:pl-5"
                    : "sm:pr-5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-serif text-sm italic text-black/40">
                    {feature.number}
                  </span>
                  <span className="font-serif text-2xl italic text-black/20 transition-colors duration-300 group-hover:text-black/60">
                    {feature.mark}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-[-0.03em]">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-[250px] text-sm leading-6 text-black/60">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-8">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-black/50">
              Three small steps
            </p>
            <h2 className="font-serif text-4xl leading-none tracking-[-0.055em] sm:text-5xl">
              A good lesson,
              <br className="sm:hidden" /> made yours.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-black/60">
            Less passive watching. More time spent with the ideas that matter.
          </p>
        </div>

        <div className="mt-10 grid border-y border-black/15 md:mt-14 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className={`group relative py-6 transition-colors duration-300 hover:bg-black/[0.025] sm:py-8 md:px-7 md:py-9 ${
                index > 0 ? "border-t border-black/15 md:border-l md:border-t-0" : ""
              } ${index === 0 ? "md:pl-0" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm italic text-black/45">
                  {step.number}
                </span>
                {index < steps.length - 1 && (
                  <span className="hidden text-black/30 md:block">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                )}
              </div>
              <h3 className="mt-8 font-serif text-2xl tracking-[-0.04em] sm:mt-10">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[270px] text-sm leading-6 text-black/60">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-black/15">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2.5 text-sm font-semibold tracking-[-0.05em]"
        >
          <span className="flex h-7 w-7 items-center justify-center bg-black text-[10px] text-[#FFFDF2]">
            L
          </span>
          LearnFlow
        </Link>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-black/60">
          <a href="#features" className="transition-colors hover:text-black">
            Features
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-black"
          >
            How it works
          </a>
          <Link to="/login" className="transition-colors hover:text-black">
            Sign in
          </Link>
          <Link to="/signup" className="transition-colors hover:text-black">
            Get started
          </Link>
        </div>

        <p className="text-[11px] text-black/45">
          © {new Date().getFullYear()} LearnFlow
        </p>
      </div>
    </footer>
  );
}
