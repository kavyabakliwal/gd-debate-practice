'use server'

import { z } from "zod"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { signIn } from "@/auth";

const CreateUser = z.object({
    name: z.string().trim().min(2,"Name must be atleast of 2 characters"),
    email: z.string().trim().email("Enter a valid email").toLowerCase(),
    password: z.string().min(8,"Password must be of atleast 8 characters") 
});


export async function registerUser(
    previousState : {error?: string, success: boolean},
    formData: FormData
){
    const result = CreateUser.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    })
    // If our safeparsing happens and any value is not accordingly 
    if (!result.success){
        return {
            success : false,
            error : result.error.issues[0].message
        }
    }
    const {name,email,password} = result.data

    const existingUser = await prisma.user.findUnique({
        where : {
            email: email
        }
    })
    if (existingUser) return {
        success: false,
        error: "The User already exists"
    }
    const passwordHash = await bcrypt.hash(password,10)
    
    const newUser = await prisma.user.create({
        data : {
            name: name,
            email: email,
            passwordHash: passwordHash
        }
    })
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    })
    return {
        success: true
    }
}
