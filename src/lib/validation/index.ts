
import * as z from "zod"


export const SignUpValidation = z.object({
    name: z.string().min(2,{message:'too short'}),
    username: z.string().min(2,{message:'too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8,{message:'password must exceed 8 characters'}),
   
})

export const SignInValidation = z.object({
    // name: z.string().min(2,{message:'too short'}),
    email: z.string().email(),
    password: z.string().min(8,{message:'password must exceed 8 characters'}),
   
})

export const PostValidation = z.object({
    caption: z.string().min(2).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(200),
    tags: z.string(),
    
})