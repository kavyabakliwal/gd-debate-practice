
"use client"

import { useState, useActionState } from "react"
import { registerUser } from "./actions"
import Link from "next/link"

const initialState = {
  success: false,
  error: "",
}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  )

  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080D18] px-4 py-12 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/15 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Branding */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500 text-xl font-bold shadow-lg shadow-violet-500/20">
            A
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Argument<span className="text-violet-400">Arena</span>
          </span>
        </Link>

        {/* Register card */}
        <div className="rounded-3xl border border-white/10 bg-[#111827]/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">

          {/* Heading */}
          <div className="mb-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              Get Started
            </span>

            <h1 className="mt-3 text-3xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Join ArgumentArena and start improving your debating skills.
            </p>
          </div>

          <form action={formAction} className="space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                required
                minLength={2}
                className="w-full rounded-xl border border-white/10 bg-[#080D18] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-white/10 bg-[#080D18] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className="w-full rounded-xl border border-white/10 bg-[#080D18] px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 transition hover:text-violet-400"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Use at least 8 characters.
              </p>
            </div>

            {/* Error */}
            {state.error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {state.error}
              </div>
            )}

            {/* Success */}
            {state.success && (
              <div
                role="status"
                className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400"
              >
                Account created successfully!
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>


          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} ArgumentArena. All rights reserved.
        </p>

      </div>
    </main>
  )
}
