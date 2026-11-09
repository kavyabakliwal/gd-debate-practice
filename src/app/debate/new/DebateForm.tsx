
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { NewDebate } from "./actions";

export default function DebateForm() {
  const initialState = {
    success: false,
    error: "",
  };

  const [state, formAction, pending] = useActionState(
    NewDebate,
    initialState
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#080D18] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

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

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
          >
            ← Dashboard
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <section className="relative mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="mx-auto max-w-5xl">

          {/* Heading */}
          <div className="mb-10 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm text-violet-200">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Your next challenge awaits
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Start a{" "}
              <span className="bg-gradient-to-r from-violet-300 to-indigo-400 bg-clip-text text-transparent">
                New Debate
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
              Choose your topic, take a position, and challenge
              yourself to think beyond the obvious.
            </p>
          </div>

          <form action={formAction}>
            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.85fr]">

              {/* Form card */}
              <div className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl sm:p-9">

                {/* Topic */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label
                      htmlFor="topic"
                      className="text-sm font-semibold text-slate-200"
                    >
                      Debate topic
                    </label>
                    <span className="text-xs text-slate-500">
                      Step 01
                    </span>
                  </div>

                  <input
                    id="topic"
                    name="topic"
                    list="debate-topics"
                    defaultValue=""
                    required
                    minLength={5}
                    maxLength={200}
                    placeholder="Enter your debate topic..."
                    className="w-full rounded-xl border border-white/10 bg-[#080D18] px-4 py-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/10"
                  />

                  {/* <datalist id="debate-topics">
                    <option value="Should AI replace human teachers?" />
                    <option value="Should college attendance be mandatory?" />
                    <option value="Is social media doing more harm than good?" />
                    <option value="Should AI-generated content be regulated?" />
                  </datalist> */}

                  <p className="mt-2 text-xs text-slate-500">
                    Choose a suggested topic or enter your own.
                  </p>
                </div>

                {/* Stance */}
                <fieldset className="mt-9">
                  <div className="mb-4 flex items-center justify-between">
                    <legend className="text-sm font-semibold text-slate-200">
                      Choose your stance
                    </legend>
                    <span className="text-xs text-slate-500">
                      Step 02
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <label className="group cursor-pointer">
                      <input
                        type="radio"
                        name="stance"
                        value="FOR"
                        defaultChecked
                        required
                        className="peer sr-only"
                      />

                      <div className="rounded-2xl border border-white/10 bg-[#080D18] p-5 transition peer-checked:border-emerald-400/60 peer-checked:bg-emerald-400/[0.07] hover:border-white/20">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-xl text-emerald-400">
                          ✓
                        </div>

                        <h3 className="font-semibold text-white">
                          FOR
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          Support the given statement.
                        </p>

                        <div className="mt-4 text-xs font-medium text-emerald-400 opacity-0 transition peer-checked:opacity-100">
                          Selected ✓
                        </div>
                      </div>
                    </label>

                    <label className="group cursor-pointer">
                      <input
                        type="radio"
                        name="stance"
                        value="AGAINST"
                        required
                        className="peer sr-only"
                      />

                      <div className="rounded-2xl border border-white/10 bg-[#080D18] p-5 transition peer-checked:border-rose-400/60 peer-checked:bg-rose-400/[0.07] hover:border-white/20">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-rose-400/10 text-xl text-rose-400">
                          ✕
                        </div>

                        <h3 className="font-semibold text-white">
                          AGAINST
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          Challenge the given statement.
                        </p>

                        <div className="mt-4 text-xs font-medium text-rose-400 opacity-0 transition peer-checked:opacity-100">
                          Selected ✓
                        </div>
                      </div>
                    </label>
                  </div>
                </fieldset>

                {/* Difficulty */}
                <div className="mt-9">
                  <div className="mb-4 flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-200">
                      Difficulty level
                    </label>
                    <span className="text-xs text-slate-500">
                      Step 03
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        value: "EASY",
                        title: "Easy",
                        description: "Beginner",
                        color: "emerald",
                      },
                      {
                        value: "MEDIUM",
                        title: "Medium",
                        description: "Balanced",
                        color: "violet",
                      },
                      {
                        value: "HARD",
                        title: "Hard",
                        description: "Advanced",
                        color: "rose",
                      },
                    ].map((item) => (
                      <label key={item.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="difficulty"
                          value={item.value}
                          defaultChecked={item.value === "MEDIUM"}
                          required
                          className="peer sr-only"
                        />

                        <div className="rounded-xl border border-white/10 bg-[#080D18] px-2 py-4 text-center transition hover:border-white/20 peer-checked:border-violet-400/60 peer-checked:bg-violet-400/10">
                          <p className="font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rounds */}
                <div className="mt-9">
                  <div className="mb-4 flex items-center justify-between">
                    <label
                      htmlFor="totalRounds"
                      className="text-sm font-semibold text-slate-200"
                    >
                      Number of rounds
                    </label>
                    <span className="text-xs text-slate-500">
                      Step 04
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        value: "3",
                        title: "3 Rounds",
                        description: "Quick practice",
                      },
                      {
                        value: "5",
                        title: "5 Rounds",
                        description: "Extended challenge",
                      },
                    ].map((item) => (
                      <label key={item.value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="totalRounds"
                          value={item.value}
                          defaultChecked={item.value === "3"}
                          required
                          className="peer sr-only"
                        />

                        <div className="rounded-xl border border-white/10 bg-[#080D18] p-4 transition hover:border-white/20 peer-checked:border-violet-400/60 peer-checked:bg-violet-400/10">
                          <p className="font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {state.error && (
                  <div
                    role="alert"
                    className="mt-7 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300"
                  >
                    {state.error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={pending}
                  className="mt-9 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5 hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {pending ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating your debate...
                    </>
                  ) : (
                    <>Create Debate <span>→</span></>
                  )}
                </button>

                <p className="mt-4 text-center text-xs text-slate-500">
                  Your debate will be saved to your account.
                </p>
              </div>

              {/* Right preview panel */}
              <aside className="space-y-5">

                <div className="rounded-3xl border border-white/10 bg-[#111827] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10 text-xl text-violet-300">
                      ✦
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        The debate experience
                      </h2>
                      <p className="text-xs text-slate-500">
                        What happens next?
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-6">
                    {[
                      [
                        "01",
                        "Present your argument",
                        "Take a position and explain your reasoning.",
                      ],
                      [
                        "02",
                        "Challenge the AI",
                        "Face opposing arguments and defend your ideas.",
                      ],
                      [
                        "03",
                        "Get evaluated",
                        "Receive structured feedback on your performance.",
                      ],
                    ].map(([number, title, description]) => (
                      <div key={number} className="flex gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-xs font-bold text-violet-300">
                          {number}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-200">
                            {title}
                          </h3>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            {description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-indigo-500/5 p-6">
                  <p className="text-sm font-semibold text-violet-200">
                    A little reminder
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    A strong argument isn't just about winning.
                    It's about supporting your claims, recognizing
                    weaknesses, and responding thoughtfully.
                  </p>
                  <div className="mt-5 text-2xl text-violet-300">
                    ✧
                  </div>
                </div>

              </aside>
            </div>
          </form>

          {/* Bottom */}
          <p className="mt-8 text-center text-xs text-slate-600">
            ArgumentArena · Practice. Analyze. Improve.
          </p>
        </div>
      </section>
    </main>
  );
}
