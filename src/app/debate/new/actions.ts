'use server'

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { z } from "zod"
import prisma from "@/lib/prisma"


const newDebate = z.object({
    topic : z.string().trim().min(5).max(200),
    stance : z.enum(["FOR","AGAINST"]),
    difficulty: z.enum(["EASY","MEDIUM","HARD"]),
    totalRounds: z.coerce.number().int().refine((rounds) => [3, 5].includes(rounds))
})

export async function NewDebate(
    previousState : {success: boolean, error : string},
    formData: FormData
){
    const session = await auth()
    if (!session?.user?.id){
        redirect("/login")
    }

    const result = newDebate.safeParse({
        topic : formData.get("topic"),
        stance : formData.get("stance"),
        difficulty : formData.get("difficulty"),
        totalRounds : formData.get("totalRounds")
    })
    if (!result.success){
        return {
            success: false,
            error: result.error.issues[0].message
        }
    }
    const {topic,stance,difficulty,totalRounds} = result.data

    const createdDebate = await prisma.debate.create({
        data : {
            user_id : session.user.id,
            topic: topic,
            userStance : stance,
            difficulty: difficulty,
            totalRounds: totalRounds
        },
    })
    redirect(`/debate/${createdDebate.id}`)
}