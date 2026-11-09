"use client"

import { useActionState } from "react"
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

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8">
        <div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-gray-600">
            Register to start practicing debates.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

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
            <p className="text-sm text-red-600">
              {state.error}
            </p>
          )}

          {state.success && (
            <p className="text-sm text-green-600">
              Account created successfully!
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {pending ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center">Already have an account?    <Link href="/login" className="hover:text-blue-500">Login Here</Link></p>
      </div>
    </main>
  )
}