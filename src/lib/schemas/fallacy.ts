import {z} from "zod"

export const FALLACY_TYPES = [
    "STRAW_MAN",
    "FALSE_DILEMMA",
    "AD_HOMINEM",
    "HASTY_GENERALIZATION",
    "CIRCULAR_REASONING",
    "APPEAL_TO_AUTHORITY"
] as const

export const fallacySchema = z.object({
    fallacies : z.array(
        z.object({
            type : z.enum(FALLACY_TYPES),
            explanation : z.string().trim().min(1,"It cannot be empty").max(300,"It cannot have more than 300 characters")
        })
    ).max(3,"More than 3 fallacies not allowed")
})

export type FallacyResult = z.infer<typeof fallacySchema>

