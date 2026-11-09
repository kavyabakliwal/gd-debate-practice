'use server'

import { z } from "zod"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export type LoginState = {
  success: boolean
  error: string
}

const ExistingUser = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid Email"),
  password: z.string().min(1, "Enter your password"),
})

export async function loginUser(
  previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const result = ExistingUser.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0].message,
    }
  }

  const { email, password } = result.data

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
  } catch (e) {
    if (e instanceof AuthError) {
      return {
        success: false,
        error: "Invalid Email or Password",
      }
    }
    // Rethrow so Next.js can handle the NEXT_REDIRECT on success
    throw e
  }

  // Only reached if signIn doesn't redirect; satisfies the return type
  return { success: true, error: "" }
}