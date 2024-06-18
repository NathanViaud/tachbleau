import * as z from 'zod';

export const userSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    role: z.enum(['user', 'admin']).default('user'),
    job: z.string(),
    id: z.string().optional(),
});

export const simpleUserUpdate = z.object({
    name: z.string().min(3).max(255),
    job: z.string()
})