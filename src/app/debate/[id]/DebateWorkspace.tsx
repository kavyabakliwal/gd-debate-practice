"use client";

import { ChangeEvent, useState } from "react";
import { submitArgument } from "./actions";
import ScoreCard from "./ScoreCard";
import { type EvaluationData } from "./ScoreCard";
import Link from "next/link";
import FallacyList from "./FallacyList";

type DebateWorkspaceProps = {
  debate: {
    id: string;
    topic: string;
    userStance: "FOR" | "AGAINST";
    difficulty: string;
    totalRounds: number;
    status: string;
  };
  rounds: {
    id: string;
    roundNumber: number;
    userArgument: string;
    aiArgument: string;
    evaluation : EvaluationData | null
    fallacy : {id:string, type: string, explanation: string}[]
  }[];
};

export default function DebateWorkspace({
  debate,
  rounds,
}: DebateWorkspaceProps) {
    const [argument,setArgument] = useState("");
    function handleArgument(e: ChangeEvent<HTMLTextAreaElement>){
        setArgument(e.target.value)
    }

    const [isSubmitting,setIsSubmitting] = useState(false)
    const [error,setError] = useState("");

    async function handleSubmit() {
  setIsSubmitting(true)
  setError("")
  try {
    const result = await submitArgument(debate.id, argument)
    if (result.success) {
      setArgument("")
    } else {
      setError(result.error ?? "Something went wrong")
    }
  } catch {
    setError("Something went wrong. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}


  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-400">
              GD & DEBATE PRACTICE
            </p>
            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
              Debate Arena
            </h1>
          </div>

          <div className="flex flex-row gap-2">
            <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 font-bold">
              {rounds.length ===  debate.totalRounds ? "COMPLELETD" : "IN_PROGRESS"}
            </span>
            <Link href="/dashboard" className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:text-indigo-500">GO TO DASHBOARD</Link>
          </div>
        </header>

        {/* Debate details */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
          <p className="text-sm text-slate-400">TODAY'S TOPIC</p>

          <h2 className="mt-3 text-xl font-semibold leading-relaxed sm:text-2xl">
            {debate.topic}
          </h2>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg bg-indigo-500/15 px-3 py-2 text-indigo-300">
              Your stance: {debate.userStance}
            </span>

            <span className="rounded-lg bg-slate-800 px-3 py-2 text-slate-300">
              Difficulty: {debate.difficulty}
            </span>

            <span className="rounded-lg bg-slate-800 px-3 py-2 text-slate-300">
              {rounds.length} / {debate.totalRounds} rounds
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{
                width: `${Math.min(
                  (rounds.length / debate.totalRounds) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </section>

        {/* Conversation */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Discussion</h2>
            <p className="mt-1 text-sm text-slate-400">
              Present your arguments clearly and challenge opposing viewpoints.
            </p>
          </div>

          <div className="space-y-6">
            {rounds.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 px-5 py-12 text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-500/15">
                  <span className="text-2xl">💬</span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  Your debate starts here
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Make your opening argument below. Your opponent's responses
                  will appear here as the discussion progresses.
                </p>
              </div>
            ) : (
              rounds.map((round) => (
                <div key={round.id} className="space-y-4">
                  <p className="text-center text-xs font-medium uppercase tracking-widest text-slate-500">
                    Round {round.roundNumber}
                  </p>

                  <div className="ml-auto max-w-3xl rounded-2xl rounded-tr-sm border border-indigo-500/20 bg-indigo-500/10 p-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-indigo-300">
                      Your argument
                    </p>
                    <p className="whitespace-pre-wrap leading-7 text-slate-200">
                      {round.userArgument}
                    </p>
                  </div>
                  
                  {round.evaluation ? <ScoreCard evaluation={round.evaluation}/> : <p className="ml-auto max-w-3xl rounded-xl border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-500">Evaluation unavailable for this round</p>}
                  <FallacyList fallacies={round.fallacy}/>

                  {round.aiArgument && (
                    <div className="max-w-3xl rounded-2xl rounded-tl-sm border border-slate-700 bg-slate-900 p-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-400">
                        AI opponent
                      </p>
                      <p className="whitespace-pre-wrap leading-7 text-slate-200">
                        {round.aiArgument}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Argument editor — UI only */}
        {rounds.length + 1 <= debate.totalRounds && <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Your argument</h2>
            <span className="text-xs text-slate-400">
              Round {rounds.length + 1} of {debate.totalRounds}
            </span>
          </div>

          <textarea
            rows={5}
            maxLength={3000}
            placeholder="Present your argument. Explain your reasoning and support it with examples or evidence..."
            className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            value = {argument}
            onChange={handleArgument}
          />
          
        <p className="mt-2 text-right text-xs text-slate-400">
            {argument.length} / 3000 characters
        </p>
      
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

<div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
  <p className="text-xs leading-5 text-slate-500">
    Tip: Make a clear claim, explain why it is valid, and support it
    with relevant evidence.
  </p>

  <button
    type="button"
    onClick={handleSubmit}
    disabled={
      debate.status === "COMPLETED" ||
      rounds.length >= debate.totalRounds ||
      isSubmitting ||
      argument.trim().length === 0
    }
    className="shrink-0 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
  >
    {isSubmitting ? "Opponent is thinking" : "Submit argument →"}
  </button>
</div>
        </section>}

      </div>
    </main>
  );
}
