"use client"

import { useActionState } from "react"
import { loginUser, type LoginState } from "./actions"
import Link from "next/link"

const initialState: LoginState = {
  success: false,
  error: "",
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginUser,
    initialState
  )

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
        <div>
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="mt-1 text-sm text-gray-600">
            Sign in to continue practicing debates.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          {state.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {pending ? "Logging in..." : "Log in"}
          </button>
          <p className="text-center">Don't have an account?    <Link href="/register" className="hover:text-blue-500">Register Here</Link></p>
        </form>
      </div>
    </main>
  )
}