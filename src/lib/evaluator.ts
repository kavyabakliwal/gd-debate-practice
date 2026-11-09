import {
  buildEvaluatorSystemPrompt,
  buildEvaluatorUserPrompt,
} from "./prompts/evaluator"
import { evaluationSchema, type EvaluationResult } from "./schemas/evaluation"
import { generateText } from "./llm"
import type { PreviousRound } from "./prompts/opponent"

const MAX_ATTEMPTS = 2

type Input = {
  topic: string
  userStance: "FOR" | "AGAINST"
  previousRounds: PreviousRound[]
  latestArgument: string
}

function extractJson(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
}

export async function evaluateArgument(
  input: Input
): Promise<EvaluationResult> {
  const systemPrompt = buildEvaluatorSystemPrompt()
  const basePrompt = buildEvaluatorUserPrompt(
    input.topic,
    input.userStance,
    input.previousRounds,
    input.latestArgument
  )

  let lastProblem = ""

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const userPrompt =
      lastProblem === "" ? basePrompt : `${basePrompt}\n\nYour previous response was invalid: ${lastProblem}. Return corrected JSON only.`

    const text = await generateText({ systemPrompt, userPrompt, json: true })

    try {
      const parsed = JSON.parse(extractJson(text))
      const result = evaluationSchema.safeParse(parsed)

      if (!result.success) {
        const description = result.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ")
        console.error(
          `Evaluator attempt ${attempt} failed validation: ${description}\nRaw output: ${text}`
        )
        lastProblem = description
        continue
      }

      return result.data
    } catch (error) {
      console.error(
        `Evaluator attempt ${attempt} returned invalid JSON: ${error}\nRaw output: ${text}`
      )
      lastProblem = "the response was not valid JSON"
      continue
    }
  }

  throw new Error(
    `Evaluator failed to return valid output after ${MAX_ATTEMPTS} attempts`
  )
}