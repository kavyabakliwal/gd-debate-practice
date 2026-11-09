import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  if (session?.user) redirect("/dashboard")

  return (
    <main className="min-h-screen overflow-hidden bg-[#080D18] text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-xl font-bold">
              D
            </span>
            <span className="text-xl font-bold tracking-tight">
              Argument<span className="text-violet-400">Arena</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-300 sm:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>
          </div>

          <div className="flex items-center gap-3">
              <>
                <Link
                  href="/login"
                  className="hidden rounded-xl px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-flex"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold transition hover:bg-violet-400"
                >
                  Get Started
                </Link>
              </>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-200">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              AI-powered debate practice
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
              Think clearly.
              <span className="mt-2 block bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                Argue confidently.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
              Strengthen your reasoning, challenge your assumptions,
              and learn to defend your ideas with confidence.
              Practice debates with AI and understand exactly
              where your arguments can improve.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={isLoggedIn ? "/dashboard" : "/register"}
                className="rounded-xl bg-violet-500 px-6 py-3.5 font-semibold shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-400"
              >
                {isLoggedIn ? "Go to Dashboard" : "Start Practicing"} →
              </Link>

              <a
                href="#features"
                className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/5"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              <span>✓ Structured feedback</span>
              <span>✓ Reasoning analysis</span>
              <span>✓ Practice at your pace</span>
            </div>
          </div>

          {/* Preview card */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-3xl bg-violet-500/10 blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                    Debate preview
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    Your next challenge
                  </h2>
                </div>
                <span className="rounded-lg bg-violet-400/10 px-3 py-2 text-sm text-violet-200">
                  AI Practice
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-slate-400">TODAY'S TOPIC</p>
                <h3 className="mt-3 text-2xl font-semibold leading-snug">
                  Is artificial intelligence replacing human creativity?
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Develop your position, respond to opposing arguments,
                  and support your claims with sound reasoning.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-400/10 text-xl text-indigo-300">
                    ↔
                  </div>
                  <div>
                    <p className="font-medium">Challenge perspectives</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Build arguments and counterarguments.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-xl text-emerald-300">
                    ↗
                  </div>
                  <div>
                    <p className="font-medium">Understand your performance</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Review scores and detailed AI feedback.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-violet-500/10 px-4 py-3">
                <span className="text-sm text-violet-200">
                  Ready to sharpen your thinking?
                </span>
                <span className="text-violet-300">✦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Built for better thinking
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              More than just a debate
            </h2>
            <p className="mt-4 leading-7 text-slate-400">
              Practice, receive meaningful feedback, and identify
              opportunities to improve your arguments.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: "01",
                title: "Structured AI evaluation",
                description:
                  "Understand your evidence, logic, relevance, counterarguments, and persuasiveness through separate scores and explanations.",
              },
              {
                icon: "02",
                title: "Reasoning and fallacy analysis",
                description:
                  "Identify potential weaknesses in your reasoning and learn how to construct stronger arguments.",
              },
              {
                icon: "03",
                title: "Round-by-round practice",
                description:
                  "Respond to opposing arguments, review your feedback, and learn from your previous debate rounds.",
              },
            ].map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-[#0D1422] p-7 transition hover:-translate-y-1 hover:border-violet-400/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 font-bold text-violet-300">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">
              Simple process
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              From an opinion to a stronger argument.
            </h2>
            <p className="mt-5 leading-7 text-slate-400">
              Practice expressing your ideas, responding thoughtfully,
              and learning from structured feedback after every round.
            </p>
          </div>

          <div className="space-y-4">
            {[
              ["01", "Choose a topic", "Start a debate on a topic that interests you."],
              ["02", "Make your argument", "Present your position and respond to the AI."],
              ["03", "Review your feedback", "Understand your scores and improve your reasoning."],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="flex gap-5 rounded-2xl border border-white/10 p-5"
              >
                <span className="text-lg font-bold text-violet-300">
                  {number}
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-indigo-500/5 px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Your next great argument starts here.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
            Start practicing today and turn every debate into an
            opportunity to improve.
          </p>
          <Link
            href={isLoggedIn ? "/dashboard" : "/register"}
            className="mt-8 inline-flex rounded-xl bg-violet-500 px-7 py-3.5 font-semibold transition hover:bg-violet-400"
          >
            {isLoggedIn ? "Open Dashboard" : "Create Your Account"} →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} ArgumentArena. Built for better thinking.
          </p>
          <p>Practice. Analyze. Improve.</p>
        </div>
      </footer>
    </main>
  );
}
