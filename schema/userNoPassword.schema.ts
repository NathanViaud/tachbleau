import * as z from 'zod';

export const userNoPasswordSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    role: z.enum(['user', 'admin']).default('user'),
    job: z.string(),
    id: z.string().optional(),
});