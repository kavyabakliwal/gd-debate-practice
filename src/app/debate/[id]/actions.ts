"use server"

import { auth } from "@/auth"
import { z } from "zod"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { buildOpponentSystemPrompt,buildOpponentUserPrompt } from "@/lib/prompts/opponent"
import { generateText } from "@/lib/llm"
import { evaluateArgument } from "@/lib/evaluator"
import { computeOverallScore } from "@/lib/schemas/evaluation"
import { detectFallacies } from "@/lib/fallacy"

const validate = z.object({
    argument: z.string().trim().min(1, "Argument cannot be empty").max(3000, "Argument must be under 3000 characters"),
})

export async function submitArgument(debateId: string, argument: string) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return { success: false, error: "Not logged in" }
        }

        const result = validate.safeParse({ argument })
        if (!result.success) {
            return { success: false, error: result.error.issues[0].message }
        }

        const debate = await prisma.debate.findFirst({
            where: {
                id: debateId,
                user_id: session.user.id,
            },
        })
        if (!debate) {
            return { success: false, error: "Debate not found" }
        }

        if (debate.status !== "IN_PROGRESS") {
            return { success: false, error: "This debate is already completed" }
        }
        const previousRounds = await prisma.debateRound.findMany({
            where : {
                debateId: debateId,
            },
            orderBy: {
                roundNumber: 'asc'
            }
        })

        
        if (previousRounds.length >= debate.totalRounds) {
            return { success: false, error: "All rounds are already completed" }
        }
    
        
        const aiStance = debate.userStance === "FOR" ? "AGAINST" : "FOR"

        const opponentSystemPrompt = buildOpponentSystemPrompt(aiStance,debate.difficulty)
        const opponentUserPrompt = buildOpponentUserPrompt(debate.topic,previousRounds,result.data.argument)
        
        const analysisInput = {topic:debate.topic,userStance:debate.userStance,previousRounds:previousRounds,latestArgument:result.data.argument}

            const [opponentResult,evaluationResult,fallacyResult] = await Promise.allSettled([generateText({systemPrompt: opponentSystemPrompt,userPrompt: opponentUserPrompt}),
                evaluateArgument(analysisInput),
                detectFallacies(analysisInput)
            ])
            if (opponentResult.status === "rejected") {
                    console.error(opponentResult.reason)
                    return {success: false, error : "The AI opponent couldn't respond. Please try again later."}
                }
                const aiReply = opponentResult.value

            const evaluation = evaluationResult.status === "fulfilled" ? evaluationResult.value : null
            if (evaluationResult.status === "rejected"){
                console.error(evaluationResult.reason)
            }    

            if (fallacyResult.status === "rejected"){
                console.error(fallacyResult.reason)
            }
            const fallacies = fallacyResult.status === "fulfilled" ? fallacyResult.value.fallacies : []

            await prisma.debateRound.create({
                data : {
                    debateId,
                    roundNumber: previousRounds.length + 1,
                    userArgument: result.data.argument,
                    aiArgument: aiReply,
                    ...(evaluation && {
                        evaluation : {
                            create : {
                                ...evaluation,
                                overallScore : computeOverallScore(evaluation)
                            }
                        }
                    }),
                    ...(fallacies.length > 0 && {
                        fallacy: {
                            create : fallacies
                        }
                    })
                }
            })



        revalidatePath(`/debate/${debateId}`)
        return { success: true }
    } 
    catch (e: any) {
        if (e.code === "P2002") {
            return { success: false, error: "Round already submitted" }
        }
        console.error(e)
        return { success: false, error: "Something went wrong. Please try again." }
    }
}