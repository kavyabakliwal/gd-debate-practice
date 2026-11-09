import {z} from "zod";

const score = z.number().int().min(1,"Score must be atleast 1").max(10,"Score can be atmost 10");
const reason = z.string().trim().min(1,"It cannot be empty").max(300,"Not More Than 300 Characters")

export const evaluationSchema = z.object({
    evidenceScore : score,
    persuasivenessScore : score,
    logicScore : score,
    relevanceScore : score,
    counterargumentScore : score,
    evidenceReason : reason,
    persuasivenessReason : reason,
    logicReason : reason,
    relevanceReason : reason,
    counterargumentReason : reason
})

export type EvaluationResult = z.infer<typeof evaluationSchema>

export function computeOverallScore(result : EvaluationResult): number {
    const {logicScore,evidenceScore,persuasivenessScore,relevanceScore,counterargumentScore} = result
    const ans = (logicScore + relevanceScore + evidenceScore + persuasivenessScore + counterargumentScore) / 5
    return Math.round(ans * 10) / 10
}