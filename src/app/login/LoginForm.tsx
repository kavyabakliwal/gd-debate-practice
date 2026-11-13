
"use client"

import { useState, useActionState } from "react"
import { loginUser, type LoginState,googleSignIn } from "./actions"
import Link from "next/link"
import Image from "next/image"
import googleIcon from "../../../public/google_g_1024.png"
import { Inter } from "next/font/google"
const inter = Inter({
  subsets: ["latin"]
})

const initialState: LoginState = {
  success: false,
  error: "",
}
type LoginFormProps = {
    error ?: string
}
// Already done but still remember this is how mapping is done here
const allErrors : Record<string,string> = {
    "password-account": "This email is registered with a password. Please sign in with your email and password.",
    "unverified-email": "Your Google account’s email isn’t verified, so we couldn’t sign you in.",
    "server-error" : "Something went wrong on our side. Please try again."
}


export default function LoginForm({error} : LoginFormProps) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginUser,
    initialState
  )

  const [showPassword, setShowPassword] = useState(false)

  const errorMessage = error ? allErrors[error] ?? "Sign-in failed.Please try again." : undefined

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


        {/* Login card */}
        <div className="rounded-3xl border border-white/10 bg-[#111827]/90 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">

          {/* Heading */}
          <div className="mb-5 text-center">
            <span className="text-3xl font-semibold uppercase tracking-[0.05em] text-violet-400">
              Welcome Back
            </span>


            <p className="mt-3 text-sm leading-6 text-slate-400">
              Continue your journey towards becoming a stronger communicator.
            </p>
          </div>

          {errorMessage && <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm text-red-400">{errorMessage}</p></div>
            }

          <form action={formAction} className="space-y-5">

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
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
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

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>
          <p className="text-center mt-5">OR</p>
          <form action={googleSignIn} className="mt-4">
            <button className="w-full h-12 flex items-center justify-center gap-4 rounded-xl border border-[#9147FF] bg-transparent text-white font-medium text-lg tracking-[0.04em] transition-all duration-300 hover:bg-[#9147FF]/10 hover:shadow-[0_0_20px_rgba(145,71,255,0.25)]">
              
                <Image src={googleIcon} alt = "Google Icon" className="object-contain" width = {24} height={24}/>
                <p className={`${inter.className}`}>Sign in with Google</p>
              
            </button>
          </form>

          {/* Register link */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500">
              NEW TO ARGUMENTARENA?
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-7 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} ArgumentArena. All rights reserved.
        </p>

      </div>
    </main>
  )
}
