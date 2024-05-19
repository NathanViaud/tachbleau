import * as z from 'zod';

export const taskSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().optional(),
    duration: z.number().min(1).max(1000),
    priority: z.enum(['low', 'medium', 'high']),
    deadline: z.any(),
    status: z.enum(['done', 'doing', 'todo', 'backlog']).optional(),
});