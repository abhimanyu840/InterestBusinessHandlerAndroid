import { z } from 'zod';

export const SignUpUser = z.object({
    name: z.string().min(2, 'Name must be more than 2 characters').max(40, 'Name must be less than 40 characters').regex(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Please Enter a valid name'),
    email: z.string().email({ message: 'Invalid Email' }).min(5, 'Email must be of 5 length').max(50, 'Email must not be more than 50 character'),
    password: z.string().min(8, 'Password must be greater than 8 characters').max(40, 'Password must be less than 40 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Please Enter a Strong Password')
})