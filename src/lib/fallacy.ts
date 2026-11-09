import { generateText } from "./llm";
import { buildFallacySystemPrompt,buildFallacyUserPrompt } from "./prompts/fallacy";
import { fallacySchema,type FallacyResult } from "./schemas/fallacy";
import type { PreviousRound } from "./prompts/opponent";

type Input = {
    topic : string,
    userStance : "FOR" | "AGAINST",
    previousRounds: PreviousRound[],
    latestArgument: string
}

function extractJson(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
}

const MAX_ATTEMPTS = 2

export async function detectFallacies(input : Input): Promise<FallacyResult> {
    const systemPrompt = buildFallacySystemPrompt()
    const basePrompt = buildFallacyUserPrompt(
        input.topic,
        input.userStance,
        input.previousRounds,
        input.latestArgument
    )
    let lastProblem = ""
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++){
        const userPrompt = lastProblem === "" ? basePrompt : `${basePrompt}\n\nYour previous response was invalid: ${lastProblem}. Return corrected JSON only.`

        const text = await generateText({systemPrompt,userPrompt,json: true})
        try {
            const parsed = JSON.parse(extractJson(text))
            const result = fallacySchema.safeParse(parsed)

            if (!result.success) {
                const description = result.error.issues
                .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                .join("; ")
                console.error(
                    `Fallacy Detector attempt ${attempt} failed validation: ${description}\nRaw output: ${text}`
                )
                lastProblem = description
                continue
            }
            return result.data
        }
        catch(error){
            console.error(`Fallacy Detector attempt ${attempt} returned invalid JSON: ${error}\nRaw output: ${text}`)
            lastProblem = "the response was not valid JSON"
            continue
        }
    }

    throw new Error(`Fallacy Detector failed to return valid output after ${MAX_ATTEMPTS} attempts`)
} 