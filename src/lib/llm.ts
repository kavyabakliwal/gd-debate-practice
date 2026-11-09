import { GoogleGenAI } from "@google/genai"

// Keep whichever model you are currently using
const MODEL = "gemini-3.5-flash-lite"

const MAX_ATTEMPTS = 2 // 1 try + 1 retry
const RETRY_DELAY_MS = 1000

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set")
}

const client = new GoogleGenAI({ apiKey })

type GenerateTextInput = {
  systemPrompt: string
  userPrompt: string
  json?: boolean
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Only "model overloaded" (503) is worth retrying after a short wait
function isRetryable(e: unknown): boolean {
  return (e as { status?: number })?.status === 503
}

export async function generateText({
  systemPrompt,
  userPrompt,
  json,
}: GenerateTextInput): Promise<string> {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const start = Date.now()
    try {
      const response = await client.models.generateContent({
        model: MODEL,
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          abortSignal: AbortSignal.timeout(15000),
          ...(json ? { responseMimeType: "application/json" } : {}),
        },
      })

      const text = response.text
      if (!text) {
        throw new Error("Empty response from model")
      }
      return text
    } catch (e) {
      console.error(
        `LLM call failed (attempt ${attempt}/${MAX_ATTEMPTS}, ${Date.now() - start}ms):`,
        e
      )
      if (attempt < MAX_ATTEMPTS && isRetryable(e)) {
        await sleep(RETRY_DELAY_MS * attempt)
        continue
      }
      throw e
    }
  }

  // Never reached, but TypeScript needs a return or throw after the loop
  throw new Error("LLM call failed")
}