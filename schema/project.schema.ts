import * as z from 'zod';

export const projectSchema = z.object({
    title: z.string(),
    description: z.string(),
    tasks: z.array(z.string()).optional(),
    startDate: z.any(),
    endDate: z.any()
});