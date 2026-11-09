
import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const debates = await prisma.debate.findMany({
    where: { user_id: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      topic: true,
      userStance: true,
      difficulty: true,
      status: true,
      totalRounds: true,
      createdAt: true,
      _count: { select: { debateRounds: true } },
    },
  });

  const totalDebates = debates.length;

  const completedDebates = debates.filter(
    (debate) =>
      debate.status === "COMPLETED" ||
      debate._count.debateRounds >= debate.totalRounds
  ).length;

  const activeDebates = totalDebates - completedDebates;

  return (
    <main className="min-h-screen overflow-hidden bg-[#080D18] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed right-0 top-0 h-[450px] w-[600px] rounded-full bg-violet-600/[0.07] blur-[130px]" />

      {/* Navbar */}
      <header className="relative border-b border-white/10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-xl font-bold">
              D
            </span>

            <span className="text-xl font-bold tracking-tight">
              Argument<span className="text-violet-400">Arena</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-400 sm:block">
              {session.user.name ?? "User"}
            </span>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Log out
              </button>
            </form>
          </div>

        </nav>
      </header>

      {/* Dashboard content */}
      <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-14">

        {/* Welcome section */}
        <section className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-200">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              YOUR PERSONAL WORKSPACE
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                {session.user.name ?? "User"}
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Every debate is an opportunity to sharpen your
              reasoning, challenge assumptions, and become a
              more confident communicator.
            </p>
          </div>

          <Link
            href="/debate/new"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-400"
          >
            <span className="text-lg">+</span>
            New Debate
          </Link>

        </section>

        {/* Statistics */}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">

          {[
            {
              title: "Total Debates",
              value: totalDebates,
              icon: "◈",
              description: "All your practice sessions",
              color: "violet",
            },
            {
              title: "Completed",
              value: completedDebates,
              icon: "✓",
              description: "Debates successfully finished",
              color: "emerald",
            },
            {
              title: "In Progress",
              value: activeDebates,
              icon: "↗",
              description: "Debates waiting to continue",
              color: "amber",
            },
          ].map((stat) => (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#111827] p-5 transition hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-400">
                  {stat.title}
                </p>

                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${
                    stat.color === "violet"
                      ? "bg-violet-400/10 text-violet-300"
                      : stat.color === "emerald"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "bg-amber-400/10 text-amber-300"
                  }`}
                >
                  {stat.icon}
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold tabular-nums">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          ))}

        </section>

        {/* Debates section */}
        <section className="mt-14">

          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">
                Your activity
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Your Debates
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Pick up where you left off or start something new.
              </p>
            </div>

            <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
              {totalDebates} {totalDebates === 1 ? "debate" : "debates"} total
            </span>
          </div>

          {/* Empty state */}
          {debates.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-[#111827]/60 px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-3xl">
                🎤
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Your journey starts here.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
                You haven't started any debates yet. Pick a topic,
                choose your position, and see how well you can
                defend your ideas against an AI opponent.
              </p>

              <Link
                href="/debate/new"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-6 py-3 font-semibold transition hover:bg-violet-400"
              >
                Start Your First Debate →
              </Link>

            </div>
          ) : (

            /* Debate cards */
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {debates.map((debate) => {
                const roundsDone = debate._count.debateRounds;

                const isFinished =
                  debate.status === "COMPLETED" ||
                  roundsDone >= debate.totalRounds;

                const progress = Math.min(
                  (roundsDone / debate.totalRounds) * 100,
                  100
                );

                return (
                  <Link
                    key={debate.id}
                    href={`/debate/${debate.id}`}
                    className="group rounded-2xl border border-white/10 bg-[#111827] p-6 transition duration-200 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-xl hover:shadow-violet-950/20"
                  >

                    {/* Card header */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {debate.difficulty} LEVEL
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          isFinished
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-amber-400/10 text-amber-300"
                        }`}
                      >
                        <span className="mr-1.5">●</span>
                        {isFinished ? "Completed" : "In Progress"}
                      </span>
                    </div>

                    {/* Topic */}
                    <h3 className="mt-5 line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-7 text-white transition group-hover:text-violet-300">
                      {debate.topic}
                    </h3>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                          debate.userStance === "FOR"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-rose-400/10 text-rose-300"
                        }`}
                      >
                        {debate.userStance}
                      </span>

                      <span className="rounded-lg bg-white/[0.05] px-3 py-1.5 text-xs text-slate-300">
                        {debate.totalRounds} Total Rounds
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mt-7">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Debate progress
                        </span>

                        <span className="font-medium text-slate-300">
                          {roundsDone}/{debate.totalRounds}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isFinished
                              ? "bg-emerald-400"
                              : "bg-gradient-to-r from-violet-500 to-indigo-400"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">

                      <span className="text-xs text-slate-500">
                        {debate.createdAt.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>

                      <span className="flex items-center gap-2 text-sm font-medium text-violet-300 transition group-hover:gap-3">
                        {isFinished ? "View Debate" : "Continue"} →
                      </span>

                    </div>

                  </Link>
                );
              })}

            </div>
          )}

        </section>

        {/* Bottom CTA */}
        <section className="mt-14 rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-indigo-500/[0.03] px-6 py-8 sm:px-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Ready for another challenge?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                A stronger argument begins with a willingness to question your own.
              </p>
            </div>

            <Link
              href="/debate/new"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-400/10 px-5 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-400/20"
            >
              Start a Debate →
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 py-7 text-center text-xs text-slate-600">
          ArgumentArena · Practice. Analyze. Improve.
        </footer>

      </div>
    </main>
  );
}
