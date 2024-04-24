import { z } from 'zod'

export const User = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z.string()
})